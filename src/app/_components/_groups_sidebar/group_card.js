import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function GroupCard({group, handleFeedTypeFilterChange}) {
  return (
    <>
      <Card onClick={() =>handleFeedTypeFilterChange(group.key)}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={group.image_src}
            alt={group.name}
          />
          <CardContent>
            <Typography gutterBottom  component="div">
              {group.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>    
    </>
  );
}