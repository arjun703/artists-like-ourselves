import { databaseConnection, generateToken, executeQuery, hashPassword, comparePassword} from '@/app/api/utils'
import { cookies } from 'next/headers'

export  async function POST(request) {

    try {

        const data = await request.formData()

        const emailOrUsername = data.get('emailOrUsername')
        const password = data.get('password')

        // Save the title and filenames in the MySQL database
        const query = `SELECT * from users WHERE email ='${email}' OR username='${emailOrUsername}' `;
        
        const connection = await databaseConnection()

        const results = await executeQuery(connection, query);
        
        // console.log("results", results, query)

        if(results.length){
            const user = results[0]
            if(comparePassword(password, user.password)){
                const token = generateToken(user.username, user.type)
                cookies().set('token', token)
                return new Response(JSON.stringify({ success: true, type: user.type, token: token }), {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    status: 201
                });
            }else{
                throw new Error('Incorrect email or password')
            }
        }else{
            throw new Error('Incorrect email or password')
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ success: false, msg: error.message  }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });
    }
}