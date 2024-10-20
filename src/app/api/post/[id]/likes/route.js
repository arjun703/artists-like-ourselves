import { databaseConnection, executeQuery } from "@/app/api/utils";

export async function GET(request, {params}){

    let connection = false 

    try{

        let post_id = params.id

        connection = await databaseConnection()

        let query = `
            SELECT * FROM user_more_info WHERE username IN (
                SELECT username FROM post_likes WHERE post_id = '${post_id}'
            )
        `

        let likesResponse = await executeQuery(connection, query) 

        return new Response(JSON.stringify({ query, success: true, moreDataExists:false, likes: likesResponse  }), {
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
