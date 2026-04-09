import type { MenuItem } from "@/types";
import { Button } from "./ui/button";
import { Cross } from "lucide-react";
import { useGetMenuItem } from "@/api/myMenuAPI";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { useCart } from "@/utils/CartContext/CartContextProvider";

type Props = {
  item: MenuItem;
};

const ClientMenuItemCard = ({ item }: Props) => {
  const  {menuItem} = useGetMenuItem(item._id);
  const { addToCart } = useCart();

  const handleAdd = () => {
    // Implement add to cart functionality here
    if(menuItem){
      addToCart(menuItem);
    }
  };

  return (
    <Card className="border rounded-lg shadow-sm hover:shadow-md transition-shadow p-0">
      {item.imageUrl && (
        <img
        src={item.imageUrl}
        alt={item.name}
        className="max-h-40 w-full object-cover rounded-t-md mb-1 mt-0"/>
      )}
        <div className="px-4 space-y-2">
          <CardTitle>
            {item.name}
          </CardTitle>
          <CardContent>
            <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">
              {item.category.join(", ")}
            </p>
          </CardContent>
          <CardFooter className="w-full flex justify-end align-bottom pb-3 px-3 mb-0">
            <Button 
            variant="outline" 
            size="sm" 
            className="mt-4 bg-orange-500 text-white hover:bg-orange-600 rounded-full"
            onClick={handleAdd}>
                <Cross className="h-5 w-5"/>
                Agregar
            </Button>
          </CardFooter>
        </div>
        
    </Card>
  );
};

export default ClientMenuItemCard;
