import { Paper, Grid,FormControl,Tooltip,InputLabel, TextField , Select, MenuItem,  IconButton, Collapse,  Divider, Menu } from "@mui/material"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { TransitionGroup } from 'react-transition-group';
import KeyIcon from '@mui/icons-material/Key';import { useState, useEffect } from "react";
import {  LocalizationProvider ,DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Graduate } from "next/font/google";
import Button from '@mui/joy/Button';
import HorizontalLinearStepperAddKeyStats from "./add_key_stats";


export default function ViewKeyStats({keyStat, editable}){

    const [isAddingKeyState, setIsAddingKeyState] = useState(false)
    keyStat = keyStat[0]
    return(
        <>
            {!keyStat ||  keyStat?.sport === undefined ? (
                <Paper sx={{padding: {xs: 1, md: 2}}}>
                    {!isAddingKeyState &&

                        <div style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
                            <div>
                                <div>
                                    <KeyIcon sx={{fontSize: '100px'}}/>
                                </div>
                                <div>
                                    No key stat has been added
                                </div>
                                {editable &&
                                    <Button variant="plain" onClick={()=>setIsAddingKeyState(true)}>
                                        ADD NOW
                                    </Button>
                                }
                            </div>
                        </div>
                    }
                
                    {
                        isAddingKeyState && 
                        <HorizontalLinearStepperAddKeyStats sport={''} info={{}} />
                    }

                </Paper>
                ): (
                    <>
                        <DisplayKeyStats editable={editable} keystat={keyStat} />
                    </>
                )
            } 
        </>
    )
}
import  sportsSettings from './settings'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

function returnSportsSettingsByID(idd){
    const matchingSport =  sportsSettings.sports_settings.filter(({id}) => idd === id)
    if(matchingSport.length) return matchingSport[0]
    else return false
}

import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import SportsIcon from '@mui/icons-material/Sports';

function DisplayAppropriateIcon({sport_id}){
    console.log(sport_id)
    switch(sport_id){
        case 'soccor':
            return <SportsSoccerIcon sx={{fontSize: '60px'}}  />
        case 'field_hockey': 
            return <SportsHockeyIcon sx={{fontSize: '60px'}}  />
        default:
            return <SportsIcon  sx={{fontSize: '60px'}} />
    }
}


import FloatingActionButton from "@/app/_components/floating_action_btn";
import EditIcon from '@mui/icons-material/Edit';

function DisplayKeyStats({keystat,  editable}){

    const sport = returnSportsSettingsByID(keystat.sport)
    const sportInfo = JSON.parse(keystat.info);
    const [isEditingKeyStats, setIsEditingKeyStats] = useState(false)

    sport.settings.forEach(setting => {
        if(sportInfo[setting.id] !== undefined){
            setting.value = sportInfo[setting.id]
        }else{
            setting.value = ''
        }
    })

    const initiateEditKeyStat  = () => {
        setIsEditingKeyStats(true)
    }

    return(
        <>

            <Paper sx={{padding: {xs: 1, md: 2}}}>

                {
                    isEditingKeyStats ? (
                        <>
                            <HorizontalLinearStepperAddKeyStats sport={sport.id} info={sportInfo} />
                        </>
                    ):(
                        <>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                <div style={{display:'flex',  gap: '10px', alignItems: 'center', padding: '10px'}}>
                                    <div>
                                        <DisplayAppropriateIcon sport_id = {sport.id} />
                                    </div>
                                    <div style={{fontSize: '30px', fontWeight: 'bold'}}>
                                        {sport.label}
                                    </div>
                                </div>
                            </div>
                            <Divider></Divider>
                            <Grid container sx={{marginTop: '20px'}}>
                            {
                                sport.settings.map((setting, index) => {
                                    if( setting.value.toString().trim().length  > 0){
                                        let value = setting.value
                                        console.log(setting.type)
                                        switch(setting.type){
                                            case 'select':
                                                var option = setting.options.filter(o => o.id === setting.value)
                                                if(option.length){
                                                    value = option[0].label
                                                    console.log("Sophiya", option, value)
                                                    
                                                }else{
                                                    return ''
                                                }
                                                break;
                                        }
                                        return(
                                            <Grid key={index} item xs={12} md={6}  >
                                                <div style={{padding:'10px', margin:'10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', display:'flex', verticalAlign:'center'}}>
                                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                        <div style={{ fontWeight: 'bold'}}>{setting.label}:</div>
                                                        <div>{value}</div>
                                                    </div>
                                                </div>
                                            </Grid>
                                        )
                                    }
                                })
                            }
                            </Grid>
                            {editable 
                            ? (
                                <FloatingActionButton btnIcon={<EditIcon />} btnTitle='Edit Basic Info' handler={initiateEditKeyStat} />

                            ): (
                                <></>
                            )
                            
                            }
                        </>
                    )
                }
            </Paper>
        </>
    )
}