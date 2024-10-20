import { Divider, Paper, Skeleton, Stack } from "@mui/material";

export default function FeedLeftSidebarSkeleton(){
    return(
        <Paper sx={{p:2}}>
            <Stack spacing={2}>
                <Skeleton variant="rectangular" width={'100%'} height={150} />
                <Divider />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Stack>
        </Paper>
    )
}