import type { OrderStatus } from "../types";

type OrderStatusInfo = {
    value: OrderStatus;
    label: string;
    progressValue: number;
}

export const ORDER_STATUS: OrderStatusInfo[] = [
    { 
        value: 'placed', 
        label: 'Placed', 
        progressValue: 0 
    },{ 
        value: 'paid', 
        label: 'Awaiting Restaurant Confirmation', 
        progressValue: 25 
    },{ 
        value: 'inProgress', 
        label: 'In Progress', 
        progressValue: 50
    },{ 
        value: 'outForDelivery', 
        label: 'Out for Delivery', 
        progressValue: 75 
    },{ 
        value: 'delivered', 
        label: 'Delivered', 
        progressValue: 100 
    },
]