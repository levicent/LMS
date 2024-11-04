import express from "express";
import {
  addSection,
  getAllSection,
  getSectionById,
  updateSection,
  deleteSection,
  addVideoToSection,
} from "../controllers/sectionController";
import authMiddleware from "../middleware/auth";
import checkRole from "../middleware/role";

const router = express.Router();

router.post(
  "/courses/:courseId/sections",
  authMiddleware,
  checkRole(["teacher"]),
  addSection
);

router.get("/courses/:courseId/sections", authMiddleware, getAllSection);
router.get(
  "/courses/:courseId/sections/:sectionId",
  authMiddleware,
  getSectionById
);

router.put(
  "/courses/:courseId/sections/update/:sectionId",
  authMiddleware,
  checkRole(["teacher"]),
  updateSection
);
router.delete(
  "/courses/:courseId/sections/:sectionId",
  authMiddleware,
  checkRole(["teacher"]),
  deleteSection
);
router.post(
  "/courses/:courseId/sections/:sectionId/videos",
  authMiddleware,
  checkRole(["teacher"]),
  addVideoToSection
);

export default router;
