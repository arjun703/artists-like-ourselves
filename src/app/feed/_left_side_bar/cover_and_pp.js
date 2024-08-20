import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import ProfileStats from './profile_stats';
import Divider from '@mui/material/Divider';

export default function PPandCover(){
    return(
        <Card >
            <CardActionArea sx={{paddingBottom: '10px'}}>
                <div 
                    class="cover-pic__profile-pic"
                    style={{
                        position:'relative',
                        paddingBottom: '30px'
                    }}
                >
                    <div className="cover-pic">
                        <CardMedia component="img" height="140" image={'/site-assets/left_side_bar_cover_pic.jpg'}  />
                    </div>
                    <div 
                        className="profile-pic"
                        style={{
                            position:'absolute',
                            width: '100%',
                            left: '30px',
                            bottom: '0px'
                        }}
                    >
                        <div
                            style={{position:'relative'}}
                        >
                            <img 
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    border: '5px solid white',
                                    objectFit:'cover' 
                                }} 
                                src="/site-assets/left_side_bar_profile_pic.jpg" 
                            />
                            <h4
                                style={{
                                    position:'absolute', 
                                    bottom: '6px', 
                                    left: '80px',
                                    margin: '0' 
                                }}
                            >
                                Scott Beaver
                            </h4>
                        </div>
                    </div>
                </div>
            </CardActionArea>

            <Divider />

            <ProfileStats />

        </Card>
    )
}