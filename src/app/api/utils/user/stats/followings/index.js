import { executeQuery } from "../../../../utils"

export async function getNumFollowings(user, connection){

        // followings count
        const followingsQuery = `SELECT COUNT(follower) AS followings_count FROM followers WHERE follower = '${user}'`
        
        return await executeQuery(connection, followingsQuery)

}


