import type { Request, Response } from "express";
import Stripe from "stripe";
import type { CartItemType } from "../models/menu.js";

const STRIPE =  new Stripe(process.env.STRIPE_API_KEY! as string);
const FRONTEND_URL = process.env.FRONTEND_URL! as string;

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

const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;
        
        const { cartItems } = checkoutSessionRequest;
        
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        //1. Create line items for Stripe checkout
        const lineItems = createLineItems(cartItems);

        //2. Create a checkout session
        const session = await createSession(lineItems, "TEST_ORDER_ID"); // You can replace "TEST_ORDER_ID" with the actual order ID when you have it
        
        if(!session.url) {
            return res.status(500).json({ message: "Failed to create checkout session" });
        }

        //3. Respond with the session URL
        res.status(200).json({ url: session.url });
    } catch (error: any) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ message: error.raw.message || "Internal server error", error });
    }   
}

const createLineItems = (cartItems: CartItemType[]) => {
    //1. For each cartItem, get the menu item details
    //2. For each cart Item, we need to create a line item with price data and quantity
    //3. Return the array of line items
    const lineItems = cartItems.map(item => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.name,
            },
            unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
    }));
    return lineItems;
}

const createSession = async (lineItems: any, orderId: string) => {
    const session = await STRIPE.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        shipping_options:[
            {
                shipping_rate_data: {
                    display_name: "Delivery",
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 1000, // $10 delivery fee
                        currency: "usd"
                    }
                }
            }
        ],
        mode: "payment",
        metadata: { orderId },
        success_url: `${FRONTEND_URL}/order-status?success=true`,
        cancel_url: `${FRONTEND_URL}/details?orderId=${orderId}?canceled=true`,
    });
    return session;
}

export default {
    createCheckoutSession
};
