'use client';

import { GoogleLogin } from '@react-oauth/google';
import toast from "react-hot-toast";
import { pOSTRequest } from '@/app/_components/file_upload';
import { useState } from 'react';
import { Button } from '@mui/joy';

export default function GoogleSignInButton() {

  const [isLoading, setIsLoading] = useState(false)

  const handleLoginSuccess = async (response) => {
    console.log('Login Success:', response);


    try{
    
      // send Post request for verification

      const formData = new FormData();

      formData.append('token', response.credential)

      setIsLoading(true)

      const googleSignInVerificationResponseJSON = await pOSTRequest(formData, '/api/auth/login/google/')

      console.log(googleSignInVerificationResponseJSON)

      if(!(googleSignInVerificationResponseJSON.success)){
        throw new Error(googleSignInVerificationResponseJSON.msg)
      }
    
      toast("Login successful, redirecting...")

    }catch(error){

      toast("Error logging in - "+ error.message)
      
    }finally{ 

      setIsLoading(false)

    }

  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
    // Handle login failure
    toast('Login Failed')
  };

  return (
    <>
      {
        isLoading
        ? (
          <Button style={{minWidth: '250px'}} loading={true}>Logging in</Button>
        ): (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        )
      }
    </>
  );
}
