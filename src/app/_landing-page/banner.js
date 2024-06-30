import { Height, Opacity } from "@mui/icons-material";
import useLang from "../_components/uselang";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/joy/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from "next/navigation";

export default function Banner() {
    const lang = useLang();
    const router = useRouter();
    const handleClick = () => {
        router.push('/register')
    }
    return (
        <div class="banner position-relative">
            <div class="banner-image">
                <img src="/site-assets/banner.webp" class="banner-image" alt="Tennis Hero" />
            </div>
            <div class="position-absolute-lg">
                <Box>
                    <div class="banner-card-wrapper">
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h4" sx={{fontWeight:700}} gutterBottom>
                                    {lang.unlock_your_potential}
                                </Typography>
                                <Typography component="div">
                                    {lang.we_help_high_school_text}
                                </Typography>
                            </CardContent>
                            <div  class="banner-cardactions-wrapper">
                                <CardActions>
                                    <div class="banner-button-wrapper">
                                        <Button 
                                            sx={{minWidth: '250px'}} 
                                            variant="solid" 
                                            onClick={handleClick}
                                        >
                                            {lang.sign_up_text}
                                        </Button>
                                    </div>
                                </CardActions>
                            </div>
                        </Card>
                    </div>
                </Box>
            </div>
        </div>
    );
  }