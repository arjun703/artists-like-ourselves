import {generateRandomString, generateToken, databaseConnection , executeQuery, hashPassword} from '@/app/api/utils'
import { EmailRounded } from '@mui/icons-material';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers'

export  async function POST(request) {

    try {

        const data = await request.formData()

        const coach = JSON.parse(data.get('info'))

        const name = coach.name
        const email = coach.email
        const sport_type = coach.sport_type
        let password = await hashPassword(coach.password)

        if(name.trim().length === 0 || email.trim().length === 0 || coach.password.trim().length === 0){
            throw new Error('Fill all fields')
        }
        
        const username = name.toLowerCase().replace(/ /g, '-') + '-'+generateRandomString(8);

        // Save the title and filenames in the MySQL database
        const query = `
            INSERT INTO users(username, email, password, type, phone) VALUES (
                '${username}', '${email}', '${password}', 'coach', ''
            )
        `;

        const connection = await databaseConnection()

        const isCreationSuccess = await executeQuery(connection, query);

        if(isCreationSuccess){

            coach.password = ''

            coach.confirm_password = ''
            
            const basicInfoInsertQuery = `
                INSERT INTO only_coach(username, info, sport_type) 
                VALUES ('${username}', '${JSON.stringify(coach)}', '${sport_type}' )
            `

            const isBasicInfoInsertionSuccess = await executeQuery(connection, basicInfoInsertQuery)

            if(isBasicInfoInsertionSuccess){

                const token = generateToken(username, 'coach')

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
    }
}