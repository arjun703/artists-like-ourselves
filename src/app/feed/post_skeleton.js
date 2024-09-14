import LoadingPost from '../_components/_loading-post';
import { Stack } from '@mui/material';


export default function LoadingPosts() {
  return (
    <Stack spacing={3}>
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
    </Stack>
  );
}