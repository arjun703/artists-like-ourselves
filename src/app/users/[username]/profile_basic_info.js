'use client'
import { useState, useEffect } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import { Box, Paper, Skeleton, Stack, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { dELETErequest, getRequest, pOSTRequest } from '@/app/_components/file_upload';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from '@mui/joy';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import PaypalButton from '@/app/_components/_payment_buttons/_paypal';
import SupportButton from '@/app/_components/modals/support-artist';


export default function ProfileBasicInfo({username}){
    
    const [fetchingBasicInfo, setFetchingBasicInfo]= useState(true)
    const [basicInfo, setBasicInfo] = useState({})
    const [isError, setIsError]= useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const [isFollowingOrUnfollowing, setIsFollowingOrUnfollowing] = useState(false)

    useEffect(()=> {
      async function fetchBasicInfo(){
        try{
            const userInfoJSON = await getRequest(`/api/users/${username}/basic-info`)
            if(userInfoJSON.success !== true) throw new Error(userInfoJSON.msg)
            let data = userInfoJSON
            if(data.userInfo.cover_pic_src === null || data.userInfo.cover_pic_src == ''){
                data.userInfo.cover_pic_src = '/site-assets/default_cover_pic.webp'
            }
        
            if(data.userInfo.profile_pic_src === null || data.userInfo.profile_pic_src == ''){
                data.userInfo.profile_pic_src = '/site-assets/default_profile_pic.jpeg'
            }
            setBasicInfo(data)
            setIsFollowing(data.isFollowing)
        }catch(error){
            setIsError(true)
            toast(error.message)
        }finally{
            setFetchingBasicInfo(false)
        }
      }
      fetchBasicInfo();
    }, [])


    const handleFollowUnfollow = async () =>{
        const prevState  = isFollowing
        const prevNumFollowers = basicInfo.followersInfo.followers_count
        try{
            setIsFollowingOrUnfollowing(true)
            setIsFollowing(!prevState)
            const formData = new FormData()
            if(prevState == false){
                setBasicInfo(prevState => ({
                    ...prevState,
                    followersInfo: {
                      ...prevState.followersInfo,  // Ensure followersInfo exists
                      followers_count: prevNumFollowers + 1  
                    }
                  }));
                    const responseJSON =  await pOSTRequest(formData, `/api/follow-unfollow/${username}`)
                if(responseJSON.success !== true) throw new Error(responseJSON.msg)
            }else{

                setBasicInfo(prevState => ({
                    ...prevState,
                    followersInfo: {
                      ...prevState.followersInfo,  // Ensure followersInfo exists
                      followers_count: prevNumFollowers - 1  
                    }
                  }));

                const responseJSON =  await dELETErequest(formData, `/api/follow-unfollow/${username}`)
                if(responseJSON.success !== true) throw new Error(responseJSON.msg)
            }
        }catch(error){
            toast(error.message) 
            setIsFollowing(prevState)

            setBasicInfo(prevState => ({
                ...prevState,
                followersInfo: {
                  ...prevState.followersInfo,  // Ensure followersInfo exists
                  followers_count: prevNumFollowers  
                }
            }));

        }finally{
            setIsFollowingOrUnfollowing(false)
        }
      }  

    if(fetchingBasicInfo){
        return(
            <Paper sx={{padding: '20px 0'}}>
                <Stack spacing={2}>
                    <Skeleton variant="rectangular" sx={{margin:0}} height={200} width={'100%'} />
                    <Stack spacing={2} sx={{paddingLeft:'30px'}}>
                        <Skeleton variant="rectangular" height={20} width={150}/>
                        <Skeleton variant="rectangular"  height={20} width={250}/>
                        <Skeleton variant="rectangular" height={40} width={150}/>
                    </Stack>
                </Stack>
            </Paper>
        )    
    }
    
    if(isError){
        return(
            <>An error occured</>
        )
    }
    
    return(
        <Paper sx={{paddingBottom:'20px'}}>
            <ProfilePicAndCoverPic basicInfo={basicInfo} />
            <Stack spacing={1} sx={{paddingLeft:'30px'}}>
                <div>
                    <strong>
                        {basicInfo.userInfo.name}
                    </strong>
                </div>
                <ProfileStats  data={basicInfo} />
                <div>
                    {
                        basicInfo.viewing_oneself !== true ? (
                            <Stack direction={'row'} gap={'10px'}>
                                <Button 
                                    color={isFollowing ? 'success': 'primary'} 
                                    variant={'solid'} 
                                    sx={{display:'inline-flex'}}
                                    startDecorator={isFollowing ? <CheckIcon /> : <AddIcon /> }
                                    onClick={isFollowingOrUnfollowing ? () => {} :  handleFollowUnfollow}
                                >
                                    {isFollowing ? 'Following' : 'Follow'}
                                </Button>
                                <SupportButton toBeSupportedID={username} firstName={basicInfo.userInfo.name.split(' ')[0].toUpperCase()} />
                            </Stack>

                        ): (
                            <Button 
                                variant={'solid'} 
                                sx={{display:'inline-flex'}}
                                startDecorator={<EditIcon /> }
                            >
                                Edit Profile
                            </Button>
                        )
                    }
                </div>
            </Stack>
        </Paper>
    )
}

function ProfilePicAndCoverPic({basicInfo}){
    return(
    <div 
        class="cover-pic__profile-pic"
        style={{
            position:'relative',
            paddingBottom: '40px'
        }}
    >
        <div className="cover-pic">
            <CardMedia component="img" height="140" image={basicInfo.userInfo.cover_pic_src}  />
        </div>
        <div 
            className="profile-pic"
            style={{
                position:'absolute',
                width: '100%',
                left: '30px',
                bottom: '5px'
            }}
        >
            <div
                style={{position:'relative'}}
            >
                <img 
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        border: '5px solid white',
                        objectFit:'cover' 
                    }} 
                    src={basicInfo.userInfo.profile_pic_src}
                />
            </div>
        </div>
    </div>
    )
}

function ProfileStats({data}){
    
  let stats = [
    { label: 'Follower', value: data.followersInfo.followers_count, link: data.followers_list_link },
    { label: 'Following', value: data.followingsInfo.followings_count, link: data.follwings_list_link },
    { label: 'Post Like', value: data.postLikesCountInfo.post_likes_count, link: data.post_likes_count_link },
  ];

  const router = useRouter()
  const handleRedirect = (link) => router.push(link)

  return(
    <Box
        sx={{
          display: 'flex',
        }}
      >

        
        <Stack 
          direction={'row'} 
          sx={{justifyContent:'center',alignItems:'center'}}
          spacing={1}
          divider={<Typography variant="caption" sx={{ color: 'black', fontWeight: 'bold' }}>•</Typography>}
        >
            {
                stats.map((stat, index) => {
                    if(stat.link != ''){
                        return(
                            <Typography key={index} onClick={()=>handleRedirect(stat.link)} variant="body1" sx={{ opacity: 0.8, cursor:'pointer',  }}>
                                {stat.value} {stat.label}{stat.value>1 ? 's':''}
                            </Typography>
                        )
                    }else{
                        return(
                            <Typography key={index} variant="body1" sx={{ opacity: 0.8  }}>
                                {stat.value} {stat.label}{stat.value>1 ? 's':''}
                            </Typography>
                        )
                    }
                })
            }
        </Stack>
      </Box>
  )
}