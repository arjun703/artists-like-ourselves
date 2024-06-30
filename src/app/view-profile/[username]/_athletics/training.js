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


import MoreActions from "../_components/more_menu_view_profile";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import DialogBox from "../_video/dialog";
import DialogContentText from '@mui/material/DialogContentText';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function AddNewOrEditTrainingForm({defaultTrainingInfo=false, handleCancel, handleSubmit}){
    const isMobile = window.innerWidth < 500

    let initialTrainingInfo;

    const [isLoading, setIsLoading] = useState(false)

    if (defaultTrainingInfo) {
        initialTrainingInfo = defaultTrainingInfo.info;
    } else {
        initialTrainingInfo = {
            training_for_sport: '',
            years_of_training: '',
            training_notes: ''
        };
    }

    const [trainingInfo, setTrainingInfo] = useState(initialTrainingInfo);

    const handleChange = (value, prop) => {
        setTrainingInfo(prevState => ({
            ...prevState,
            [prop]: value
        }));
    }

    const validateEditOrAddNew = async ()=>{
        if(trainingInfo.training_for_sport.trim().length ==0 || 
            (trainingInfo.years_of_training.trim().length == 0 || trainingInfo.training_notes.trim().length ==0 )){
                alert('Please fill missing fieldS.')
                return
        }
        setIsLoading(true)
        const result = await handleSubmit(trainingInfo)    
        if(!result){
            setIsLoading(false)
        }
    }

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
                    <Button onClick={validateEditOrAddNew} variant="solid" loading={isLoading} loadingPosition="start"  
                    startDecorator={ !defaultTrainingInfo ? <AddCircleIcon/> : <ModeEditIcon />}>
                        {defaultTrainingInfo ? 'Edit': 'Add'}
                    </Button>
                </Grid>
            </Grid>   
            <Grid container spacing={2}>

                <Grid item xs={12}  >
                    <FormControl fullWidth>
                        <TextField onChange={(e)=>handleChange(e.target.value, 'training_for_sport')} value={trainingInfo.training_for_sport} label="Training for Sport" placeholder="e.g. Football" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={12}  >
                    <FormControl fullWidth>
                        <TextField  onChange={(e)=>handleChange(e.target.value, 'years_of_training')}   value={trainingInfo.years_of_training}  label="Years of Training"  placeholder="e.g., 1 year 2 months" variant="outlined" />
                    </FormControl>
                </Grid>
                

                <Grid item xs={12}  >
                    <FormControl fullWidth>
                        <TextField value={trainingInfo.training_notes}   onChange={(e)=>handleChange(e.target.value, 'training_notes')} label="Training Description"  variant="outlined" />
                    </FormControl>
                </Grid>
            
            </Grid>
            <div style={{display:'flex', marginTop: '20px',  justifyContent: 'center'}}>
                <Button variant="solid" onClick={validateEditOrAddNew} loading={isLoading} loadingPosition="start" 
                    startDecorator={ !defaultTrainingInfo ? <AddCircleIcon/> : <ModeEditIcon />}>
                    {defaultTrainingInfo ? 'Edit': 'Add'}  Training    
                </Button>            
            </div>
        </>
    )
}




