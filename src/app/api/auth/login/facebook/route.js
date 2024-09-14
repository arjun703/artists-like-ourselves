import {retrieveAppAccessToken, verifyToken, getUserInfo} from './utils'

import { handleLogin } from '../utils'

export  async function POST(request) {

    try {

        const data = await request.formData()

        const inputToken = data.get('token')

        const appAccessToken = await retrieveAppAccessToken()

        const {is_verified, user_id} = await verifyToken(inputToken, appAccessToken)

        if(!is_verified){
          throw new Error("Error verifying user.")
        }

        const userInfo = await getUserInfo(inputToken)

        const loggedIn = await handleLogin(user_id, 'facebook', userInfo.name)
        
        if(loggedIn === true){
            
            return new Response(JSON.stringify({ success: true }), {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 200
            });

        }else{
            throw new Error('An error occured. Please try again.')
        }

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