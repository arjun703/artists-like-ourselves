'use client'
import { useState, useEffect } from 'react';

export default function GoogleSignIn(){

    const [loading, setLoading] = useState(false);
    
    const [error, setError] = useState("");
  
    const handleGoogle = async (response) => {
      console.log(response)
    };
  
    useEffect(() => {
      /* global google */
      if (window.google) {
        google.accounts.id.initialize({
          client_id: "10066605482-e0jreo6n8dj85oifn319g4sc9lhtnv34.apps.googleusercontent.com",
          callback: handleGoogle,
        });
  
        google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
          text: "continue_with",
          shape: "pill",
        });
  
      }
    }, []);
  
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {error && <p style={{ color: "red" }}>{error}</p>}
          {loading ? (
            <div>Loading....</div>
          ) : (
            <div id="signUpDiv" data-text="signup_with"></div>
          )}
        </div>
      </>
    );
  };

