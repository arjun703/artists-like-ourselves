'use client'
import React, { useEffect, useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Button } from '@mui/joy';
import toast from 'react-hot-toast';
import { pOSTRequest } from '@/app/_components/file_upload';

const FacebookSignIn = () => {

  const [isLoading, setIsLoading] = useState(true)

  const  handleLoginSuccess   = async (token) => {

    try{
    
      // send Post request for verification

      const formData = new FormData();

      formData.append('token', token)

      setIsLoading(true)

      const facebookSignInVerificationResponseJSON = await pOSTRequest(formData, '/api/auth/login/facebook/')

      if(!(facebookSignInVerificationResponseJSON.success)){
        throw new Error(facebookSignInVerificationResponseJSON.msg)
      }
    
      toast("Login successful, redirecting...")

    }catch(error){

      toast("Error logging in - "+ error.message)
      
    }finally{ 

      setIsLoading(false)

    }

  }

  function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
      if (response.status === 'connected') {   // Logged into your webpage and Facebook.
        handleLoginSuccess(response.authResponse.accessToken)
      }
  }

  function openFacebookPopup(){
      FB.login(function(response) {
          statusChangeCallback(response)
      });
  }


  useEffect(() => {


    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk')
    );

    window.fbAsyncInit = function() {

      FB.init({
        appId      : '544444594692563',
        cookie     : true,                     // Enable cookies to allow the server to access the session.
        xfbml      : true,                     // Parse social plugins on this webpage.
        version    : 'v20.0'           // Use this Graph API version for this call.
      });

      setIsLoading(false)

    };  

  }, [])


  return(
    <Button loading={isLoading} style={{minWidth: '250px'}} onClick={openFacebookPopup} startDecorator={<FacebookIcon />}>Sign in with Facebook</Button>
  )

};

export default FacebookSignIn;