import Header from '@/app/_components/_header/header';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import useLang from '../_components/uselang';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AccessibleIcon from '@mui/icons-material/Accessible';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:'#fff',
    ...theme.typography.body2,
    padding: '10px', 
    display:'flex',
    height: '100%',
    alignItems: 'center',
    gap: '10px'
}));
  

export default function BelowBanner(){

    return(
        <Container maxWidth="lg" sx={{marginTop: '30px', marginBottom: '20px'}}>
            <Box>
                <Grid container spacing={2}>

                    <Grid item md={4} xs={12}>
                        <Item>
                            <AccessibilityNewIcon sx={{fontSize: '50px'}}></AccessibilityNewIcon>
                            <h5>
                                Connect with ever increasing network of Artists
                            </h5>
                        </Item>

                    </Grid>

                    <Grid item md={4} xs={12} >
                        <Item>
                            <AccessibleIcon sx={{fontSize: '50px'}}></AccessibleIcon>
                            <h5>
                                Build followers
                            </h5>
                        </Item>

                    </Grid>

                    <Grid item md={4} xs={12} >
                        <Item>
                            <AccessibleForwardIcon sx={{fontSize: '50px'}}></AccessibleForwardIcon>
                            <h5>
                                Share the love
                            </h5>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );

}