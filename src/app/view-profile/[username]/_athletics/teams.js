import { Paper, Box, Grid,FormControl,Tooltip,InputLabel, TextField , Select, MenuItem,  IconButton, Collapse,  Divider, Menu } from "@mui/material"
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
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';


const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

const teamLevels= [
    {label: "Freshman Team", id: 'freshman' },
    {label: "Sophomore Team", id: 'sophomore' },
    {label: "Junior Varsity Team", id: 'junior-varsity' },
    {label: "Varsity Team", id: 'varsity' },
    {label: "Club/Travel Team", id: 'club-travel' }
]



import MoreActions from "../_components/more_menu_view_profile";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import DialogBox from "../_video/dialog";
import DialogContentText from '@mui/material/DialogContentText';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function AddNewOrEditTeamForm({defaultTeamInfo=false, handleCancel, handleSubmit}){


    const isMobile = window.innerWidth < 500

    let initialTeamInfo;

    const [isLoading, setIsLoading] = useState(false)


    if (defaultTeamInfo) {
        initialTeamInfo = defaultTeamInfo.info;
    } else {
        initialTeamInfo = {
            team_name: '',
            year: '',
            starter: '',
            jersey_number: '',
            schedule_url: '',
            team_award: '',
            individual_award: '',
            other_info: ''
        };
    }

    const [teamInfo, setTeamInfo] = useState(initialTeamInfo);

    const handleChange = (value, prop) => {
        setTeamInfo(prevState => ({
            ...prevState,
            [prop]: value
        }));
    }

    const validateEditOrAddNew = async ()=>{
        if(teamInfo.team_name.trim().length ==0 || teamInfo.jersey_number.trim().length ==0  ||
            (teamInfo.year.trim().length == 0 || teamInfo.starter.trim().length ==0 )){
                alert('Please fill at least coach name and coach type fields.')
                return
        }
        setIsLoading(true)
        const result = await handleSubmit(teamInfo)    
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
                    startDecorator={ !defaultTeamInfo ? <AddCircleIcon/> : <ModeEditIcon />}>
                        {defaultTeamInfo ? 'Edit': 'Add'}
                    </Button> 
                </Grid>
            </Grid>   
            <Grid container spacing={2}>

                <Grid item xs={12} sm={6}  >
                    <FormControl fullWidth>
                        <TextField                             value={teamInfo.team_name}   
                            onChange={(e)=>handleChange(e.target.value, 'team_name')}  label="Team Name" variant="outlined" />
                    </FormControl>
                </Grid>


                <Grid item xs={12} sm={6}  >
                    <FormControl fullWidth>
                        <TextField                             value={teamInfo.year}   
                            onChange={(e)=>handleChange(e.target.value, 'year')}  label="Year" placeholder="e.g., 2024" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}  >
                    <FormControl fullWidth>
                        <InputLabel id="add-new-team-team-level">Team Level</InputLabel>
                        <Select
                            labelId="add-new-team-team-level"
                            value={teamInfo.team_level}   
                            onChange={(e)=>handleChange(e.target.value, 'team_level')} 
                            label="Team Level"
                        >   
                            {teamLevels.map(({label, id},i) => (<MenuItem key={i} value={id}  >{label}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}  >
                    <FormControl fullWidth>
                        <InputLabel id="add-new-team-starter">Starter?</InputLabel>
                        <Select
                            labelId="add-new-team-starter"
                            value={teamInfo.starter}   
                            onChange={(e)=>handleChange(e.target.value, 'starter')} 
                            label="Starter?"
                        >   
                            {[{label: 'Yes', id: 'yes'},{label: 'No', id: 'no'}].map(({label, id},i) => (<MenuItem key={i} value={id}  >{label}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={12} sm={6}  >
                    <FormControl fullWidth>
                        <TextField                             value={teamInfo.jersey_number}   
                            onChange={(e)=>handleChange(e.target.value, 'jersey_number')}  label="Jersey Number" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}  >
                    <FormControl fullWidth>
                        <TextField                             value={teamInfo.schedule_url}   
                            onChange={(e)=>handleChange(e.target.value, 'schedule_url')}  label="Team Schedule URL" variant="outlined" />
                    </FormControl>
                </Grid>


                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <TextareaAutosize
                            label="Team Award"
                            placeholder="Team Awards..."
                            sx={{width: '100%'}}
                            value={teamInfo.team_award}   
                            onChange={(e)=>handleChange(e.target.value, 'team_award')} 
                            minRows={3} // Specify the minimum number of rows
                            maxRows={5} // Specify the maximum number of rows
                        />                    
                    </FormControl>
                </Grid>
        
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <TextareaAutosize
                            label="Individual Awards"
                            value={teamInfo.individual_award}   
                            onChange={(e)=>handleChange(e.target.value, 'individual_award')} 
                            placeholder="Individual Awards..."
                            sx={{width : '100%'}}
                            minRows={3} // Specify the minimum number of rows
                            maxRows={5} // Specify the maximum number of rows
                        />                    
                    </FormControl>
                </Grid>
                  
        
                <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                        <TextareaAutosize
                            label="Individual Awards"
                            value={teamInfo.other_info}   
                            onChange={(e)=>handleChange(e.target.value, 'other_info')} 
                            placeholder="Other extra info you want to add..."
                            sx={{width : '100%'}}
                            minRows={3} // Specify the minimum number of rows
                            maxRows={5} // Specify the maximum number of rows
                        />                    
                    </FormControl>
                </Grid>
            </Grid>
            <div style={{display:'flex', marginTop: '20px',  justifyContent: 'center'}}>
                <Button variant="solid" onClick={validateEditOrAddNew} loading={isLoading} loadingPosition="start" 
                    startDecorator={ !defaultTeamInfo ? <AddCircleIcon/> : <ModeEditIcon />}>
                    {defaultTeamInfo ? 'Edit': 'Add'}  Team    
                </Button> 
            </div>
        </>
    );
}


export default function Team({isEditable, teams, handleAddNew, handleEdit, handleDelete}){
    const [isAddingNewTeam, setIsAddingNewTeam] = useState(false)
    const [isEditingTeam, setIsEditingTeam] = useState({ isEditing: false, team: false })
    const [isDeletingTeam, setIsDeletingTeam] = useState({ isWaitingDeletion: false, team: false })

    const initiateAddNewTeam = () => { setIsAddingNewTeam(true) }
    const initiateEditTeam = (team) => { setIsEditingTeam({ isEditing: true, team: team }) }
    const initiateDeleteTeam = (team) =>{setIsDeletingTeam({isWaitingDeletion: true, team: team})}

    const closeAddNewTeam = () => { setIsAddingNewTeam(false) }
    const closeEditTeam = () => { setIsEditingTeam({ isEditing: false, team: false }) }
    const closeDeleteTeam =() => {setIsDeletingTeam({isWaitingDeletion: false, team: false})}

    const handleAddNewTeam = async (teamInfo) => {
        const result = await handleAddNew(teamInfo); 
        if(result){
            closeAddNewTeam() 
        }
    }

    const handleEditTeam = async (teamInfo) => { 
        const result = await handleEdit( {id: isEditingTeam.team.id, info:  teamInfo})
        if(result){
            closeEditTeam()
            return true
        }else{
            return false
        }
    }

    const handleDeleteTeam = async () => { 
        const result = await handleDelete(isDeletingTeam.team.id) 
        if(result){
            closeDeleteTeam()
            return true
        }
        return false;
    }   
    return(
        <>
            <Paper sx={{padding: {xs: 1, md: 2}}}>
                {
                    isAddingNewTeam && (
                        <AddNewOrEditTeamForm                             
                            defaultTeamInfo={false}
                            handleCancel={closeAddNewTeam}
                            handleSubmit={handleAddNewTeam}  
                        />
                    )
                }
                {
                    isEditingTeam.isEditing && (
                        <AddNewOrEditTeamForm                             
                            defaultTeamInfo={isEditingTeam.team}
                            handleCancel={closeEditTeam}
                            handleSubmit={handleEditTeam}  
                        />                    
                    )
                }
                {
                    ( !isEditingTeam.isEditing && !isAddingNewTeam ) && (
                        <>
                            <Grid container sx={{alignItems: 'center', marginBottom: '20px'}}>
                                <Grid item auto>
                                    <h3 style={{margin: 0}}>Teams</h3>
                                </Grid>
                                <Grid item xs sx={{margin: '0 20px'}}>      
                                    <Divider></Divider>
                                </Grid>
                                {
                                    isEditable ?(
                                        <Grid item auto>
                                            <Button variant="outlined" onClick={initiateAddNewTeam}>Add New</Button>
                                        </Grid>
                                    ):(
                                       <></>
                                    )
                                }

                            </Grid>                             
                            <Teams 
                                teams={teams}
                                handleEdit={initiateEditTeam}
                                handleDelete={initiateDeleteTeam}
                            />
                        </>
                    )
                }
            </Paper>
            {
                isDeletingTeam.isWaitingDeletion && (
                    (
                        <DialogBox
                            maxWidth='xs' 
                            dialogTitle='Delete Coach'
                            dialogContent={<DialogContentText>Are you sure to delete?</DialogContentText>}
                            handleCancel={closeDeleteTeam}
                            handleConfirm={handleDeleteTeam}
                        />
                    )
                )
            }
        </>
    )
}

function Teams({isEditable, teams, handleAddNew, handleEdit, handleDelete}){

    const isMobile = window.innerWidth < 500
    return (
        <TransitionGroup >
            <Grid sx={{marginTop: '5px'}}  container spacing={2}>
                {
                    teams.map(({id, info}, index) => {
                        if (typeof info === 'string') {
                            info = JSON.parse(info)
                        }
                        if(!info)return(<></>)
                        let  {team_name, year, team_level, starter, jersey_number, schedule_url, team_award, individual_award, other_info} = info
                        team_level = teamLevels.filter(({id}) => id == team_level)[0]['label']
                        return (
                            <Grid key={index} item xs={12} sm={6} sx={{position: 'relative', '&:hover .tooltip': {display: 'block'} }} >
                                <div class="grid-inner" style={{position: 'relative'}}>
                                    <Paper sx={{ padding: 1 }} elevation={2}>

                                        <div style={{ marginBottom: '10px' }}>
                                            <span className="general-info-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>Team Name:</span>
                                            <span className="general-info-value">{team_name}</span>
                                        </div>

                                        <div style={{ marginBottom: '10px' }}>
                                            <span className="general-info-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>Year:</span>
                                            <span className="general-info-value">{year}</span>
                                        </div>
                                        <div style={{ marginBottom: '10px' }}>
                                            <span className="general-info-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>Team Level:</span>
                                            <span className="general-info-value">{team_level}</span>
                                        </div>
                                        <div style={{ marginBottom: '10px' }}>
                                            <span className="general-info-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>Jersey Number:</span>
                                            <span className="general-info-value">{jersey_number}</span>
                                        </div>

                                        <div style={{ marginBottom: '10px' }}>
                                            <span className="general-info-label" style={{ fontWeight: 'bold', marginRight: '10px' }}> Starter? :</span>
                                            <span className="general-info-value">{starter}</span>
                                        </div>

                                        {
                                            schedule_url.trim().length ? (
                                                <div style={{ marginBottom: '10px' }}>
                                                    <span className="general-info-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>Schedule URL:</span>
                                                    <span className="general-info-value">{schedule_url}</span>
                                                </div>
                                            ):''
                                        }

                                        {
                                            team_award.trim().length ? (
                                                <div style={{ marginBottom: '10px' }}>
                                                    <span className="general-info-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>Team Awards:</span>
                                                    <span className="general-info-value">{team_award}</span>
                                                </div>
                                            ):''
                                        }
                                        {
                                            individual_award.trim().length ? (
                                                <div style={{ marginBottom: '10px' }}>
                                                    <span className="general-info-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>Individual Awards:</span>
                                                    <span className="general-info-value">{individual_award}</span>
                                                </div>
                                            ):''
                                        }
                                        {
                                            other_info.trim().length ? (
                                                <div style={{ marginBottom: '10px' }}>
                                                    <span className="general-info-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>Other Info:</span>
                                                    <span className="general-info-value">{other_info}</span>
                                                </div>
                                            ) :''
                                        }
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
                                                                label:'Edit team '+team_name, 
                                                                icon: <ModeEditIcon variant='small' />,
                                                                handler: ()=>{handleEdit({id: id, info: info})}
                                                            },
                                                            {
                                                                label:'Delete team '+ team_name, 
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