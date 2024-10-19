"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.createOrder = void 0;
const razorpay_1 = __importDefault(require("../config/razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, currency, receipt } = req.body;
    try {
        const options = {
            amount: amount * 100,
            currency,
            receipt,
        };
        const order = yield razorpay_1.default.orders.create(options);
        res.status(201).json(order);
    }
    catch (error) {
        console.error("Error in creating order:", error);
        res.status(500).json({ message: "Failed to create order", error });
    }
});
exports.createOrder = createOrder;
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id, payment_id, razorpay_signature } = req.body;
    console.log("req.body", req.body);
    const generatedSignature = crypto_1.default
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${order_id}|${payment_id}`)
        .digest("hex");
    console.log(generatedSignature, razorpay_signature);
    if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({ message: "Invalid signature" });
    }
    else {
        res.status(200).json({ message: "Payment successful" });
    }
});
exports.verifyPayment = verifyPayment;
