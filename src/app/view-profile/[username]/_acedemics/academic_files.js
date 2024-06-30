import { Paper, Grid,Container, FormControl,Tooltip,InputLabel, Button as Btn, TextField , Select, MenuItem,  IconButton, Collapse,  Divider, Menu } from "@mui/material"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { TransitionGroup } from 'react-transition-group';
import SchoolIcon from '@mui/icons-material/School';
import { useState, useEffect } from "react";
import {  LocalizationProvider ,DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Graduate, Handlee } from "next/font/google";
import Button from '@mui/joy/Button';
import TableChartIcon from '@mui/icons-material/TableChart';
import { styled } from '@mui/material/styles';
import MoreActions from "../_components/more_menu_view_profile";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from "@mui/icons-material/Delete";
import DialogBox from "../_video/dialog";
import DialogContentText from '@mui/material/DialogContentText';


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

const fileTypes = [
    {label: 'Achievement and Recognition Certificate', value: 'achievement_and_recog'}, 
    {label: 'Transcript', value: 'transcript'}, 
    {label: 'Report Card', value:'report_card'},
    {label: 'SAT Info', value:'sat'},
    {label: 'ACT Info', value:'act'},
    {label: 'PSAT Info', value:'psat'},
    {label: 'SAT II Info', value:'satii'}
]


