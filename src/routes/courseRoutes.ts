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
import checkRole from "../middleware/role";

router.post("/courses", authMiddleware, checkRole(["teacher"]), createCourse);
router.get("/courses", authMiddleware, checkRole(["teacher"]), getAllCourses);
router.get(
  "/courses/:id",
  authMiddleware,
  checkRole(["teacher"]),
  getCourseById
);
router.put(
  "/courses/:id",
  authMiddleware,
  checkRole(["teacher"]),
  updateCourseById
);
router.delete(
  "/courses/:id",
  authMiddleware,
  checkRole(["teacher"]),
  deleteCourseById
);

export default router;
