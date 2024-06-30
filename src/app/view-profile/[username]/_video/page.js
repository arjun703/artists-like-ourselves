import React, {useEffect, useState} from 'react';

import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';

import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { horizontalListSortingStrategy } from '@dnd-kit/sortable';

import {useSortable} from '@dnd-kit/sortable';

import {CSS} from '@dnd-kit/utilities';

import { Paper, IconButton, Typography } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddNewVideoForm from './add_new_video_form';
import Grow from '@mui/material/Grow';
import {Grid} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import DialogBox from './dialog';
import {pOSTRequest, dELETErequest} from '@/app/_components/file_upload';
import { VideoLibrary } from '@mui/icons-material';
import Button from '@mui/joy/Button';
import DialogContentText from '@mui/material/DialogContentText';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import FloatingActionButton from '@/app/_components/floating_action_btn';
import AddIcon from '@mui/icons-material/Add';

export default function Videos({username}) {
  const [videos, setVideos] = useState([]);
  const [addingNewVideo, setAddingNewVideo] = useState(false)
  const [haveDragChagesBeenMade, setHaveDragChagesBeenMade] = useState(false)
  const [isLoadingVideos, setIsLoadingVideos] = useState(false)
  const [editable, setEditable] = useState(false)
    useEffect(() => {
      async function fetchVideos() {
          try {
              setIsLoadingVideos(true)
              const response = await fetch('/api/video?username='+username); // Adjust the API endpoint URL as needed
              if (!response.ok) {
                  throw new Error('Failed to fetch videos');
              }
              const data = await response.json();
              setIsLoadingVideos(false)
              setVideos(data.videos);
              setEditable(data.editable)
          } catch (error) {
              alert( error.message)
          }
      }
      fetchVideos();

  }, []); 



  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const {active, over} = event;
    
    if (active.id !== over.id) {
      setHaveDragChagesBeenMade(true)
      setVideos((videos) => {
        console.log(active.id, over.id)
        const oldIndex = videos.indexOf(videos.filter(video => video.id === active.id)[0]);
        const newIndex = videos.indexOf(videos.filter(video => video.id === over.id)[0]);
        console.log(oldIndex, newIndex)
        const reOrderedVideos = arrayMove(videos, oldIndex, newIndex);
        console.log(reOrderedVideos)
        return reOrderedVideos
      });
    }
  }
  
  const handleSaveDragChanges = () => {
    setHaveDragChagesBeenMade(false)
  }

  const handleAddNewVideo = () => {
    setAddingNewVideo(true);
  }

  const saveAddedNewVideo = async (videoTitle, videoURL, videoType) => {
    const formData = new FormData();
    formData.append('title', videoTitle);
    formData.append('video_url', videoURL)
    const result = await pOSTRequest(formData, '/api/video/youtube/')
    if(result.success){
      setAddingNewVideo(!addingNewVideo)
      setTimeout(()=>{
        setVideos(prevVideos => [
          result.video,
          ...prevVideos
        ]);
      }, 100)
    }else{
      alert(result.msg)
    }
  }
  
  const handleAddNewVideoCustom= async (title, thumbNail, video)=>{
    const formData = new FormData();
    formData.append('title', title);
    formData.append('thumbnail', thumbNail)
    formData.append('video', video)
    const result = await pOSTRequest(formData, '/api/video/custom/')
    if(result.success){
      setAddingNewVideo(!addingNewVideo)

      setTimeout(()=>{
        setVideos(prevVideos => [
          result.video,
          ...prevVideos
        ]);
      }, 100)

    }else{
      alert(result.msg)
    }
  }

  const handleCancelAddNewVideo = () => {
    setAddingNewVideo(false)
  }

  const handleDelete = async (id)=>{
    const formData = new FormData();
    formData.append('video_id', id);
    const response  = await dELETErequest(formData,'/api/video/')
    if(response.success && response.video_id === id){
      setVideos(prevVideos => prevVideos.filter(pv => pv.id !== id ))
    }
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >

    {
      addingNewVideo
        && (
          <AddNewVideoForm 
            handleCancelAddNewVideo={handleCancelAddNewVideo} 
            handleAddNewVideoYouTube={saveAddedNewVideo} 
            handleAddNewVideoCustom={handleAddNewVideoCustom}
          />
        )
    }

      { videos.length && !addingNewVideo
          ? (
              <SortableContext 
                items={videos}
                strategy={verticalListSortingStrategy}
              >
                <Paper sx={{ p: {xs: '10px 5px', md: 3}, marginTop: {md: '20px', xs: '10px'}}}>
                  <TransitionGroup>
                    {
                      videos
                      .map((video,index) => 
                        <Collapse key={video.id} >
                          <SortableVideoItem handleDelete={handleDelete} video={video} key={'video-'+video.id}  id={'video-'+video.id} />
                        </Collapse>
                      )
                    }
                  </TransitionGroup>
                </Paper>
                <FloatingActionButton btnIcon={<AddIcon />} btnTitle='Add New Video' handler={handleAddNewVideo} />
              </SortableContext>
          )
          : ( !addingNewVideo &&
            <DisplayNoVideos editable={editable} isLoadingVideos={isLoadingVideos}  openAddNewVideoForm={handleAddNewVideo}/>
          )
        }
    </DndContext>
  );
  

}

