import mysql from 'mysql2';
import { databaseConnection,getLoggedInUsername, generateToken, executeQuery} from '@/app/api/utils'



export  async function GET(request) {
    const { searchParams } = new URL(request.url)
    const userName = searchParams.get('username')
    
    try {


        let  query = `SELECT * from press_or_interviews 
            WHERE user_id = '${userName}' AND is_active=1
            ORDER BY created_at DESC
        `;
        const connection = await databaseConnection();


        const press_or_interviews = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Error fetching data from database: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });

        query = `SELECT * from additional_sports 
            WHERE user_id = '${userName}' AND is_active=1
            ORDER BY created_at DESC
        `;

        const additional_sports = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Error fetching data from database: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });

        query = `SELECT * from training 
            WHERE user_id = '${userName}' AND is_active=1
            ORDER BY created_at DESC
        `;

        const trainings = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Error fetching data from database: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });


        query = `SELECT * from coaches 
            WHERE user_id = '${userName}' AND is_active=1
            ORDER BY created_at DESC
        `;

        const coaches = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Error fetching data from database: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });

        query = `SELECT * from teams 
            WHERE user_id = '${userName}' AND is_active=1
            ORDER BY created_at DESC
        `;

        const teams = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Error fetching data from database: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });

        return new Response(JSON.stringify({ 
                editable: getLoggedInUsername() === userName,
                success: true, 
                press_or_interviews: press_or_interviews,
                additional_sports: additional_sports,
                trainings:trainings,
                teams:  teams,
                coaches:coaches
            }), {
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