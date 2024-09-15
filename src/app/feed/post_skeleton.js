import LoadingPost from '../_components/_loading-post';
import { Stack } from '@mui/material';


export default function sLoadingPosts() {
  return (
    <Stack spacing={3}>
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
    </Stack>
  );
}