function DisplayNoVideos({isLoadingVideos, openAddNewVideoForm, editable =false}){
  return(
    <Paper sx={{ p: {xs: '10px 5px', md: 3}, marginTop: '20px', paddingBottom: '30px'}}>
      {!isLoadingVideos &&
        <div style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
            <div>
                <div>
                    <VideoLibrary sx={{fontSize: '100px'}}/>
                </div>
                <div>
                    No any video has been added
                </div>
                {
                  editable ? (
                    <Button variant="plain" onClick={openAddNewVideoForm}>
                      ADD NEW
                    </Button>
                  ): (
                    <></>
                  )
                }

            </div>
        </div>
      }
      {isLoadingVideos && 
        <Stack spacing={1}>

          <Grid container sx={{alignItems: 'center'}} spacing={2}>
            <Grid item  auto><Skeleton variant="rectangular" width={200} height={80} /></Grid>
            <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
            <Grid item auto><Skeleton variant="circular" width={40} height={40} /></Grid>
          </Grid>

          <Grid container sx={{alignItems: 'center'}} spacing={2}>
            <Grid item  auto><Skeleton variant="rectangular" width={200} height={80} /></Grid>
            <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
            <Grid item auto><Skeleton variant="circular" width={40} height={40} /></Grid>
          </Grid>

          <Grid container sx={{alignItems: 'center'}} spacing={2}>
            <Grid item  auto><Skeleton variant="rectangular" width={200} height={80} /></Grid>
            <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
            <Grid item auto><Skeleton variant="circular" width={40} height={40} /></Grid>
          </Grid>

          <Grid container sx={{alignItems: 'center'}} spacing={2}>
            <Grid item  auto><Skeleton variant="rectangular" width={200} height={80} /></Grid>
            <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
            <Grid item auto><Skeleton variant="circular" width={40} height={40} /></Grid>
          </Grid>

          <Grid container sx={{alignItems: 'center'}} spacing={2}>
            <Grid item  auto><Skeleton variant="rectangular" width={200} height={60} /></Grid>
            <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
            <Grid item auto><Skeleton variant="circular" width={40} height={40} /></Grid>
          </Grid>

        </Stack>
    }
    </Paper>
  )
}


export function SortableVideoItem({video, handleDelete}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: video.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  const handleDeleteInner = async (id) => {
    await  handleDelete(id)
    handleCancel()
  }
  
  const [isWaitingForConfirmation, setIsWaitingForConfimation] = useState({waiting: false, id: false})

  const displayPrompt = (id) => {
    setIsWaitingForConfimation({waiting: true, id: id })
  }

  const handleCancel = () => {
    setIsWaitingForConfimation({waiting: false, id: false })
  }

  const [isWatchingThisVideo,setIsWatchingThisVideo] = useState(false)

  const handleCancelWatching = ()=>{
    setIsWatchingThisVideo(false)
  }

  return (
    <div style={style} >
      <Grid container sx={{alignItems: 'center', marginTop: '10px'}}>
        <Grid item auto>
          <div ref={setNodeRef} {...attributes} {...listeners}>
            <IconButton aria-label="share">
              <DragIndicatorIcon />
            </IconButton>
          </div>
        </Grid>
        <Grid item auto>
          <div
            onClick={()=> {setIsWatchingThisVideo(true)}}
          >
            {
              video.thumbnail_src?.length > 0 
              ? <img src={'/files/'+video.thumbnail_src} alt={video.title}  style={{borderRadius: '15px', marginRight: '15px', maxWidth: '150px', maxHeight: '150px' }} />
              : <img src={'/site-assets/default-video-thumb.png'} alt="Thumbnail"  style={{borderRadius: '15px', marginRight: '15px', maxWidth: '150px', maxHeight: '150px' }} />
            }
          </div>
        </Grid>
        <Grid item xs>
          <div>
            <Typography variant="body2" color="text.secondary">
              {video.title}
            </Typography>
          </div>
        </Grid>
        <Grid item auto sx={{justifyContent: 'flex-end', paddingLeft: '5px'}}>
          <div >
            <IconButton><DeleteIcon onClick={()=>{displayPrompt(video.id)}} /></IconButton>
          </div>
        </Grid>
      </Grid>
      {
        isWaitingForConfirmation.waiting && 
        <DialogBox 
          maxWidth='xs'
          dialogTitle="Delete video" 
          dialogContent={<DialogContentText>Are you sure to delete?</DialogContentText>}
          handleConfirm = {() => {handleDeleteInner(isWaitingForConfirmation.id)}}
          handleCancel = {handleCancel}
        />
      }

      {
        isWatchingThisVideo && 
        <DialogBox 
          maxWidth='lg'
          dialogTitle={'Watch '+ video.title} 
          dialogContent={<WatchVideoBody video={video} />}
          handleCancel = {handleCancelWatching}
        />
      }

    </div>
  );
}

function WatchVideoBody({video}){
  const isLarger = window.innerWidth > 500
  return(
    <>
      {
        video.type=='youtube' &&
        <div className="video-container" style={{justifyContent:'center', background:'black', display: 'flex'}}>
            <iframe
                style={{border:'none', width: isLarger ? '60%' : '100%' , aspectRatio: '16/9'}}
                src={getYoutubeEmbedUrl(video.video_src)}
                
                title="YouTube Video"
            ></iframe>
        </div>
      }
      {
        video.type=='custom' &&
        <div className="video-container" style={{ background:'black',justifyContent:'center', display: 'flex'}}>
            <video style={{ width: isLarger ? '60%' : '100%' , aspectRatio: '16/9'}} controls >
                <source src={'/files/'+video.video_src}  />
                Your browser does not support the video tag.
            </video>
        </div>
      }
    </>
  )
}

function getYoutubeEmbedUrl(youtubeUrl) {
  // Regular expression to extract the video ID from YouTube URLs
  const videoIdRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = youtubeUrl.match(videoIdRegex);

  if (match) {
      const videoId = match[1];
      // Construct the embed URL
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return embedUrl;
  } else {
      // Handle invalid YouTube URL
      return null;
  }
}
