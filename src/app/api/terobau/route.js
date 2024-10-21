import {  getLoggedInUsername, databaseConnection, executeQuery} from '@/app/api/utils'

export  async function GET(request) {

    let connection = false


    try {

        const {token_exists, username} = getLoggedInUsername()

       
        return new Response(JSON.stringify({success: true, token: token_exists }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    } catch (error) {

        return new Response(JSON.stringify({ success: false, msg: error.message  }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    } finally{
        if(connection){
            connection.end()
        }
    }
}
