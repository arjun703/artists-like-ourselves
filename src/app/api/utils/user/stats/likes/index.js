import { executeQuery } from "../../../../utils"

export async function getNumPostLikesCount(user, connection){

        // followings count
        const followingsQuery = `SELECT COUNT(post_id) AS post_likes_count FROM post_likes WHERE post_id 
                IN (SELECT id FROM posts WHERE username = '${user}' )
        `
        
        return await executeQuery(connection, followingsQuery)
}