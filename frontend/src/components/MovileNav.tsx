import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetTitle, SheetContent, SheetDescription, SheetHeader } from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MovileNavLinks from "./MovileNavLinks";

const MovileNav = () => {
    const {isAuthenticated, loginWithRedirect, user} = useAuth0();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Menu className="text-orange-500"/>
            </SheetTrigger>
            <SheetContent side="left" className="max-w-[400px] space-y-3">
                <SheetHeader>
                    <SheetTitle className="text-orange-500 text-xl font-bold w-fit">
                        {isAuthenticated ? (
                            <span className="flex items-center font-bold gap-2">
                                <CircleUserRound className="text-orange-500"/>
                                {user?.email}
                            </span>
                        ) : (
                            <span>Welcome to Mozzirella's Pizza</span>
                        )}
                    </SheetTitle>
                    <Separator className="mb-6 h-0.5"/>
                    <SheetDescription className="flex">
                        {isAuthenticated ? (
                            <MovileNavLinks/>
                        ):(
                            <Button onClick={async ()=> await loginWithRedirect()} 
                            className="flex-1 font-bold bg-orange-500">Log In</Button>
                        )}
                    </SheetDescription>
                </SheetHeader>
            </SheetContent> 
        </Sheet>
    )
}

export default MovileNav;