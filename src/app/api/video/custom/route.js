import {generateRandomString,databaseConnection, getLoggedInUsername} from '@/app/api/utils'
import fs from 'fs';
import path from 'path';


export  async function POST(request) {

    

    try {

        const data = await request.formData()

        const title = data.get('title')

        const video = data.get('video')
        const thumbNail = data.get('thumbnail')

        const id=generateRandomString(20)
        const thumbnailFileName = generateRandomString(20) + path.extname(thumbNail.name);
        const videoFileName = generateRandomString(20) + path.extname(video.name);
       

        if( !(['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(path.extname(thumbNail.name.toLowerCase())))){
            throw new Error('Error - Invalid image format. Supported types are jpg, png, gif, bmp')
        }
        
        if( !(['.mp4', '.webm', '.ogv', '.ogg', '.avi', '.wmv'].includes(path.extname(video.name.toLowerCase())))){
            throw new Error('Error - Invalid video format. Supported types are mp4, webm, ogv, ogg, avi, wmv')
        }

        if(title.trim().length == 0){
            throw new Error('Error - Empty title')
        }

        const thumbnailBuffer = await thumbNail.arrayBuffer(); // Get the file data as a Buffer or ArrayBuffer
        const videoBuffer = await video.arrayBuffer(); // Get the file data as a Buffer or ArrayBuffer
        
        await fs.promises.writeFile(path.join(process.cwd(), 'public/files/', thumbnailFileName), Buffer.from(thumbnailBuffer));
        await fs.promises.writeFile(path.join(process.cwd(), 'public/files/', videoFileName), Buffer.from(videoBuffer));

        // Save the title and filenames in the MySQL database
        const query = `INSERT INTO videos 
            (id, title, thumbnail_src, video_src, type, user_id) 
            VALUES 
            ('${id}', '${title}', '${thumbnailFileName}', '${videoFileName}', 'custom', '${getLoggedInUsername()}')
        `;
        const connection = await databaseConnection();

        const thumbnail_src = thumbnailFileName

        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });

        return new Response(JSON.stringify({ success: true, video: {
            id: id, title: title, thumbnail_src: thumbnail_src, video_src: videoFileName, type: 'custom'
        }}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
        });

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ success: false, msg: error.message  }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });
    }
}