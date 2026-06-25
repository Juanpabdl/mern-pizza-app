import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import OrderController from "../controller/orderController.js";
import Order from "../models/order.js";
const router = express.Router();

// api/order
router.get(
    "/", 
    jwtCheck, 
    jwtParse, 
    OrderController.getMyOrders
);

router.post(
    "/checkout/create-checkout-session",
    jwtCheck,
    jwtParse,
    OrderController.createCheckoutSession
);

router.post("/checkout/webhook", OrderController.stripeWebhookHandler)

router.patch(
    "/:orderId/status",
    jwtCheck,
    jwtParse,
    OrderController.updateOrderStatus
)

export default router;