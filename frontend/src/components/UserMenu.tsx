import { useAuth0 } from "@auth0/auth0-react";
import { DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Separator } from "@radix-ui/react-separator";
import { CircleUserRound} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const UserMenu = () => {
    const {user, logout} = useAuth0();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-foreground px-3 font-bold hover:text-orange-600">
                <CircleUserRound className="text-orange-500"/>
                {user?.email}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background rounded-md px-4 py-6 space-y-2.5">
                <DropdownMenuItem>
                    <Link to='/user-profile' className="text-lg font-bold hover:text-orange-400">My Profile</Link>
                </DropdownMenuItem>
                <Separator/>
                <DropdownMenuItem>
                    <Button onClick={() => logout()} 
                    className="flex flex-1 font-bold bg-orange-500">
                        Log Out
                    </Button>
                </DropdownMenuItem>
                <Separator/>
                <DropdownMenuItem>
                    <Link to='/menu' className="text-lg font-bold hover:text-orange-400">Menu</Link>
                </DropdownMenuItem>
                <Separator/>
                <DropdownMenuItem>
                    <Link to='/my-cart' className="text-lg font-bold hover:text-orange-400">My Cart</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default UserMenu;