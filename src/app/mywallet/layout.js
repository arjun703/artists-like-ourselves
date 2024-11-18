import Header from "@/app/_components/_header"
import { Container, Grid } from "@mui/material"

export default function DashboardLayout({params,  children }) {
    
    return(
        <>
          <Header />
          <Container maxWidth="sm">
            {children}
          </Container>
        </>
      )

}