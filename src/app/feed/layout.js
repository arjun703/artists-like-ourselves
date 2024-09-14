import Header from "../_components/_header"
export default function DashboardLayout({ children }) {
    return( 
        <section>
            <Header />
            {children}
        </section>
    )
}