import { Paper } from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Grid, Stack, Container, Box} from "@mui/material";
import Button from '@mui/joy/Button';
import { useState } from "react";
import YouTubeIcon from '@mui/icons-material/YouTube';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import ImageIcon from '@mui/icons-material/Image';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import {Divider} from "@mui/material";
import RotateRightRoundedIcon from '@mui/icons-material/RotateRightRounded';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export default function AddNewVideoForm({handleAddNewVideoYouTube, handleAddNewVideoCustom, handleCancelAddNewVideo}){

    const [youtubeOrCustom, setYoutubeOrCustom] = useState('custom');
    
    const handleVideoSourceChange = () => {
        youtubeOrCustom === 'custom' ? setYoutubeOrCustom('youtube') : setYoutubeOrCustom('custom')
    }

    const handleCustomUpload = (title, thumbNail, video) => {
        handleAddNewVideoCustom(title, thumbNail, video)
    }

    const handleYoutubeUpload = (videoTitle, videoURL) => {
        handleAddNewVideo(videoTitle, videoURL, 'youtube')
    }   

    return(
        <Paper sx={{marginTop: {md: '20px', xs: '0px'}, padding: {md: '20px', xs: '15px 5px'}}}>
            <Grid container sx={{ alignItems: 'center'}}>
                <Grid item auto>
                    <Button onClick={handleCancelAddNewVideo} variant="plain" startDecorator={<ArrowBackIosIcon />}>
                        Videos
                    </Button>
                </Grid>
                
                <Grid item xs sx={{padding: '0 20px'}}>
                    <Divider></Divider>
                </Grid>

                <Grid item auto>
                    <Button onClick={handleVideoSourceChange} variant="outlined" 
                        startDecorator={
                            youtubeOrCustom === 'custom'
                                ? <YouTubeIcon sx={{color:'red'}} />
                                : <CloudUploadIcon />
                        }
                    >
                        {   youtubeOrCustom === 'custom' ? 'Add from Youtube': 'Upload from Device' }
                    </Button>
                </Grid>
            </Grid>
            <Box>
                {
                    youtubeOrCustom === 'custom'
                        ? <DisplayCustomUpoadForm handleCustomUpload={handleCustomUpload} />
                        : <DisplayYoutubeImportForm handleYoutubeUpload={handleAddNewVideoYouTube} />
                }
            </Box>
        </Paper>
    )

}



function DisplayCustomUpoadForm({handleCustomUpload}){

    const [title, setTitle] = useState(null)
    const [thumbNail, setThumbnail] = useState(null)
    const [thumbNailTitle, setThumbnailTitle]= useState('')
    const [videoTitle, setVideoTitle] = useState('')
    const [video, setVideo] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleCustomVideoUploadInner = ()=>{
        if(!title || !thumbNail || !video){
            alert("Please fill up all the fields")
            return
        }
        setIsLoading(true)
        handleCustomUpload(title, thumbNail, video)
    }

    return(
        <>
            <Container style={{width: '100%', maxWidth: '450px', padding:0 }} >
                <Paper sx={{margin: 3, padding: 2}}>
                    <Stack direction={'column'} spacing={2}>
                        <TextField 
                            id="outlined-basic" 
                            label="Title" 
                            onChange={(e)=>setTitle(e.target.value)}
                            variant="outlined" 
                        />
                        <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            tabIndex={-1}
                            startDecorator={<ImageIcon />}
                        >
                            {thumbNailTitle == '' ? 'Select Thumbnail' : thumbNailTitle + '(Change)'}
                            <VisuallyHiddenInput
                                onChange={(e)=>{
                                    const file= e.target.files[0] || null;
                                    if(file){                                    
                                        setThumbnail(file)
                                        setIsLoading(false)
                                        setThumbnailTitle(file.name)
                                    }else{
                                        setIsLoading(false)
                                        setThumbnailTitle('')
                                        setThumbnail(false)
                                    }
                                }} 
                                type="file" 
                            />
                        </Button>
                        <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            tabIndex={-1}
                            startDecorator={<VideoFileIcon />}
                        >
                            {videoTitle == '' ? 'Select Video' : videoTitle + '(Change)'}
                            <VisuallyHiddenInput
                                onChange={(e)=>{
                                    const file = e.target.files[0] || null;
                                    if(file){
                                        setVideo(file)
                                        setVideoTitle(file.name)
                                    }else{
                                        setVideo(null)
                                        setVideoTitle('')
                                    }
                                }}       
                                type="file"     
                            />
                        </Button>
                    </Stack>
                    <hr style={{margin: '6px 0', opacity: 0}}></hr>
                    <div style={{display:'flex', justifyContent: 'center'}}>
                        <Button
                            variant="solid"
                            onClick={handleCustomVideoUploadInner}
                            loading={isLoading}
                            startDecorator={ <CloudUploadIcon />}
                        >
                            Upload Video
                        </Button>
                    </div>
                </Paper>
            </Container>
        </>
    );
}

function DisplayYoutubeImportForm ({handleYoutubeUpload}){
    
    const [videoTitle, setVideoTitle] = useState('');
    const [videoURL , setVideoURL] = useState('')
    const [isLoading, setIsLoading]  = useState(false)
    const handleUploadInner = () => {
        if(videoTitle.trim().length === 0 || videoURL.trim().length === 0){
            setIsSnackBarOpen(true)
        }else{
            setIsLoading(true)
            handleYoutubeUpload(videoTitle, videoURL)
        }
    }
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
    return(
        <>
            <Container id="hello" style={{width: '100%', maxWidth: '450px', padding:0 }}>
                <Paper sx={{margin: 3, padding: 2}}>
                    <Stack direction={'column'} spacing={2}>
                        <TextField
                            label="Title" 
                            variant="outlined"
                            onChange={(e)=>{setIsLoading(false); setVideoTitle(e.target.value)}}
                        />
                        <TextField 
                            label="YouTube Video URL" 
                            onChange={(e)=>{setIsLoading(false);setVideoURL(e.target.value)}}
                            variant="outlined" 
                        />
                    </Stack>
                    <hr style={{margin: '6px 0', opacity: 0}}></hr>
                    <div style={{display:'flex', justifyContent: 'center'}}>
                        <Button
                            variant="solid"
                            onClick={handleUploadInner}
                            loading={isLoading}
                            startDecorator={<CloudUploadIcon />}
                        >
                            Import from YouTube
                        </Button>
                    </div>
                </Paper>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}
                    open={isSnackBarOpen}
                    TransitionComponent={Slide}
                    variant={''}
                    autoHideDuration={3000}
                    onClose={()=>{setIsSnackBarOpen(!isSnackBarOpen)}}
                    message="Fill in all the fields"
                />
            </Container>
        </>
    );
}


