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
import ReactHowler from 'react-howler';


export default function Post({post}) {
   
  const [isLiked, setIsLiked] = useState(false)
  var [p, setP] = useState(post);

  return (
    <Card id={p.id} sx={{ maxWidth: '100%', borderRadius: '10px', marginBottom: '20px' }}>
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
      <DisplayCardContent caption={p.caption} />
      <DisplayCardMedia p={p} />

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

import DocViewer, { DocViewerRenderers } from "react-doc-viewer";


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



    if(p.media_type.includes('pdf') || p.media_type.includes('text') ){
      return(
        <div>
          <embed
            src={p.media_src}
            style={{ border: 'none', width: '100%', minHeight: '350px' }}
            title="PDF Viewer"
            onError={() => {}}
          />
        </div>
      )
    }

    const docs = [
      { uri: p.media_src },
    ];

    return(
      <div style={{padding: '5px', marginBottom:'5px'}}>
        <DocViewer style={{height: '350px'}} documents={docs} pluginRenderers={DocViewerRenderers} />
      </div>
    )
  }
}