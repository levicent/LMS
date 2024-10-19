"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const razorpayController_1 = require("../controllers/razorpayController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/create-order", auth_1.default, razorpayController_1.createOrder);
router.post("/verify-payment", auth_1.default, razorpayController_1.verifyPayment);
exports.default = router;
