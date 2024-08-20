'use client'
import Header from '../_components/_header/header';
import FeedPosts from "./feed_posts"
import RightSidebar from "./right_side_bar"
import { Grid } from '@mui/material';
import {Container} from '@mui/material';
import LeftSideBar from './_left_side_bar';
import { useState, useEffect } from 'react';
import DisplaySelectedFiltersChips from './_selected_filters';
import LoadingPosts from './post_skeleton';
import smoothScrollToTop from './smooth_scroll_to_top';



export default function Feed(){

  const [posts, setPosts] = useState([])

  const [feedTypeFilter, setFeedTypeFilter] = useState([])

  const [loading, setLoading] = useState(false)


  useEffect(() => {

      async function fetchDashboard() {
    
        try {
              setLoading(true)

              let apiURL = '/api/feed/';
              
              let filters = [];
              
              if(feedTypeFilter.length){
                filters.push('feedTypeFilter='+feedTypeFilter.join('||'))
              }

              let queryParams = filters.join('&') 
              
              apiURL += '?' + queryParams
              smoothScrollToTop()

              const postsResponse = await fetch(apiURL)
              
              const postsResponseJson = await postsResponse.json();
              setPosts(postsResponseJson.success ? postsResponseJson.posts  : [])

          } catch (error) {
              alert( error.message)
          }finally{
            setLoading(false)

          }
      }
      
      fetchDashboard();

  }, [feedTypeFilter]); 

  const handleFeedTypeFilterChange = (filterBy) => {
    if(!(feedTypeFilter.includes(filterBy))){
      setFeedTypeFilter([...feedTypeFilter, filterBy])
      console.log(feedTypeFilter)
    }
  }

  const handlFilterUnselect = (filterby) => {
    setFeedTypeFilter(feedTypeFilter.filter((item) => item !== filterby));
  }

  return(
    <>
      <Header  user={true} />
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{marginTop: '1px'}}>
          <Grid item xs={12} md={3}>
            <LeftSideBar />
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

    </>
  )
}