import { Card, CardContent, Skeleton, CardHeader } from "@mui/material";
export default function LoadingPost(){
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