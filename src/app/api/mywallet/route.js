import { databaseConnection, executeQuery, getLoggedInUsername } from "../utils";

export async function GET(){
    let connection = false
    try{

        connection = await databaseConnection()

        const {token_exists, username} = getLoggedInUsername()

        if(token_exists !== true) throw new Error("Please log in to like")
        
        let query = `SELECT * from supports s WHERE supported_to = '${username}' `;

        const results = await executeQuery(connection, query) 

        return new Response(JSON.stringify({ success: true, supportHistory: results}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    }catch(error){

        return new Response(JSON.stringify({ success: error.message.includes('Duplicate') ?  true: false, msg:error.message}), {
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
