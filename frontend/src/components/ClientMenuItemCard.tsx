import type { MenuItem } from "@/types";
import { Button } from "./ui/button";
import { Cross } from "lucide-react";
import { useGetMenuItem } from "@/api/myMenuAPI";
import { Card, CardDescription, CardFooter, CardTitle } from "./ui/card";

type Props = {
  item: MenuItem;
};

const ClientMenuItemCard = ({ item }: Props) => {
  const  {menuItem} = useGetMenuItem(item._id);

  const addToCart = () => {
    // Implement add to cart functionality here
    console.log(`Adding ${menuItem?.name || item.name} to cart`);
  };

  return (
    <Card className="border rounded-lg shadow-sm hover:shadow-md transition-shadow p-0">
      {item.imageUrl && (
        <img
        src={item.imageUrl}
        alt={item.name}
        className="max-h-40 w-full aspect-square object-cover rounded-t-md mb-1 mt-0"/>
      )}
        <div className="px-4 pb-4 space-y-2">
          <CardTitle>
            {item.name}
          </CardTitle>
          <CardDescription>
            <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">
                Categories: {item.category.join(", ")}
            </p>
          </CardDescription>
        </div>
        <CardFooter className="w-full flex justify-end align-middle pb-3 px-3">
            <Button 
            variant="outline" 
            size="sm" 
            className="mt-4 bg-orange-500 text-white hover:bg-orange-600 rounded-full"
            onClick={addToCart}>
                <Cross className="h-5 w-5"/>
                Agregar
            </Button>
        </CardFooter>
    </Card>
  );
};

export default ClientMenuItemCard;
