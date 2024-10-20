import {generateRandomString, databaseConnection , executeQuery, getLoggedInUsername} from '@/app/api/utils'
import { S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { Upload } from '@aws-sdk/lib-storage';

export  async function POST(request) {

    let connection = false

    try {

        const {token_exists, username} = getLoggedInUsername()

        const loggedInUsername = username

        if(!token_exists){throw new Error("User not logged in")}
    
        const data = await request.formData()

        const caption = data.get('caption')
        const file_url_after_upload = data.get('file_url_after_upload')
        const media_type = data.get('media_type')

        let media_src = file_url_after_upload

        const post_id = generateRandomString(20)

        // Save the title and filenames in the MySQL database
        let query = `INSERT INTO posts 
            (id, username, caption) 
            VALUES 
            ('${post_id}', '${loggedInUsername}', '${caption.replaceAll("'", "")}')
        `;

        const connection = await databaseConnection();

        let result = await executeQuery(connection, query);        

        if(result){

            if(media_src.trim().length > 0){

                query = `
                    INSERT INTO posts_media
                    (id, post_id, media_src, media_type) 
                    VALUES
                    ('${generateRandomString()}', '${post_id}', '${media_src}','${media_type}')
                `;

                result = await executeQuery(connection, query);
                
                if(!result){
                    throw new Error('Post created but error uploading post media');
                }
            }

        }else{
            throw new Error('Error creating post');
        }

        return new Response(JSON.stringify({ success: true, post_id: post_id}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
        });

    } catch (error) {
                
        return new Response(JSON.stringify({ success: false, msg: error.message  }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    }finally{
        if(connection){
            connection.end()
        }
    }
}


