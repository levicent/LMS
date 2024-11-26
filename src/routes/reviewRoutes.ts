import express from "express";
import { addReview } from "../controllers/reviewController";
import authMiddleware from "../middleware/auth";

const router = express.Router();
router.post("/courses/:id/reviews", authMiddleware, addReview);
export default router;
