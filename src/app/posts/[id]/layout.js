import Header from "@/app/_components/_header"
export default function DashboardLayout({ children }) {
    
    return( 
        <section>
            <Header />
            {children}
        </section>
    )
}