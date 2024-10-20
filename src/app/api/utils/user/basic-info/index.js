import { executeQuery } from "@/app/api/utils";

export async function basicInfo(user, connection){
    // for profile and cover pic
    const userInfoQuery = `SELECT * FROM user_more_info WHERE username = '${user}' `;

    return await executeQuery(connection, userInfoQuery)
}