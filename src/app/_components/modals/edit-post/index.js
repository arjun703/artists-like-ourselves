import ShareIcon from '@mui/icons-material/Share';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Button } from '@mui/joy';
import EditIcon from '@mui/icons-material/Edit';
import { uPDATErequest } from '../../file_upload';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Modal component
const PostEditModal = ({ open, handleClose, post }) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false) 
    const [caption,setCaption] = useState(post.caption)

    const handlePostEdit = async () => {
        try{
            if(caption.trim().length === 0){
                toast("Caption empty")
                return
            }
            setIsLoading(true) 
            const formData = new FormData()
            formData.append('caption', caption)
            let postEditResponseJSON = await uPDATErequest(formData, `/api/post/${post.id}/`)
            if(postEditResponseJSON.success !== true) throw new Error(postEditResponseJSON.msg)
            handleClose()

            if(location.href.includes('/posts/')){
                toast("Updation successful. Reloading...")
                location.reload()
            }else{
                toast("Updation successful. Redirecting...")
                router.push(`/posts/${post.id}`)
            }
        }catch(error){
            toast(error.message)
        }finally{
            setIsLoading(false)
        }
    }


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="share-dialog-title"
      maxWidth="sm" // Adjusted maxWidth for a wider modal
      PaperProps={{
        style: {
          borderRadius: '20px',
          padding: '10px',
          maxWidth: '400px', // Set maximum width to 800px for a wider look
          width: '80%'
        },
      }}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <DialogTitle id="share-dialog-title" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
        Edit Caption
      </DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" alignItems="center">
        <textarea
            placeholder='Express your positive art..'
            autoFocus={true}
            onChange={(e) => setCaption(e.target.value)}
            defaultValue={caption}
            disabled={isLoading  }
            rows="3"
            style={{
              overflow: 'hidden',
              fontSize: '20px',
              width: '100%',
              marginTop: '20px',
              outline: 'none',
              padding: '10px',
              borderRadius: '20px',
              resize: 'none',
            }}
          >

          </textarea>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            onClick={handlePostEdit}
            loading={isLoading}
            startDecorator={<EditIcon />}
          >
            Edit Caption
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const EditPostButton = ({post}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
        <ListItem onClick={handleOpen} disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Caption" />
            </ListItemButton>
        </ListItem>
        <PostEditModal open={open} handleClose={handleClose} post={post} />
    </>
  );
};

export default EditPostButton;