export default function Training({isEditable, trainings, handleAddNew, handleEdit, handleDelete}){
    
    const [isAddingNewTraining, setIsAddinNewTraining] = useState(false)
    const [isEditingTraining, setIsEditingTraining] = useState({ isEditing: false, training: false })
    const [isDeletingTraining, setIsDeletingTraining] = useState({ isWaitingDeletion: false, training: false })

    const initiateAddNewTraining = () => { setIsAddinNewTraining(true) }
    const initiateEditTraining = (training) => { setIsEditingTraining({ isEditing: true, training: training }) }
    const initiateDeleteTraining = (training) =>{setIsDeletingTraining({isWaitingDeletion: true, training: training})}

    const closeAddNewTraining = () => { setIsAddinNewTraining(false) }
    const closeEditTraining = () => { setIsEditingTraining({ isEditing: false, training: false }) }
    const closeDeleteTraining =() => {setIsDeletingTraining({isWaitingDeletion: false, training: false})}

    const handleAddTraining = async (trainingInfo) => {
        const result = await handleAddNew(trainingInfo); 
        if(result){
            closeAddNewTraining() 
        }
    }

    const handleEditTraining = async (trainingInfo) => { 
        const result = await handleEdit( {id: isEditingTraining.training.id, info:  trainingInfo})
        if(result){
            closeEditTraining()
            return true
        }else{
            return false
        }
    }

    const handleDeleteTraining = async () => { 
        const result = await handleDelete(isDeletingTraining.training.id) 
        if(result){
            closeDeleteTraining()
            return true
        }
        return false;
    }   
   
    return(
        <>
            <Paper sx={{padding: {xs: 1, md: 2}}}>
                {
                    isAddingNewTraining && (
                        <AddNewOrEditTrainingForm
                            defaultTrainingInfo={false} 
                            handleCancel={closeAddNewTraining} 
                            handleSubmit={handleAddTraining}
                        />
                    )
                }
                {
                    isEditingTraining.isEditing && (
                        <AddNewOrEditTrainingForm 
                            defaultTrainingInfo={isEditingTraining.training} 
                            handleCancel={closeEditTraining} 
                            handleSubmit={handleEditTraining}
                        />
                    )
                }
                {
                    ( !isEditingTraining.isEditing && !isAddingNewTraining ) && (
                        <>
                            <Grid container sx={{alignItems: 'center', marginBottom: '20px'}}>
                                <Grid item auto>
                                    <h3 style={{margin: 0}}>Training</h3>
                                </Grid>
                                <Grid item xs sx={{margin: '0 20px'}}>      
                                    <Divider></Divider>
                                </Grid>
                                {
                                    isEditable?(
                                        <Grid item auto>
                                            <Button variant="outlined" onClick={initiateAddNewTraining}>Add New</Button>
                                        </Grid>
                                    ):(
                                        <></>
                                    )
                                }
                            </Grid>                             
                            <Trainings 
                                trainings={trainings}
                                isEditable={isEditable}
                                handleEdit={initiateEditTraining}
                                handleDelete={initiateDeleteTraining}
                            />
                        </>
                    )
                }
            </Paper>
            {
                isDeletingTraining.isWaitingDeletion && (
                    (
                        <DialogBox
                            maxWidth='xs' 
                            dialogTitle='Delete Additional Sport'
                            dialogContent={<DialogContentText>Are you sure to delete?</DialogContentText>}
                            handleCancel={closeDeleteTraining}
                            handleConfirm={handleDeleteTraining}
                        />
                    )
                )
            }
        </>
    )
}



function Trainings({isEditable, trainings, handleEdit, handleDelete}){
    const isMobile = window.innerWidth < 500
    return (
        <TransitionGroup >
            <Grid sx={{marginTop: '5px'}}  container spacing={2}>
                {
                    trainings.map(({id, info}, index) => {
                        if (typeof info === 'string') {
                            info = JSON.parse(info)
                        }
                        if(!info)return(<></>)
                        let  {training_for_sport, years_of_training, training_notes} = info
                        return (
                            
                            <Grid key={index} item xs={12} sm={6} md={4} sx={{position: 'relative', '&:hover .tooltip': {display: 'block'} }} >
                                <div class="grid-inner" style={{position: 'relative'}}>
                                    <Paper sx={{ padding: 1 }} elevation={2}>
                                        <div>Training for <h4 style={{ margin: '10px 0', display:'inline-block' }}> {training_for_sport}</h4></div>
                                        <i><strong>{years_of_training}</strong> years of training</i>
                                        <p>{training_notes}</p>
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
                                                                label:'Edit '+training_for_sport, 
                                                                icon: <ModeEditIcon variant='small' />,
                                                                handler: ()=>{handleEdit({id: id, info: info})}
                                                            },
                                                            {
                                                                label:'Delete '+training_for_sport, 
                                                                icon: <DeleteIcon variant='small' />,
                                                                handler: ()=>{handleDelete({id: id, info: info})}
                                                            }
                                                        ]
                                                    } 
                                                />
                                            </Tooltip>
                                        </div>
                                        ):(
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
