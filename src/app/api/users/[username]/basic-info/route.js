import { databaseConnection, executeQuery, getLoggedInUsername } from "@/app/api/utils"
import { basicInfo } from "@/app/api/utils/user/basic-info";
import { getNumFollowers } from "@/app/api/utils/user/stats/followers";
import { getNumFollowings } from "@/app/api/utils/user/stats/followings";
import { getNumPostLikesCount } from "@/app/api/utils/user/stats/likes";
import { logProfileView } from "@/app/api/utils/log/profile-views";

export async function GET(request, {params}){
    
    let connection = false
    let viewee = params.username
    try{

        connection = await databaseConnection();
        
        const {token_exists, username} =  getLoggedInUsername()

        if(username !== viewee && token_exists)
            logProfileView(viewee, connection)

        // retrieve profile_pic, cover_pic, num_followers, num_followings, profile_views, post_views

        const userInfoResponse = await basicInfo(viewee, connection)

        if(!userInfoResponse.length) throw new Error("User not found")
        
        // followers count

        const followersResponse  = await getNumFollowers(viewee, connection);

        const followingsResponse = await getNumFollowings(viewee, connection);

        const postLikesCountResponse = await getNumPostLikesCount(viewee, connection);

        let isFollowing = false

        if(token_exists && viewee !== username){
            let isFollowingQuery = `SELECT *  FROM followers WHERE follower ='${username}' AND username='${viewee}'`;
            let isFollowingResponse = await executeQuery(connection, isFollowingQuery)
            isFollowing  = isFollowingResponse.length === 1
        }

        return new Response(JSON.stringify(
            {
                success: true, 
                isFollowing: isFollowing,
                viewing_oneself: viewee === username,
                is_logged_in: token_exists,
                userInfo: userInfoResponse[0],
                followersInfo: followersResponse[0],
                followers_list_link: `/users/${viewee}/followers`,
                followingsInfo: followingsResponse[0],
                follwings_list_link: `/users/${viewee}/followings/`,
                postLikesCountInfo: postLikesCountResponse[0],
                post_likes_count_link: ``
            }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    }catch(error){
        return new Response(JSON.stringify({success: false, msg: error.message }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });
    }finally{
        if(connection){
            connection.end()
        }
    }
}