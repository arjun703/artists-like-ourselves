'use client'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Link from 'next/link'
import Header from '../_components/_header/header';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import Post from '../_components/post';
import { useState, useEffect } from 'react';
import Button from '@mui/joy/Button';
import { setLazyProp } from 'next/dist/server/api-utils';
import { setgid } from 'process';
import PostUploadForm from '../_components/_post_upload_form';
import ShortTextIcon from '@mui/icons-material/ShortText';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import MicIcon from '@mui/icons-material/Mic';

export default function Dashboard() {

  const [dashboardInfo, setDashboardInfo] =  useState({})
  const [loading, setIsLoading] = useState(true)
  const [postUploadFormOpen, setPostUploadFormOpen] = useState(false)
  useEffect(() => {
    async function fetchDashboard() {
        try {
            // const response = await fetch('/api/feed'); // Adjust the API endpoint URL as needed
            // if (!response.ok) {
            //     throw new Error('Failed to fetch videos');
            // }
            // const data = await response.json();
        } catch (error) {
            alert( error.message)
        }finally{
          setIsLoading(false)
        }
    }
    fetchDashboard();
  }, []); 

  const handlePostUploadFormDisplay = () => {setPostUploadFormOpen(!postUploadFormOpen)}

  return (
    <>
      <Header  user={true} />
      <Container sx={{marginTop: '30px'}} maxWidth="sm">
        <Paper sx={{paddingTop: {md: '20px', xs: '20px'}, paddingBottom: '20px', paddingLeft: '20px', paddingRight:'20px' }}>
          {
            loading ? (
                <div style={{textAlign:'center'}}>
                  Loading
                </div>
            ): (
              <>
                <Grid container spacing={2} sx={{alignItems:'center'}}>
                  <Grid item>
                    <Avatar
                      alt="Avatar Image"
                      src={'https://cdn.truelancer.com/user-picture/4303455-654ae175ab2a5.jpg'}
                      sx={{ width: 50, height: 50 }}
                    />
                  </Grid>
                  <Grid item xs onClick={handlePostUploadFormDisplay}>
                    <div class="light-bg-on-hover" style={{padding:'12px 20px', curspor:'pointer', border:'1px solid rgba(0, 0, 0, 0.5)', borderRadius: '35px'}} >Express your Positive Art</div>
                  </Grid>
                </Grid>
                <div style={{display:'flex', justifyContent: 'space-around', marginTop: '20px', }}>
                  <ShortTextIcon />
                  <InsertPhotoIcon />
                  <VideoCameraBackIcon />
                  <MicIcon />
                </div>
              </>
            )
          }
        </Paper>
      </Container>
      {postUploadFormOpen ? <PostUploadForm onClose={handlePostUploadFormDisplay} /> : '' }
    </>
  );
}