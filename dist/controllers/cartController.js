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
exports.clearCart = exports.removeFromCart = exports.getCart = exports.addToCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const data = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        let cart = yield Cart_1.default.findOne({ userId });
        if (!cart) {
            cart = new Cart_1.default({ userId, items: [] });
        }
        for (const item of data.items) {
            const isCourseAlreadyInCart = cart.items.some((cartItem) => cartItem.productId === item.productId);
            if (isCourseAlreadyInCart) {
                return res.status(400).json({ message: "Course already in cart" });
            }
            // Add the new item to the cart
            cart.items.push({
                productId: item.productId,
                name: item.name,
                price: item.price,
                thumbnail: item.thumbnail,
                instructor: item.instructor,
                duration: item.duration,
                level: item.level,
            });
        }
        yield cart.save();
        res.status(201).json({ message: "Added to cart", cart });
    }
    catch (error) {
        console.log("Error in addToCart", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.addToCart = addToCart;
// Get user's cart
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        const cart = yield Cart_1.default.findOne({ userId })
            .populate("items.productId")
            .populate("items.instructor.id");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    }
    catch (error) {
        console.log("Error in getCart", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getCart = getCart;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { productId } = req.params;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        const cart = yield Cart_1.default.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const updatedItems = cart.items.filter((item) => item.productId._id.toString() !== productId.toString());
        if (updatedItems.length === cart.items.length) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        cart.items = updatedItems;
        yield cart.save();
        res.status(200).json({ message: "Item removed from cart", cart });
    }
    catch (error) {
        console.log("Error in removeFromCart", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.removeFromCart = removeFromCart;
// Clear cart
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        yield Cart_1.default.findOneAndDelete({ userId });
        res.status(200).json({ message: "Cart cleared" });
    }
    catch (error) {
        console.log("Error in clearCart", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.clearCart = clearCart;
