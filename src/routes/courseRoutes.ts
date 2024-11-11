import express from "express";
const router = express.Router();
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  searchCourseByQuery,
} from "../controllers/courseController";
import authMiddleware from "../middleware/auth";
import checkRole from "../middleware/role";
import {
  enrollCourseById,
  getEnrolledCourses,
} from "../controllers/enrolledCoursesController";

router.post("/courses", authMiddleware, checkRole(["teacher"]), createCourse);
router.get(
  "/courses",

  getAllCourses
);
router.get(
  "/courses/:id",
  authMiddleware,
  checkRole(["teacher", "student"]),
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

router.get("/course/search", searchCourseByQuery);

router.post("/enroll/:courseId", authMiddleware, enrollCourseById);
router.get("/enrolled-courses", authMiddleware, getEnrolledCourses);

export default router;