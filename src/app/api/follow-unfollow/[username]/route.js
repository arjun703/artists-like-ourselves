import { databaseConnection, executeQuery, getLoggedInUsername } from "../../utils";


export async function POST(request, {params}){
    let connection = false
    try{

        connection = await databaseConnection()

        const followee = params.username

        const {token_exists, username} = getLoggedInUsername()

        let follower = username

        if(token_exists !== true) throw new Error("Please log in to follow")
        
        if(username === followee) throw new Error('Not allowed')

        let query = `INSERT INTO followers ( username, follower) VALUES('${followee}', '${follower}')`;

        await executeQuery(connection, query) 

        return new Response(JSON.stringify({ success: true}), {
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

export async function DELETE(request, {params}){
    
    let connection = false

    try{

        connection = await databaseConnection()


        const followee = params.username

        const {token_exists, username} = getLoggedInUsername()

        let follower = username 

        if(token_exists !== true) throw new Error("Please log in to follow")
        
        if(username === followee) throw new Error('Not allowed')

        let query = `DELETE FROM followers WHERE username = '${followee}' AND follower='${follower}' `;

        await executeQuery(connection, query) 

        return new Response(JSON.stringify({ success: true}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    }catch(error){

        return new Response(JSON.stringify({ success: false, msg: error.message}), {
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