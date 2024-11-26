import express from "express";
import {
  addReview,
  getAllReviews,
  deleteReviewById,
} from "../controllers/reviewController";
import authMiddleware from "../middleware/auth";

const router = express.Router();
router.post("/courses/:id/reviews", authMiddleware, addReview);
router.get("/courses/:id/reviews", authMiddleware, getAllReviews);
router.delete(
  "/courses/:id/review/:reviewId",
  authMiddleware,
  deleteReviewById
);
export default router;
