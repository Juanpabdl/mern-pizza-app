import { Link } from "react-router-dom";
import MovileNav from "./MovileNav";

const Header = () => {
    return(
        <header className="w-full border-b-2 border-b-orange-500 py-6 px-6">
            <div className="flex mx-auto justify-between items-center">
                <Link to="/"
                className="text-3xl font-bold tracking-tight text-orange-500 transition">
                    Mozzirella's Pizza
                </Link>
                <nav className="flex gap-6 text-lg md:hidden">
                    <MovileNav/>
                </nav>
            </div>
        </header>
    )
}

export default Header;
