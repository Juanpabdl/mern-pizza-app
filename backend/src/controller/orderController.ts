import type { Request, Response } from "express";
import Stripe from "stripe";
import type { CartItemType } from "../models/menu.js";
import Order from "../models/order.js";

const STRIPE =  new Stripe(process.env.STRIPE_API_KEY! as string);
const FRONTEND_URL = process.env.FRONTEND_URL! as string;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET! as string;

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

const getMyOrders = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const orders = await Order.find({ user: userId }).populate("user").populate("items.menuItemId", "name");
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Something went wrong" });
    }   
}

const stripeWebhookHandler = async (req: Request, res: Response) => {
    let event;

    try {
        const sig = req.headers['stripe-signature'] as string;
        event = STRIPE.webhooks.constructEvent(req.body, sig, STRIPE_ENDPOINT_SECRET);
    } catch (error: any) {
        console.log(error);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    if(event?.type === 'checkout.session.completed') {
        const order = await Order.findById(event.data.object.metadata?.orderId);

        if(!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = "paid";
        order.totalAmount = event.data.object.amount_total;
        await order.save();
    }

    res.status(200).send()
}


const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;
        
        const { cartItems } = checkoutSessionRequest;
        
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const newOrder = new Order({
                user: req.userId,
                status: "placed",
                 deliveryDetails: checkoutSessionRequest.deliveryDetails,
                items: cartItems.map(item => ({
                    menuItemId: item.menuItemId,
                    name: item.name,
                    quantity: parseInt(item.quantity),
                })),
                //totalAmount: cartItems.reduce((total, item) => total + item.price * parseInt(item.quantity), 0),
                createdAt: new Date(),
        });

        const lineItems = createLineItems(cartItems);

        const session = await createSession(lineItems, newOrder._id.toString());
        
        if(!session.url) {
            return res.status(500).json({ message: "Failed to create checkout session" });
        }

        await newOrder.save();
        res.status(200).json({ url: session.url });
    } catch (error: any) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ message: error.raw.message || "Internal server error", error });
    }   
}

const createLineItems = (cartItems: CartItemType[]) => {
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
        success_url: `${FRONTEND_URL}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${FRONTEND_URL}/menu`,
    });
    return session;
}

export default {
    createCheckoutSession,
    stripeWebhookHandler,
    getMyOrders,
};
