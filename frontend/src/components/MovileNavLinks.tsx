import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";

const MovileNavLinks = () => {
    const {logout} = useAuth0();
    
    return (
        <div className="flex flex-col gap-4">
            <Link to="/user-profile" className="text-lg text-foreground font-bold hover:text-orange-400">User Profile</Link>
            <Link to="/menu" className="text-lg text-foreground font-bold hover:text-orange-400">Menu</Link>
            <Link to="/my-cart" className="text-lg text-foreground font-bold hover:text-orange-400">My Cart</Link>
            <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} 
            className="flex flex-1 font-bold bg-orange-500 hover:bg-gray-500">
                Log Out
            </Button>
        </div>
    )
}

export default MovileNavLinks;