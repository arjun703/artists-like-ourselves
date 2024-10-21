import { databaseConnection, getLoggedInUsername } from "@/app/api/utils"
import { basicInfo } from "@/app/api/utils/user/basic-info";
import { getNumFollowers } from "@/app/api/utils/user/stats/followers";
import { getNumFollowings } from "../../utils/user/stats/followings";
import { getProfileViewsCount } from "../../utils/user/stats/profile-views";
import { getNumPostViewsCount } from "../../utils/user/stats/post-views";
import { getNumPostLikesCount } from "../../utils/user/stats/likes";


export async function GET(request){
    
    let connection = false

    try{

        const {token_exists, username} = getLoggedInUsername()

        return new Response(JSON.stringify(
            {
                success: true, 
                is_logged_in: false,
            }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });


        // if(token_exists !== true){
        //     return new Response(JSON.stringify(
        //         {
        //             success: true, 
        //             is_logged_in: false,
        //         }), {
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         status: 200
        //     });

        // }
        connection = await databaseConnection();
        let viewee = username;

        // retrieve profile_pic, cover_pic, num_followers, num_followings, profile_views, post_views

        const userInfoResponse = await basicInfo(viewee, connection)

        if(!userInfoResponse.length) throw new Error("User not found")
        
        // followers count

        const followersResponse  = await getNumFollowers(viewee, connection);

        const followingsResponse = await getNumFollowings(viewee, connection);

        const profileViewsCountResponse = await getProfileViewsCount(viewee, connection)

        const postViewsCountResponse = await getNumPostViewsCount(viewee, connection)

        const postLikesCountResponse = await getNumPostLikesCount(viewee, connection);

        return new Response(JSON.stringify(
            {
                success: true, 
                is_logged_in: true,
                userInfo: userInfoResponse[0],
                followersInfo: followersResponse[0],
                followers_list_link: `/users/${viewee}/followers`,
                followingsInfo: followingsResponse[0],
                follwings_list_link: `/users/${viewee}/followings/`,
                profileViewsCountInfo: profileViewsCountResponse[0],
                profile_views_list_link: `/stats/profile-views`,
                post_views_info_link: `/stats/post-views`,
                postViewsCountInfo: postViewsCountResponse[0],
                postLikesCountInfo: postLikesCountResponse[0],
                post_likes_stats_link: `/stats/post-likes`
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