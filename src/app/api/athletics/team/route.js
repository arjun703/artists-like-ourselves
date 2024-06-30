import {generateRandomString,getLoggedInUsername} from '@/app/api/utils'
import fs from 'fs';
import path from 'path';

export  async function POST(request) {

    try {


        const data = await request.formData()

        const teamInfo = data.get('team_info')
        
        const id=generateRandomString(20)

        // Save the title and filenames in the MySQL database
        const query = `INSERT INTO teams
            (id, user_id, info) 
            VALUES 
            ('${id}', '${getLoggedInUsername()}',  '${teamInfo}')
        `;
        const connection = await databaseConnection();

        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });

        return new Response(JSON.stringify({ success: true, team: {
            id: id, info: teamInfo
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

        const team = JSON.parse(data.get('team'))

        const id = team.id
        const teamInfo = team.info

        // Save the title and filenames in the MySQL database
        const query = `UPDATE  teams
            SET info = '${JSON.stringify(teamInfo)}' 
            WHERE id = '${id}'
            AND user_id='${getLoggedInUsername()}'
        `;
        const connection = await databaseConnection();

        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });

        return new Response(JSON.stringify({ success: true, team: {
            id: id, info: teamInfo
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
        const team_id = data.get('team_id')
        // Save the title and filenames in the MySQL database
        const query = `UPDATE  teams
            SET is_active = 0 
            WHERE id = '${team_id}' AND user_id='${getLoggedInUsername()}'
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

        return new Response(JSON.stringify({ success: successStatus, team_id: team_id }), {
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