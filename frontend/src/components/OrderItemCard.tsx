import { ORDER_STATUS } from "@/config/order-status-config";
import type {Order} from "../types";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";

type Props = {
    order: Order;
}

const OrderItemCard = ({ order }: Props) => {
    const getTime=()=>{
        const orderTime = new Date(order.createdAt);

        const hours = orderTime.getHours();
        const minutes = orderTime.getMinutes();
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid md:grid-cols-4 gap-4 justify-between">
                    <div>
                        Customer Name: 
                        <span className="ml-2 font-normal">{order.user.username}</span>
                    </div>
                    <div>
                        Delivery Address: 
                        <span className="ml-2 font-normal">{order.deliveryDetails.addressLine}, {order.deliveryDetails.city}</span>
                    </div>
                    <div>
                        Time: 
                        <span className="ml-2 font-normal">{getTime()}</span>
                    </div>
                    <div>
                        Total Amount: 
                        <span className="ml-2 font-normal">${(order.totalAmount/100).toFixed(2)}</span>
                    </div>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    {order.items.map((item) => (
                        <span key={item.menuItemId}>
                            <Badge variant="outline" className="mr-2">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                    ))}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="status">What is the status of the order?</Label>
                    <Select>
                        <SelectTrigger id="status" className="w-full">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {ORDER_STATUS.map((status) => (
                                <SelectItem value={status.value}>{status.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}

export default OrderItemCard;