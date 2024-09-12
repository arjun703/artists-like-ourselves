'use client'
import React, { useEffect, useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Button } from '@mui/joy';
import toast from 'react-hot-toast';

const FacebookSignIn = () => {
  const [userData, setUserData] = useState(null);

  function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      testAPI();  
    } else {                                 // Not logged into your webpage or we are unable to tell.
      toast("Couldn't sign in with facebook")
    }
  }



  function openFacebookPopup(){
    FB.login(function(response) {
      statusChangeCallback(response)
    });
  }


  function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
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
      
      console.log(FB)


    };
  

  }, [])


  return(
    <Button onClick={openFacebookPopup} startDecorator={<FacebookIcon />}>Sign in with Facebook</Button>
  )

};

export default FacebookSignIn;