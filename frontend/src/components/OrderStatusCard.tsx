import type { Order } from "../types";
import { Progress } from "./ui/progress";
import {ORDER_STATUS} from "../config/order-status-config";

type Props = {
    order: Order;
}

const OrderStatusCard = ({ order }: Props) => {

    const getExpectedDelivery = () => {
        const createdAt = new Date(order.createdAt);
        createdAt.setMinutes(createdAt.getMinutes() + 30);
        
        const hours = createdAt.getHours();
        const minutes = createdAt.getMinutes();

        const paddedMinutes = minutes < 10   ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    }

    const getOrderStatus = () => {
        const statusInfo = ORDER_STATUS.find(status => status.value === order.status);
        return statusInfo ? statusInfo.label : "Unknown Status";
    }

    const getOrderProgress = () => {
        const statusInfo = ORDER_STATUS.find(status => status.value === order.status);
        return statusInfo ? statusInfo.progressValue : 0;
    }

    return (
        <>
            <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                <span> Order Status: {getOrderStatus()} </span>
                <span> Expected By: {getExpectedDelivery().toLocaleString()} </span>
            </h1>
            <Progress className="animate-pulse" value={getOrderProgress()}/>
        </>
    )
}

export default OrderStatusCard;