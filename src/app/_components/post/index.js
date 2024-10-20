import Card from '@mui/material/Card';

import { useState, useEffect, useRef } from 'react';

import { pOSTRequest, dELETErequest } from './../file_upload';
import toast from 'react-hot-toast';

import ShowNumLikesAndComments from './display-num-likes-and-comments';
import LikeShareCommentButtons from './like-share-comment-buttons';
import DisplayCardContent from './display-card-content';
import DisplayCardMedia from './display-card-media';
import DisplayCardHeader from './display-card-header';
import DisplayLikes from './display-likes';
import DisplayComments from './display-comments';

export default function Post({post}) {
   
  const [isLiked, setIsLiked] = useState(post.has_already_liked)
  var [p, setP] = useState(post);
  const [isLikingOrUnliking, setIsLikingOrUnliking] = useState(false)
  const [numLikes, setNumLikes] = useState(post.num_likes)
  const [numComments, setNumComments] = useState(post.num_comments)

  const handleLikeUnlike = async () =>{
    const prevState  = isLiked
    const prevNumLikes = numLikes
    try{
      setIsLikingOrUnliking(true)
      setIsLiked(!prevState)
      const formData = new FormData()
      formData.append('post_id', post.id) 
      setDisplayType(''); // hide likes and comments
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
      setNumLikes(prevNumLikes)
      
    }finally{
      setIsLikingOrUnliking(false)
    }
  }  


  const [displayType, setDisplayType] = useState('')  // display likes or comments

  const handleDisplayChange = (display_type) => {
    setDisplayType(display_type)
  }


  const commentsSubmitCallback = () => { setNumComments(numComments+1) }

  return (
    <Card id={p.id} sx={{ maxWidth: '100%', borderRadius: '10px', marginBottom: '20px' }}>
        <DisplayCardHeader p={p}/>
        <DisplayCardContent caption={p.caption} />
        <DisplayCardMedia p={p} />
        <ShowNumLikesAndComments handleDisplayChange={handleDisplayChange} likes={numLikes} comments={numComments} />
        <LikeShareCommentButtons handleDisplayChange={handleDisplayChange} p={p} isLiked={isLiked} handleLikeUnlike={handleLikeUnlike} isLikingOrUnliking={isLikingOrUnliking} />
        {
            displayType == 'likes'
                ?   <DisplayLikes 
                        post_id={p.id}
                    />
                :   displayType == 'comments'
                        ? <DisplayComments
                        commentsSubmitCallback={() => commentsSubmitCallback()} 
                        post_id={p.id}
                          />
                        : <></>
        }
    </Card>
  );

}
