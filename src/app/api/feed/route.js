import mysql from 'mysql2';
import {  getLoggedInUsername, databaseConnection, generateToken, executeQuery} from '@/app/api/utils'
import { Mediation } from '@mui/icons-material';

export  async function GET(request) {

    let connection = false

    const url = new URL(request.url)

    const feedTypeFilter = url.searchParams.get("feedTypeFilter")

    try {

        let mediaTypeFilters = [];
        let mediaTypeFiltersString = '';
        let splittedFeedTypeFilters = [];
        if(feedTypeFilter !== null){
            splittedFeedTypeFilters = feedTypeFilter.split('||')
        }

        if(splittedFeedTypeFilters.includes('audio')){
            mediaTypeFilters.push(' ( pm.media_type like "%audio/%" ) ')
        }
        if(splittedFeedTypeFilters.includes('visual')){
            mediaTypeFilters.push(' ( (pm.media_type like "%video/%") OR (pm.media_type like "%image/%") ) ')
        }
        if(splittedFeedTypeFilters.includes('written_word')){
            mediaTypeFilters.push(' ( (pm.media_type like "%application/%") OR (pm.media_type like "%text/%") ) ')
        }
        
        if(mediaTypeFilters.length){
            mediaTypeFiltersString = ' WHERE ' + mediaTypeFilters.join(' OR ') 
        }

        // Save the title and filenames in the MySQL database
        const query = `
            SELECT 
                p.id AS post_id,
                p.username,
                p.posted_at,
                p.caption,
                pm.media_src,
                pm.media_type
            FROM 
                posts p
            LEFT JOIN 
                posts_media pm ON p.id = pm.post_id

            ${mediaTypeFiltersString}
            
            ORDER BY 
                p.posted_at DESC;
        `;

        connection = await databaseConnection();

        const posts  = await executeQuery(connection, query);

        return new Response(JSON.stringify({success: true, posts: posts, query: query }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    } catch (error) {

        return new Response(JSON.stringify({ success: false, msg: error.message  }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    } finally{
        if(connection){
            connection.end()
        }
    }
}
