"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoController_1 = require("../controllers/videoController");
const auth_1 = __importDefault(require("../middleware/auth"));
const role_1 = __importDefault(require("../middleware/role"));
const router = express_1.default.Router();
router.post("/courses/:courseId/sections/:sectionId/videos", auth_1.default, (0, role_1.default)(["teacher"]), videoController_1.addVideoToSection);
router.get("/courses/:courseId/sections/:sectionId/videos", auth_1.default, (0, role_1.default)(["teacher", "student", "admin"]), videoController_1.getAllVideos);
router.get("/courses/:courseId/sections/:sectionId/videos/:videoId", auth_1.default, (0, role_1.default)(["teacher", "student", "admin"]), videoController_1.getVideoById);
router.put("/courses/:courseId/sections/:sectionId/videos/:videoId", auth_1.default, (0, role_1.default)(["teacher"]), videoController_1.updateVideoById);
router.delete("/courses/:courseId/sections/:sectionId/videos/:videoId", auth_1.default, (0, role_1.default)(["teacher"]), videoController_1.deleteVideo);
exports.default = router;
