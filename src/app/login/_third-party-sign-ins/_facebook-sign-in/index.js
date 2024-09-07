'use client'
import React, { useEffect, useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Button } from '@mui/joy';

const FacebookSignIn = () => {
  const [userData, setUserData] = useState(null);



  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  const statusChangeCallback = response => {
    console.log(response);
  }

  const [facebookButtonLoading, setFacebookButtonLoading] = useState(true)

  useEffect(()=>{
    var finished_rendering = function() {
      console.log("hellllllllllllllllllllllllllllllllo")
      setFacebookButtonLoading(false)
    }
    FB.Event.subscribe('xfbml.render', finished_rendering);
    console.log(FB)
    console.log("hellllllllll")
  }, [])

  // if(facebookButtonLoading){
  //   return (
  //     <div>
  //       <Button loading={true} >Sign in with Facebook</Button>
  //     </div>
  //   );
  // }

  return(
    <div 
      scope="public_profile,email"
      onlogin="checkLoginState();" 
      className="fb-login-button" 
      data-size="large" 
      data-button-type="continue_with" 
      data-layout="" 
      data-auto-logout-link="false" 
      data-use-continue-as="true"
    >

    </div>


  )

};

export default FacebookSignIn;