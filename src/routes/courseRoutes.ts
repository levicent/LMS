import express from "express";
const router = express.Router();
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
} from "../controllers/courseController";
import authMiddleware from "../middleware/auth";

router.post("/courses", authMiddleware, createCourse);
router.get("/courses", authMiddleware, getAllCourses);
router.get("/courses/:id", authMiddleware, getCourseById);
router.put("/courses/:id", authMiddleware, updateCourseById);
router.delete("/courses/:id", authMiddleware, deleteCourseById);

export default router;
