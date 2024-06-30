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
import { styled } from '@mui/material/styles';

const coachTypeOptions = [
    {label: 'Club Coach', id: 'club'},
    {label: 'Juniors Coach', id: 'junior'},
    {label: 'Private', id: 'private'}
]

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


function AddNewOrEditCoachForm({defaultCoachInfo=false, handleCancel, handleSubmit}){

    const isMobile = window.innerWidth < 500

    let initialCoachInfo;

    const [isLoading, setIsLoading] = useState(false)


    if (defaultCoachInfo) {
        initialCoachInfo = defaultCoachInfo.info;
    } else {
        initialCoachInfo = {
            coach_name: '',
            coach_type: '',
            phone: '',
            email: '',
            team: '',
            accredeted_coaching_license: '',
            interested: '',
            accredeted_coaching_license_file: ''
        };
    }

    const [coachInfo, setCoachInfo] = useState(initialCoachInfo);

    const handleChange = (value, prop) => {
        setCoachInfo(prevState => ({
            ...prevState,
            [prop]: value
        }));
    }

    const validateEditOrAddNew = async ()=>{
        if(coachInfo.coach_name.trim().length ==0 || 
            (coachInfo.coach_type.trim().length == 0 || coachInfo.coach_type.trim().length ==0 )){
                alert('Please fill at least coach name and coach type fields.')
                return
        }
        setIsLoading(true)
        const result = await handleSubmit(coachInfo)    
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
                    startDecorator={ !defaultCoachInfo ? <AddCircleIcon/> : <ModeEditIcon />}>
                        {defaultCoachInfo ? 'Edit': 'Add'}
                    </Button>                
                </Grid>
            </Grid>   
            <Grid container spacing={2}>

                <Grid item xs={12} sm={6}  >
                    <FormControl fullWidth>
                        <TextField  value={coachInfo.coach_name}   onChange={(e)=>handleChange(e.target.value, 'coach_name')}  label="Coach Name" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}  >
                    <FormControl fullWidth>
                        <InputLabel id="add-new-coach">Coach Type</InputLabel>
                        <Select
                            labelId="add-new-coach"
                            label="Coach Type"
                            value={coachInfo.coach_type}   onChange={(e)=>handleChange(e.target.value, 'coach_type')} 
                        >   
                            {coachTypeOptions.map(({label, id},i) => (<MenuItem key={i} value={id}  >{label}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}  >
                    <FormControl fullWidth>
                        <TextField  value={coachInfo.phone}   onChange={(e)=>handleChange(e.target.value, 'phone')}  label="Coach Phone" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}  >
                    <FormControl fullWidth>
                        <TextField value={coachInfo.email}   onChange={(e)=>handleChange(e.target.value, 'email')}   label="Coach Email" variant="outlined" />
                    </FormControl>
                </Grid>

                
                <Grid item xs={12} sm={6}  >
                    <FormControl fullWidth>
                        <TextField value={coachInfo.team}   onChange={(e)=>handleChange(e.target.value, 'team')}  label="Team Name" variant="outlined" />
                    </FormControl>
                </Grid>


                <Grid item xs={12} sm={6}  >
                    <FormControl fullWidth>
                        <InputLabel id="add-new-coach-interested">Interested to Share your activity to coach in future?</InputLabel>
                        <Select
                            labelId="add-new-coach-interested"
                            value={coachInfo.interested}   
                            onChange={(e)=>handleChange(e.target.value, 'interested')} 
                            label="Interested to Share your activity to coach in future?"
                        >   
                            {[{label: 'Yes', id: 'yes'},{label: 'No', id: 'no'}].map(({label, id},i) => (<MenuItem key={i} value={id}  >{label}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}  >
                    <FormControl fullWidth>
                        <TextField 
                            value={coachInfo.accredeted_coaching_license}   
                            onChange={(e)=>handleChange(e.target.value, 'accredeted_coaching_license')}  
                            label="Link to Accredited Coaching license" 
                            variant="outlined" 
                        />
                    </FormControl>
                </Grid>
                {
                    defaultCoachInfo === false && 
                    <Grid item xs={12} sm={6}  >
                        <FormControl fullWidth>
                            <Button                       
                                component="label"
                                role={undefined}
                                variant="outlined"
                                tabIndex={-1}
                            >
                                {coachInfo.accredeted_coaching_license_file?.name || 'Upload Accredeted Coaching License'}
                                <VisuallyHiddenInput 
                                    onChange={(e)=>{
                                        const file= e.target.files[0] || '';
                                        if(file){     
                                            handleChange(file, 'accredeted_coaching_license_file')
                                        }else{
                                            handleChange('', 'accredeted_coaching_license_file')
                                        }
                                    }} 
                                    type="file" 
                                />
                            </Button>
                        </FormControl>
                    </Grid>
                }
 

            </Grid>
            <div style={{display:'flex', marginTop: '20px',  justifyContent: 'center'}}>
                <Button variant="solid" onClick={validateEditOrAddNew} loading={isLoading} loadingPosition="start" 
                    startDecorator={ !defaultCoachInfo ? <AddCircleIcon/> : <ModeEditIcon />}>
                    {defaultCoachInfo ? 'Edit': 'Add'}  Coach    
                </Button> 
            </div>
        </>
    );
}



export default function Coach({isEditable, coaches, handleAddNew, handleEdit, handleDelete}){
    
    const [isAddingNewCoach, setIsAddingNewCoach] = useState(false)
    const [isEditingCoach, setIsEditingCoach] = useState({ isEditing: false, coach: false })
    const [isDeletingCoach, setIsDeletingCoach] = useState({ isWaitingDeletion: false, coach: false })

    const initiateAddNewCoach = () => { setIsAddingNewCoach(true) }
    const initiateEditCoach = (coach) => { setIsEditingCoach({ isEditing: true, coach: coach }) }
    const initiateDeleteCoach = (coach) =>{setIsDeletingCoach({isWaitingDeletion: true, coach: coach})}

    const closeAddNewCoach = () => { setIsAddingNewCoach(false) }
    const closeEditCoach = () => { setIsEditingCoach({ isEditing: false, coach: false }) }
    const closeDeleteCoach =() => {setIsDeletingCoach({isWaitingDeletion: false, coach: false})}

    const handleAddNewCoach = async (coachInfo) => {
        const result = await handleAddNew(coachInfo); 
        if(result){
            closeAddNewCoach() 
        }
    }

    const handleEditCoach = async (coachInfo) => { 
        const result = await handleEdit( {id: isEditingCoach.coach.id, info:  coachInfo})
        if(result){
            closeEditCoach()
            return true
        }else{
            return false
        }
    }

    const handleDeleteCoach = async () => { 
        const result = await handleDelete(isDeletingCoach.coach.id) 
        if(result){
            closeDeleteCoach()
            return true
        }
        return false;
    }   
    return(
        <>
            <Paper sx={{padding: {xs: 1, md: 2}}}>
                {
                    isAddingNewCoach && (
                        <AddNewOrEditCoachForm 
                            defaultCoachInfo={false}
                            handleCancel={closeAddNewCoach}
                            handleSubmit={handleAddNewCoach} 
                        />
                    )
                }
                {
                    isEditingCoach.isEditing && (
                        <AddNewOrEditCoachForm 
                            defaultCoachInfo={isEditingCoach.coach}
                            handleCancel={closeEditCoach}
                            handleSubmit={handleEditCoach}
                        />
                    )
                }
                {
                    ( !isEditingCoach.isEditing && !isAddingNewCoach ) && (
                        <>
                            <Grid container sx={{alignItems: 'center', marginBottom: '20px'}}>
                                <Grid item auto>
                                    <h3 style={{margin: 0}}>Coaches</h3>
                                </Grid>
                                <Grid item xs sx={{margin: '0 20px'}}>      
                                    <Divider></Divider>
                                </Grid>
                                {
                                    isEditable ? (
                                        <Grid item auto>
                                            <Button variant="outlined" onClick={initiateAddNewCoach}>Add New</Button>
                                        </Grid>
                                    ):(
                                        <></>
                                    )
                                }

                            </Grid>                             
                            <Coaches 
                                coaches={coaches}
                                isEditable={isEditable}
                                handleEdit={initiateEditCoach}
                                handleDelete={initiateDeleteCoach}
                            />
                        </>
                    )
                }
            </Paper>
            {
                isDeletingCoach.isWaitingDeletion && (
                    (
                        <DialogBox
                            maxWidth='xs' 
                            dialogTitle='Delete Coach'
                            dialogContent={<DialogContentText>Are you sure to delete?</DialogContentText>}
                            handleCancel={closeDeleteCoach}
                            handleConfirm={handleDeleteCoach}
                        />
                    )
                )
            }
        </>
    )
}


function Coaches({isEditable, coaches, handleEdit, handleDelete}){
    const isMobile = window.innerWidth < 500
    return (
        <TransitionGroup >
            <Grid sx={{marginTop: '5px'}}  container spacing={2}>
                {
                    coaches.map(({id, info}, index) => {
                        if (typeof info === 'string') {
                            info = JSON.parse(info)
                        }
                        if(!info)return(<></>)
                        let  {accredeted_coaching_license, coach_name, coach_type, phone, email, team} = info
                        coach_type = coachTypeOptions.filter(({id}) => id == coach_type)[0]['label']

                        return (
                            
                            <Grid key={index}  item xs={12} sm={6} sx={{position: 'relative', '&:hover .tooltip': {display: 'block'} }} >
                                <div class="grid-inner" style={{position: 'relative'}}>
                                    <Paper sx={{ padding: 1 }} elevation={2}>
                                        <h4 style={{ margin: '10px 0'}}> {coach_name}</h4>
                                        <i>{coach_type}</i>
                                        {
                                            phone.trim().length && (
                                                <div>{phone}</div>
                                            ) || ''
                                        }
                                        {
                                            email.trim().length && (
                                                <div><i>{email}</i></div>
                                            ) || ''
                                        }
                                        {
                                            team.trim().length && (
                                                <div>
                                                    Team <i>{team}</i>
                                                </div>
                                            ) || ''
                                        }
                                        {
                                            accredeted_coaching_license.trim().length && (
                                                <div>
                                                    Accredited Coaching license: <i>{accredeted_coaching_license}</i>
                                                </div>
                                            ) || ''
                                        }
                                    </Paper>

                                    {isEditable
                                        ?(
                                        <div className="tooltip-wrapper"  
                                            style={{position:'absolute', display: !isMobile ? 'none': 'block!important',  bottom: '10px', right: '10px'}} 
                                        >
                                            <Tooltip   title="Options">
                                                <MoreActions 
                                                    menuitems={
                                                        [
                                                            {
                                                                label:'Edit coach '+coach_name, 
                                                                icon: <ModeEditIcon variant='small' />,
                                                                handler: ()=>{handleEdit({id: id, info: info})}
                                                            },
                                                            {
                                                                label:'Delete coach '+ coach_name, 
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