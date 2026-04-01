import { useGetMyMenu } from "@/api/myMenuAPI";
import type { MenuItem } from "@/types";
import ClientMenuItemCard from "./ClientMenuItemCard";

type Props = {
    category: string,
}

const ClientMenuDisplay = ({ category }: Props) => {
    const { menuItems, isPending } = useGetMyMenu();

    const filteredList: MenuItem[] = menuItems?.filter(
        (item: MenuItem) => item.category.includes(category)
    ) ?? [];

    if (isPending) {
        return <div className="h-[200px] leading-24">Loading...</div>;
    }

    if (!menuItems || menuItems.length === 0) {
        return <div className="h-[200px] leading-24">No menu items available.</div>;
    }

    if (filteredList.length === 0) {
        return <div className="h-[200px] leading-24">No items found for &quot;{category}&quot;.</div>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">{category}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredList.map((item) => (
                    <ClientMenuItemCard key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ClientMenuDisplay;