function AddNewAcademicFileForm({academicFile=false, handleCancel, handleAddAcademicFile}){
    
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const validateAddNew = async  ()=>{
        if(type.trim().length == 0  || !file){
            alert("Please fill up all the fields")
            return
        }
        setIsLoading(true)
        const result = await handleAddAcademicFile(type, file, description)
        if(!result){
            setIsLoading(false)
        }
    }
    const isMobile = window.innerWidth < 500

    return(
        <>
            <Grid container sx={{alignItems: 'center'}}>
                <Grid item auto onClick={handleCancel}>
                    <Button  variant="plain"  startDecorator={<ArrowBackIosIcon />}>Cancel</Button>
                </Grid>
                <Grid item xs>
                    <Divider sx={{margin: '0 20px'}}></Divider>
                </Grid>
                <Grid item sx={{ display: isMobile ? 'flex' : 'none' }} auto onClick={validateAddNew}>
                    <Button disabled={isLoading} variant="solid" >
                       Add
                    </Button>
                </Grid>
            </Grid>
            <Container maxWidth={'sm'}>
                <Grid container sx={{marginTop: 1, maxWidth: 'xs'}}>
                    <Grid item xs={12}  sx={{padding: '0 10px', marginTop: {xs: 2}}}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                id="demo-simple-select"
                                labelId="demo-simple-select-label"
                                label="Level"
                                onChange={(e)=> {setType(e.target.value)}}
                            >   
                                {fileTypes.map(({label, value},i) => (<MenuItem key={i} value={value}>{label}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{padding: '0 10px', marginTop: {xs: 2}}}>
                        <FormControl fullWidth>
                            <TextField onChange={(e)=> {setDescription(e.target.value)}} label="Description" variant="outlined" />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}  sx={{padding: '0 10px',marginTop: {xs: 2}}}>
                        <FormControl fullWidth>
                            <Button                       
                                component="label"
                                role={undefined}
                                variant="outlined"
                                tabIndex={-1}
                                startDecorator={<TableChartIcon />}
                            >
                                {file?.name || 'Choose File'}
                                <VisuallyHiddenInput 
                                    onChange={(e)=>{
                                        const file= e.target.files[0] || null;
                                        if(file){                                    
                                            setFile(file)
                                            setIsLoading(false)
                                        }else{
                                            setIsLoading(false)
                                            setFile(false)
                                        }
                                    }} 
                                    type="file" 
                                />
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>

            <div style={{display:'flex', marginTop: '20px', alignItems: 'center',  justifyContent: 'center'}}>
                <Button onClick={validateAddNew}  loadingPosition="start" loading={isLoading} variant="solid"  startDecorator={<TableChartIcon />}>
                    Add Academic File
                </Button>
            </div>
        </>

    );
}

function EditAcademicInfo({academicFile, handleCancel, handleEdit}){
    console.log(academicFile.info)
    const [academicFileInfo, setAcademicFileInfo] = useState(academicFile.info)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (value, prop) => {
        setAcademicFileInfo((prevAcademicFileInfo)=>({
            ...prevAcademicFileInfo,
            [prop] : value
        }))
    }

    const validateEdit = async () => {
        if(academicFileInfo.type.trim().length == 0 || academicFileInfo.file_src.trim().length == 0){
            alert('Title can\'t be blank')
            return
        }
        setIsLoading(true)
        const result = await handleEdit(academicFileInfo)
        if(!result){
            setIsLoading(false)
        }
    }
    const isMobile = window.innerWidth < 500

    return(
        <>
            <Grid container sx={{alignItems: 'center'}}>
                <Grid item auto onClick={handleCancel}>
                    <Button  variant="plain"  startDecorator={<ArrowBackIosIcon />}>Cancel</Button>
                </Grid>
                <Grid item xs>
                    <Divider sx={{margin: '0 20px'}}></Divider>
                </Grid>
                <Grid item sx={{ display: isMobile ? 'flex' : 'none' }} auto onClick={validateEdit}>
                    <Button disabled={isLoading} variant="solid" >
                       Edit
                    </Button>
                </Grid>
            </Grid>
            <Container maxWidth={'sm'}>
                <Grid container sx={{marginTop: 1, maxWidth: 'xs'}}>
                    <Grid item xs={12}  sx={{padding: '0 10px', marginTop: {xs: 2}}}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                id="demo-simple-select"
                                labelId="demo-simple-select-label"
                                label="Level"
                                value={academicFileInfo.type}
                                onChange={(e)=> {handleChange(e.target.value, 'type')}}
                            >   
                                {fileTypes.map(({label, value},i) => (<MenuItem key={i} value={value}>{label}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{padding: '0 10px', marginTop: {xs: 2}}}>
                        <FormControl fullWidth>
                            <TextField 
                                onChange={(e)=> {handleChange(e.target.value, 'description')}} 
                                label="Description" 
                                value={academicFileInfo.description}
                                variant="outlined" 
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>

            <div style={{display:'flex', marginTop: '20px', alignItems: 'center',  justifyContent: 'center'}}>
                <Button variant="solid" loading={isLoading} loadingPosition="start" onClick={validateEdit} startDecorator={<TableChartIcon />}>
                    Edit Academic Info
                </Button>
            </div>
        </>
    )
}

export default function AcademicFiles({isEditable, academicFiles, handleEditAcademicFile, handleAddAcademicFile, handleDeleteAcademicFile}){
    
    const [addingNewAcademicFile, setAddingNewAcademicFile] = useState(false)
    const [editingAcademicInfo, setEditingAcademicInfo] = useState({isEditing: false, academicFile: false})
    const [deletingAcademicFile, setDeletingAcademicFile] = useState({isWaitingDeletion: false, academicFile: false})

    const handleInitiateAddNewAcademicFile =() => {setAddingNewAcademicFile(true)}
    
    const handleAddAcademicFileInner = async (type, file, description) => {
        
        const result = await handleAddAcademicFile(type, file, description)
        if(result){
            closeAddNewAcademicFile()
            return true
        }else{
            return false;
        }
    }

    const closeAddNewAcademicFile = () => {setAddingNewAcademicFile(false)}

    const handleInitiateEditAcademicFile =(academicFile) => {setEditingAcademicInfo({isEditing: true, academicFile: academicFile})}
    
    const handleEditAcademicFileInner = async (academicFileInfo) => {
        const result = await handleEditAcademicFile({id: editingAcademicInfo.academicFile.id, info: academicFileInfo})
        if(result){
            closeEditAcademicFile()
            return true
        }
        return false
    }
    
    const closeEditAcademicFile = () => {setEditingAcademicInfo({isWaitingDeletion: false, academicFile: false})}
    
    const handleInitiateDeleteAcademicFile = (academicFile) => {setDeletingAcademicFile({isWaitingDeletion: true, academicFile: academicFile})}
    const handleDeleteAcademicFileInner = async (academicFileInfo) => {
        const result = await handleDeleteAcademicFile( deletingAcademicFile.academicFile.id)
        if(result){
            closeDeleteAcademicFile()
            return true
        }
        return false
    }
    
    const closeDeleteAcademicFile = () => {setDeletingAcademicFile({isWaitingDeletion: false, academicFile: false})}

    return(
        <>
            <Paper sx={{padding: {xs: 1, md: 2}}}>
                {
                    addingNewAcademicFile
                        ? <AddNewAcademicFileForm 
                            handleCancel={closeAddNewAcademicFile} 
                            handleAddAcademicFile={handleAddAcademicFileInner} 
                        />
                        : editingAcademicInfo.isEditing
                            ? <EditAcademicInfo
                                academicFile={editingAcademicInfo.academicFile}
                                handleCancel={closeEditAcademicFile}
                                handleEdit={handleEditAcademicFileInner}
                            />
                            :  <div>

                                    {
                                        academicFiles.length > 0
                                            ?   <>
                                                    <DisplayAcademicFileHeader isEditable ={isEditable} handleInitiateAddNewAcademicFile={handleInitiateAddNewAcademicFile} />
                                                    <DisplayAcademicFiles
                                                        isEditable = {isEditable} 
                                                        academicFiles={academicFiles} 
                                                        handleEdit={handleInitiateEditAcademicFile}
                                                        handleDelete={handleInitiateDeleteAcademicFile}
                                                    />
                                                </>   

                                            
                                            :   <DisplayNoAcademicFile
                                                    isEditable = {isEditable} 
                                                    handleInitiateAddNewAcademicFile={handleInitiateAddNewAcademicFile}
                                                />
                
                                    }
                                </div>
                }

            </Paper>

            {
                deletingAcademicFile.isWaitingDeletion &&
                (
                    <DialogBox
                        maxWidth='xs' 
                        dialogTitle='Delete Academic Info'
                        dialogContent={<DialogContentText>Are you sure to delete?</DialogContentText>}
                        handleCancel={closeDeleteAcademicFile}
                        handleConfirm={handleDeleteAcademicFileInner}
                    />
                )
            }

        </>
    )
}

function DisplayAcademicFileHeader({isEditable, handleInitiateAddNewAcademicFile}){
    return(
        <Grid container sx={{alignItems: 'center'}}>
            <Grid item>
                <h3 style={{margin: 0}}>Academic Info Attachments</h3>
            </Grid>
            <Grid item xs>
                <Divider sx={{margin: '0 20px'}}></Divider>
            </Grid>
            {
                isEditable ? (
                    <Grid item>
                        <Tooltip onClick={handleInitiateAddNewAcademicFile} title="Attach Acedemic File">
                            <IconButton 
                                sx={{':hover': { color: 'blue'}, backgroundColor: 'blue', 
                                    color: 'white', border: '1px solid blue'}}
                            >
                                <TableChartIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                ): (
                    <></>
                )
            }
        </Grid>
    )
}

function DisplayAcademicFiles({isEditable,  academicFiles, handleEdit, handleDelete}){

    const isMobile = window.innerWidth < 500

    const downloadAcademicFile = (file_src)=>{
        const anchor = document.createElement('a');
        anchor.style.display = 'none';
        anchor.href = file_src;
        anchor.setAttribute('download', '');
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }

    return (
        <TransitionGroup >
            <Grid sx={{marginTop: '5px'}}  container spacing={2}>
                {
                    academicFiles.map(({id, info}, index) => {
                        if (typeof info === 'string') {
                            info = JSON.parse(info)
                        }
                        let {type, file_src, description } = info
                        type = fileTypes.filter(({value}) => type == value)[0]['label']
                        return (
                            
                            <Grid key={index} item xs={12} sm={6} md={4} sx={{position: 'relative', '&:hover .tooltip': {display: 'block'} }} >
                                <div class="grid-inner" style={{position: 'relative'}}>
                                    <Paper sx={{ padding: 1 }} elevation={2}>
                                        <h4 style={{ margin: '5px 0' }}>{type}</h4>
                                        <p>{description}</p>
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
                                                                label:'Edit ' + type, 
                                                                icon: <ModeEditIcon variant='small' />,
                                                                handler: ()=>{handleEdit({id: id, info: info})}
                                                            },
    
                                                            {
                                                                label:'Download '+type, 
                                                                icon: <DownloadIcon variant='small' />,
                                                                handler: ()=>{downloadAcademicFile('/files/'+file_src)}
                                                            },
    
                                                            {
                                                                label:'Delete ' + type, 
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

function DisplayNoAcademicFile({isEditable,  handleInitiateAddNewAcademicFile}){
    return(

        <div style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
            <div>
                <div>
                    <TableChartIcon sx={{fontSize: '100px'}}/>
                </div>
                <div>
                    No any academic file has been added
                </div>
                {
                    isEditable ? (
                        <Button variant="plain" onClick={handleInitiateAddNewAcademicFile}>
                            ADD NEW
                        </Button>
                    ): (
                        <></>
                    )
                }
            </div>
        </div>
    )
}