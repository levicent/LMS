"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sectionController_1 = require("../controllers/sectionController");
const auth_1 = __importDefault(require("../middleware/auth"));
const role_1 = __importDefault(require("../middleware/role"));
const router = express_1.default.Router();
router.post("/courses/:courseId/sections", auth_1.default, (0, role_1.default)(["teacher"]), sectionController_1.addSection);
router.get("/courses/:courseId/sections", auth_1.default, sectionController_1.getAllSection);
router.get("/courses/:courseId/sections/:sectionId", auth_1.default, sectionController_1.getSectionById);
router.put("/courses/:courseId/sections/update/:sectionId", auth_1.default, (0, role_1.default)(["teacher"]), sectionController_1.updateSection);
router.delete("/courses/:courseId/sections/:sectionId", auth_1.default, (0, role_1.default)(["teacher"]), sectionController_1.deleteSection);
router.post("/courses/:courseId/sections/:sectionId/videos", auth_1.default, (0, role_1.default)(["teacher"]), sectionController_1.addVideoToSection);
exports.default = router;
