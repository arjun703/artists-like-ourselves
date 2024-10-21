import {  getLoggedInUsername, databaseConnection, executeQuery} from '@/app/api/utils'
import { logPostsView } from '../utils/log/post-views';

export  async function GET(request) {

    let connection = false



    try {

    
        // find whether the logged in user has already liked the post
        const {token_exists, username} = getLoggedInUsername()

   
        return new Response(JSON.stringify({success: true, token_exists, username }), {
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
