import { Paper, Grid,FormControl,Tooltip,InputLabel, TextField , Select, MenuItem,  IconButton, Collapse,  Divider, Menu } from "@mui/material"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { TransitionGroup } from 'react-transition-group';
import SchoolIcon from '@mui/icons-material/School';
import { useState, useEffect } from "react";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Button from '@mui/joy/Button';
import MoreActions from "../_components/more_menu_view_profile";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import DialogBox from "../_video/dialog";
import DialogContentText from '@mui/material/DialogContentText';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const additionalSportOptions = [
    {label: 'Basketball', id: 'basketball'},
    {label: 'Football', id: 'football'},
    {label: 'Diving', id: 'diving'},
    {label: 'Swimming', id: 'swimming'},
    {label: 'Tennis', id: 'tennis'},
    {label: 'Volleyball', id: 'volleyball'},
    {label: 'Waterpolo', id: 'waterpolo'},
    {label: 'Rugby', id: 'rugby'},
    {label: 'Other', id: 'other'},
]

const additionalSportLevels= [
    {label: "Freshman Team", id: 'freshman' },
    {label: "Sophomore Team", id: 'sophomore' },
    {label: "Junior Varsity Team", id: 'junior-varsity' },
    {label: "Varsity Team", id: 'varsity' },
    {label: "Club/Travel Team", id: 'club-travel' }
]

