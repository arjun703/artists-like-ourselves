import { databaseConnection, generateToken, executeQuery} from '@/app/api/utils'

export  async function GET(request) {

    const { searchParams } = new URL(request.url)
    const sq =  searchParams.get('query')
    try {
        
        // Save the title and filenames in the MySQL database
        const query = `SELECT DISTINCT basic_info.username as username, name, profile_photo_src, gender, sport from basic_info,  key_stats
            WHERE  basic_info.username = key_stats.username 
            AND ( basic_info.name LIKE '%${sq}%'  OR key_stats.sport LIKE '%${sq}%' )
            LIMIT 50
        `;

        const connection = await databaseConnection()

        const suggestions = await executeQuery(connection, query);
        connection.end()

        return new Response(JSON.stringify({ success: true, suggestions: suggestions }), {
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
