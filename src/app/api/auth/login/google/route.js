import {generateRandomString,databaseConnection} from '@/app/api/utils'

import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export  async function POST(request) {

    try {

        const data = await request.formData()

        const token = data.get('token')

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        
        // Get the user information from the payload
        const payload = ticket.getPayload();

        const { sub, email, name, picture } = payload;

        return new Response(JSON.stringify({ success: true, sub, email, name, picture  }), {
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