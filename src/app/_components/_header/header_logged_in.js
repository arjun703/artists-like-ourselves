'use client'
import Button from '@mui/material/Button';
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
import React from 'react';

function Img(){
  return(
    <a href="#" style={{paddingLeft: '20px'}}>
      <img style={{maxHeight: '60px'}} src="/site-assets/logo.png" />
    </a>
  )
}

export default function HeaderLoggedIn({username}){
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
      <Container maxWidth = 'xl' sx={{padding: '10px 0'}}>
        {
          isSearchBoxOpen
            ? 
              <Search isAtLeastLg={isAtLeastLg} onBackClick = {handleBackClick} />
            : 
              <Grid container sx={{alignItems: 'center'}}>
                <Grid item xs={4} md={2}>
                  <Img sx={{maxHeight: '60px', width: 'auto'}} />
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

import { usePathname } from 'next/navigation';
import getUserNameFromToken from '../useauth'


import LogoutIcon from '@mui/icons-material/Logout';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';


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

function HeaderCenterMenuItemsForLoggedIn(){
  const pathname = usePathname()
  const router = useRouter()
  const username = getUserNameFromToken()
  const userType =getUserTypeFromToken()
  const decideDashboardPath = () => {
    if(userType ==''){
      pathname != '/dashboard' ? router.push('/dashboard') : '' 
    }else if(userType == 'coach'){
      pathname != '/coach-dashboard' ? router.push('/coach-dashboard') : '' 
    }
  }

  const decideProfilePath = () => {
    if(userType ==''){
      pathname != '/view-profile/'+username ? router.push('/view-profile/'+username ) : '' 
    }else if(userType == 'coach'){
      pathname != '/coach-edit-profile' ? router.push('/coach-edit-profile') : '' 
    }
  }

  return(
    <>
      <ListItemButton style={{borderBottom: pathname === '/dashboard' ? '2px solid red' : ''}}
        onClick={decideDashboardPath}
      >
         <ListItemIcon sx={{display: {xs: 'flex', lg: 'none'}}}><DashboardIcon /></ListItemIcon>
          <ListItemText primary={'Dashboard'} />
      </ListItemButton>
      <ListItemButton
      style={{borderBottom: pathname === '/view-profile/'+username ? '2px solid red' : ''}} 
        onClick={decideProfilePath}
      >
          <ListItemIcon sx={{display: {xs: 'flex', lg: 'none'}}}><AccountBoxIcon /></ListItemIcon>

        <ListItemText
          primary={'Profile'} 
        />
      </ListItemButton>
    </>
  );
}

function HeaderRightIcons({isAtLeastMd, handleSearchIconClick}){
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

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClick}
          >
            <AccountCircle />
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
                    <Box sx={{display: {xs: 'block', lg: 'none'}}}>
                      <HeaderCenterMenuItemsForLoggedIn />
                      <Divider></Divider>
                    </Box>
                    <ListItemButton onClick={()=>{ handleClick()}}>
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                      <ListItemText primary={'Log Out'} />
                    </ListItemButton>
              </List>
            </div>
          </Popover>
        </Stack>
      </Box>
    </>
  );
}