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
        <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden">
            <Header/>
            {!hideHero && <Hero/>}
            <div className="mx-auto flex-1 w-full max-w-full py-10">
                {/* Components go here */}
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}
export default Layout;