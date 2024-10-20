const { Typography, CardContent, Box, Stack } = require("@mui/material");

export default function ShowNumLikesAndComments({ likes, comments, handleDisplayChange }) {
    return (
      <CardContent sx={{paddingBottom:0}}> 
        <Box
          sx={{
            display: 'flex',
            justifyContent:'flex-end',
          }}
        >
          <Stack 
            direction={'row'} 
            sx={{justifyContent:'center',alignItems:'center'}}
            spacing={1}
            divider={<Typography variant="caption" sx={{ color: 'black', fontWeight: 'bold' }}>•</Typography>}
          >
            {
              likes > 0 && (
                <Typography onClick={() => handleDisplayChange('likes')} variant="body1" sx={{ opacity: 0.8, cursor:'pointer',  }}>
                  {likes} Like{ likes > 1 && 's' }
                </Typography>
              )
            }
            {
              comments > 0 && (
                <Typography onClick={() => handleDisplayChange('comments')} variant="body1" sx={{ opacity: 0.8, cursor:'pointer', }}>
                  {comments} Comment{comments > 1 && 's'}
                </Typography>
              )
            }
            {
              likes == 0 && comments == 0 && (
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  No reactions yet
                </Typography>
              )
            }
          </Stack>
        </Box>
      </CardContent>
    );
  }
  