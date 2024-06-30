import {generateRandomString,databaseConnection} from '@/app/api/utils'
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2';




export  async function POST(request) {

    await  new Promise((resolve, reject)=> setTimeout(()=> resolve(), 1000))

    try {

        const data = await request.formData()

        const type = data.get('type')

        const file = data.get('file')

        const description = data.get('description')
       
        if(type.trim().length == 0 || !(file.name)){
            throw new Error('Error - Empty title')
        }

        const id=generateRandomString(20)
        const fileName = generateRandomString(20) + path.extname(file.name);


        const fileBuffer = await file.arrayBuffer(); // Get the file data as a Buffer or ArrayBuffer
        
        await fs.promises.writeFile(path.join(process.cwd(), 'public/files/', fileName), Buffer.from(fileBuffer));

        const info={type: type, file_src: fileName, description: description}

        // Save the title and filenames in the MySQL database
        const query = `INSERT INTO academic_files 
            (id, user_id, info ) 
            VALUES 
            ('${id}', '1234', '${JSON.stringify(info)}' )
        `;
        const connection = await databaseConnection();

        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });

        return new Response(JSON.stringify({ success: true, academicFile: {
            id: id, info: info
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

    await  new Promise((resolve, reject)=> setTimeout(()=> resolve(), 1000))


    try {

        const data = await request.formData()

        const academicInfo = JSON.parse(data.get('academic_info'))

        const id = academicInfo.id
        const info = academicInfo.info

        // Save the title and filenames in the MySQL database
        const query = `UPDATE  academic_files 
            SET info = '${JSON.stringify(info)}' 
            WHERE id = '${id}'
        `;
        const connection = await databaseConnection();

        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });

        return new Response(JSON.stringify({ success: true, academicFile: {
            id: id, info: info
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

    await  new Promise((resolve, reject)=> setTimeout(()=> resolve(), 1000))

    try {
        const userID = '1234';
        const data = await request.formData()
        const academic_info_id = data.get('academic_info_id')
        // Save the title and filenames in the MySQL database
        const query = `UPDATE  academic_files 
            SET is_active = 0 
            WHERE id = '${academic_info_id}' AND user_id='${userID}'
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

        return new Response(JSON.stringify({ success: successStatus, academic_info_id: academic_info_id }), {
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