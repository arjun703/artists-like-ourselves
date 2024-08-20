import ShortTextIcon from '@mui/icons-material/ShortText';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import MicIcon from '@mui/icons-material/Mic';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';


export default function PostUploadFormInitiator({handlePostUploadFormDisplay}){
    return(
        <>
            <Grid container spacing={2} sx={{alignItems:'center'}}>
                <Grid item>
                <Avatar
                    alt="Avatar Image"
                    src={'https://cdn.truelancer.com/user-picture/4303455-654ae175ab2a5.jpg'}
                    sx={{ width: 50, height: 50 }}
                />
                </Grid>
                <Grid item xs onClick={handlePostUploadFormDisplay}>
                <div class="light-bg-on-hover" style={{padding:'12px 20px', curspor:'pointer', border:'1px solid rgba(0, 0, 0, 0.5)', borderRadius: '35px'}} >Express your Positive Art</div>
                </Grid>
            </Grid>
            <div style={{display:'flex', justifyContent: 'space-around', marginTop: '20px', }}>
                <ShortTextIcon />
                <InsertPhotoIcon />
                <VideoCameraBackIcon />
                <MicIcon />
            </div>        
        </>
    )
}