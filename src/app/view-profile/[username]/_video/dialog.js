import Button from '@mui/joy/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import Slide from '@mui/material/Slide';
import RotateRightRoundedIcon from '@mui/icons-material/RotateRightRounded';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
  
export default function DialogBox({maxWidth, dialogTitle, dialogContent, handleCancel=false,  handleConfirm=false}){
    const [isLoading, setIsLoading] = React.useState(false)

    return(
        <Dialog
            fullWidth={true}
            maxWidth={maxWidth}
            TransitionComponent={Transition}
            open={true}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle >
                {dialogTitle}
            </DialogTitle>
            <DialogContent>
                {dialogContent}
            </DialogContent>
            {
                handleConfirm && (
                    <DialogActions>
                        <Button variant="plain" sx={{display: isLoading && 'none' }} onClick={handleCancel}>Cancel</Button>
                        <Button 
                            variant={!isLoading ? 'plain' : 'outlined'}
                            color="danger"
                            loading={isLoading}
                            onClick={()=>{
                                setIsLoading(true)
                                handleConfirm();
                            }} 
                            startIcon={isLoading && <RotateRightRoundedIcon/> }
                            autoFocus
                        > Confirm </Button>
                    </DialogActions>
                )
            }

        </Dialog>
    )
}