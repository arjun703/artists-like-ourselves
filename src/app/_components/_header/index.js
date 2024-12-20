'use client';
import { Button } from "@mui/joy";
import { Skeleton, Stack } from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";


export default function Header() {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') { // Check if window (client-side) is available
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('token='));
        
            if (token) {
                setIsLoggedIn(true);
            }
            setIsLoading(false);
        }
    }, []);


    
    const logOut = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        location.reload();
    };

    return (
        <div style={{ backgroundColor: 'white', display: 'flex', minHeight: '70px', justifyContent: 'center', alignItems: 'center' }}>
            {
                isLoading
                    ? (
                        <Skeleton width={250} height={40}></Skeleton>
                    ) : (
                        isLoggedIn
                            ? (<Stack direction={'row'} gap={'20px'}>
                                                            <Button sx={{ minWidth: '250px' }} onClick={logOut}>Log Out</Button>
                                                            <Link href={'/'} ><Button>Home</Button></Link> 
                                    
                                </Stack>
                            ) : (
                                <Link href="/login">
                                    <Button sx={{ minWidth: '250px' }}>Sign In</Button>
                                </Link>
                            )
                    )
            }
        </div>
    );
}
