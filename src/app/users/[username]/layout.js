import Header from "@/app/_components/_header"
import { Container, Grid } from "@mui/material"
import RightSidebar from "./right_sidebar"

export default function DashboardLayout({params,  children }) {
    
    return(
        <>
          <Header />
          <Container maxWidth="lg">
              <Grid container spacing={4} sx={{marginTop: '1px'}}>
                  <Grid item xs={12} md={9}>
                      {children}
                  </Grid>
                  <Grid item xs={12} md={3}>
                      <RightSidebar username={params.username} />
                  </Grid>
              </Grid>
          </Container>
        </>
      )

}