import { getLoggedInUsername } from "../../utils";
import { databaseConnection, executeQuery } from "../../utils";

export  async function GET(request, {params}) {
    let connection = false

    const postID = params.id
    
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

        WHERE p.id='${postID}'
        
        ORDER BY 
            p.posted_at DESC

        LIMIT 10
        
    `;

        connection = await databaseConnection();
        
        let posts  = await executeQuery(connection, query);
        
        const post_ids = posts.map(post => `'${post.id}'`).join(',')
                
        let query2 = `SELECT  COUNT(post_id) AS likes_count, post_id  FROM post_likes WHERE post_id IN ( ${post_ids}) GROUP BY post_id `;
        
        const post_id_vs_likes = {}
        
        const posts_num_likes_response = await executeQuery(connection, query2);
        
        posts_num_likes_response.forEach(p => post_id_vs_likes[p.post_id] = p.likes_count )
        
        posts = posts.map(p => ({...p, num_likes: post_id_vs_likes[p.id] !== undefined ? post_id_vs_likes[p.id] : 0 }) )
        
        let query3 = `SELECT  COUNT(post_id) AS comments_count, post_id  FROM post_comments WHERE post_id IN ( ${post_ids}) GROUP BY post_id `;

        const post_id_vs_comments = {}
        
        const posts_num_comments_response = await executeQuery(connection, query3);
        
        posts_num_comments_response.forEach(p => post_id_vs_comments[p.post_id] = p.comments_count )
        
        posts = posts.map(p => ({...p, num_comments: post_id_vs_comments[p.id] !== undefined ? post_id_vs_comments[p.id] : 0 }) )

        return new Response(JSON.stringify({success: true, post: posts[0], query: query }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
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

export  async function PUT(request, {params}) {

    let connection = false

    try {

        const {token_exists, username} = getLoggedInUsername()

        if(!token_exists){throw new Error("User not logged in")}
    
        const data = await request.formData()

        const caption = data.get('caption')

        const post_id = params.id

        // Save the title and filenames in the MySQL database
        let query = `UPDATE  posts
            SET caption='${caption}' 
            WHERE id='${post_id}' AND username = '${username}'
        `;

        const connection = await databaseConnection();

        const editResponse = await executeQuery(connection, query);        

        console.log(editResponse)

        if(editResponse.affectedRows != 1){
            throw new Error("Error updating post -" + query)
        }

        return new Response(JSON.stringify({success: true }), {
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



export  async function DELETE(request, {params}) {

    let connection = false

    try {

        const {token_exists, username} = getLoggedInUsername()

        if(!token_exists){throw new Error("User not logged in")}

        const post_id = params.id

        // Save the title and filenames in the MySQL database
        let query = `DELETE from  posts
            WHERE id='${post_id}' AND username = '${username}'
        `;

        const connection = await databaseConnection();

        const editResponse = await executeQuery(connection, query);        

        if(editResponse.affectedRows != 1){
            throw new Error("Error deleting post")
        }

        return new Response(JSON.stringify({success: true }), {
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