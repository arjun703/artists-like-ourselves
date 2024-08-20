import {  Typography, Grid, Box } from '@mui/material';

function ProfileStats() {
  const stats = [
    { label: 'Profile Views', value: '~52' },
    { label: 'Post Views', value: '~810' },
    { label: 'Connections', value: '~205' },
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
                        <Typography variant="subtitle" sx={{color: 'blue'}}>{stat.value}</Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    </Box>
  );
}

export default ProfileStats;