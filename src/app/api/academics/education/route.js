import {generateRandomString, databaseConnection, getLoggedInUsername} from '@/app/api/utils'
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2';


export  async function POST(request) {

    try {

        const data = await request.formData()

        const eduInfo = data.get('info')

        console.log(eduInfo)

        const id=generateRandomString(20)

        // Save the title and filenames in the MySQL database
        const query = `INSERT INTO educations 
            (id, user_id, info) 
            VALUES 
            ('${id}', '${getLoggedInUsername()}',  '${eduInfo}')
        `;
        
        const connection = await databaseConnection();

        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });

        return new Response(JSON.stringify({ success: true, education: {
            id: id, info: JSON.parse(eduInfo)
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

        const education = JSON.parse(data.get('education'))

        const id = education.id

        // Save the title and filenames in the MySQL database
        const query = `UPDATE  educations 
            SET info = '${JSON.stringify(education.info)}' 
            WHERE id = '${id}'
            AND user_id = '${getLoggedInUsername()}'
        `;
        
        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });

        return new Response(JSON.stringify({ success: true, education: {
            id: id, info: education.info
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
        const education_id = data.get('education_id')
        // Save the title and filenames in the MySQL database
        const query = `UPDATE  educations 
            SET is_active = 0 
            WHERE id = '${education_id}' AND user_id='${getLoggedInUsername()}'
        `;

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

        return new Response(JSON.stringify({ success: successStatus, education_id: education_id }), {
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