import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetTitle, SheetContent, SheetDescription, SheetHeader } from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";

const MovileNav = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Menu className="text-orange-500"/>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] space-y-3">
                <SheetHeader>
                    <SheetTitle className="text-orange-500 text-2xl font-bold">Welcome to Mozzirella's Pizza</SheetTitle>
                    <Separator className="mb-6 h-0.5"/>
                    <SheetDescription className="flex">
                        <Button className="flex-1 font-bold bg-orange-500">Log In</Button>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent> 
        </Sheet>
    )
}

export default MovileNav;