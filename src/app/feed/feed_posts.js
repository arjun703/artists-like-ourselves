'use client'

import Post from '../_components/post';
import { Stack } from '@mui/material';

export default function FeedPosts({posts}) {


    return (
        <>        

            <Stack container spacing={2}>
                {
                    posts.map((post, index) => {
                        return <Post post={post} key={index} />
                    })
                }
            </Stack>
        </>
    );

}