"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const courseController_1 = require("../controllers/courseController");
const auth_1 = __importDefault(require("../middleware/auth"));
const role_1 = __importDefault(require("../middleware/role"));
const enrolledCoursesController_1 = require("../controllers/enrolledCoursesController");
router.post("/courses", auth_1.default, (0, role_1.default)(["teacher"]), courseController_1.createCourse);
router.get("/courses", 
// authMiddleware,
// checkRole(["teacher", "admin", "student"]),
courseController_1.getAllCourses);
router.get("/courses/:id", auth_1.default, (0, role_1.default)(["teacher"]), courseController_1.getCourseById);
router.put("/courses/:id", auth_1.default, (0, role_1.default)(["teacher"]), courseController_1.updateCourseById);
router.delete("/courses/:id", auth_1.default, (0, role_1.default)(["teacher"]), courseController_1.deleteCourseById);
router.get("/course/search", courseController_1.searchCourseByQuery);
router.post("/enroll/:courseId", auth_1.default, enrolledCoursesController_1.enrollCourseById);
router.get("/enrolled-courses", auth_1.default, enrolledCoursesController_1.getEnrolledCourses);
exports.default = router;
