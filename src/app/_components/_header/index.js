'use client'
import { Button } from "@mui/joy";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import { useState } from "react";



export  default  function Header(){

    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useState(()=>{

        const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='));
      
      if (token) {
        setIsLoggedIn(true)
      } 
      setIsLoading(false)

    }, [])

    const logOut = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        location.reload()
    }


    return(
        <>
            <div style={{backgroundColor:'white', display:'flex', minHeight: '70px', justifyContent:'center', alignItems:'center'}}>
                {
                    isLoading
                        ? (
                            <Skeleton width={250} height={40}></Skeleton>
                        ) : (
                            isLoggedIn 
                                ? (
                                
                                        <Button sx={{minWidth: '250px'}} onClick={logOut}>Log Out</Button>
                                
                                ): (
                                <Link href="/login">
                                    <Button sx={{minWidth: '250px'}}>Sign In</Button>
                                </Link>
                                )
                        )
                }
            </div>
        </>
    )

}