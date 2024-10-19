import { Request, Response } from "express";
import razorpayInstance from "../config/razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const createOrder = async (req: Request, res: Response) => {
  const { amount, currency, receipt } = req.body;
  try {
    const options = {
      amount: amount * 100,
      currency,
      receipt,
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(201).json(order);
  } catch (error) {
    console.error("Error in creating order:", error);
    res.status(500).json({ message: "Failed to create order", error });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  const { order_id, payment_id, razorpay_signature } = req.body;

  console.log("req.body", req.body);

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
    .update(`${order_id}|${payment_id}`)
    .digest("hex");

  console.log(generatedSignature, razorpay_signature);

  if (generatedSignature !== razorpay_signature) {
    return res.status(400).json({ message: "Invalid signature" });
  } else {
    res.status(200).json({ message: "Payment successful" });
  }
};
