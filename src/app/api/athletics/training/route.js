import {generateRandomString} from '@/app/api/utils'
import fs from 'fs';
import path from 'path';
import { databaseConnection, getLoggedInUsername, generateToken, executeQuery} from '@/app/api/utils'


export  async function POST(request) {

    try {

        const data = await request.formData()

        const trainingInfo = data.get('training_info')
        
        const id=generateRandomString(20)

        // Save the title and filenames in the MySQL database
        const query = `INSERT INTO training 
            (id, user_id, info) 
            VALUES 
            ('${id}', '${getLoggedInUsername()}',  '${trainingInfo}')
        `;
        const connection = await databaseConnection();

        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });

        return new Response(JSON.stringify({ success: true, training: {
            id: id, info: trainingInfo
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

        const training = JSON.parse(data.get('training'))

        const id = training.id
        const trainingInfo = training.info

        // Save the title and filenames in the MySQL database
        const query = `UPDATE  training
            SET info = '${JSON.stringify(trainingInfo)}' 
            WHERE id = '${id}'
            AND user_id ='${getLoggedInUsername()}'
        `;
        const connection = await databaseConnection();

        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });

        return new Response(JSON.stringify({ success: true, training: {
            id: id, info: trainingInfo
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
        const training_id = data.get('training_id')
        // Save the title and filenames in the MySQL database
        const query = `UPDATE  training
            SET is_active = 0 
            WHERE id = '${training_id}' AND user_id='${getLoggedInUsername()}'
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

        return new Response(JSON.stringify({ success: successStatus, training_id: training_id }), {
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