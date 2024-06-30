'use client'
import Header from '@/app/_components/_header/header';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import useLang from '../_components/uselang';
import Link from 'next/link'
import Divider from '@mui/material/Divider';
import GoogleSignIn from '../_components/google-sign-in';
import { useRouter } from "next/navigation";
import { pOSTRequest, uPDATErequest, dELETErequest } from '@/app/_components/file_upload';
import { setMaxListeners } from 'events';
import { useState } from 'react';

export default function LandingPage(){

    const lang = useLang();
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleLogin = async () => {
        if(email.length === 0 || password.length === 0) {
            console.log("empty email or password")
            return
        }
        const formData = new FormData();
        setIsLoading(true)
        formData.append('emailOrUsername', email);
        formData.append('password', password);
        const result = await pOSTRequest(formData, 'api/auth/login/custom/')
        if (result.success === true) {
            localStorage.setItem('token', result.token);
            router.push('/feed')
        } else {
            alert(result.msg)
            setIsLoading(false)
            return false
        }
    }

    return (
        <div>

            <Header user={false} />

            <Container maxWidth="lg" >
                <div className="form-wrapper-outer">
                    <Box
                        component="form"
                    >
                        <Grid container spacing={2} sx={{marginTop: '30px'}}>
                            
                            <Grid item lg={6} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems:'center'}} >
                                <div >
                                    <div>
                                        <h3>Log In</h3>
                                        <p>Enter username or email and password</p>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item lg={6} xs={12}>
                                <Paper sx={{padding: '30px', borderRadius: '0PX'}}  elevation={3}>
                                    <Stack spacing={2}>

                                        <TextField  
                                            label="Username or Email" 
                                            variant="outlined"
                                            onChange={(e) => setEmail(e.target.value.trim())}
                                            fullWidth  
                                        />
                                        <TextField  
                                            label="Password" 
                                            type="password"
                                            variant="outlined"
                                            onChange={(e)=>setPassword(e.target.value.trim())}  
                                            fullWidth  
                                        />
                                        <Button 
                                            variant="solid" 
                                            onClick={handleLogin}
                                            loadingPosition='start'
                                            loading={isLoading}
                                        >
                                            Log In
                                        </Button> 
                                    </Stack>  
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Container>
        </div>
    );
}