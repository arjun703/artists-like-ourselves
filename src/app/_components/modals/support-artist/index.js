import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box, Stack, Divider, Typography, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { Button as BtnJoy } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';

// Modal component
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  TextField,
} from '@mui/material';
import toast from 'react-hot-toast';
import PaypalButton from '../../_payment_buttons/_paypal';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WarningIcon from '@mui/icons-material/Warning';
import RecommendIcon from '@mui/icons-material/Recommend';

const SupportModal = ({ open, handleClose, firstName, toBeSupportedID }) => {
  const [selectedOption, setSelectedOption] = useState('coffee'); // Default selection
  const [customAmount, setCustomAmount] = useState('');
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false) 
  const [isPaymentFailure, setIsPaymentFailure] = useState(false) 

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value !== 'custom') {
      setCustomAmount(''); // Clear custom amount if a predefined option is selected
    }
  };

  const handleCustomAmountChange = (event) => {
    setSelectedOption('custom'); // Set to custom if the field is being typed in
    let amount = parseFloat(event.target.value)
    if(amount < 1){
        amount = 1
    }
    setCustomAmount(amount);
  };


  const [isContinueClicked, setIsContinueClicked] = useState(false)

  const returnFinalAmount =() => {
    let amount;
    
    if (selectedOption === 'custom') {
      amount = parseFloat(customAmount) || 0; // Default to 0 if invalid
    } else if (selectedOption === 'coffee') {
      amount = 5;
    } else if (selectedOption === 'dinner') {
      amount = 20;
    }
    return amount
  }

  const handleSubmit = () => {
    
    const amount = returnFinalAmount()

    if(amount < 1){
        toast('Amount less than $1')
        return
    }

    setIsContinueClicked(true)

  };

  const handleSuccess =() => setIsPaymentSuccess(true)
  const handleFailure = () => setIsPaymentFailure(true) 

  if(isPaymentFailure){
    return(
      <Dialog
        open={open}
        onClose={()=>{}}
        aria-labelledby="share-dialog-title"
        maxWidth="sm"
        PaperProps={{
          style: {
            borderRadius: '20px',
            padding: '10px',
            maxWidth: '800px',
            minWidth: '350px'
          },
        }}
        sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        <div style={{display:'flex', justifyContent:'end', right: '100px'}}>
          <IconButton onClick={handleClose} sx={{background:'rgba(0, 0, 0, 0.05)'}}  aria-label="close">
              <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>
          <Stack direction={'column'} gap={2}>
            <div style={{textAlign:'center'}}>
              <WarningIcon sx={{width: 80, height: 80, color:'red',  animation: 'scale 0.5s ease-in-out'}} />
            </div>
            <div id="share-dialog-title" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
              Payment Failed
            </div>
            <Divider></Divider>
            <Typography sx={{textAlign:'center'}}>
              Please try again later
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    )
  }

  if(isPaymentSuccess){
    return(
      <Dialog
        open={open}
        onClose={()=>{}}
        aria-labelledby="share-dialog-title"
        maxWidth="sm"
        PaperProps={{
          style: {
            borderRadius: '20px',
            padding: '10px',
            maxWidth: '800px',
            minWidth: '350px'
          },
        }}
        sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        <div style={{display:'flex', justifyContent:'end', right: '100px'}}>
          <IconButton onClick={handleClose} sx={{background:'rgba(0, 0, 0, 0.05)'}}  aria-label="close">
              <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>
          <Stack direction={'column'} gap={2}>
            <div style={{textAlign:'center'}}>
              <CheckCircleRoundedIcon sx={{width: 80, height: 80, color:'green',  animation: 'scale 0.5s ease-in-out'}} />
            </div>
            <div id="share-dialog-title" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
              Payment Successful
            </div>
            <Divider></Divider>
            <Typography sx={{textAlign:'center'}}>
              Thanks for helping our artists grow
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={()=>{}}
      aria-labelledby="share-dialog-title"
      maxWidth="sm"
      PaperProps={{
        style: {
          borderRadius: '20px',
          padding: '10px',
          maxWidth: '800px',
          minWidth: '350px'
        },
      }}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >

      <div style={{display:'flex', justifyContent:'end', right: '100px'}}>
        <IconButton onClick={handleClose} sx={{background:'rgba(0, 0, 0, 0.05)'}}  aria-label="close">
            <CloseIcon />
        </IconButton>
      </div>

      <DialogTitle id="share-dialog-title" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
          Support {firstName}
      </DialogTitle>

      <DialogContent>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup value={selectedOption} onChange={handleOptionChange}>
            <FormControlLabel value="coffee" control={<Radio />} label="Buy them a Coffee ($5)" />
            <FormControlLabel value="dinner" control={<Radio />} label="Buy them a Dinner ($20)" />
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label={
                <Box sx={{display:'flex', gap: '10px', alignItems:'center', flexWrap: 'wrap'}}>
                        <div>
                            Custom Amount: 
                        </div>
                        <TextField
                            variant="outlined"
                            type={'number'}
                            size="small"
                            placeholder="$"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            sx={{ maxWidth: '100px' }}
                        />
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>
        <Box  justifyContent="center" mt={4}>
            {
                !isContinueClicked || returnFinalAmount() < 1 ? (
                    <BtnJoy disabled={returnFinalAmount() < 1} variant="solid" fullWidth onClick={handleSubmit}>
                        Continue
                    </BtnJoy>
                ): (
                    <>
                        <Stack direction={'column'} gap={2}>
                            <Divider>Support with ${returnFinalAmount()}</Divider>
                            <PaypalButton 
                              handleFailure={handleFailure} 
                              handleSuccess={handleSuccess} 
                              amount={returnFinalAmount()}
                              artistId={toBeSupportedID} 
                            />
                        </Stack>
                    </>
                )
            }

        </Box>
      </DialogContent>
    </Dialog>
  );
};



export const SupportButton = ({firstName, toBeSupportedID, type}) => {

  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () =>setOpen(false)


  return (
    <>
      {
        type === 'button' ? (
          <BtnJoy
            onClick={handleOpen}
            variant='solid'
          >
            Support Me
          </BtnJoy>
        ): (
          <ListItem  onClick={handleOpen} disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <RecommendIcon />
                </ListItemIcon>
                <ListItemText primary= {'Support ' + firstName} />
            </ListItemButton>
        </ListItem>
        )
      }
      <SupportModal toBeSupportedID={toBeSupportedID} firstName={firstName} open={open} handleClose={handleClose}  />
    </>
  );

};


