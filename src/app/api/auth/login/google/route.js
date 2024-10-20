import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import { handleLogin } from '../utils';

export  async function POST(request) {

    try {

        const data = await request.formData()

        const token = data.get('token')

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        
        // Get the user information from the payload
        const {sub, name, picture} = ticket.getPayload(); // sub is id of that user in google platform

        const loggedIn = await handleLogin(sub, 'google', name, picture)
        
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

    }
}