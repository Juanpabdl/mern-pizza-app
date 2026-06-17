import { useAuth0 } from "@auth0/auth0-react";
import UserMenu from "./UserMenu";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const MainNav = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    return (
        <div className="flex space-x-2 items-center">
            {isAuthenticated ? (
                <>
                    <Link to="/order-status" className="text-lg font-bold text-foreground hover:text-orange-400">
                        Order Status
                    </Link>
                    <UserMenu/>
                </>
            ) : (
                <Button variant='ghost' className="text-lg font-bold text-orange-500" onClick={async ()=> await loginWithRedirect()}>Log In</Button>
            )}
        </div>
    );
}

export default MainNav;