"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnrolledCourses = exports.enrollCourseById = void 0;
const User_1 = __importDefault(require("../models/User"));
const Courses_1 = __importDefault(require("../models/Courses"));
const mongoose_1 = __importDefault(require("mongoose"));
const enrollCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const userId = req.user.id;
        const { courseId } = req.params;
        const user = yield User_1.default.findById(userId);
        const course = yield Courses_1.default.findById(courseId);
        if (!user || !course) {
            return res.status(404).json({ error: 'User or Course not found' });
        }
        user.enrolledCourses = user.enrolledCourses || [];
        // Check if the user is already enrolled in the course
        const alreadyEnrolled = user.enrolledCourses.some((enrolled) => String(enrolled.courseId) === String(courseId));
        if (alreadyEnrolled) {
            return res.status(400).json({ error: 'Already enrolled in this course' });
        }
        const enrolledCourse = {
            courseId: new mongoose_1.default.Types.ObjectId(courseId),
            enrollmentDate: new Date(),
        };
        user.enrolledCourses.push(enrolledCourse);
        yield user.save(); // Save the updated user document
        return res.status(200).json({ message: 'Successfully enrolled in the course!' });
    }
    catch (error) {
        console.error("Error enrolling in course by id: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.enrollCourseById = enrollCourseById;
const getEnrolledCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const userId = req.user.id;
        const user = yield User_1.default.findById(userId).populate('enrolledCourses.courseId');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ enrolledCourses: user.enrolledCourses });
    }
    catch (error) {
        console.error("Error fetching enrolled courses: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getEnrolledCourses = getEnrolledCourses;
