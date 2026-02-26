import MenuListItem from "./ManageMenuListItem";
import type { MenuItem as MenuItemType } from "@/types";

type Props = {
    menuItems: MenuItemType[];
}
const ManageMenuList = ({menuItems}: Props) => {
    return (
        <div className="p-4 md:p-6 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {menuItems.map((item) => (
                    <MenuListItem key={item._id} menuItem={item} />
                ))}
            </div>
        </div>)
}

export default ManageMenuList;