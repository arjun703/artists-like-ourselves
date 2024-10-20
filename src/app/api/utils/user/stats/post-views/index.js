import { executeQuery } from "../../../../utils"

export async function getNumPostViewsCount(user, connection){

        // followings count
        const followingsQuery = `SELECT COUNT(post_id) AS post_views_count FROM post_views WHERE post_id 
                IN (SELECT id FROM posts WHERE username = '${user}' )
        `
        
        return await executeQuery(connection, followingsQuery)
        
}


