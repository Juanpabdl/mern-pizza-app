import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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

export const useCreateCheckoutSession = () => {
    const {getAccessTokenSilently} = useAuth0();

    const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {
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