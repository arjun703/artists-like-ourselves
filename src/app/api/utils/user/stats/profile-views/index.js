import { executeQuery } from "../../../../utils"

export async function getProfileViewsCount(user, connection){

    // followings count
    const followingsQuery = `SELECT COUNT(viewee) AS profile_views_count FROM profile_views WHERE viewee = '${user}'`
        
    return await executeQuery(connection, followingsQuery)

}


