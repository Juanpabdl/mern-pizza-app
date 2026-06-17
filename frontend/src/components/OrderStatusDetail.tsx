import type {Order} from "../types";
import {Separator} from "./ui/separator";

type Props = {
    order: Order;
}

const OrderStatusDetail = ({ order }: Props) => {
    return (
        <div className="space-y-5">
            <div className="flex flex-col">
                <span className="font-bold">Deliver to:</span>
                <span>{order.deliveryDetails?.username}</span>
                <span>{order.deliveryDetails?.addressLine}, {order.deliveryDetails?.city}</span>
            </div>
            <div className="flex flex-col">
                <span className="font-bold">Your Order:</span>
                <ul className="list-disc list-inside">
                    {order.items?.map((item) => (
                        <li key={item.menuItemId}>
                            {item.name} x {item.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <Separator/>
            <div className="flex flex-col">
                <span className="font-bold">Total:</span>
                <span>${(order.totalAmount / 100).toFixed(2)}</span>
            </div>
        </div>
    )
}

export default OrderStatusDetail;