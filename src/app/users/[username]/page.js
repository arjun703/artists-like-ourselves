
import UserPosts from "./posts"
import { Container, Grid } from "@mui/material"
import LeftSidebar from "./left_sidebar"
import RightSidebar from "./right_sidebar"
import Header from "@/app/_components/_header"

export default function User({params}){

    return(
      <>
        <Header />
        <Container maxWidth="lg">
            <Grid container spacing={4} sx={{marginTop: '1px'}}>
                <Grid item xs={12} md={3}>
                    <LeftSidebar username={params.username} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <UserPosts username={params.username} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <RightSidebar username={params.username} />
                </Grid>
            </Grid>
        </Container>
      </>
    )
}