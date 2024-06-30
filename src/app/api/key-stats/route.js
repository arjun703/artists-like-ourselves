import { databaseConnection,getLoggedInUsername, generateToken, executeQuery} from '@/app/api/utils'

export  async function PUT(request) {

    try {

        const data = await request.formData()

        const sport = data.get('sport')

        const info = data.get('info')
        
        if(sport.trim().length === 0){
            throw new Error('Fill sport fields')
        }

        const username = getLoggedInUsername();

        // Save the title and filenames in the MySQL database
        const query = `
            INSERT INTO key_stats(username, sport, info) VALUES (
                '${username}', '${sport}', '${info}'
            )
            ON DUPLICATE KEY UPDATE 
                sport = VALUES(sport),
                info = VALUES(info)
        `;

        const connection = await databaseConnection()

        const isCreationSuccess = await executeQuery(connection, query);

        if(isCreationSuccess){

            return new Response(JSON.stringify({ success: true}), {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 201
            });

        }else{
            throw new Error('Unknown error signing up. Plese try again later. Error Code: userInsertQuery')
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

export  async function GET(request) {

    const { searchParams } = new URL(request.url)
    const userName = searchParams.get('username')

    try {
        // Save the title and filenames in the MySQL database
        const query = `SELECT * from key_stats 
            WHERE username = '${userName}'
        `;

        const connection = await databaseConnection()
        

        const keystat = await executeQuery(connection, query);
        connection.end()

        return new Response(JSON.stringify({editable: userName == getLoggedInUsername(), success: true, keystat: keystat }), {
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
