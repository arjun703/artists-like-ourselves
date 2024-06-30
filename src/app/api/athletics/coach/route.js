import {generateRandomString, databaseConnection,getLoggedInUsername} from '@/app/api/utils'
import fs from 'fs';
import path from 'path';

export  async function POST(request) {

    try {


        const data = await request.formData()

        const coachInfo = data.get('coach_info')
        
        const id=generateRandomString(20)

        // Save the title and filenames in the MySQL database
        const query = `INSERT INTO coaches
            (id, user_id, info) 
            VALUES 
            ('${id}', '${getLoggedInUsername()}',  '${coachInfo}')
        `;
        const connection = await databaseConnection();

        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });

        return new Response(JSON.stringify({ success: true, coach: {
            id: id, info: coachInfo
        }}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
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



export  async function PUT(request) {

    try {

        const data = await request.formData()

        const coach = JSON.parse(data.get('coach'))

        const id = coach.id
        const coachInfo = coach.info

        // Save the title and filenames in the MySQL database
        const query = `UPDATE  coaches
            SET info = '${JSON.stringify(coachInfo)}' 
            WHERE id = '${id}'
            AND user_id='${getLoggedInUsername()}'
        `;
        const connection = await databaseConnection();

        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });

        return new Response(JSON.stringify({ success: true, coach: {
            id: id, info: coachInfo
        }}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
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


export async function DELETE(request) {


    try {
        const userID = '1234';
        const data = await request.formData()
        const coach_id = data.get('coach_id')
        // Save the title and filenames in the MySQL database
        const query = `UPDATE  coaches
            SET is_active = 0 
            WHERE id = '${coach_id}' AND user_id='${getLoggedInUsername()}'
        `;
        const connection = await databaseConnection();

        const result = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Error deleting the video: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });

        const successStatus  = result.affectedRows > 0

        return new Response(JSON.stringify({ success: successStatus, coach_id: coach_id }), {
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