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


export  async function GET(request) {
    let connection = false

    const { searchParams } = new URL(request.url)

    const postID = searchParams.get('id')
    
    try {

        const {token_exists, username} = getLoggedInUsername()

        const query = `
            SELECT 
                p.id AS id,
                p.username AS posted_by_username,
                umi.name as posted_by_name,
                umi.profile_pic_src as poster_profile_pic,
                TIMESTAMPDIFF(SECOND, p.posted_at, NOW())  AS posted_ago_in_seconds,
                p.caption,
                pm.media_src,
                pm.media_type,
                ${
                    token_exists ? `
                        CASE 
                            WHEN pl.id IS NOT NULL THEN TRUE
                            ELSE FALSE
                        END AS has_already_liked,
                    ` : `
                    
                        false AS has_already_liked,
                    `
                }

                ${
                    token_exists ? `
                        CASE 
                            WHEN p.username = '${username}' THEN TRUE
                            ELSE FALSE
                        END AS is_editable

                    `: `
                        false AS is_editable
                    `
                }

            FROM 
                posts p

            LEFT JOIN 
                posts_media pm ON p.id = pm.post_id
            
            ${
                token_exists ? `
                    LEFT JOIN
                    post_likes pl ON pl.post_id = p.id AND pl.username='${username}'
                ` : ''
            }

            INNER JOIN
                user_more_info umi  ON umi.username =  p.username 

            WHERE p.id = '${postID}'
            
            ORDER BY 
                p.posted_at DESC

            LIMIT 10
        
        `;


        connection = await databaseConnection();

        let posts  = await executeQuery(connection, query);

        let post  = {}

        if(posts.length){
            post = posts[0]
        }else{
            throw new Error('Post not found.');
        }

        const post_id = post.id

        let query2 = `SELECT  COUNT(post_id) AS likes_count, post_id  FROM post_likes WHERE post_id ='${post_id}' GROUP BY post_id `;

        const post_id_vs_likes = {}

        const posts_num_likes_response = await executeQuery(connection, query2);

        posts_num_likes_response.forEach(p => post_id_vs_likes[p.post_id] = p.likes_count )

        posts = posts.map(p => ({...p, num_likes: post_id_vs_likes[p.id] !== undefined ? post_id_vs_likes[p.id] : 0 }) )

        return new Response(JSON.stringify({ query2, posts_num_likes_response, success: true, post: posts[0]}), {
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