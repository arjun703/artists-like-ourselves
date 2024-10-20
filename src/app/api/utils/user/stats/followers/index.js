import { executeQuery } from "../../../../utils"

export async function getNumFollowers(user, connection){

    const followersQuery = `SELECT COUNT(username) AS followers_count FROM followers WHERE username = '${user}'`;

    return await executeQuery(connection, followersQuery)

}


