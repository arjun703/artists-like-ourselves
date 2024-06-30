import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import Link from '@mui/material/Link';

export default function SocialLinks({basicInfo}){

    const socialLinks = [
        { icon: <YouTubeIcon sx={{color: 'red'}} />, link: basicInfo?.youtube || ''},
        { icon: <InstagramIcon sx={{ color: 'rgb(134, 70, 159)' }} />, link:  basicInfo?.instagram || '' },
        { icon: <FacebookIcon sx={{color: 'blue'}} />, link:  basicInfo?.facebook || '' },
        { icon: <XIcon />, link:  basicInfo?.twitter || '' }
    ]

    return(
        <Paper sx={{ p: '0 20px 20px 20px' }}>
            <h3 style={{ marginBottom: '10px', color: '#333' }}>Social Links</h3>
            <Grid container spacing={2} padding={'8px 0 8px 0'} sx={{cursor: 'pointer'}}>
                {
                    socialLinks.map((sl,i) => {
                        if(sl.link.toString().trim().length === 0 ){
                            return''
                        }
                        return(
                            <Grid item key={i} >
                                <Link target="_blank" href={sl.link}>
                                    {sl.icon}
                                </Link>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Paper>
    )
}