'use client'
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import ProfileStats from './profile_stats';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@mui/joy';

export default function PPandCover({data}){
    if(data.userInfo.cover_pic_src === null || data.userInfo.cover_pic_src == ''){
        data.userInfo.cover_pic_src = '/site-assets/default_cover_pic.webp'
    }

    if(data.userInfo.profile_pic_src === null || data.userInfo.profile_pic_src == ''){
        data.userInfo.profile_pic_src = '/site-assets/default_profile_pic.jpeg'
    }

    const router = useRouter()
    const redirectToProfile = () => router.push(`/users/${data.userInfo.username}`)
    
    return(
        <Card >
            <CardActionArea onClick={redirectToProfile} sx={{paddingBottom: '10px'}}>
                <div 
                    class="cover-pic__profile-pic"
                    style={{
                        position:'relative',
                        paddingBottom: '30px'
                    }}
                >
                    <div className="cover-pic">
                        <CardMedia component="img" height="140" image={data.userInfo.cover_pic_src}  />
                    </div>
                    <div 
                        className="profile-pic"
                        style={{
                            position:'absolute',
                            width: '100%',
                            left: '30px',
                            bottom: '0px'
                        }}
                    >
                        <div
                            style={{position:'relative'}}
                        >
                            <img 
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    border: '5px solid white',
                                    objectFit:'cover' 
                                }} 
                                src={data.userInfo.profile_pic_src}
                            />
                            <h4
                                style={{
                                    position:'absolute', 
                                    bottom: '6px', 
                                    left: '80px',
                                    margin: '0' 
                                }}
                            >
                                {data.userInfo.name}
                            </h4>
                        </div>
                    </div>
                </div>
            </CardActionArea>

            <Divider />
            
            <Link href={'/mywallet'} ><Button sx={{textAlign:'left!important', borderRadius: '0px'}} fullWidth variant={'plain'}>My Wallet</Button></Link> 
            
            <Divider />

            <ProfileStats data={data} />

        </Card>
    )
}