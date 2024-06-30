import mysql from 'mysql2';
import { databaseConnection,getLoggedInUsername, generateToken, executeQuery} from '@/app/api/utils'


export  async function GET(request) {
    const { searchParams } = new URL(request.url)
    const userName = searchParams.get('username')
    try {
        


        let  query = `SELECT * from educations 
            WHERE user_id = '${userName}' AND is_active=1
            ORDER BY created_at DESC
        `;

        const connection = await databaseConnection();

        const educations = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Error fetching data from database: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });

        query = `SELECT * from academic_files 
            WHERE user_id = '${userName}' AND is_active=1
            ORDER BY created_at DESC
        `;
        const academicFiles = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Error fetching data from database: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });

        return new Response(JSON.stringify({editable: userName==getLoggedInUsername(), success: true, educations: educations, academicFiles: academicFiles }), {
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