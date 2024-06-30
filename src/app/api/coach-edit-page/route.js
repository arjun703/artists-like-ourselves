import mysql from 'mysql2';
import {  getLoggedInUsername,databaseConnection, generateToken, executeQuery} from '@/app/api/utils'

export  async function GET(request) {

    const loggedinUser = getLoggedInUsername()

    try {
        // Save the title and filenames in the MySQL database
        const query = `
            SELECT only_coach.username,email, sport_type, info FROM users 
            INNER JOIN only_coach ON users.username = only_coach.username AND only_coach.username = '${getLoggedInUsername()}'
        `;

        const connection = await databaseConnection();

        let coach = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Error fetching data from database: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });

        if(coach.length){
            coach = coach[0]
        }else{
            coach = false
        }

        return new Response(JSON.stringify({success: true, coach: coach}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

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

export  async function POST(request) {

    try {

        const data = await request.formData()

        const coach = JSON.parse(data.get('info'))

        const name = coach.name
        const email = coach.email
        const sport_type = coach.sport_type

        if(name.trim().length === 0 || email.trim().length === 0 || sport_type.trim().length == 0){
            throw new Error('Fill all fields')
        }
        
        const loggedinUser= getLoggedInUsername();

        // Save the title and filenames in the MySQL database
        const query = `
            UPDATE users 
                SET
                    email = '${email}'
                WHERE
                    username = '${loggedinUser}'
        `;

        const connection = await databaseConnection()

        const isCreationSuccess = await executeQuery(connection, query);

        if(isCreationSuccess){
            
            const basicInfoInsertQuery = `
                UPDATE  only_coach
                    SET
                        info = '${JSON.stringify(coach)}',
                        sport_type = '${sport_type}'
                    WHERE
                        username = '${loggedinUser}'
            `

            const isBasicInfoInsertionSuccess = await executeQuery(connection, basicInfoInsertQuery)

            if(isBasicInfoInsertionSuccess){


                return new Response(JSON.stringify({ success: true}), {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    status: 201
                });

            }else{
                throw new Error('Unknown error Editing coach info. Plese try again later. ErrorCode: basicInfoInsertQuery ')
            }

        }else{
            throw new Error('Unknown error editing coach info. Plese try again later. Error Code: userInsertQuery')
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