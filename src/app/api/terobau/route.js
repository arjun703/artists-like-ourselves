import {  getLoggedInUsername, databaseConnection} from '@/app/api/utils'

export  async function GET(request) {
    try {

        const {token_exists, username} = getLoggedInUsername()
        
        return new Response(JSON.stringify({ success: true, is_logged_in:true  }), {
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

    }
}