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
import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import GoogleSignIn from '../_components/google-sign-in';
import { pOSTRequest, uPDATErequest, dELETErequest } from '@/app/_components/file_upload';
import { useRouter } from "next/navigation";

export default function LandingPage(){
    
    const router = useRouter();
    const lang = useLang();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async () => {
        if(email.length === 0 || password.length === 0 || name.length === 0 || password !== confirm_password) {
            console.log("Some fields are wrong")
            return
        }
        const formData = new FormData();
        setIsLoading(true)
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        const result = await pOSTRequest(formData, 'api/auth/register/')
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
                            
                            <Grid item lg={6} xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems:'center'}} >
                                <div >
                                    <div>
                                        <h3>Create an  Account</h3>
                                        <p>Please fillup the necessary details.</p>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item lg={6} xs={12}>
                                <Paper sx={{padding: '30px', borderRadius: '0px'}} elevation={3}>
                                        
                                    <Stack spacing={2}>
                                        <TextField onChange={(e)=>setName(e.target.value.trim())} label="Name" variant="outlined" fullWidth  />
                                        <TextField onChange={(e)=>setEmail(e.target.value.trim())} label="Email" variant="outlined" fullWidth  />
                                        <TextField  onChange={(e)=>setPassword(e.target.value.trim())}  type="password" label="Password" variant="outlined"  fullWidth  />
                                        <TextField onChange={(e) => setConfirmPassword(e.target.value.trim())}  label="Confirm Password" variant="outlined" type="password"  fullWidth  />                                        
                                        <Button 
                                            variant="solid"
                                            loading={isLoading}
                                            loadingPosition='start'
                                            onClick={handleRegister}
                                        >
                                            {lang.sign_up_text}
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