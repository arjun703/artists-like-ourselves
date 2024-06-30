'use client'
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';


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
                alert( error.message)
            }finally{
                setIsLoading(false)
            }
        }

        fetchPost();

    }, []); 

    if(isLoading){
        return(
            <>
                <h1 style={{textAlign:'center', marginTop:'50px'}}>
                    Loading
                </h1>
            </>
        )
    }

    if(!isLoading && post){
        return (
            <Container sx={{marginTop: '30px'}} maxWidth="sm">
                <DisplayPost post={post} /> 
            </Container>
        );
    }

    return(
        <>
            <h3 style={{textAlign:'center', marginTop:'50px'}}>
                Something went wrong.
            </h3>
        </>
    )
}

import Post from '@/app/_components/post';

function DisplayPost({post}){
    return(
        <div>
            <Post post={post} />
        </div>
    )
}
