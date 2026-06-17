export type User = {
    _id: string;
    email: string;
    username: string;
    addressLine: string;
    country: string;
    city: string;
};

export type MenuItem = {
    _id: string;
    name: string;
    price: number;
    category: string[];
    imageUrl?: string;
    lastUpdated: string;
};

export type OrderStatus = 
    | 'placed' 
    | 'paid' 
    | 'inProgress' 
    | 'outForDelivery' 
    | 'delivered';

export type Order = {
    _id: string;
    user: User;
    items: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deliveryDetails: {
        email: string;
        username: string;
        addressLine: string;
        city: string;
        country: string;
    };
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
}
