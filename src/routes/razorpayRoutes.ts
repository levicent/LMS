import express from "express";
import { createOrder, verifyPayment } from "../controllers/razorpayController";
import authMiddleware from "../middleware/auth";
const router = express.Router();

router.post("/create-order", authMiddleware, createOrder);
router.post("/verify-payment", authMiddleware, verifyPayment);

export default router;
