import {generateRandomString, generateToken, databaseConnection , executeQuery, getLoggedInUsername} from '@/app/api/utils'
import { S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { Upload } from '@aws-sdk/lib-storage';

export  async function POST(request) {

    let connection = false

    try {

        const data = await request.formData()

        const caption = data.get('caption')
        const media = data.get('media')
        console.log(media)
        if(!media && caption.trim().length == 0){
            throw new Error('Error - At least caption or media is required.');
        }

        let media_src = ''

        if(media && media.name){
            const client = new S3Client({
                region: process.env.S3_REGION,
                credentials: {
                  accessKeyId: process.env.S3_ACCESS_KEY_ID,
                  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
                }
            })
            let Key = ''
            const mediaStream = Readable.from(media.stream());
            const parts = media.name.split('.');
            const mediaExt = parts.length > 1 ? parts.pop() : null;
            if(mediaExt === null){
                throw(new Error('Extension not found'))
            }else{
                Key = generateRandomString(20) + '.' + mediaExt
            }

            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key,
                Body:mediaStream
            };

            const upload = new Upload({
                client: client,
                params: params,
              });
          
            const data = await upload.done();
          
            // Generate the URL in the desired format
            media_src = `https://s3.amazonaws.com/${params.Bucket}/${params.Key}`;

            // const command = new PutObjectCommand({
            //     Bucket: process.env.S3_BUCKET_NAME,
            //     Key,
            // });

            // const response = await client.send(command);
            console.log(data)
            // media_src = process.env.SUPABASE_PROJECT_ENDPOINT +'/' + process.env.SUPABASE_UPLOAD_PATH + '/' + process.env.S3_BUCKET_NAME + '/'+Key
        
        }

        const loggedInUsername = getLoggedInUsername()

        const post_id=generateRandomString(20)


        // Save the title and filenames in the MySQL database
        let query = `INSERT INTO posts 
            (id, username, caption) 
            VALUES 
            ('${post_id}', '${loggedInUsername}', '${caption}')
        `;

        const connection = await databaseConnection();

        let result = await executeQuery(connection, query);        

        if(result){
            if(media_src.trim().length > 0){

                
                query = `
                    INSERT INTO posts_media
                    (id, post_id, media_src, media_type) 
                    VALUES
                    ('${generateRandomString()}', '${post_id}', '${media_src}','${media.type}')
                `;

                result = await executeQuery(connection, query);
                
                if(!result){
                    throw new Error('Post created but error inserting post media.');
                }
            }
        }else{
            throw new Error('Error inserting post.');
        }

        return new Response(JSON.stringify({ success: true, post: {
            id: post_id, caption, media_src, media_tyoe:media.type
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
    }finally{
        if(connection){
            connection.end()
        }
    }
}




export  async function GET(request) {
    let connection = false
    const { searchParams } = new URL(request.url)
    const postID = searchParams.get('id')
    
    try {

        let  query = `SELECT * from posts 
           WHERE id  = '${postID}'
        `;

        connection = await databaseConnection();    

        const posts = await  executeQuery(connection, query)
        let post = {};

        if(posts.length){
            post = posts[0]
            query = `
                SELECT * from posts_media
                WHERE post_id = '${postID}'
            `
            const medias = await executeQuery(connection, query)

            post['medias'] = medias

        }else{
            throw new Error('Post not found.');
        }

        return new Response(JSON.stringify({ success: true, post}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
        });

    }catch(error){

        console.log(error)
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