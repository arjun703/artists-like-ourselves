import { pOSTRequest } from "../file_upload";
export default async function uploadToS3(file){

    try{

        const formData = new FormData();
        formData.append('file_name', file.name)
        
        const preSignedURLResponseJSON = await pOSTRequest(formData, '/api/file-upload/generate-pre-signed-url')
        
        if(preSignedURLResponseJSON.success === false){
            throw new Error(preSignedURLResponseJSON.msg)
        }

        const {pre_signed_URL, file_url_after_upload} = preSignedURLResponseJSON

        const uploadResponse = await fetch(pre_signed_URL, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type }
        });
        
        if ( !(uploadResponse.ok)) {
            throw new Error('Error uploading file')
        }
        
        return {success: true, file_url_after_upload }
        
    }catch(error){
        throw new Error(error.message)
    }

}