function AddNewOrEditAdditionalSportForm({defaultAdditionalSportInfo=false, handleCancel, handleSubmit}){

    let initialAdditionalSportInfo;

    const [isLoading, setIsLoading] = useState(false)

    if (defaultAdditionalSportInfo) {
        initialAdditionalSportInfo = defaultAdditionalSportInfo.info;
    } else {
        initialAdditionalSportInfo = {
            additional_sport: '',
            years_of_experience: '',
            additional_sport_level: ''
        };
    }

    const [additionalSportInfo, setAdditionalSportInfo] = useState(initialAdditionalSportInfo);

    const handleChange = (value, prop) => {
        setAdditionalSportInfo(prevState => ({
            ...prevState,
            [prop]: value
        }));
    }

    const validateEditOrAddNew = async ()=>{
        if(additionalSportInfo.additional_sport.trim().length ==0 || 
            (additionalSportInfo.years_of_experience.trim().length == 0 || additionalSportInfo.additional_sport_level.trim().length ==0 )){
                alert('Please fill missing fieldS.')
                return
        }
        setIsLoading(true)
        const result = await handleSubmit(additionalSportInfo)    
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
                    <Button onClick={validateEditOrAddNew} variant="solid" loading={isLoading} loadingPosition="start"  
                    startDecorator={ !defaultAdditionalSportInfo ? <AddCircleIcon/> : <ModeEditIcon />}>
                        {defaultAdditionalSportInfo ? 'Edit': 'Add'}
                    </Button>
                </Grid>
            </Grid>   
            <Grid container spacing={2}>

                <Grid item xs={12}  >
                    <FormControl fullWidth>
                        <InputLabel id="add-new-additional-sport">Additional Sport</InputLabel>
                        <Select
                            labelId="add-new-additional-sport"
                            value={additionalSportInfo.additional_sport}
                            onChange={(e)=>{handleChange(e.target.value, 'additional_sport')}} 
                            label="Additional Sport"
                        >   
                            {additionalSportOptions.map(({label, id},i) => (<MenuItem key={i} value={id}  >{label}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}  >
                    <FormControl fullWidth>
                        <TextField  value={additionalSportInfo.years_of_experience} onChange={(e)=>{handleChange(e.target.value, 'years_of_experience')}}   label="Years of Experience" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={12}  >
                    <FormControl fullWidth>
                        <InputLabel id="add-new-additional-sport-level">Additional Sport Level</InputLabel>
                        <Select
                            labelId="add-new-additional-sport-level"
                            label="Additional Sport Level"
                            value={additionalSportInfo.additional_sport_level}
                            onChange={(e)=>{handleChange(e.target.value, 'additional_sport_level')}}
                        >   
                            {additionalSportLevels.map(({label, id},i) => (<MenuItem key={i} value={id}  >{label}</MenuItem>))}
                        </Select>                    
                    </FormControl>
                </Grid>
                
            </Grid>
            <div style={{display:'flex', marginTop: '20px',  justifyContent: 'center'}}>
                <Button variant="solid" onClick={validateEditOrAddNew} loading={isLoading} loadingPosition="start" 
                    startDecorator={ !defaultAdditionalSportInfo ? <AddCircleIcon/> : <ModeEditIcon />}>
                    {defaultAdditionalSportInfo ? 'Edit': 'Add'}  Additional Sport    
                </Button>
            </div>
        </>
    );
}


export default function AdditionalSport({isEditable, additionalSports, handleAddNew, handleEdit, handleDelete}){
    
    const [isAddingNewAdditionalSport, setIsAddinNewAdditionalSport] = useState(false)
    const [isEditingAdditionalSport, setIsEditingAdditionalSport] = useState({ isEditing: false, additionalSport: false })
    const [isDeletingAdditionalSport, setIsDeletingAdditionalSport] = useState({ isWaitingDeletion: false, additionalSport: false })

    const initiateAddNewAdditionalSport = () => { setIsAddinNewAdditionalSport(true) }
    const initiateEditAdditionalSport = (additionalSport) => { setIsEditingAdditionalSport({ isEditing: true, additionalSport: additionalSport }) }
    const initiateDeleteAdditionalSport = (additionalSport) =>{setIsDeletingAdditionalSport({isWaitingDeletion: true, additionalSport: additionalSport})}

    const closeAddNewAdditionalSport = () => { setIsAddinNewAdditionalSport(false) }
    const closeEditAdditionalSport = () => { setIsEditingAdditionalSport({ isEditing: false, additionalSport: false }) }
    const closeDeleteAdditionalSport =() => {setIsDeletingAdditionalSport({isWaitingDeletion: false, additionalSport: false})}

    const handleAddAdditionalSportInner = async (additionalSportInfo) => {
        const result = await handleAddNew(additionalSportInfo); 
        if(result){
            closeAddNewAdditionalSport() 
        }
    }

    const handleEditAdditionalSportInner = async (additionalSportInfo) => { 
        const result = await handleEdit( {id: isEditingAdditionalSport.additionalSport.id, info:  additionalSportInfo})
        if(result){
            closeEditAdditionalSport()
            return true
        }else{
            return false
        }
    }

    const handleDeleteAdditionalSportInner = async () => { 
        const result = await handleDelete(isDeletingAdditionalSport.additionalSport.id) 
        if(result){
            closeDeleteAdditionalSport()
            return true
        }
        return false;
    }

    
    return(
        <>
            <Paper sx={{padding: {xs: 1, md: 2}}}>
                {
                    isAddingNewAdditionalSport && (
                        <AddNewOrEditAdditionalSportForm
                            defaultAdditionalSportInfo={false}
                            handleCancel={closeAddNewAdditionalSport} 
                            handleSubmit={handleAddAdditionalSportInner}
                        />
                    )
                }
                {
                    isEditingAdditionalSport.isEditing && (
                        <AddNewOrEditAdditionalSportForm 
                            defaultAdditionalSportInfo={isEditingAdditionalSport.additionalSport}
                            handleCancel={closeEditAdditionalSport}
                            handleSubmit={handleEditAdditionalSportInner}
                        />
                    )
                }
                {
                    ( !isEditingAdditionalSport.isEditing && !isAddingNewAdditionalSport ) && (
                        <>
                            <Grid container sx={{alignItems: 'center', marginBottom: '20px'}}>
                                <Grid item auto>
                                    <h3 style={{margin: 0}}>Additional Sports</h3>
                                </Grid>
                                <Grid item xs sx={{margin: '0 20px'}}>      
                                    <Divider></Divider>
                                </Grid>
                                {isEditable ? (
                                    <Grid item auto>
                                        <Button variant="outlined" onClick={initiateAddNewAdditionalSport}>Add New</Button>
                                    </Grid>
                                ):(
                                    <></>
                                )
                                }

                            </Grid>                             
                            <AdditionalSports 
                                isEditable={isEditable}
                                additionalSports={additionalSports}
                                handleEdit={initiateEditAdditionalSport}
                                handleDelete={initiateDeleteAdditionalSport}
                            />
                        </>
                    )
                }
            </Paper>
            {
                isDeletingAdditionalSport.isWaitingDeletion && (
                    (
                        <DialogBox
                            maxWidth='xs' 
                            dialogTitle='Delete Additional Sport'
                            dialogContent={<DialogContentText>Are you sure to delete?</DialogContentText>}
                            handleCancel={closeDeleteAdditionalSport}
                            handleConfirm={handleDeleteAdditionalSportInner}
                        />
                    )
                )
            }
        </>
    )
}


function AdditionalSports({isEditable, additionalSports, handleEdit, handleDelete}){
    const isMobile = window.innerWidth < 500
    return (
        <TransitionGroup >
            <Grid sx={{marginTop: '5px'}}  container spacing={2}>
                {
                    additionalSports.map(({id, info}, index) => {
                        if (typeof info === 'string') {
                            info = JSON.parse(info)
                        }
                        if(!info)return(<></>)
                        let  {additional_sport, years_of_experience, additional_sport_level} = info
                        additional_sport = additionalSportOptions.filter(({id}) => id == additional_sport)[0]['label']
                        additional_sport_level = additionalSportLevels.filter(({id}) => id == additional_sport_level)[0]['label']
                        return (
                            
                            <Grid key={index} item xs={12} sm={6} md={4} sx={{position: 'relative', '&:hover .tooltip': {display: 'block'} }} >
                                <div class="grid-inner" style={{position: 'relative'}}>
                                    <Paper sx={{ padding: 1 }} elevation={2}>
                                        <h4 style={{ margin: '5px 0' }}>{additional_sport}</h4>
                                        <i>{years_of_experience} years of experience</i>
                                        <p>{additional_sport_level} level</p>
                                    </Paper>
                                    {
                                        isEditable
                                        ?(

                                            <div className="tooltip-wrapper"  
                                            style={{position:'absolute', display: !isMobile ? 'none': 'block!important',  bottom: '10px', right: '10px'}} 
                                        >
                                            <Tooltip   title="Options">
                                                <MoreActions 
                                                    menuitems={
                                                        [
                                                            {
                                                                label:'Edit Additional Sport', 
                                                                icon: <ModeEditIcon variant='small' />,
                                                                handler: ()=>{handleEdit({id: id, info: info})}
                                                            },
                                                            {
                                                                label:'Delete Additional Sport', 
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