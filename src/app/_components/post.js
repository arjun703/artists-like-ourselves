import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useEffect, useRef } from 'react';
import calculatePostedAgo from './posted-ago';
import Link from 'next/link';
import { pOSTRequest, dELETErequest } from './file_upload';
import toast from 'react-hot-toast';
import { Button } from '@mui/joy';
import { Divider } from '@mui/material';
import ShareButton from './modals/share-posts';


export default function Post({post}) {
   
  const [isLiked, setIsLiked] = useState(post.has_already_liked)
  var [p, setP] = useState(post);
  const [isLikingOrUnliking, setIsLikingOrUnliking] = useState(false)
  const [numLikes, setNumLikes] = useState(post.num_likes)

  const handleLikeUnlike = async () =>{
    const prevState  = isLiked
    const prevNumLikes = numLikes
    try{
      setIsLikingOrUnliking(true)
      setIsLiked(!prevState)
      const formData = new FormData()
      formData.append('post_id', post.id) 
      if(prevState == false){
        setNumLikes(numLikes+1)
        const responseJSON =  await pOSTRequest(formData, '/api/like')
        if(responseJSON.success !== true) throw new Error(responseJSON.msg)
      }else{
        setNumLikes(numLikes-1)
        const responseJSON =  await dELETErequest(formData, '/api/like')
        if(responseJSON.success !== true) throw new Error(responseJSON.msg)
      }
    }catch(error){
      toast(error.message) 
      setIsLiked(prevState)
      setNumLikes(numLikes)
    }finally{
      setIsLikingOrUnliking(false)
    }
  }  


  return (
    <Card id={p.id} sx={{ maxWidth: '100%', borderRadius: '10px', marginBottom: '20px' }}>
      <CardHeader
        avatar={
          <Link href={'/users/'+p.posted_by_username} style={{textDecoration:'none'}}>
            <Avatar src={p.profile_pic_src} aria-label="recipe">
              {
                p.posted_by_name.split(' ').map(a => a[0]).join('')
              }
            </Avatar>
          </Link>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Link style={{textDecoration:'none'}} href={'/users/'+p.posted_by_username}> {p.posted_by_name}</Link>}
        subheader={calculatePostedAgo(p.posted_ago_in_seconds)}
      />
      <DisplayCardContent caption={p.caption} />
      <DisplayCardMedia p={p} />
        <Divider />
      <CardActions >
        <Button 
          color={isLiked ? 'success': 'neutral'} 
          variant={isLiked ? 'solid': 'outlined'} 
          startDecorator={<FavoriteIcon />}
          sx={{opacity: '1!important'}}  
          onClick={isLikingOrUnliking ? () => {} :  handleLikeUnlike}
          fullWidth
        >
          {numLikes > 0 ? numLikes: ''}
        </Button>
        <ShareButton postID={p.id} />
      </CardActions>
    </Card>
  );
}

function DisplayCardContent({caption}){
  if(!(caption.trim().length)){
    return(
      <></>
    )
  }
  return(
    <CardContent>
    <Typography variant="body2" color="text.secondary">
      {caption}
    </Typography>
  </CardContent>
  )
}


function DisplayCardMedia({p}){
  if(p.media_src === null){
    return(
      <></>
    )
  }
  
  if(p.media_type.includes('video')){
    return(
      <CardMedia
        component={'video'}
        width="100%"
        controls={true}
        height="auto"
        src={p.media_src}
        alt="Paella dish"
      />
    )
  }else if(p.media_type.includes('audio')){
    return(
      <div style={{display:'flex', gap: '15px'}}>
        <div></div>
        <audio controls style={{width: '100%'}}>
          <source src={p.media_src} type={p.media_type} />
        </audio>
        <div></div>
      </div>
    )
  }else if(p.media_type.includes('image')){
    return(
      <CardMedia
        component={'img'}
        width="100%"
        height="auto"
        src={p.media_src}
        alt="Paella dish"
      />
    )
  }else{


    const googleDocsViewerUrl = `https://docs.google.com/gview?url=${p.media_src}&embedded=true`;

    return (
      <iframe
        src={googleDocsViewerUrl}
        style={{ border: 'none', width: '100%', minHeight: '350px' }}
        title="PDF Viewer"
      />
    );


  }
}