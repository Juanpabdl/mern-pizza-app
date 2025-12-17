import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const MainNav = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    return (
        <span className="flex space-x-2 items-center">
            {isAuthenticated ? (
                <UserMenu/>
            ) : (
                <Link to="/login" className="text-lg font-bold text-orange-500" onClick={async ()=> await loginWithRedirect()}>Log In</Link>
            )}
        </span>
    );
}

export default MainNav;