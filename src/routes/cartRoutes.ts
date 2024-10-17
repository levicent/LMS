import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.get("/cart", authMiddleware, getCart);
router.post("/cart", authMiddleware, addToCart);
router.delete("/cart/:productId", authMiddleware, removeFromCart);
router.get("/cart/clear", authMiddleware, clearCart);

export default router;
