'use client'
import Button from '@mui/joy/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Popover from '@mui/material/Popover';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Search from '../search';
import { Container, Grid, Box, Menu, MenuItem, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function HeaderLoggedIn({user}){
  const router = useRouter()
  const isAtLeastMd = useMediaQuery('(min-width:900px)');
  const isAtLeastLg = useMediaQuery('(min-width:1200px)');
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false); // Destructuring the state value
  const handleBackClick = () => {
    setIsSearchBoxOpen(!isSearchBoxOpen)
  }
  const handleSearchIconClick = ()=> {setIsSearchBoxOpen(true)}

  return(
    <>
      <Container maxWidth = 'xl' sx={{padding: '10px'}}>
        {
          isSearchBoxOpen
            ? 
              <Search isAtLeastLg={isAtLeastLg} onBackClick = {handleBackClick} />
            : 
              <Grid container sx={{alignItems: 'center'}}>
                <Grid item xs={4} md={2}>
                    <a href="/">
                      <img style={{maxHeight: '60px'}} src="/site-assets/logo.png" />
                    </a>
                </Grid>
                { isAtLeastMd && 
                  <Grid item xs={0} md={7} lg={4}>
                    <MenuItems isLoggedIn={true} />
                  </Grid>
                }
                { isAtLeastLg &&
                  <Grid item xs={0} lg={3}>
                    <Search isAtLeastLg  onBackClick = {handleBackClick}  />
                  </Grid>
                }
                
                <Grid item xs={8} md={3} lg={2} >
                  <HeaderRightIcons handleSearchIconClick={handleSearchIconClick} isAtLeastMd={isAtLeastMd} />
                </Grid>
              </Grid>
        }
      </Container>
    </>
  );
}

function MenuItems({isLoggedIn}){
  return (
    <>
      <div style={{display:'inline-flex', gap: '5px'}}>
        <HeaderCenterMenuItemsForLoggedIn />
      </div>
    </>
  );
}

function HeaderCenterMenuItemsForLoggedIn(){

  return(
    <>


      <ListItemButton 
        sx={{textAlign:'center'}}
      >
          <ListItemText primary={'About Us'} />
      </ListItemButton>
      <ListItemButton
      
      >

        <ListItemText
      sx={{textAlign:'center'}}
          primary={'Contact Us'} 
        />
      </ListItemButton>

    </>
  );
}


import MenuIcon from '@mui/icons-material/Menu';

import LogoutIcon from '@mui/icons-material/Logout';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import React from 'react';


function LoginAndSignUpButtons(){
  const router = useRouter()
  return(
    <>
      <Button onClick={()=> router.push('/login')} sx={{minWidth:'200px', display: {xs: 'none', lg: 'flex'}}} >
        Sign In
      </Button>
    </>
  )
}

function HeaderRightIcons({isAtLeastMd, handleSearchIconClick}){
  const router = useRouter();


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return(
    <>
      <Box sx={{display: 'flex', alignItems:'center', justifyContent: 'flex-end'}}>
        <Stack   
          direction="row"
          spacing={1}
        >
          <IconButton onClick={handleSearchIconClick} sx={{display: {xs: 'flex', lg: 'none'}}} size="large" aria-label="show 4 new mails" color="inherit">
            <SearchIcon />
          </IconButton>

          <LoginAndSignUpButtons />

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClick}
            sx={{display: {xs: 'block', lg: 'none'}}}
          >
            <MenuIcon />
          </IconButton>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <div>
              <List
                  sx={{ width: '100%', maxWidth: '400px', minWidth:'200px', bgcolor: 'background.paper' }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
              >

                    <Stack spacing={2} sx={{marginTop:'15px'}}>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <Button style={{width:'80%'}} onClick={()=> router.push('/register')} variant='solid'>
                          Sign Up
                        </Button>
                      </div>
                      <Divider></Divider>

                      <div style={{display:'flex', justifyContent:'center'}}>
                      <Button style={{width: '80%'}} onClick={()=> router.push('/login')}  variant='outlined'>
                        Login
                      </Button>
                      </div>


                    </Stack>
                    <Divider sx={{marginTop:'15px'}}></Divider>
                    <Box sx={{display: {xs: 'block', lg: 'none', textAlign:'center'}}}>
                      <HeaderCenterMenuItemsForLoggedIn />
                    </Box>
                  
              </List>
            </div>

          </Popover>


        </Stack>
      </Box>
    </>
  );
}