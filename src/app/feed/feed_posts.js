'use client'
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import PostUploadForm from '../_components/_post_upload_form';
import PostUploadFormInitiator from './post_upload_form_initiator';
import toast from "react-hot-toast";
import Post from '../_components/post';
import { Stack } from '@mui/material';

export default function FeedPosts({posts}) {

    const [postUploadFormOpen, setPostUploadFormOpen] = useState(false)

    const handlePostUploadFormDisplay = () => {setPostUploadFormOpen(!postUploadFormOpen)}

    return (
        <>        
            <Paper sx={{paddingTop: {md: '20px', xs: '20px'}, paddingBottom: '20px', paddingLeft: '20px', paddingRight:'20px' }}>
                <PostUploadFormInitiator handlePostUploadFormDisplay={handlePostUploadFormDisplay} />
            </Paper>
            <Stack Container sx={{marginTop: '20px'}} spacing={2}>
                {
                    posts.map((post, index) => {
                        return <Post post={post} key={index} />
                    })
                }
            </Stack>
            {postUploadFormOpen ? <PostUploadForm onClose={handlePostUploadFormDisplay} /> : '' }
        </>
    );

}