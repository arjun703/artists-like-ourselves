import { Paper, Grid, FormControl, Tooltip, InputLabel, TextField, Select, MenuItem, IconButton, Collapse, Divider, Menu } from "@mui/material"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { TransitionGroup } from 'react-transition-group';
import SchoolIcon from '@mui/icons-material/School';
import { useState, useEffect } from "react";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Graduate } from "next/font/google";
import Button from '@mui/joy/Button';
import dayjs from 'dayjs'; // Import dayjs library
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreActions from "../_components/more_menu_view_profile";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogBox from "../_video/dialog";
import DialogContentText from '@mui/material/DialogContentText';

const GradeLevels = [
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Bachelor\'s Degree', value: 'bachelor' },
    { label: 'Master\'s Degree', value: 'master' },
    { label: 'MPhil Degree', value: 'mphil' },
    { label: 'PhD Degree', value: 'phd' }
]

function AddNewOrEditGradeForm({ edu = false, handleCancel, handleSubmit }) {

    let initialEduInfo;

    const [isDisabled, setIsDisabled] = useState(false)

    if (edu) {
        initialEduInfo = edu.info;
    } else {
        initialEduInfo = {
            level: '',
            field_of_study: '',
            institution: '',
            start_date: '',
            end_date: '',
            extra_info: ''
        };
    }

    const [eduInfo, setEduInfo] = useState(initialEduInfo);

    const handleChange = (value, prop) => {
        setEduInfo(prevState => ({
            ...prevState,
            [prop]: value
        }));
    }

    const validateInfo = async () => {
        if (
            (eduInfo.level.trim().length === 0) ||
            (eduInfo.field_of_study.trim().length === 0) ||
            (eduInfo.institution.trim().length === 0) ||
            (eduInfo.start_date.trim().length === 0) ||
            (eduInfo.end_date.trim().length === 0)
        ){
            alert('Fill all fields')
            return
        }
        setIsDisabled(true)
        const result  = await  handleSubmit(eduInfo)
        if(!result){
            setIsDisabled(false)
        }
    }

    const isMobile = window.innerWidth < 500

    return (
        <>
            <Grid container sx={{ alignItems: 'center' }}>
                <Grid item auto onClick={handleCancel}>
                    <Button variant="plain" startDecorator={<ArrowBackIosIcon />}>
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs>
                    <Divider style={{margin: '0 20px'}}></Divider>
                </Grid>
                <Grid item sx={{ display: isMobile ? 'flex' : 'none' }} auto onClick={validateInfo}>
                    <Button variant="solid" disabled={isDisabled} >
                        {edu ? 'Edit' : 'Add'}
                    </Button>
                </Grid>
            </Grid>
            <Grid container sx={{ marginTop: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item xs={12} md={6} sx={{ padding: '0 10px', marginTop: { xs: 2 } }}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Level</InputLabel>
                            <Select
                                id="demo-simple-select"
                                labelId="demo-simple-select-label"
                                label="Level"
                                value={eduInfo.level}
                                onChange={(e) => { handleChange(e.target.value, 'level') }}
                            >
                                {GradeLevels.map(({ label, value }, i) => (<MenuItem key={i} value={value}>{label}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ padding: '0 10px', marginTop: { xs: 2 } }}>
                        <FormControl fullWidth>
                            <TextField
                                value={eduInfo.field_of_study}
                                onChange={(e) => { handleChange(e.target.value, 'field_of_study') }}
                                label="Field of Study"
                                variant="outlined"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ padding: '0 10px', marginTop: { xs: 2 } }}>
                        <FormControl fullWidth>
                            <TextField
                                value={eduInfo.institution}
                                onChange={(e) => { handleChange(e.target.value, 'institution') }}
                                label="Institution" variant="outlined"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ padding: '0 10px', marginTop: { xs: 2 } }}>
                        <FormControl fullWidth>
                            {edu ?
                                <DatePicker
                                    defaultValue={dayjs(eduInfo.start_date)}
                                    onChange={(newValue) => { handleChange(dayjs(newValue.$d).format('YYYY-MM-DD'), 'start_date') }}
                                    label="From"
                                    variant="outlined"
                                />
                                : 
                                <DatePicker
                                    onChange={(newValue) => { handleChange(dayjs(newValue.$d).format('YYYY-MM-DD'), 'start_date') }}
                                    label="From"
                                    variant="outlined"
                                />
                            }
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ padding: '0 10px', marginTop: { xs: 2 } }}>
                        <FormControl fullWidth>
                            {edu ?
                                <DatePicker
                                    defaultValue={dayjs(eduInfo.start_date)}
                                    onChange={(newValue) => { handleChange(dayjs(newValue.$d).format('YYYY-MM-DD'), 'end_date') }}
                                    label="To"
                                    variant="outlined"
                                />
                                : 
                                <DatePicker
                                    onChange={(newValue) => { handleChange(dayjs(newValue.$d).format('YYYY-MM-DD'), 'end_date') }}
                                    label="To"
                                    variant="outlined"
                                />
                            }
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ padding: '0 10px', marginTop: { xs: 2 } }}>
                        <FormControl fullWidth>
                            <TextField
                                value={eduInfo.extra_info}
                                onChange={(e) => { handleChange(e.target.value, 'extra_info') }}
                                label="Extra Info ( e.g. Grades, scholarships, ... )"
                                variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                </LocalizationProvider>
            </Grid>
            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                <Button loading={isDisabled}  loadingPosition="start" variant="solid" onClick={validateInfo} startDecorator={<SchoolIcon />}>
                    {edu ? 'Edit Grade' : 'Add Grade'}
                </Button>
            </div>
        </>
    );
}

