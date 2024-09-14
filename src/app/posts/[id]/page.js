'use client'
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import Post from '@/app/_components/post';
import toast from 'react-hot-toast';
import LoadingPost from '@/app/_components/_loading-post';
import Alert from '@mui/material/Alert';

export default function ViewProfile({params}){

    const [post, setPost] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch('/api/post?id='+params.id); // Adjust the API endpoint URL as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                setPost(data.post)
            } catch (error) {
                toast( error.message)
            }finally{
                setIsLoading(false)
            }
        }

        fetchPost();

    }, []); 

    if(!isLoading && !post){
        return(
            <Alert severity="error">An error occured while fetching post.</Alert>
        )
    }

    return(
        <Container maxWidth={'sm'}>
            <div style={{marginTop: '30px'}}>
                { isLoading ? <LoadingPost /> : <Post post={post} /> }
            </div>
        </Container>
    )
    
}