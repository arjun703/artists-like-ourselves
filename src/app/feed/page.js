'use client'
import FeedPosts from "./feed_posts"
import RightSidebar from "./right_side_bar"
import { Divider, Grid, Paper } from '@mui/material';
import {Container} from '@mui/material';
import LeftSideBar from './_left_side_bar';
import { useState, useEffect } from 'react';
import DisplaySelectedFiltersChips from './_selected_filters';
import LoadingPosts from './post_skeleton';
import smoothScrollToTop from './smooth_scroll_to_top';
import toast from 'react-hot-toast';
import PostUploadForm from "../_components/_post_upload_form";
import PostUploadFormInitiator from "./post_upload_form_initiator";
import { getRequest } from "../_components/file_upload";
import FeedLeftSidebarSkeleton from "./_left_side_bar/skeleton";

export default function Feed(){

  const [postUploadFormOpen, setPostUploadFormOpen] = useState(false)
    
  const handlePostUploadFormDisplay = () => {setPostUploadFormOpen(!postUploadFormOpen)}

  const [posts, setPosts] = useState([])

  const [loading, setLoading] = useState(true)
  
  const [feedTypeFilter, setFeedTypeFilter] = useState([]) 

  useEffect(() => {

      async function fetchDashboard() {
    
        try {

            setLoading(true)

              let apiURL = '/api/feed/';
              
              let filters = [];

              if(feedTypeFilter.length){           
                filters.push('feedTypeFilter='+feedTypeFilter.join('||'))
              }
              console.log("updating site url from fetchDashboard")
              updateSiteURL()

              let queryParams = filters.join('&') 
              
              apiURL += '?' + queryParams
              smoothScrollToTop()

              const postsResponse = await fetch(apiURL)
              
              const postsResponseJson = await postsResponse.json();
              setPosts(postsResponseJson.success ? postsResponseJson.posts  : [])

          } catch (error) {
            toast( error.message)
          }finally{
            setLoading(false)
          }
      }
      
      fetchDashboard();



  }, [feedTypeFilter]); 


  const updateSiteURL = () => {
    if(feedTypeFilter.length){ 
      history.replaceState({}, '', '/feed?filter='+feedTypeFilter.join(',') ) 
    }else{
      history.replaceState({}, '', '/feed/')
    }
  }

  const handleFeedTypeFilterChange = (filterBy) => {
    if(!(feedTypeFilter.includes(filterBy))){
      setFeedTypeFilter([...feedTypeFilter, filterBy])
    }
  }

  const handlFilterUnselect = (filterby) => {
    setFeedTypeFilter(feedTypeFilter.filter((item) => item !== filterby));
  }


  const [fetchingStats, setFetchingStats]= useState(true)
  const [profileStats, setProfileStats] = useState({})

  useEffect(()=> {
    async function fetchStats(){
      try{
        const userInfoJSON = await getRequest('/api/feed/left-sidebar')
        if(userInfoJSON.success !== true) throw new Error(userInfoJSON.msg)
          setProfileStats(userInfoJSON)
      }catch(error){
          toast(error.message)
      }finally{
        setFetchingStats(false)
      }
    }
    fetchStats();
  }, [])


  return(
    <>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{marginTop: '1px'}}>
          <Grid item xs={12} md={3}>
            {
              fetchingStats  ? <FeedLeftSidebarSkeleton /> :  <LeftSideBar profileStats={profileStats} />
            }
          </Grid>
          <Grid item xs={12} md={6}>

            {
              feedTypeFilter.length 
                ? 
                  <div style={{marginBottom: '20px'}}>
                    <DisplaySelectedFiltersChips  filters={feedTypeFilter} handleDelete={handlFilterUnselect} /> 
                  </div>
                : 
                  <></>
            }
              <Paper sx={{paddingTop: {md: '20px', xs: '20px'}, paddingBottom: '20px', paddingLeft: '20px', paddingRight:'20px' }}>
                <PostUploadFormInitiator data={profileStats} handlePostUploadFormDisplay={handlePostUploadFormDisplay} />
              </Paper>
              <Divider sx={{marginBottom: '20px'}} />
            {
              loading 
                ? <LoadingPosts />
                : <FeedPosts posts={posts}  /> 
            }
          </Grid>
          <Grid item xs={12} md={3}>
            <RightSidebar handleFeedTypeFilterChange={handleFeedTypeFilterChange} />
          </Grid>
        </Grid>
      </Container>
      {postUploadFormOpen ? <PostUploadForm onClose={handlePostUploadFormDisplay} /> : '' }

    </>
  )
}

