import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
const Layout = () => {

    return(
        <div className="flex flex-col min-h-screen w-screen">
            <Header/>
            <div className="mx-auto flex-1 py-10">
                {/* Components go here */}
                <Outlet/>
            </div>
        </div>
    )
}
export default Layout;