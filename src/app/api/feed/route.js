import mysql from 'mysql2';
import {  getLoggedInUsername,databaseConnection, generateToken, executeQuery} from '@/app/api/utils'

export  async function GET(request) {

    const loggedinUser = getLoggedInUsername()

    try {
        // Save the title and filenames in the MySQL database
        const query = `SELECT 
        COUNT(DISTINCT academic_files.id)  AS total_academic_files, 
        COUNT(DISTINCT additional_sports.id)  AS total_additional_sports,
        basic_info.name AS name,
        basic_info.username AS username, 
        COUNT(DISTINCT coaches.id)  AS total_coaches, 
        COUNT(DISTINCT educations.id)  AS total_education_info, 
        key_stats.sport AS sport, 
        COUNT(DISTINCT press_or_interviews.id)  AS total_press_or_interviews, 
        COUNT(DISTINCT teams.id)  AS total_teams, 
        COUNT(DISTINCT training.id)  AS total_trainings, 
        COUNT(DISTINCT videos.id)  AS total_videos
    FROM 
        basic_info
    LEFT JOIN 
        academic_files ON basic_info.username = academic_files.user_id
    LEFT JOIN 
        additional_sports ON basic_info.username = additional_sports.user_id
    LEFT JOIN 
        coaches ON basic_info.username = coaches.user_id
    LEFT JOIN 
        educations ON basic_info.username = educations.user_id
    LEFT JOIN 
        key_stats ON basic_info.username = key_stats.username
    LEFT JOIN 
        press_or_interviews ON basic_info.username = press_or_interviews.user_id
    LEFT JOIN 
        teams ON basic_info.username = teams.user_id
    LEFT JOIN 
        training ON basic_info.username = training.user_id
    LEFT JOIN 
        videos ON basic_info.username = videos.user_id
    WHERE 
        basic_info.username = '${getLoggedInUsername()}';
        
        `;
        const connection = await databaseConnection();

        const user = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Error fetching data from database: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });

        return new Response(JSON.stringify({success: true, user: user }), {
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
