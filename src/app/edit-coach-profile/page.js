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
    const [coach, setCoach] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [sport_type, setSportType] = useState('')
    const handleChange = (attr, value) => {
        setProp(prevProp => ({
            ...prevProp,  // maintain previous properties
            [attr]: value // update the specific attribute
        }));
    }

    const handleEdit = async () => {

        if( !('name' in prop && 'sport_type' in prop && 'email' in prop ) ) {
            alert("Name / email / sport type should be filled in")
            return
        }

        if(prop.name.trim().length == 0 || prop.sport_type.trim().length == 0 || prop.email.trim().length == 0){
            alert("Name / email / sport type can't be blank")
            return
        }

        const formData = new FormData();
        setIsLoading(true)
        formData.append('info', JSON.stringify(prop));
        const result = await pOSTRequest(formData, '/api/coach-edit-page')
        if (result.success === true) {
            setIsLoading(false)
            alert("Edit Successful")
        } else {
            alert(result.msg)
            setIsLoading(false)
            return false
        }
    }

    useEffect(() => {
        async function fetchCoachInfo() {
            try {
                const response = await fetch('/api/coach-edit-page'); // Adjust the API endpoint URL as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch coach info');
                }
                const data = await response.json();
                let info = data.coach.info 
                info = JSON.parse(info)
                info.email = data.coach.email
                info.sport_type = data.coach.sport_type
                setCoach(JSON.parse(data.coach.info))
                setEmail(data.coach.email)
                setSportType(data.coach.sport_type)
                setProp(info)
                console.log(info)
            } catch (error) {
                alert( error.message)
            }finally{
              setIsLoading(false)
            }
        }
        fetchCoachInfo();
      }, []); 

    if(!coach){
        return(
            <>
                <Header user={true} />
                <Paper sx={{marginTop: '30px', textAlign:'center', padding:'30px'}}> 
                    <h3>Loading</h3>
                </Paper>
            </>

        )
    }

    return (
        <div>
            <Header user={true} />
            <div maxWidth="lg" >
                <div  style={{ display:'flex', marginTop:'20px', justifyContent:'center',}}>
                    <Paper style={{maxWidth:'100%', width:'700px'}}>
                        <p style={{textAlign:'center'}}>
                            <div style={{fontWeight:'bold', textAlign:'center', paddingBottom:'20px'}}>Edit Coach Information</div>
                        </p>
                        <Grid container spacing={2} >
                            <Grid item lg={12} xs={12}  >
                                <Paper  sx={{ padding:'20px', borderRadius: '0px'}} >    
                                    <Stack spacing={2}  >
                                        <TextField defaultValue={coach.name} onChange={(e)=>handleChange('name', e.target.value.trim())} label="Name" variant="outlined" fullWidth  />
                                        <TextField defaultValue={email} onChange={(e)=>handleChange('email', e.target.value.trim())} label="Email" variant="outlined" fullWidth  />
                                        <TextField defaultValue={coach?.identification_number || ''} onChange={(e)=>handleChange('identification_number', e.target.value.trim())} label="Identification Number (IC)" variant="outlined" fullWidth  />
                                        <TextField defaultValue={coach?.residing_country || ''} onChange={(e)=>handleChange('residing_country', e.target.value.trim())} label="Residing Country" variant="outlined" fullWidth  />
                                        <TextField defaultValue={coach?.zip_code || ''} onChange={(e)=>handleChange('zip_code', e.target.value.trim())} label="Provnce / Zip Code" variant="outlined" fullWidth  />
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Sport Type</InputLabel>
                                            <Select
                                                id="demo-simple-select"
                                                defaultValue={sport_type}
                                                labelId="demo-simple-select-label"
                                                label="Sport Type"
                                                onChange={(e) => { handleChange('sport_type', e.target.value) }}
                                            >
                                                {sportsSettings.sports.map(({ label, id }, i) => (<MenuItem key={i} value={id}>{label}</MenuItem>))}
                                            </Select>
                                        </FormControl>
                                    </Stack>  
                                </Paper>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <Paper sx={{padding: '20px', borderRadius: '0px'}} > 
                                    <div style={{textAlign:'center', paddingBottom:'20px'}}>Team Information</div>
                                    <Stack spacing={2}>
                                        <TextField defaultValue={coach?.team_name || ''} onChange={(e)=>handleChange('team_name', e.target.value.trim())} label="Team Name" variant="outlined" fullWidth  />
                                        <TextField defaultValue={coach?.team_reg_no || ''} onChange={(e)=>setEmail('team_reg_no', e.target.value.trim())} label="Team Reg #" variant="outlined" fullWidth  />
                                        <TextField defaultValue={coach?.team_reg_location || ''} onChange={(e)=>setPassword('team_reg_location', e.target.value.trim())}   label="Team Reg Location" variant="outlined"  fullWidth  />
                                    </Stack>  
                                </Paper>
                            </Grid>
                        </Grid>

                        <div style={{marginTop:'20px', paddingBottom:'20px', textAlign:'center', display:'flex', justifyContent:'center'}}>
                            <Button 
                                variant="solid"
                                loading={isLoading}
                                sx={{minWidth:'250px'}}
                                loadingPosition='start'
                                onClick={handleEdit}
                            >
                                {'Save'}
                            </Button> 
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    );
}