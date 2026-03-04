import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "./ui/button";
import type { MenuItem } from "@/types";
import { Delete, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
    menuItem: MenuItem;
    key: string;
}

const ManageMenuListItem = ({key, menuItem}: Props) => {
    const navigate = useNavigate();

     const handleUpdate = () => {
        navigate(`/update-menu/${menuItem._id}`, {state: {menuItem}});
     }

    return (
        <div key={key} className="grid grid-cols-1 md:grid-cols-3 items-center px-3 gap-4 md:gap-6 bg-white rounded-md shadow-md">
            <AspectRatio ratio={1/1} className="w-full">
                <img src={menuItem.imageUrl} 
                alt={`Menu-item-${menuItem._id}`} 
                className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
            <div className="py-4 space-y-1 space-x-2">
                <h2 className="text-2xl font-bold mb-2">{menuItem.name}</h2>
                <p className="text-lg font-semibold">${menuItem.price}</p>
            </div> 
            <div className="space-y-5 space-x-3">
                <Button className="bg-orange-500"
                onClick={handleUpdate}>
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                </Button>
                <Button className="bg-red-500">
                    <Delete className="mr-1 h-4 w-4" />
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default ManageMenuListItem;