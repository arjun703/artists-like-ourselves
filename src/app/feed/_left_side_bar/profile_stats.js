import {  Typography, Grid, Box } from '@mui/material';
import Link from 'next/link';

function ProfileStats({data}) {

  const stats = [
    { label: 'Profile Views', value: data.profileViewsCountInfo.profile_views_count, link: data.profile_views_list_link },
    { label: 'Post Views', value: data.postViewsCountInfo.post_views_count, link: data.post_views_info_link },
    { label: 'Followers', value: data.followersInfo.followers_count, link: data.followers_list_link },
    { label: 'Followings', value: data.followingsInfo.followings_count, link: data.follwings_list_link },
    { label: 'Post Likes', value: data.postLikesCountInfo.post_likes_count, link: data.post_likes_stats_link },
  ];

  

  return (
    <Box sx={{ mx: 'auto', p: 2, }}>
        <Grid container>
            {stats.map((stat, index) => (
                <Grid item xs={12} key={index}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '30px',
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="subtitle1">{stat.label}</Typography>
                        {
                            stat.link.trim().length > 0 ? (
                                <Link href={stat.link}>
                                    <Typography  variant="subtitle" sx={{color: 'blue'}}>~{stat.value}</Typography>
                                </Link>
                            ): (
                                <Typography  variant="subtitle" sx={{color: 'blue'}}>~{stat.value}</Typography>
                            )
                        }
                    </Box>
                </Grid>
            ))}
        </Grid>
    </Box>
  );
}

export default ProfileStats;