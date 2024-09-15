import { pOSTRequest } from "../file_upload";


export default async function uploadToS3(file, fileUploadProgressHandler, fileUploadErrorHandler, fileUploadSuccessHandler){

    try{

        const formData = new FormData();
        formData.append('file_name', file.name)
        
        const preSignedURLResponseJSON = await pOSTRequest(formData, '/api/file-upload/generate-pre-signed-url')
        
        if(preSignedURLResponseJSON.success === false){
            throw new Error(preSignedURLResponseJSON.msg)
        }

        const {pre_signed_URL, file_url_after_upload} = preSignedURLResponseJSON

        // const uploadResponse = await fetch(pre_signed_URL, {
        //     method: 'PUT',
        //     body: file,
        //     headers: { 'Content-Type': file.type }
        // });
        
        // if ( !(uploadResponse.ok)) {
        //     throw new Error('Error uploading file')
        // }
        
        // return {success: true, file_url_after_upload }
        
        putFileToS3(
            pre_signed_URL, 
            file_url_after_upload, 
            file, 
            fileUploadProgressHandler, 
            fileUploadErrorHandler,
            fileUploadSuccessHandler
        )

    }catch(error){
        fileUploadErrorHandler(error.message)
    }

}


function putFileToS3(
    pre_signed_URL, 
    file_url_after_upload, 
    file, 
    fileUploadProgressHandler, 
    fileUploadErrorHandler, 
    fileUploadSuccessHandler
){

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', pre_signed_URL, true);
    xhr.setRequestHeader('Content-Type', file.type);

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        fileUploadProgressHandler(Math.floor(percentComplete));
      }
    });

    xhr.onload = async () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        fileUploadSuccessHandler(file_url_after_upload);
      } else {
        fileUploadErrorHandler('Upload failed');
      }
    };

    xhr.onerror = () => {
        fileUploadErrorHandler('Network error');
    };

    xhr.send(file);

}