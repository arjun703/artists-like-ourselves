import { Paper, Grid,FormControl,Tooltip,InputLabel, TextField , Select, MenuItem,  IconButton, Collapse,  Divider, Menu } from "@mui/material"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/material/Typography';
import sportsSettings from './settings'

const steps = ['Select an Sport', 'Fillup Details', 'Preview and Save'];
import { pOSTRequest, getRequest, uPDATErequest, dELETErequest } from '@/app/_components/file_upload';


import DisplayFieldsBasedOnSport from './display_fields_based_on_sports'

export default function HorizontalLinearStepper({sport, info}) {

  const [selectedSport, setSelectedSport] = React.useState(sport)

  const sports = sportsSettings.sports

  const handleSubmit = async (info) => {

    const formData = new FormData();

    formData.append('sport', selectedSport);
    formData.append('info', JSON.stringify(info));
    const result = await uPDATErequest(formData, '/api/key-stats/')
    if (result.success) {
        alert("success")
        return true
    } else {
        alert(result.msg)
        return false
    }

  }

  return (
    <Box sx={{ width: '100%'}} >
      <div style={{paddingTop: '10px'}}>
        <FormControl fullWidth style={{paddingBottom: '15px'}}>
          <InputLabel id="demo-simple-select-label">Select an Sport</InputLabel>
          <Select
              id="demo-simple-select"
              labelId="demo-simple-select-label"
              label="Select an Sport"
              value={selectedSport}
              onChange={(e)=> { setSelectedSport(e.target.value) }}
          >   
              {sports.map(({label, id},i) => (<MenuItem key={i} value={id}  >{label}</MenuItem>))}
          </Select>
        </FormControl>
        {
          selectedSport !== '' && 
          (
            <>
              <DisplayFieldsBasedOnSport sportInfo={info} handleSubmit={handleSubmit} sx={{marginTop: '30px'}} selectedSport = {selectedSport} />
            </>
          )
        }
      </div>
    </Box>
  );
}