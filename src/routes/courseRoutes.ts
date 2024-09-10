import express from "express";
const router = express.Router();
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
} from "../controllers/courseController";

router.post("/courses", createCourse);
router.get("/courses", getAllCourses);
router.get("/courses/:id", getCourseById);
router.put("/courses/:id", updateCourseById);
router.delete("/courses/:id", deleteCourseById);

export default router;
