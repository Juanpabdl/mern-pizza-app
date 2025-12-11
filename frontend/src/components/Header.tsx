import { Link } from "react-router-dom";
import MovileNav from "./MovileNav";
import MainNav from "./MainNav";

const Header = () => {
    return(
        <header className="w-full border-b-2 border-b-orange-500 py-6 px-6">
            <div className="flex mx-auto justify-between items-center">
                <Link to="/"
                className="text-3xl font-bold tracking-tight text-orange-500 transition">
                    Mozzirella's Pizza
                </Link>
                <nav className="gap-6 text-lg md:hidden">
                    <MovileNav/>
                </nav>
                <nav className="gap-6 hidden md:block ">
                    <MainNav/>
                </nav>
            </div>
        </header>
    )
}

export default Header;
