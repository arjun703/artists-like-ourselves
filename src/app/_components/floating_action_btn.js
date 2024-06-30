
import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

export default function FloatingActionButton({btnIcon, btnTitle, handler}) {

    React.useEffect(()=>{
      if(document.querySelector('.floatingButton')){
        const floatingButton=  document.querySelector('.floatingButton')
        floatingButton.style.position="fixed"
        floatingButton.style.bottom="20px"
        if(window.innerWidth < 500){
          floatingButton.style.transform=''
          floatingButton.style.left=''
          floatingButton.style.right="20px"
        }
      }
    })

    return (
      <div  className="floatingButton" style={{ display:'flex', transform: 'translateX(-50%)', left: '50%'}}>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab onClick={handler} color="primary" variant="circular" aria-label="edit">
            {btnIcon}
          </Fab>
        </Box>      
      </div>
    );
  }