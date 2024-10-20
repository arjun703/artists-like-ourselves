import { databaseConnection, generateRandomString, generateToken, executeQuery, hashPassword, comparePassword} from '@/app/api/utils'
import { cookies } from 'next/headers'

async function checkIfUserAlreadyExists(connection, social_login_id, social_login_type){ // reusing connection object to reduce number of simultaneous connection

    try{

        // Save the title and filenames in the MySQL database
        const query = `SELECT * from users WHERE 
            social_login_id ='${social_login_id}' AND
            social_login_type='${social_login_type}'
        `;
                
        const results = await executeQuery(connection, query);
        
        if(results.length){ // user has already registered
            return { user_exists: true, user: results[0] }
        }else{
            return { user_exists: false, user: null }
        }

    }catch(error){
        throw new Error(error.message)
    }


}

function setToken(user){

    const token = generateToken(user.username)
    
    cookies().set('token', token)
    
    return true
}

export  async function handleLogin(social_login_id, social_login_type, name, picture) {

    let connection = false

    try {

        connection = await databaseConnection();

        let userInfo = await checkIfUserAlreadyExists(connection, social_login_id, social_login_type)

        // console.log("results", results, query)

        if(userInfo.user_exists === true){ // user has already registered
            
            // let checkIfProfilePicExistsQuery = `SELECT profile_pic_src from user_more_info WHERE username='${userInfo.user.username}'`

            // let profilePicSrcInfo = await executeQuery(connection, checkIfProfilePicExistsQuery)

            // if(profilePicSrcInfo[0].profile_pic_src == null || profilePicSrcInfo[0].profile_pic_src == '' ){
            //     let insertProfilePicQuery = `
            //         UPDATE user_more_info 
            //         SET profile_pic_src = '${picture}'
            //         WHERE username = '${userInfo.user.username}'
            //     ` 
            //     await executeQuery(connection, insertProfilePicQuery)
            // }

            setToken(userInfo.user)

        }else{

            // register the new user

            const username = name.toLowerCase().replace(/ /g, '-') + '-'+generateRandomString(10)

            let createNewUserQuery = `
                INSERT into users (username, social_login_id, social_login_type)
                VALUES('${username}', '${social_login_id}', '${social_login_type}')
            `;

            await executeQuery(connection, createNewUserQuery)
            
            userInfo = await checkIfUserAlreadyExists(connection, social_login_id, social_login_type)

            if(userInfo.user_exists === true){ // user has already registered
                
                let createNewUserInfoQuery = `
                    INSERT into user_more_info (username, name, profile_pic_src)
                    VALUES('${username}', '${name}', '${picture}')
                `; 

                await executeQuery(connection, createNewUserInfoQuery)

                setToken(userInfo.user)
                
            }
        }

        return true;

    } catch (error) {

        throw new Error(error.message)
    
    }finally{
        if(connection){
            connection.end()
        }
    }

}