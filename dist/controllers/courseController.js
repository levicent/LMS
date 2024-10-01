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
exports.deleteCourseById = exports.updateCourseById = exports.getCourseById = exports.getAllCourses = exports.createCourse = void 0;
const Courses_1 = __importDefault(require("../models/Courses"));
const courseSchema_1 = require("../schemas/courseSchema");
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    cloud_name: "de51cdx8q",
    api_key: "142799684141986",
    api_secret: "GDxxJBjJEy1DezYIq4eNUBR-m8w",
});
const uploads = (0, multer_1.default)({ dest: "uploads/" });
exports.createCourse = [
    uploads.single("thumbnail"),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            const parsed = courseSchema_1.courseSchema.safeParse(data);
            if (!parsed.success) {
                return res
                    .status(400)
                    .json({ message: "Validation failed", errors: parsed.error.errors });
            }
            const existingCourse = yield Courses_1.default.findOne({ title: data.title });
            if (existingCourse) {
                return res.status(400).json({ message: "Course already exists" });
            }
            if (req.file) {
                const thumbnail = yield cloudinary_1.v2.uploader.upload(req.file.path, {
                    folder: "courses",
                });
                parsed.data.thumbnail = thumbnail.secure_url;
                fs_1.default.unlinkSync(req.file.path);
            }
            const newCourse = new Courses_1.default(parsed.data);
            yield newCourse.save();
            res.status(201).json({
                message: "Course created successfully",
                newCourse,
                thumbnailUrl: parsed.data.thumbnail,
            });
        }
        catch (error) {
            console.error("Error creating course: ", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }),
];
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield Courses_1.default.find();
        if (!courses) {
            return res.status(404).json({ message: "No courses found" });
        }
        res.status(200).json({ courses });
    }
    catch (error) {
        console.error("Error getting all courses: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllCourses = getAllCourses;
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield Courses_1.default.findById(id);
        if (!course) {
            return res.status(404).json({ message: "No course found" });
        }
        res.status(200).json({ course });
    }
    catch (error) {
        console.error("Error getting course by id: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCourseById = getCourseById;
const updateCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parsed = courseSchema_1.courseUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
            return res
                .status(400)
                .json({ message: "Validation failed", errors: parsed.error.errors });
        }
        const updatedCourse = yield Courses_1.default.findByIdAndUpdate(id, parsed.data, {
            new: true,
        });
        if (!updatedCourse) {
            return res.status(404).json({ message: "No course found" });
        }
        res.status(200).json({ updatedCourse });
    }
    catch (error) {
        console.error("Error updating course by id", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateCourseById = updateCourseById;
const deleteCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedCourse = yield Courses_1.default.findByIdAndDelete(id);
        if (!deletedCourse) {
            return res.status(404).json({ message: "No course found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting course by id", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteCourseById = deleteCourseById;
