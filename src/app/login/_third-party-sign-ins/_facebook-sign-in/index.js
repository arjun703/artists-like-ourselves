'use client'
import React, { useEffect, useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Button } from '@mui/joy';

const FacebookSignIn = () => {
  const [userData, setUserData] = useState(null);

  const responseFacebook = (response) => {
    console.log(response);
    setUserData(response);
  };


  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  const statusChangeCallback = response => {
    console.log(response);
  }


  // return (
  //   <div>
  //     <Button onClick={checkLoginState} fullWidth startDecorator={<FacebookIcon />} >Sign in with Facebook</Button>
  //   </div>
  // );

  return(
    <div 
      scope="public_profile,email"
      onlogin="checkLoginState();" 
      className="fb-login-button" 
      data-width="" 
      data-size="" 
      data-button-type="" 
      data-layout="" 
      data-auto-logout-link="false" 
      data-use-continue-as="false"
    >

    </div>
  )

};

export default FacebookSignIn;