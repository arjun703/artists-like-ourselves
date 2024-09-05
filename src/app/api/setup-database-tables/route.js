import {  databaseConnection, executeQuery} from '@/app/api/utils'

export  async function GET(request) {

    const connection = await databaseConnection();

    // Save the title and filenames in the MySQL database
    let query = `
        CREATE TABLE IF NOT EXISTS users(
            username VARCHAR(255) PRIMARY KEY,
            email VARCHAR(255),
            password VARCHAR(255),
            google_id VARCHAR(1000),
            facebook_id VARCHAR(1000)
            PRIMARY KEY(username)
        )
    `;
    let result = await executeQuery(connection, query)
    console.log(result)

    query = `
        CREATE TABLE IF NOT EXISTS user_more_info(
            username VARCHAR(255),
            name VARCHAR(255),
            profile_pic_src VARCHAR(5000) DEFAULT NULL,
            cover_pic_src VARCHAR(5000) DEFAULT NULL,
            PRIMARY KEY(username),
            FOREIGN KEY (username) REFERENCES users(username)
        )
    `;
    result = await executeQuery(connection, query)
    console.log(result)

    query = `
        CREATE TABLE IF NOT EXISTS posts(
            id VARCHAR(255),
            username VARCHAR(255),
            posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            caption TEXT DEFAULT NULL,
            PRIMARY KEY(id),
            FOREIGN KEY (username) REFERENCES users(username)
        )
    `;
    result = await executeQuery(connection, query)
    console.log(result)

    
    query = `
        CREATE TABLE IF NOT EXISTS posts_media(
            id VARCHAR(255),
            post_id VARCHAR(255),
            media_src VARCHAR(5000),
            media_type VARCHAR(5000),
            PRIMARY KEY(id),
            FOREIGN KEY (post_id) REFERENCES posts(id)
        )
    `;
    result = await executeQuery(connection, query)
    console.log(result)

    connection.end(err => {
        if(err) console.log(err);
    })

    return new Response(JSON.stringify({ success: false, msg: 'Setup'  }), {
        headers: {
            "Content-Type": "application/json"
        },
        status: 200
    });

}