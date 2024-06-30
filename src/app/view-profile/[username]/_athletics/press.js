import { Paper, Grid,FormControl,Tooltip,InputLabel, TextField , Select, MenuItem,  IconButton, Collapse,  Divider, Menu } from "@mui/material"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { TransitionGroup } from 'react-transition-group';
import SchoolIcon from '@mui/icons-material/School';
import { useState, useEffect } from "react";
import {  LocalizationProvider ,DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Graduate } from "next/font/google";
import Button from '@mui/joy/Button';
import { isatty } from "tty";
import { PresentToAll } from "@mui/icons-material";
import MoreActions from "../_components/more_menu_view_profile";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import DialogBox from "../_video/dialog";
import DialogContentText from '@mui/material/DialogContentText';
import { COMPILER_INDEXES } from "next/dist/shared/lib/constants";


function AddNewOrEditPressOrInterviewForm({defaultPressOrInterviewInfo=false, handleCancel, handleSubmit}){
    
    let initialPressOrInterviewInfo;

    const [isLoading, setIsLoading] = useState(false)

    if (defaultPressOrInterviewInfo) {
        initialPressOrInterviewInfo = defaultPressOrInterviewInfo.info;
    } else {
        initialPressOrInterviewInfo = {
            title: '',
            link: '',
            short_description: ''
        };
    }

    const [pressOrInterviewInfo, setPressOrInterviewInfo] = useState(initialPressOrInterviewInfo);

    const handleChange = (value, prop) => {
        setPressOrInterviewInfo(prevState => ({
            ...prevState,
            [prop]: value
        }));
    }

    const validateEditOrAddNew = async ()=>{
        if(pressOrInterviewInfo.title.trim().length ==0 || 
            (pressOrInterviewInfo.link.trim().length == 0 && pressOrInterviewInfo.short_description.trim().length ==0 )){
                alert('Please fill missing field')
                return
        }
        setIsLoading(true)
        const result = await handleSubmit(pressOrInterviewInfo)    
        if(!result){
            setIsLoading(false)
        }
    }

    const isMobile = window.innerWidth < 500

    return(
        <>
            <Grid container sx={{alignItems: 'center',paddingBottom: '15px'}}>
                <Grid item auto onClick={handleCancel}>
                    <Button  variant="plain"  startDecorator={<ArrowBackIosIcon />}>Cancel</Button>
                </Grid>
                <Grid item  xs sx={{margin: '0 20px'}}>
                    <Divider ></Divider>
                </Grid>
                <Grid sx={{display: isMobile?'flex': 'none'}} item auto>
                    <Button onClick={validateEditOrAddNew} loading={isLoading} variant="solid"  startDecorator={<SchoolIcon />}>
                        {defaultPressOrInterviewInfo ? 'Edit' : 'Add'}
                    </Button>
                </Grid>
            </Grid>   

            <Grid container spacing={2}>

                <Grid item xs={12}  >
                    <FormControl fullWidth>
                        <TextField onChange={(e)=>{handleChange(e.target.value, 'title')}} value={pressOrInterviewInfo.title}  label="Title" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={12}  >
                    <FormControl fullWidth>
                        <TextField onChange={(e)=>{handleChange(e.target.value, 'link')}} value={pressOrInterviewInfo.link} label="Link" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={12}  >
                    <FormControl fullWidth>
                        <TextField onChange={(e)=>{handleChange(e.target.value, 'short_description')}} value={pressOrInterviewInfo.short_description} label="Short Description" variant="outlined" />
                    </FormControl>
                </Grid>
                
            </Grid>
            <div style={{display:'flex', marginTop: '20px',  justifyContent: 'center'}}>
                <Button onClick={validateEditOrAddNew} variant="solid" loadingPosition="start" loading={isLoading}>
                    {defaultPressOrInterviewInfo ? 'Edit Press/Interview': 'Add Press/Interview'}
                </Button>
            </div>
        </>
    );
}


