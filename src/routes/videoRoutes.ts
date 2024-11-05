import express from "express";
import {
  addVideoToSection,
  getAllVideos,
  getVideoById,
  updateVideoById,
  deleteVideo,
} from "../controllers/videoController";
import authMiddleware from "../middleware/auth";
import checkRole from "../middleware/role";
const router = express.Router();

router.post(
  "/courses/:courseId/sections/:sectionId/videos",
  authMiddleware,
  checkRole(["teacher"]),
  addVideoToSection
);

router.get(
  "/courses/:courseId/sections/:sectionId/videos",
  authMiddleware,
  checkRole(["teacher", "student", "admin"]),
  getAllVideos
);

router.get(
  "/courses/:courseId/sections/:sectionId/videos/:videoId",
  authMiddleware,
  checkRole(["teacher", "student", "admin"]),
  getVideoById
);

router.put(
  "/courses/:courseId/sections/:sectionId/videos/:videoId",
  authMiddleware,
  checkRole(["teacher"]),
  updateVideoById
);

router.delete(
  "/courses/:courseId/sections/:sectionId/videos/:videoId",
  authMiddleware,
  checkRole(["teacher"]),
  deleteVideo
);

export default router;