export default function Grade({isEditable, grade, handleEditGrade, handleAddGrade, handleDeleteGrade }) {


    const [editingGrade, setEditingGrade] = useState({ isEditing: false })

    const handleInitiateEditGrade = (Grade) => { setEditingGrade({ isEditing: true }) }

    const closeEditGrade = () => { setEditingGrade({ isEditing: false }) }

    const handleEditGradeInner = async (eduInfo) => { 
        const result = await handleEditGrade( {id: editingGrade.Grade.id, info:  eduInfo})
        if(result){
            closeEditGrade()
            return true
        }else{
            return false
        }
    }

    return (
        <>
            <Paper sx={{ padding: { xs: 1, md: 2 } }}>
                {
                        editingGrade.isEditing
                            ? <AddNewOrEditGradeForm
                                grade={grade}
                                handleCancel={closeEditGrade}
                                handleSubmit={handleEditGradeInner}
                            />
                            :
                            <>
                                {grade
                                    ? <>
                                        <NonEmptyHeader handleInitiateAddNewGrade={handleInitiateEditGrade} />
                                        <DisplayGrade 
                                            grade={grade} 
                                            isEditable={isEditable}
                                            editGrade={handleInitiateEditGrade}
                                        />
                                    </>
                                    : <NoGradeBlock isEditable={isEditable} handleInitiateEditGrade={handleInitiateEditGrade} />
                                }
                            </>

                }
            </Paper>
        </>
    )
}


function DisplayGrade({isEditable,  grade, editGrade }) {
    const isMobile = window.innerWidth < 500
    if (typeof info === 'string') {
        info = JSON.parse(grade.info)
    }
    let {level, field_of_study, institution, start_date, end_date, extra_info } = info
    level = GradeLevels.filter(({value}) => level == value)[0]['label']
    return (
        <TransitionGroup >
            <Grid sx={{marginTop: '5px'}}  container spacing={2}>  
                <Grid key={index} item xs={12} sm={6} md={4} sx={{position: 'relative', '&:hover .tooltip': {display: 'block'} }} >
                    <div class="grid-inner" style={{position: 'relative'}}>
                        <Paper sx={{ padding: 1 }} elevation={2}>
                            <h4 style={{ margin: '5px 0' }}>{field_of_study}</h4>
                            <i>{level}</i>
                            <p>{institution}</p>
                            <i>{start_date} - {end_date}</i>
                            <p>{extra_info}</p>
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        </TransitionGroup>
    )
}

function NoGradeBlock({isEditable, handleInitiateAddNewGrade }) {
    return (
        <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
            <div>
                <div>
                    <SchoolIcon sx={{ fontSize: '100px' }} />
                </div>
                <div>
                    No any Grade has been added
                </div>
                {
                    isEditable ? (
                        <Button variant="plain" onClick={handleInitiateAddNewGrade}>
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

function NonEmptyHeader({handleInitiateAddNewGrade}) {
    return (
        <Grid container sx={{ alignItems: 'center' }}>
            <Grid item auto>
                <h3 style={{margin: 0}}>Grades</h3>
            </Grid>
            <Grid item xs>
                <Divider sx={{margin: '0 20px'}} ></Divider>
            </Grid>
            <Grid item>
                <Tooltip onClick={handleInitiateAddNewGrade} title="Add New Grade">
                    <IconButton
                        sx={{
                            ':hover': { color: 'blue' }, backgroundColor: 'blue',
                            color: 'white', border: '1px solid blue'
                        }}
                    >
                        <LibraryAddIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    )
}