export default function PressOrInterview({isEditable, pressesOrInterviews, handleAddNewPressOrInterview, handleEditPressOrInterview, handleDeletePressOrInterview}){
    
    const [addingNewPressOrInterview, setAddingNewPressOrInterview] = useState(false)
    const [editingPressOrInterview, setEditingPressOrInterview] = useState({ isEditing: false, pressOrInterview: false })
    const [deletingPressOrInterview, setDeletingPressOrInterview] = useState({ isWaitingDeletion: false, pressOrInterview: false })

    const handleInitiateAddNewPressOrInterview = () => { setAddingNewPressOrInterview(true) }
    const handleInitiateEditPressOrInterview = (pressOrInterview) => { setEditingPressOrInterview({ isEditing: true, pressOrInterview: pressOrInterview }) }
    const handleInitiateDeletePressOrInterview = (pressOrInterview) =>{setDeletingPressOrInterview({isWaitingDeletion: true, pressOrInterview: pressOrInterview})}

    const closeAddNewPressOrInterview = () => { setAddingNewPressOrInterview(false) }
    const closeEditPressOrInterview = () => { setEditingPressOrInterview({ isEditing: false, pressOrInterview: false }) }
    const closeDeletePressOrInterview =() => {setDeletingPressOrInterview({isWaitingDeletion: false, pressOrInterview: false})}

    const handleAddPressOrInterviewInner = async (pressOrInterviewInfo) => {
        const result = await handleAddNewPressOrInterview(pressOrInterviewInfo); 
        if(result){
            closeAddNewPressOrInterview() 
        }
    }

    const handleEditPressOrInterviewInner = async (pressOrInterviewInfo) => { 
        const result = await handleEditPressOrInterview( {id: editingPressOrInterview.pressOrInterview.id, info:  pressOrInterviewInfo})
        if(result){
            closeEditPressOrInterview()
            return true
        }else{
            return false
        }
    }

    const handleDeletePressOrInterviewInner = async () => { 
        const result = await handleDeletePressOrInterview(deletingPressOrInterview.pressOrInterview.id) 
        if(result){
            closeDeletePressOrInterview()
            return true
        }
        return false;
    }

    return(
        <>
            <Paper sx={{padding: {xs: 1, md: 2}}}>
                {
                    addingNewPressOrInterview && (
                        <AddNewOrEditPressOrInterviewForm
                            defaultPressOrInterviewInfo={false}
                            handleCancel={closeAddNewPressOrInterview}
                            handleSubmit={handleAddPressOrInterviewInner} 
                        />
                    )
                }
                {
                    editingPressOrInterview.isEditing && (
                        <AddNewOrEditPressOrInterviewForm
                            defaultPressOrInterviewInfo={editingPressOrInterview.pressOrInterview}
                            handleCancel={closeEditPressOrInterview}
                            handleSubmit={handleEditPressOrInterviewInner}
                        />
                    )
                }
                {
                    ( !editingPressOrInterview.isEditing && !addingNewPressOrInterview ) && (
                        <>
                            <Grid container sx={{alignItems: 'center', marginBottom: '20px'}}>
                                <Grid item auto>
                                    <h3 style={{margin: 0}}>Presses / Interviews</h3>
                                </Grid>
                                <Grid item xs sx={{margin: '0 20px'}}>      
                                    <Divider></Divider>
                                </Grid>
                                {
                                    isEditable ? (
                                        <Grid item auto>
                                            <Button variant="outlined" onClick={handleInitiateAddNewPressOrInterview}>Add New</Button>
                                        </Grid>
                                    ): (
                                        <></>
                                    )
                                }

                            </Grid>                             
                            <PressesOrInterviews
                                isEditable={isEditable} 
                                pressesOrInterviews={pressesOrInterviews}
                                handleEdit={handleInitiateEditPressOrInterview}
                                handleDelete={handleInitiateDeletePressOrInterview}
                            />
                        </>
                    )
                }
            </Paper>
            {
                deletingPressOrInterview.isWaitingDeletion && (
                    (
                        <DialogBox
                            maxWidth='xs' 
                            dialogTitle='Delete Press/Interview'
                            dialogContent={<DialogContentText>Are you sure to delete?</DialogContentText>}
                            handleCancel={closeDeletePressOrInterview}
                            handleConfirm={handleDeletePressOrInterviewInner}
                        />
                    )
                )
            }
        </>
    )
}

function PressesOrInterviews({isEditable, pressesOrInterviews, handleEdit, handleDelete}){

    const isMobile = window.innerWidth < 500
    return (
        <TransitionGroup >
            <Grid sx={{marginTop: '5px'}}  container spacing={2}>
                {
                    pressesOrInterviews.map(({id, info}, index) => {
                        if (typeof info === 'string') {
                            info = JSON.parse(info)
                        }
                        let  {title, link, short_description} = info
                        return (
                            
                            <Grid key={COMPILER_INDEXES}  item xs={12} sm={6} md={4} sx={{position: 'relative', '&:hover .tooltip': {display: 'block'} }} >
                                <div class="grid-inner" style={{position: 'relative'}}>
                                    <Paper sx={{ padding: 1 }} elevation={2}>
                                        <h4 style={{ margin: '5px 0' }}>{title}</h4>
                                        <i>{link}</i>
                                        <p>{short_description}</p>
                                    </Paper>
                                    {
                                        isEditable ? (

                                            <div className="tooltip-wrapper"  
                                            style={{position:'absolute', display: !isMobile ? 'none': 'block!important',  bottom: '10px', right: '10px'}} 
                                        >
                                            <Tooltip   title="Options">
                                                <MoreActions 
                                                    menuitems={
                                                        [
                                                            {
                                                                label:'Edit Press/Interview', 
                                                                icon: <ModeEditIcon variant='small' />,
                                                                handler: ()=>{handleEdit({id: id, info: info})}
                                                            },
                                                            {
                                                                label:'Delete Press/Interview', 
                                                                icon: <DeleteIcon variant='small' />,
                                                                handler: ()=>{handleDelete({id: id, info: info})}
                                                            }
                                                        ]
                                                    } 
                                                />
                                            </Tooltip>
                                        </div>

                                        ): (
                                            <></>
                                        )
                                    }
                                </div>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </TransitionGroup>
    )
}