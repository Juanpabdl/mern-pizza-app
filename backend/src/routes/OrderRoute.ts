import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import OrderController from "../controller/orderController.js";
const router = express.Router();

// api/order
router.post(
    "/checkout/create-checkout-session",
    jwtCheck,
    jwtParse,
    OrderController.createCheckoutSession
);

export default router;