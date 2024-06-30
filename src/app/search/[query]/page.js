'use client'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Link from 'next/link'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Header from '@/app/_components/_header/header';
import Avatar from '@mui/material/Avatar';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import Button from '@mui/joy/Button';
import { setLazyProp } from 'next/dist/server/api-utils';
import { setgid } from 'process';
import { pOSTRequest, getRequest, uPDATErequest, dELETErequest } from '@/app/_components/file_upload';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

import { useRouter } from 'next/navigation';

export default function SearchResults({params}) {

  const [dashboardInfo, setDashboardInfo] =  useState({})
  const [loading, setIsLoading] = useState(true)
  const query = params.query
  const [searchResults, setSearchResults] = useState([])

  useEffect( () => {

    const fetchSearchResults = async () => {
        
        try {
            setIsLoading(true)
            const data = await getRequest('/api/search?query='+encodeURIComponent(query)); // Adjust the API endpoint URL as needed
            setIsLoading(false)
            let suggestions = data.suggestions
           setSearchResults(suggestions);
        } catch (error) {
            alert(error.message)
        }
    };

    fetchSearchResults()

  }, [])

  const router = useRouter()
  const handleClick = (un) => {router.push('/view-profile/'+encodeURIComponent(un))}



  return (
    <>
      <Header  user={true} />
      <Container sx={{marginTop: '30px'}} maxWidth="md">
        <Paper sx={{paddingTop: '10px', paddingBottom: '20px' }}>
          {
            loading ? (
                <div style={{textAlign:'center'}}>
                  Loading
                </div>
            ): (
              <>
                <div>
                  <h4 style={{textAlign:'center'}}>Search Results for <i>{query}</i></h4>
                </div>
                <Divider></Divider>
                <div style={{padding:'30px'}}>
                  <Grid container spacing={2}>
                    {searchResults.map((sr, index) => (
                      <Grid item xs={12} sm={6} md={4}  key={index} sx={{justifyContent: 'center'}} >
                        <Card style={{cursor:'pointer'}} onClick={()=>{ handleClick(sr.username)}}>
                          <CardHeader
                            avatar={
                              <Avatar aria-label="recipe">
                                
                              </Avatar>
                            }
                            title={sr.name}
                            subheader={sr.sport+' player'}
                          />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </>
            )
          }
        </Paper>
      </Container>
    </>
  );
}