import type { CartItem } from "@/utils/CartContext/CartContextProvider";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { ShoppingCart } from "lucide-react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

type Props = {
    cartItems: CartItem[];
}

const OrderSummary = ({cartItems}: Props) => {

    const getTotalPrice = () => {
        return cartItems?.reduce((total,item) => total + (item.price * item.quantity), 0);
    }

    return (
        <>
            <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight flex justify-between items-center">
                    <div className="text-orange-500 flex items-center space-x-3">
                        <h2 className="text-2xl font-bold">Order</h2>
                        <ShoppingCart className="w-5 h-5"/>
                    </div>
                    <span>${getTotalPrice()}</span>
                </CardTitle>
                <Separator/>
                <CardContent className="space-y-1.5 px-2">
                    {cartItems.map((item, key) => (
                        <div className="flex justify-between" 
                        key={key}>
                            <span>
                                <Badge variant='outline' className="mr-2">
                                    {item.quantity}
                                </Badge>
                                {item.name}
                            </span>
                            <span className='flex items-center gap-1'>
                                $ {(item.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </CardContent>
                <Separator/>
                <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span>${(getTotalPrice() + 10).toFixed(2)}</span>
                </div>
                <Separator/>
            </CardHeader>
        </>
    )
}

export default OrderSummary;