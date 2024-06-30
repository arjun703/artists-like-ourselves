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
import {Select, MenuItem, InputLabel, FormControl} from  "@mui/material" 
import sportsSettings from '@/app/view-profile/[username]/_key-stats/settings'

export default function LandingPage(){
    
    const router = useRouter();
    const lang = useLang();
    const [prop, setProp] = useState({})

    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (prop, value) => {
        setProp(prevProp => ({
            ...prevProp,  // maintain previous properties
            [attr]: value // update the specific attribute
        }));
    }

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
            router.push('/dashboard')
        } else {
            alert(result.msg)
            setIsLoading(false)
            return false
        }
    }

    return (
        <div>

            <Header user={false} />

            <div maxWidth="lg" >

                <div  style={{ display:'flex', marginTop:'20px', justifyContent:'center',}}>

                    <Paper style={{maxWidth:'100%', width:'700px'}}>
                        <p style={{textAlign:'center'}}>
                            Please fill up the following form to sign up as a Club / Team / University.
                        </p>
                        <Grid container spacing={2} >
                            
                            <Grid item lg={12} xs={12}  >

                                <Paper  sx={{ padding:'20px', borderRadius: '0px'}} >    
                                    <div style={{fontWeight:'bold', textAlign:'center', paddingBottom:'20px'}}>Head Coach / Manager Information</div>
                                    <Stack spacing={2}  >
                                        <TextField onChange={(e)=>handleChange('name', e.target.value.trim())} label="Name" variant="outlined" fullWidth  />
                                        <TextField onChange={(e)=>handleChange('email', e.target.value.trim())} label="Email ( used for logging in next time )" variant="outlined" fullWidth  />
                                        <TextField onChange={(e)=>handleChange('identification_number', e.target.value.trim())} label="Identification Number (IC)" variant="outlined" fullWidth  />
                                        <TextField onChange={(e)=>handleChange('residing_country', e.target.value.trim())} label="Residing Country" variant="outlined" fullWidth  />
                                        <TextField onChange={(e)=>handleChange('zip_code', e.target.value.trim())} label="Provnce / Zip Code" variant="outlined" fullWidth  />
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Sport Type</InputLabel>
                                            <Select
                                                id="demo-simple-select"
                                                labelId="demo-simple-select-label"
                                                label="Sport Type"
                                                onChange={(e) => { handleChange('sport_type', e.target.value) }}
                                            >
                                                {sportsSettings.sports.map(({ label, id }, i) => (<MenuItem key={i} value={id}>{label}</MenuItem>))}
                                            </Select>
                                        </FormControl>                                        
                                        <TextField onChange={(e)=>handleChange('team_role_title', e.target.value.trim())} label="Team Role / Title" variant="outlined" fullWidth  />
                                        <TextField  onChange={(e)=>handleChange('password', e.target.value.trim())}  type="password" label="Password" variant="outlined"  fullWidth  />
                                        <TextField onChange={(e) => handleChange('confirm_password', e.target.value.trim())}  label="Confirm Password" variant="outlined" type="password"  fullWidth  />                                                                         
                                    </Stack>  
                                </Paper>
                            </Grid>

                            <Grid item lg={12} xs={12}>
                                <Paper sx={{padding: '20px', borderRadius: '0px'}} > 
                                    <div style={{textAlign:'center', paddingBottom:'20px'}}>Club / Team / University Information</div>

                                    <Stack spacing={2}>
                                        <TextField onChange={(e)=>handleChange('official_reg_name', e.target.value.trim())} label="Official Reg Name" variant="outlined" fullWidth  />
                                        <TextField onChange={(e)=>setEmail('club_team_uni', e.target.value.trim())} label="Club? / Team? / University?" variant="outlined" fullWidth  />
                                        <TextField onChange={(e)=>setPassword('official_org_email', e.target.value.trim())}   label="Official Org Email" variant="outlined"  fullWidth  />
                                        <TextField onChange={(e)=>setPassword('reg_address', e.target.value.trim())}   label="Reg Address" variant="outlined"  fullWidth  />
                                        <TextField onChange={(e)=>setPassword('reg_contact_number', e.target.value.trim())}   label="Reg Contact Number" variant="outlined"  fullWidth  />
                                    </Stack>  
                                </Paper>
                            </Grid>
                        </Grid>
                        <div style={{fontWeight:'bold', marginTop:'20px', paddingBottom:'20px', textAlign:'center', display:'flex', justifyContent:'center'}}>
                            <Button 
                                variant="solid"
                                loading={isLoading}
                                sx={{minWidth:'250px'}}
                                loadingPosition='start'
                                onClick={handleRegister}
                            >
                                {lang.sign_up_text}
                            </Button> 
                        </div>

                    </Paper>


                </div>
            </div>
        </div>
    );
}