import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
    const location = useLocation();

    const hideHero = 
        location.pathname === '/user-profile' ||
        location.pathname === '/manage-restaurant' ||
        location.pathname === '/menu' ||
        location.pathname === '/order-status' ||
        /^\/update-menu\/\d+/.test(location.pathname);

    return(
        <div className="flex flex-col min-h-screen w-screen">
            <Header/>
            {!hideHero && <Hero/>}
            <div className="w-full mx-auto flex-1 py-10">
                {/* Components go here */}
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}
export default Layout;