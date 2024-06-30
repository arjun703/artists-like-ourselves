import {Grid, FormControl,Tooltip,InputLabel, TextField , Select, MenuItem}  from '@mui/material/';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import GeneralInfo from "./general_info";
import ContactInfo from "./contact_info";
import PersonalStatement from "./personal_statement";
import SocialLinks from "./social_links";
import GuardianInfo from "./guardian_info";
import FloatingActionButton from "@/app/_components/floating_action_btn";
import EditIcon from '@mui/icons-material/Edit';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { useState, useEffect } from "react";
import { pOSTRequest, getRequest, uPDATErequest, dELETErequest } from '@/app/_components/file_upload';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'; // Import dayjs library
import Button from '@mui/joy/Button';
import { Divider } from '@mui/joy';


export default function BasicInfo({username}){

    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [basicInfo, setBasicInfo] = useState({})
    const [isEditable, setIsEditable] = useState(false)
    const initiateEditBasicInfo = ()=>{
        setIsEditing(true)
    }

    const handleChange = (value, prop) => {
        setBasicInfo(prevState => ({
            ...prevState,
            [prop]: value
        }));    
        console.log(basicInfo);
    }

    function isValidJSON(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }

    useEffect(() => {
        async function fetchBasicInfo() {
            try {
                const data = await getRequest('/api/basic-info?username='+username); // Adjust the API endpoint URL as needed
                setIsLoading(false)
                let basic_info = data.basic_info
                if(basic_info.length){
                    let basicInfo0  = basic_info[0]
                    let basicInfo = basicInfo0.info 
                    if(isValidJSON(basicInfo)){
                        basicInfo = JSON.parse(basicInfo)
                    }else{
                        basicInfo = {}
                    }
                    basicInfo.name = basicInfo0.name 
                    basicInfo.gender = basicInfo0.gender
                    setIsEditable(data.editable) 
                    setBasicInfo(basicInfo)
                }
            } catch (error) {
                alert(error.message)
            }
        }
        fetchBasicInfo();
    }, []);

    const handleEdit = async () => {
        setIsLoading(true)
        console.log(basicInfo);
        const formData = new FormData();
        formData.append('info', JSON.stringify(basicInfo));
        const result = await uPDATErequest(formData, '/api/basic-info/')
        setIsLoading(false)
        if (result.success) {
            alert("success")
            return true
        } else {
            alert(result.msg)
            return false
        }
    }

    return(
        <div style={{ position: 'relative' }}>
            <>
                {!isEditing && (
                    <>
                        <Grid container spacing={2} style={{ paddingBottom: '30px' }}>
                            <Grid item xs={12} md={6} lg={4}>
                                <Stack spacing={2}>
                                    <GeneralInfo basicInfo={basicInfo} />
                                    <ContactInfo basicInfo={basicInfo} />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <Stack spacing={2}>
                                    <PersonalStatement basicInfo={basicInfo} />
                                    <SocialLinks basicInfo={basicInfo} />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <Stack spacing={2}>
                                    <GuardianInfo basicInfo={basicInfo} />
                                </Stack>
                            </Grid>
                        </Grid>
                        {
                            isEditable ? (
                                <FloatingActionButton btnIcon={<EditIcon />} btnTitle='Edit Basic Info' handler={initiateEditBasicInfo} />
                            ): (
                                <></>
                            )
                        }
                    </>
                )}

                {isEditing && (
                    <Paper sx={{padding: '10px 20px', paddingBottom:'90px'}}> 
                        
                        <Divider><h2>Edit Basic Info</h2></Divider>

                        <div style={{margin:'3px', marginBottom: '-10px'}}><h3 style={{marginTop:'0px'}}>General Info</h3></div>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Name"
                                        defaultValue={basicInfo?.name || ''}
                                        onChange={(e)=>handleChange(e.target.value, 'name')}
                                        variant="outlined" 
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <FormControl fullWidth>
                                        <DatePicker
                                            defaultValue={dayjs(basicInfo?.date_of_birth || '')}
                                            onChange={(newValue) => { handleChange(dayjs(newValue.$d).format('YYYY-MM-DD'), 'date_of_birth') }}
                                            label="Date of Birth"
                                            variant="outlined"
                                        />
                                    </FormControl>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="add-new-coach-interested">Gender</InputLabel>
                                    <Select
                                        labelId="add-new-coach-interested"
                                        defaultValue={basicInfo?.gender || ''}   
                                        onChange={(e)=>handleChange(e.target.value, 'gender')} 
                                        label="Gender?"
                                    >   
                                        {[{label: 'Male', id: 'male'},{label: 'Female', id: 'female'}].map(({label, id},i) => (<MenuItem key={i} value={id}  >{label}</MenuItem>))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Identification Number / Passport Number"
                                        defaultValue={basicInfo?.identification_number || ''}
                                        onChange={(e)=>handleChange(e.target.value, 'identification_number')}
                                        variant="outlined" 
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>

                        <div style={{margin:'3px', marginBottom: '-10px'}}><h3>Contact Info</h3></div>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Primary Phone"
                                        type='number'
                                        defaultValue={basicInfo?.primary_phone || ''} 
                                        onChange={(e)=>handleChange(e.target.value, 'primary_phone')}
                                        variant="outlined" 
                                    />

                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Primary Email"
                                        defaultValue={basicInfo?.primary_email || ''} 
                                        onChange={(e)=>handleChange(e.target.value, 'primary_email')}
                                        variant="outlined" 
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={12} sm={6} md={4} >
                                <FormControl fullWidth>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Residing Country"
                                        defaultValue={basicInfo?.residing_country || ''} 
                                        onChange={(e)=>handleChange(e.target.value, 'residing_country')}
                                        variant="outlined" 
                                    />

                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} >
                                <FormControl fullWidth>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Postcode / ZipCode"
                                        defaultValue={basicInfo?.zip_code || ''} 
                                        onChange={(e)=>handleChange(e.target.value, 'zip_code')}
                                        variant="outlined" 
                                    />

                                </FormControl>
                            </Grid>


                            <Grid item xs={12} sm={6} md={4} >
                                <FormControl fullWidth>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Secondary  Phone"
                                        type='number'
                                        defaultValue={basicInfo?.secondary_phone || ''} 
                                        onChange={(e)=>handleChange(e.target.value, 'secondary_phone')}
                                        variant="outlined" 
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} >
                                <FormControl fullWidth>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Secondary  Email"
                                        defaultValue={basicInfo?.secondary_email || ''} 
                                        onChange={(e)=>handleChange(e.target.value, 'secondary_email')}
                                        variant="outlined" 
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <div style={{margin:'3px', marginBottom: '-10px'}}><h3>Personal Statement</h3></div>

                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <FormControl fullWidth>
                                <TextareaAutosize
                                    label="Personal Statement"
                                    onChange={(e)=>handleChange(e.target.value, 'personalStatement')} 
                                    placeholder="Personal Statement..."
                                    sx={{width : '100%'}}
                                    minRows={3} // Specify the minimum number of rows
                                    maxRows={5} // Specify the maximum number of rows
                                    defaultValue={basicInfo?.personal_statement || ''}
                                />    
                                </FormControl>
                            </Grid>
                        </Grid>

                        <div style={{margin:'3px', marginBottom: '-10px'}}><h3>Social Links</h3></div>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl fullWidth>

                                <TextField 
                                    id="outlined-basic" 
                                    label="Youtube Channel Link"
                                    defaultValue={basicInfo?.youtube || ''}
                                    onChange={(e)=>handleChange(e.target.value, 'youtube')}
                                    variant="outlined" 
                                />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl fullWidth>

                                <TextField 
                                    id="outlined-basic" 
                                    defaultValue={basicInfo?.instagram || ''}
                                    label="Instagram Profile Link"
                                    onChange={(e)=>handleChange(e.target.value, 'instagram')}
                                    variant="outlined" 
                                />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl fullWidth>

                                <TextField 
                                    id="outlined-basic" 
                                    defaultValue={basicInfo?.facebook || ''}
                                    label="Facebook Profile Link"
                                    onChange={(e)=>handleChange(e.target.value, 'facebook')}
                                    variant="outlined" 
                                />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl fullWidth>

                                <TextField 
                                    id="outlined-basic" 
                                    defaultValue={basicInfo?.twitter || ''}
                                    label="X Profile Link"
                                    onChange={(e)=>handleChange(e.target.value, 'twitter')}
                                    variant="outlined" 
                                />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <div style={{margin:'3px', marginBottom: '-10px'}}><h3>Guardian Info</h3></div>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <FormControl fullWidth>
                                    <TextField 
                                        id="outlined-basic"
                                        defaultValue={basicInfo?.guardian_name || ''} 
                                        label="Guardian Name"
                                        onChange={(e)=>handleChange(e.target.value, 'guardian_name')}
                                        variant="outlined" 
                                    />
                                </FormControl>
                            </Grid>                            
                            
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <FormControl fullWidth>
                                    <TextField 
                                        id="outlined-basic"
                                        type='number'
                                        label="Guardian Primary Phone"
                                        defaultValue={basicInfo?.guardian_primary_phone}
                                        onChange={(e)=>handleChange(e.target.value, 'guardian_primary_phone')}
                                        variant="outlined" 
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <FormControl fullWidth>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Guardian Primary Email"
                                        defaultValue={basicInfo?.guardian_primary_email} 
                                        onChange={(e)=>handleChange(e.target.value, 'guardian_primary_email')}
                                        variant="outlined" 
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <FormControl fullWidth>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Guardian Identification / Passport Number"
                                        defaultValue={basicInfo?.guardian_identification_number} 
                                        onChange={(e)=>handleChange(e.target.value, 'guardian_identification_number')}
                                        variant="outlined" 
                                    />
                                </FormControl>
                            </Grid>



                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <FormControl fullWidth>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Guardian Highest Education Level"
                                        defaultValue={basicInfo?.guardian_highest_education_level || ''} 
                                        onChange={(e)=>handleChange(e.target.value, 'guardian_highest_education_level')}
                                        variant="outlined" 
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <div style={{position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)'}}>
                                <div style={{backgroundColor:'white', padding:'20px'}}>
                                    <Button
                                        onClick={handleEdit} 
                                        loading={isLoading} 
                                        sx={{opacity: '1!important'}}
                                    >
                                        Save Basic Info
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Paper>
                )}
            </>
        </div>
    )
}



const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );