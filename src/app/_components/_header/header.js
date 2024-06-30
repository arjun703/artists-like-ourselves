import HeaderLoggedIn from "./header_logged_in";
import HeaderNotLoggedIn from "./header_not_logged_in";
import Paper from '@mui/material/Paper';
import getUserNameFromToken from "../useauth";

export default function Header(){
    return (
        <Paper elevation={0} sx={{borderRadius: '0px', position: 'sticky', top: '0px', zIndex: 999}}>
          {
            getUserNameFromToken() 
              ? <HeaderLoggedIn  /> 
              : <HeaderNotLoggedIn />
          }
        </Paper>
    );
}