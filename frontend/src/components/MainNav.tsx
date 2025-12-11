import { Link } from "react-router-dom";

const MainNav = () => {
    return (
        <div className="space-x-3">
            <Link to="/login" className="text-lg font-bold text-orange-500">Log In</Link>
            <Link to="/menu" className="text-lg font-bold text-orange-500">Menu</Link>
            <Link to="/my-cart" className="text-lg font-bold text-orange-500">My Cart</Link>
        </div>
    );
}

export default MainNav;