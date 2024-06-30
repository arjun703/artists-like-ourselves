import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import  ListItemIcon  from '@mui/material/ListItemIcon';
import  ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function MoreActions({menuitems}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const  isLargerDevice = useMediaQuery('(min-width:900px)');

  return (
    <div>
      <IconButton
        id="basic-button"
        sx={{backgroundColor: isLargerDevice && 'rgba(0, 0, 0, 0.06)' }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
      >
        {
          menuitems.map(({label, icon, handler}, index) => {
            return(
              <MenuItem key={index} onClick={()=>{handleClose();handler()}}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText>{label}</ListItemText>
              </MenuItem>
            )
          })
        }

      </Menu>
    </div>
  );
}