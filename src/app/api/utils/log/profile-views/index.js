import { executeQuery } from "@/app/api/utils";
import { getLoggedInUsername } from "@/app/api/utils";

export async function logProfileView(viewee, connectionObj){
    try{
        const {token_exists, username} =  getLoggedInUsername()
        
        if (token_exists !== true || viewee === username) return;
    
        // Construct the query
        const query = `INSERT INTO profile_views (viewer, viewee) VALUES ('${username}', '${viewee}')`;
    
        // Execute the query using the provided connection object
        await executeQuery(connectionObj, query);

    }catch(error){
        throw new Error(error.message)
    }
}