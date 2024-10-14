"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get("/cart", auth_1.default, cartController_1.getCart);
router.post("/cart", auth_1.default, cartController_1.addToCart);
router.delete("/cart/:productId", auth_1.default, cartController_1.removeFromCart);
exports.default = router;
