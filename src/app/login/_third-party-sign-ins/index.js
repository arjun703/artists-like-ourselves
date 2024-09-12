import FacebookSignIn from "./_facebook-sign-in";

import GoogleSignInButton from "./_google-sign-in";

import { Stack, Divider } from "@mui/material";

import Alert from '@mui/material/Alert';


export default function ThirdPartySignIns(){
    return(
        <Stack spacing={3}>
            
            <Alert severity="info">
                Please choose one of following social logins to get started.
            </Alert>
            <div style={{display:'flex', justifyContent:'center'}}>
                <GoogleSignInButton />
            </div>
            <Divider>or</Divider>
            <div style={{display:'flex', justifyContent:'center'}}>
                <FacebookSignIn />
            </div>
        </Stack>
    )
}