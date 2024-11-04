import express from "express";
import { addVideoToSection } from "../controllers/videoController";
import authMiddleware from "../middleware/auth";
import checkRole from "../middleware/role";
const router = express.Router();

router.post(
  "/courses/:courseId/sections/:sectionId/videos",
  authMiddleware,
  checkRole(["teacher"]),
  addVideoToSection
);
