'use client'
import smoothScrollToTop from "@/app/feed/smooth_scroll_to_top";
import FeedPosts from "@/app/feed/feed_posts";
import LoadingPosts from "@/app/feed/post_skeleton";
import { useState, useEffect } from "react";
export default function UserPosts({username}){

    const [isLoading, setIsLoading]  = useState(true)

    const [feedTypeFilter, setFeedTypeFilter] = useState('')

    const [posts, setPosts] = useState('')

    useEffect(() => {

        async function fetchUserPosts() {
            
          try {
            
            setIsLoading(true)
  
                let apiURL = `/api/users/${username}` ;
                
                let queryParams = [];
                
                queryParams.push('of_user=' + username)
                
                if(feedTypeFilter !== '' ){
                    queryParams.push('feedTypeFilter=' + feedTypeFilter)
                }                  
                if(queryParams.length){
                    apiURL+= '?' + queryParams.join('&')
                }

                smoothScrollToTop()
                
                const postsResponse = await fetch(apiURL)
                
                const postsResponseJson = await postsResponse.json();

                setPosts(postsResponseJson.success ? postsResponseJson.posts  : [])
  
            } catch (error) {
                toast( error.message)
            }finally{
                setIsLoading(false)
            }
        }
        
        fetchUserPosts();
  
    }, [feedTypeFilter]);     

    if(isLoading){
        return(
            <LoadingPosts />
        )
    }

    return(
        
        <FeedPosts posts={posts} />
    )
}