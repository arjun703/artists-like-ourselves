import { databaseConnection, executeQuery  } from "@/app/api/utils"

export async function GET(request, {params}){

    let connection = false 

    try{

        let username = params.username

        connection = await databaseConnection()

        let query = `
            SELECT * FROM user_more_info WHERE username IN (
                SELECT follower FROM followers WHERE username = '${username}'
            )
        `

        let followersResponse = await executeQuery(connection, query) 

        return new Response(JSON.stringify({  success: true, moreDataExists:false, followers: followersResponse  }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    }catch(error){
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
