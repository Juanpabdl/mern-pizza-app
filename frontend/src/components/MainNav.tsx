import { useAuth0 } from "@auth0/auth0-react";
import UserMenu from "./UserMenu";
import { Button } from "./ui/button";

const MainNav = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    return (
        <div className="flex space-x-2 items-center">
            {isAuthenticated ? (
                <UserMenu/>
            ) : (
                <Button variant='ghost' className="text-lg font-bold text-orange-500" onClick={async ()=> await loginWithRedirect()}>Log In</Button>
            )}
        </div>
    );
}

export default MainNav;