import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Order } from "../types";

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        price: number;
        quantity: string;
    }[];
    deliveryDetails: {
        email: string;
        username: string;
        addressLine: string;
        city: string;
        country: string;
    }
}

type UpdateStatusOrderRequest = {
    orderId: string;
    status: string;
}

export const useCreateCheckoutSession = () => {
    const {getAccessTokenSilently} = useAuth0();

    const createCheckoutSessionRequest = async (
        checkoutSessionRequest: CheckoutSessionRequest
    ) => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`${API_BASE_URL}/api/order/checkout/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` // Include the access token in the Authorization header
                },
                body: JSON.stringify(checkoutSessionRequest)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to create checkout session");
            }
            console.log("Checkout session created successfully:", data);
            return data; // Return the checkout session URL
        } catch (error: any) {
            console.error("Error creating checkout session:", error);
            throw error; // Rethrow the error to be handled by the caller
        }   
    };

    const {
        mutateAsync: createCheckoutSession,
        error,
        isPending,
        reset
    } = useMutation({
        mutationFn: createCheckoutSessionRequest,
    });

    if (error) {
        toast.error(error.toString() || "Failed to create checkout session");
        reset();
    }
    
    return { 
        createCheckoutSession,  
        isPending 
    };
}

export const useGetMyOrders = () => {
    const {getAccessTokenSilently} = useAuth0();

    const getMyOrdersRequest = async (): Promise<Order[]> => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`${API_BASE_URL}/api/order`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` // Include the access token in the Authorization header
                },
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to get orders");
            }

            return data;
        } catch (error: any) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    };

    const {data: orders, isPending, error} = useQuery({
        queryKey: ["myOrders"],
        queryFn: getMyOrdersRequest,
        refetchInterval: 5000 // Refetch every 5 seconds
    });

    if (error) {
        toast.error(error.toString() || "Failed to fetch orders");
    }

    return {
        orders,
        isPending
    };
}

export const useUpdateOrderStatus = () => {
    const {getAccessTokenSilently} = useAuth0();

    const updateOrderStatusRequest = async (
        updateStatusOrderRequest: UpdateStatusOrderRequest
    ) => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`${API_BASE_URL}/api/order/${updateStatusOrderRequest.orderId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` // Include the access token in the Authorization header
                },
                body: JSON.stringify({ status: updateStatusOrderRequest.status })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to update order status");
            }
            return data;
        } catch (error: any) {
            console.error("Error updating order status:", error);
            throw error;
        }
    };

    const {
        mutateAsync: updateOrderStatus,
        error,
        isPending,
        isSuccess,
        reset
    } = useMutation({
        mutationFn: updateOrderStatusRequest,
    });

    if (isSuccess) {
        toast.success("Order updated ");
    }

    if (error) {
        toast.error(error.toString() || "Failed to update order");
        reset();
    }

    return {
        updateOrderStatus,
        isPending
    };
}
