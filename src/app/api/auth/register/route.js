import {generateRandomString, generateToken, databaseConnection , executeQuery, hashPassword} from '@/app/api/utils'
import { EmailRounded } from '@mui/icons-material';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers'

export  async function POST(request) {

    let connection ;

    try {

        const data = await request.formData()

        const email = data.get('email')

        const name = data.get('name')
        
        if(name.trim().length === 0 || email.trim().length === 0 || data.get('password').trim().length === 0){
            throw new Error('Fill all fields')
        }

        const password = await hashPassword(data.get('password'))
        
        const username = name.toLowerCase().replace(/ /g, '-') + '-'+generateRandomString(8);

        // Save the title and filenames in the MySQL database
        const query = `
            INSERT INTO users(username, email, password) VALUES (
                '${username}', '${email}', '${password}'
            )
        `;

        connection =  await databaseConnection()
        
        const isCreationSuccess = await executeQuery(connection, query);

        if(isCreationSuccess){

            const basicInfoInsertQuery = `
                INSERT INTO user_more_info(username, name) 
                VALUES ('${username}', '${name}')
            `

            const isBasicInfoInsertionSuccess = await executeQuery(connection, basicInfoInsertQuery)

            if(isBasicInfoInsertionSuccess){

                const token = generateToken(username)
                
                cookies().set('token', token)

                return new Response(JSON.stringify({ success: true, token: token }), {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    status: 201
                });

            }else{
                throw new Error('Unknown error signing up. Plese try again later. ErrorCode: basicInfoInsertQuery ')
            }

        }else{
            throw new Error('Unknown error signing up. Plese try again later. Error Code: userInsertQuery')
        }

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