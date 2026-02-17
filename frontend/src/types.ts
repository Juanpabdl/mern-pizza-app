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
