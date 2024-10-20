import { Button } from "@mui/joy";
import ShareButton from "../../modals/share-posts";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { CardActions, Divider, Stack } from "@mui/material";

export default function LikeShareCommentButtons({ handleLikeUnlike, p, isLiked, isLikingOrUnliking,handleDisplayChange}){
    return(
        <>
            <Stack spacing={2} sx={{marginTop:'10px'}}>
                <Divider />
                <CardActions sx={{marginTop:0, paddingTop:'0'}}>
                    <Button 
                        color={isLiked ? 'danger': 'neutral'} 
                        variant={'outlined'} 
                        startDecorator={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
                        sx={{opacity: '1!important'}}  
                        onClick={isLikingOrUnliking ? () => {} :  handleLikeUnlike}
                        fullWidth
                    >
                        {isLiked ? 'Liked' : 'Like'}
                    </Button>

                    <Button 
                        color={'neutral'} 
                        variant={'outlined'} 
                        startDecorator={<CommentIcon /> }
                        sx={{opacity: '1!important'}}  
                        fullWidth
                        onClick={()=>handleDisplayChange('comments')}
                    >
                        Comment
                    </Button>
                    <ShareButton postID={p.id} />
                </CardActions>
            </Stack>
        </>
    )
}