import { executeQuery } from "@/app/api/utils";
import { getLoggedInUsername } from "@/app/api/utils";

export async function logPostsView(postIDs, connectionObj){
    try{
        const {token_exists, username} =  getLoggedInUsername()
        
        if (postIDs.length === 0 || token_exists !== true) return;
    
        // Prepare values string for the query
        const values = postIDs.map(postID => `('${postID}', '${username}')`).join(", ");
    
        // Construct the query
        const query = `INSERT INTO post_views (post_id, username) VALUES ${values}`;
    
        // Execute the query using the provided connection object
        await executeQuery(connectionObj, query);


    }catch(error){
        throw new Error(error.message)
    }
}