const { CardContent, Typography } = require("@mui/material")

export default  function DisplayCardContent({caption}){
    if(!(caption.trim().length)){
      return(
        <></>
      )
    }
    return(
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {caption}
        </Typography>
    </CardContent>
    )
  }