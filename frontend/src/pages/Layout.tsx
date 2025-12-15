import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Outlet } from "react-router-dom";
const Layout = () => {

    return(
        <div className="flex flex-col min-h-screen w-screen">
            <Header/>
            <Hero/>
            <div className="mx-auto flex-1 py-10">
                {/* Components go here */}
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}
export default Layout;