"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const courseController_1 = require("../controllers/courseController");
router.post("/courses", courseController_1.createCourse);
router.get("/courses", courseController_1.getAllCourses);
router.get("/courses/:id", courseController_1.getCourseById);
router.put("/courses/:id", courseController_1.updateCourseById);
router.delete("/courses/:id", courseController_1.deleteCourseById);
exports.default = router;
