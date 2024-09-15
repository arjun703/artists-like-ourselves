import { s3Client } from "../_s3client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getLoggedInUsername } from "../../utils";
import { generateRandomString } from "../../utils";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const createPresignedUrlWithClient = ( key ) => {

    const command = new PutObjectCommand({ Bucket: process.env.S3_BUCKET_NAME, Key: key });
    return getSignedUrl(s3Client, command, { expiresIn: 3600 });

};

export  async function POST(request) {

    try {

        const {token_exists, username} = getLoggedInUsername()

        if(!token_exists){throw new Error("User not logged in")}
        
        const data = await request.formData()

        let file_name = data.get('file_name')

        const parts = file_name.split('.');
        const mediaExt = parts.length > 1 ? parts.pop() : null;
        if(mediaExt === null){
            throw(new Error('Extension not found'))
        }else{
            file_name = generateRandomString(20) + '.' + mediaExt
        }

        const pre_signed_URL = await createPresignedUrlWithClient(file_name); 

        const file_url_after_upload = `https://s3.amazonaws.com/${process.env.S3_BUCKET_NAME}/${file_name}`;

        return new Response(JSON.stringify({ success: true, pre_signed_URL: pre_signed_URL, file_url_after_upload:file_url_after_upload  }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    }catch(error){

        return new Response(JSON.stringify({ success: false, msg: error.message  }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    }
}