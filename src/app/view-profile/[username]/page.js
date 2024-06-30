'use client'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Header from '@/app/_components/_header/header'
import Videos from './_video/page';
import KeyStats from './_key-stats/page';
import Athletics  from './_athletics/page';
import Academics from './_acedemics/page';
import useMediaQuery from '@mui/material/useMediaQuery';
import BasicInfo from './_basic-info/page';
import { useSearchParams } from 'next/navigation'
import MoreActions from './_components/more_menu_view_profile'
import { Flag } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { setuid } from 'process';
import Button from '@mui/joy/Button';




function getCookie(name) {

    if(typeof document === 'undefined'){
        return false;
    }
  
    if(!document){
        return false;
    }
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
  }
  
  function getUserTypeFromToken(){
  
    const myCookie = getCookie('token');
    if(!myCookie) return false 
  
    const parts = myCookie.split('.');
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    if(payload && payload.userType !== undefined){
      return  payload.userType
    }else{
      return false
    }
  }



export default function ViewProfile({params}){


    const [value, setValue] = useState('2');
    const  isLargerDevice = useMediaQuery('(min-width:900px)');
    const [startX, setStartX] = useState(null);
    const [endX, setEndX] = useState(null);
    const [trackingUser, setTrackingUser] = useState(false)

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };    

    const totalTabs = 5;

    const userType = getUserTypeFromToken();

    const [user, setUser] = useState(false)

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch('/api/profile-photo?username='+params.username); // Adjust the API endpoint URL as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                setUser(data.basic_info)
            } catch (error) {
                alert( error.message)
            }
        }
        fetchUser();

        async function fetchTrackInfo(){
            try{
                const response = await  fetch('/api/track-player?username='+params.username+'&action=get'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch tracking info');
                }
                const data =await response.json()
                if(data.basic_info.length){
                    setTrackingUser(true)
                }
            }catch(error){
                alert(error.message)
            }

        }

        fetchTrackInfo();

    }, []); 

    const handleTrack = async () => {
        if(trackingUser){
            fetch('/api/track-player?username='+params.username+'&action=remove'); 
        }else{
            fetch('/api/track-player?username='+params.username+'&action=add'); 
        }
        setTrackingUser(!trackingUser)

    }

    return (
        <>
            <Header user={true}></Header>

            {
                user &&
                <Container>

                    <Grid container style={{marginTop:'30px', justifyContent: {xs:'center', md:'left'}, textAlign:'center', alignItems:'center'}}>
                        <Grid xs={12} md="auto" style={{justifyContent:'center', display:'flex'}}>
                            <Avatar
                                alt="Remy Sharp"
                                sx={{ width: {md:  250, xs: 250} , height:{md: 250, xs: 250}  }}
                            >
                                {user?.name.split(' ').map(w => w[0].toUpperCase() ) }
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} md="auto" sx={{marginLeft: {md: '20px'}}}>
                            <h3 >{user?.name}</h3>
                            {
                                userType == 'coach' && 
                                <div style={{display:'flex', justifyContent:'center'}}>
                                    <Button onClick={handleTrack}>
                                        {trackingUser ? 'Tracking' : 'Track Player'}
                                    </Button>
                                </div>
                            }
                        </Grid>
                    </Grid>

                </Container>



                || ''

            }


            <Box id="parentBox"
                sx={{marginTop:'30px'}}
            >
                <TabContext id="parentTabContext" value={value}>  
                    <Box id="parentBox2" sx={{position:'sticky', padding: '10px 0 0 0', top: '0px', 
                        borderBottom: 1,  borderColor: 'divider'}}>
                        <Container 
                            id="parentContainer"
                            maxWidth={isLargerDevice && 'md'} 
                            sx={{paddingLeft: !isLargerDevice && '0px!important'}}
                        >
                            <Grid id="tabs-holder" alignItems={'center'} container>
                                <Grid item xs={11}>    
                                    <TabList 
                                        variant={!isLargerDevice && 'scrollable'}
                                        scrollButtons="auto"
                                        allowScrollButtonsMobile = {!isLargerDevice}
                                        onChange={handleChange}  aria-label="lab API tabs example" 
                                    >
                                        <Tab label="Video" value="2" />
                                        <Tab label="Athletics" value="3" />
                                        <Tab label="Key Stats" value="4" />
                                        <Tab label="Academics" value="5" />
                                        <Tab label="Basic Info" value="6" />   
                                    </TabList>
                                </Grid>
                                <Grid textAlign={isLargerDevice ? 'right' : 'center'} item xs={1}>
                                    <MoreActions 
                                        menuitems={
                                            [
                                                {
                                                    label:'Copy Link to Profile' , 
                                                    icon: <ContentCopyIcon variant='small' />,
                                                    handler: ()=>{alert('copied')}
                                                },

                                                {
                                                    label:'Report Profile' , 
                                                    icon: <Flag variant='small' />,
                                                    handler: ()=>{alert('Reported!')}
                                                },

                                            ]
                                        } 
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                    <div>
                        <TabPanels username={params.username} />
                    </div>
                </TabContext>   
            </Box>
        </>
    );

}


function TabPanels({username}){

    return(
        <>
            <TabPanel sx={{padding: {xs: 0}}} value="2">
                <Container maxWidth='md' sx={{paddingLeft: 0, paddingRight: 0}} >
                    <Videos username={username} />
                </Container>
            </TabPanel>

            <TabPanel value="3" sx={{padding: {xs: '10px 0', md: '20px 0'} }}>
                <Container maxWidth='md' sx={{paddingLeft: 0, paddingRight: 0}} >
                    <Athletics username={username} />
                </Container>
            </TabPanel>

            <TabPanel sx={{padding: {xs: '10px 0', md: '20px 0'} }} value="4">
                <Container maxWidth='md' sx={{paddingLeft: 0, paddingRight: 0}} >
                    <KeyStats username={username} />
                </Container>
            </TabPanel>

            <TabPanel value="6" sx={{padding: {xs: '10px 0', md: '20px 0'} }}>
                <Container maxWidth='lg' sx={{paddingLeft: 0, paddingRight: 0}} >
                    <BasicInfo username={username} />
                </Container>
            </TabPanel>
            
            <TabPanel sx={{padding: {xs: '10px 0', md: '20px 0'} }} value="5">
                <Container maxWidth='md' sx={{paddingLeft: 0, paddingRight: 0}} >
                    <Academics username={username} />
                </Container>
            </TabPanel>
        </>
    )
}