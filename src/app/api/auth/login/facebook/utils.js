export async function retrieveAppAccessToken(){
    try{
  
      const response = await fetch(`https://graph.facebook.com/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_SECRET}&grant_type=client_credentials`)
  
      const responseJSON = await response.json()
              
      if('access_token' in responseJSON){
        return responseJSON.access_token
      }else{
        throw new Error('Error retrieving access token')
      }
  
    }catch(error){
      throw new Error(error.message)
    }
  }
  
export  async function verifyToken(inputToken, accessToken) {
    try {
        const response = await fetch(`https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`);
        const responseJSON = await response.json();
        console.log("from verify token", responseJSON)
        if('data' in responseJSON){
            if('is_valid' in responseJSON.data){
                if(responseJSON.data.is_valid){
                    return {is_verified: true, user_id: responseJSON.data.user_id }
                }
            }
        }

        throw new Error('Error verifying the token')

    } catch (error) {
        console.error('Error verifying token:', error);
        throw error;
    }
}
  
export  async function getUserInfo(inputToken) {
    try {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${inputToken}&fields=id,name,email`);
        const userInfo = await response.json();
        console.log('User Info:', userInfo);
        return userInfo;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
}