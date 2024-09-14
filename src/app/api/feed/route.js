import mysql from 'mysql2';
import {  getLoggedInUsername, databaseConnection, generateToken, executeQuery} from '@/app/api/utils'
import { Mediation } from '@mui/icons-material';

export  async function GET(request) {

    let connection = false

    const url = new URL(request.url)

    const feedTypeFilter = url.searchParams.get("feedTypeFilter")

    const ofUser = url.searchParams.get("of_user")

    try {

        let allFilters = [];

        let allFiltersString = '';

        let mediaTypeFilters = [];
        
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
            allFilters.push( '(' + mediaTypeFilters.join(' OR ') + ')' ) 
        }

        if(ofUser && ofUser !== undefined){
            allFilters.push(` ( p.username = '${ofUser}' )`)
        }

        if(allFilters.length){
            allFiltersString = ' WHERE ' + allFilters.join(' AND ')
        }

        // Save the title and filenames in the MySQL database
        const query = `
            SELECT 
                p.id AS post_id,
                p.username,
                umi.name,
                umi.profile_pic_src,
                TIMESTAMPDIFF(SECOND, p.posted_at, NOW())  AS posted_ago_in_seconds,
                p.caption,
                pm.media_src,
                pm.media_type
            FROM 
                posts p
            LEFT JOIN 
                posts_media pm ON p.id = pm.post_id
            INNER JOIN
                user_more_info umi  ON umi.username =  p.username 

            ${allFiltersString}
            
            ORDER BY 
                p.posted_at DESC

            LIMIT 10
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
