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
exports.deleteVideo = exports.updateVideoById = exports.getVideoById = exports.getAllVideos = exports.addVideoToSection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Courses_1 = __importDefault(require("../models/Courses"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const upload = (0, multer_1.default)({ dest: "uploads/" });
exports.addVideoToSection = [
    upload.single("video"),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { courseId, sectionId } = req.params;
            const { title, duration } = req.body;
            if (!req.file) {
                return res.status(400).json({ message: "No video file uploaded" });
            }
            const uploadFile = yield cloudinary_1.v2.uploader.upload(req.file.path, {
                resource_type: "video",
                folder: "course_videos",
            });
            const { secure_url, public_id } = uploadFile;
            const video = {
                videoId: new mongoose_1.default.Types.ObjectId(),
                title: title || "Untitled Video",
                url: secure_url,
                publicId: public_id,
                duration,
            };
            const course = yield Courses_1.default.findOneAndUpdate({ _id: courseId, "sections.sectionId": sectionId }, { $push: { "sections.$.videos": video } }, { new: true });
            if (!course) {
                return res
                    .status(404)
                    .json({ message: "Course or section doesnot exists" });
            }
            res.status(201).json(course);
        }
        catch (error) {
            console.error("Error add videos to section", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }),
];
const getAllVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, sectionId } = req.params;
        const course = yield Courses_1.default.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const section = course.sections.find((item) => item.sectionId.toString() === sectionId);
        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }
        res.status(200).json(section === null || section === void 0 ? void 0 : section.videos);
    }
    catch (error) {
        console.error("Error getting all videos", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllVideos = getAllVideos;
const getVideoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, sectionId, videoId } = req.params;
        const course = yield Courses_1.default.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "No course found" });
        }
        const section = course.sections.find((item) => item.sectionId.toString() === sectionId);
        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }
        const video = section.videos.find((item) => item.videoId.toString() === videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        res.status(200).json(video);
    }
    catch (error) {
        console.error("Error getting video by id", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getVideoById = getVideoById;
const updateVideoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, sectionId, videoId } = req.params;
        const { title, duration } = req.body;
        const course = yield Courses_1.default.findByIdAndUpdate({
            _id: courseId,
            "sections.sectionId": sectionId,
            "sections.videos.videoId": videoId,
        }, {
            $set: {
                "sections.$[sectionFilter].videos.$[videoFilter].title": title,
                "sections.$[sectionFilter].videos.$[videoFilter].duration": duration,
            },
        }, {
            arrayFilters: [
                { "sectionFilter.sectionId": sectionId },
                { "videoFilter.videoId": videoId },
            ],
            new: true,
        });
        if (!course) {
            return res
                .status(404)
                .json({ message: "Course, section, or video not found" });
        }
        res.status(200).json({ message: "Video updated successfully", course });
    }
    catch (error) {
        console.error("Error updating course", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateVideoById = updateVideoById;
const deleteVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, sectionId, videoId } = req.params;
        const course = yield Courses_1.default.updateOne({
            _id: courseId,
        }, {
            $pull: {
                "sections.$[sectionFilter].videos": { videoId: videoId },
            },
        }, {
            arrayFilters: [{ "sectionFilter.sectionId": sectionId }],
            new: true,
        });
        if (course.matchedCount === 0) {
            return res.status(404).json({ message: "Course or section not found" });
        }
        res.status(200).json({ message: "Video deleted successfully", course });
    }
    catch (error) {
        console.error("Error deleting video from section", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteVideo = deleteVideo;
