import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

function Media() {

  return (
    <Card>
      <CardHeader
        avatar={
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
        }

        title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
        }
        subheader={
            <Skeleton animation="wave" height={10} width="40%" />
        }
      />
      
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
     
      <CardContent>
          <>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
      </CardContent>
    </Card>
  );
}

export default function LoadingPosts() {
  return (
    <Stack spacing={3}>
      <Media />
      <Media />
      <Media />
    </Stack>
  );
}