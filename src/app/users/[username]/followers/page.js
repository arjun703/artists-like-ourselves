'use client'
import { getRequest } from "@/app/_components/file_upload";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function FollowersList({params}){

    const [isLoading, setIsLoading] = useState(true) 
    const [followers, setFollowers] = useState([])

    useEffect( () => {
    
        async function fetchData(){
          try {
            setIsLoading(true);
            const followersJSON = await getRequest(
              `/api/users/${params.username}/followers`
            );
            setFollowers(followersJSON.followers); // Append new likes
          } catch (error) {
            toast(error.message);
          } finally {
            setIsLoading(false);
          }
        }


        
        fetchData()
      }, []);
    


    return(
        <Paper sx={{padding:'10px'}}>
            <Typography><h2>Followers of @{params.username}</h2></Typography>
            <Grid container spacing={2}>
                {followers.map((follower, index) => (
                    <Grid
                    onClick={() => redirectToProfile(follower.username)}
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    >
                    <div  style={{  borderRadius:'5px', border:'1px solid rgba(0, 0, 0, 0.1)', padding:'5px', cursor: "pointer", alignItems:'center',  display:'flex', gap: '10px' }}>
                        <Avatar
                        alt={follower.name}
                        src={follower.profile_pic_src || ""}
                        >
                        {!follower.profile_pic_src ? follower.username[0].toUpperCase() : ""}
                        </Avatar>
                        <Typography>{follower.name}</Typography>
                    </div>
                    </Grid>
                ))}
            </Grid>  
        </Paper>
    )
}