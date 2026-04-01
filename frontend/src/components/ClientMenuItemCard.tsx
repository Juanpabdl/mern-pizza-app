import type { MenuItem } from "@/types";
import { Button } from "./ui/button";
import { Cross } from "lucide-react";

type Props = {
  item: MenuItem;
};

const ClientMenuItemCard = ({ item }: Props) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-40 w-full object-cover rounded-md mb-3"
        />
      )}

      <h3 className="text-md font-semibold mb-1">{item.name}</h3>
      <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
      <p className="text-xs text-gray-500 mt-2">
        Categories: {item.category.join(", ")}
      </p>
      <div className="flex justify-end">
        <Button variant="outline" size="sm" className="mt-4 bg-orange-500 text-white hover:bg-orange-600 rounded-full">
            <Cross className="h-5 w-5"/>
            Agregar
        </Button>
      </div>
    </div>
  );
};

export default ClientMenuItemCard;
