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
import { useState, useEffect } from 'react';


export default function Post({post}) {
   
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card id={post.id} sx={{ maxWidth: '100%', borderRadius: '10px', marginBottom: '20px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            SB
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={'Arjun Poudel'}
        subheader={'just now'}
      />
      <DisplayCardContent caption={post.caption} />
      <DisplayCardMedia medias={post.medias} />

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
            <FavoriteIcon onClick={()=> setIsLiked(!isLiked)} style={{ fill: isLiked ? 'red' : '' }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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

function DisplayCardMedia({medias}){
  if(!medias.length){
    return(
      <></>
    )
  }
  const media = medias[0]

  let component = 'img'
  
  if(media.media_type.includes('video')){
    return(
      <CardMedia
        component={'video'}
        width="100%"
        controls={true}
        height="auto"
        src={media.media_src}
        alt="Paella dish"
      />
    )
  }else if(media.media_type.includes('audio')){
    return(
      <CardMedia
        component={'audio'}
        width="100%"
        controls={true}
        height="auto"
        src={media.media_src}
        alt="Paella dish"
      />
    )
  }else if(media.media_type.includes('image')){
    return(
      <CardMedia
        component={'img'}
        width="100%"
        height="auto"
        src={media.media_src}
        alt="Paella dish"
      />
    )
  }else{
    return(
      <p>
        Unsupoorted file type
      </p>
    )
  }



}