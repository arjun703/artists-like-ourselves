import  sportsSettings from './settings'
import { Paper, Grid,FormControl,Tooltip,InputLabel, TextField , Select, MenuItem,  IconButton, Collapse,  Divider, Menu } from "@mui/material"
import Button from '@mui/joy/Button';
import { useState } from 'react';

function returnSportsSettingsByID(idd){
    const matchingSport =  sportsSettings.sports_settings.filter(({id}) => idd === id)
    if(matchingSport.length) return matchingSport[0]
    else return false
}

export default function DisplayFieldsBasedOnSport({sportInfo, selectedSport, handleSubmit}){
    
    const sportSettings = returnSportsSettingsByID(selectedSport);
    const [isLoading, setIsLoading] = useState(false)
    sportSettings.settings.forEach(setting => {
        if(sportInfo[setting.id] !== undefined){
            setting.value = sportInfo[setting.id]
        }else{
            setting.value = ''
        }
    })

    
    const [info, setInfo] = useState(sportInfo)
    
    const handleChange = (prop, value) => {
        info[prop] = value;
    }

    const handleSave = async () => {
        setIsLoading(true);
        await  handleSubmit(info)
        setIsLoading(false)
    }

    if(!sportSettings) return(<>Not found</>)


    return(
        <>                        
            <Grid container spacing={2}>
                {
                    sportSettings.settings.map(setting => {
                        switch(setting.type){
                            case 'select':
                                return(
                                    <Grid item xs={12}  sm={6}>
                                        <FormControl fullWidth >
                                            <InputLabel id={"label-"+setting.id}>{setting.label}</InputLabel>
                                            <Select
                                                id={setting.id}
                                                defaultValue={setting.value}
                                                labelId={"label-"+setting.id}
                                                onChange={(e)=>handleChange(setting.id, e.target.value)}
                                                label={setting.label}
                                            >   
                                                {
                                                    setting.options.map(({label, id},i) => {
                                                        return (
                                                            <MenuItem key={i} value={id}  >{label}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                )
                            break;

                            case 'text':
                            case 'number':
                                return(
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth >
                                            <TextField
                                                defaultValue={setting.value}
                                                type={setting.type} 
                                                label={setting.label}
                                                onChange={(e)=>handleChange(setting.id, e.target.value)}
                                                placeholder={setting.placeholder}
                                                variant="outlined" 
                                            />
                                        </FormControl>
                                    </Grid>
                                );
                            break;
                        }
                    })
                }
            </Grid>
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <Button loading={isLoading} onClick={handleSave} style={{minWidth: '250px'}} loadingPosition="start" variant="solid">Save</Button>
            </div>
        </>
    )
}