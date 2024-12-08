import {  Button } from "@mui/joy";
import { Avatar, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState} from "react";
import { getRequest, pOSTRequest } from "../../file_upload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SendIcon from '@mui/icons-material/Send';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { SupportButton } from "../../modals/support-artist";

export default function DisplayComments({ commentsSubmitCallback, post: {is_editable, id: post_id, posted_by_name, posted_by_username } }) {

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [parentID, setParentID] = useState(0) 
    const [commentsPageNumber, setCommentsPageNumber] = useState(1)
    const [moreDataExists, setMoreDataExists] = useState(true)

    useEffect( () => {
    
        async function fetchData(){
            try {
                setIsLoading(true);
                const commentsJSON = await getRequest(
                `/api/post/${post_id}/comments?page=${commentsPageNumber}&parent_id=${parentID}`
                );
                setComments(commentsJSON.comments); // Append new likes
                setMoreDataExists(commentsJSON.moreDataExists); // Set whether more data exists
              } catch (error) {
                toast(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchData()

  }, [commentsPageNumber, parentID]);

  // Handler to increase page number
  const increaseLikesPageNumber = () => {
    setCommentsPageNumber((prevPage) => prevPage + 1);
  };

  // Redirect to user profile on click
  const redirectToProfile = (username) => {
    router.push(`/users/${username}`);
  };

  const [comment, setComment] = useState('')

  const [isSubmittingComment, setIsSubmittingComment]= useState(false)

  const submitComment = async () =>{
    try{
        if(comment.trim().length === 0) throw new Error('Comment can not be empty')
        setIsSubmittingComment(true)
        const formData = new FormData()
        formData.append('comment', comment)
        formData.append('parent_id', null)
        const submitCommentResp = await pOSTRequest(formData, `/api/post/${post_id}/comments`)
        if(submitCommentResp.success !== true) throw new Error(submitCommentResp.msg) 
        toast("Comment added")
        setComment('')
        setComments(prevState => [submitCommentResp.cmt, ...prevState])
        commentsSubmitCallback()
    }catch(error){
        toast(error.message)
    }finally{
        setIsSubmittingComment(false)
    }
  }

  return (
    <div style={{ marginTop: "10px" }}>

      <Divider />

      {
        is_editable !== 1   && (
          <>
            <div style={{display:'flex', justifyContent:'center'}}>
              <div>
                <SupportButton 
                  type={'list_item'} 
                  toBeSupportedID={posted_by_username} 
                  firstName={posted_by_name.split(' ')[0].toUpperCase()} 
                />
              </div>      


            </div>
            <Divider/>

          </>
        ) || ''
      }


      <div 
        style={{
            display:'flex', 
            gap:'10px', 
            justifyContent:'space-between',
            alignItems:'center',
            padding:'15px'
        }}
    >
            <Avatar>
                U
            </Avatar>
            <TextField fullWidth
                autoFocus
                value={comment}
                sx={{borderRadius:'50px'}}
                disabled={isSubmittingComment}
                placeholder="Write a comment"
                onKeyUp={(e) => { if (e.key === 'Enter' || e.keyCode === 13){ submitComment() } } }
                onChange={(e) => setComment(e.target.value)}
            />
            <IconButton disabled={isSubmittingComment} onClick={submitComment}>
                
                {isSubmittingComment ? <AutorenewIcon color="primary" /> :<SendIcon color="primary" /> }
            </IconButton>
      </div>

      { comments.length > 0 && (
      <Divider>Comments</Divider>
      ) || ''}


      <div style={{ padding: comments.length > 0 ? "15px" : '5px'}}>

        <Grid container spacing={2}>
          {comments.map((comment, index) => (
            <Grid
              key={index}
              item
              xs={12}
            >
              <div style={{ borderRadius:'5px', border:'1px solid rgba(0, 0, 0, 0.1)', padding:'5px',}}>
                <div 
                  style={{ alignItems:'center',  display:'flex', gap: '10px' }}
                >
                  <Avatar
                    onClick={()=>redirectToProfile(comment.username)}
                    alt={comment.name}
                    src={comment.profile_pic_src || ""}
                  >
                    {!comment.profile_pic_src ? comment.name.split(' ').map(w=>w[0]).join('').toUpperCase() : ""}
                  </Avatar>
                  <Typography><strong>{comment.name}</strong></Typography>
                </div>
                <div style={{paddingLeft:'50px'}}>
                  <Typography>
                    {comment.cmt}
                  </Typography>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>

        {moreDataExists && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: '10px' }}>
            <Button loading={isLoading} variant={'plain'} onClick={increaseLikesPageNumber}>
              View More 
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}