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
exports.deleteSection = exports.updateSection = exports.getSectionById = exports.getAllSection = exports.addSection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Courses_1 = __importDefault(require("../models/Courses"));
const addSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const { title } = req.body;
        const section = {
            sectionId: new mongoose_1.default.Types.ObjectId(),
            title,
            videos: [],
        };
        const course = yield Courses_1.default.findByIdAndUpdate(courseId, {
            $push: { sections: section },
        });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(201).json({
            message: "Section added successfully",
            sectionId: section.sectionId,
            course,
        });
    }
    catch (error) {
        console.error("Error adding video to section: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addSection = addSection;
const getAllSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const course = yield Courses_1.default.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course === null || course === void 0 ? void 0 : course.sections);
    }
    catch (error) {
        console.error("Error getting section: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllSection = getAllSection;
const getSectionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, sectionId } = req.params;
        const course = yield Courses_1.default.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const section = course.sections.find((item) => item.sectionId.toString() === sectionId);
        if (!section) {
            return res.status(404).json({ message: "Section doesnot exists" });
        }
        res.status(200).json(section);
    }
    catch (error) {
        console.error("Error getting section by id", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSectionById = getSectionById;
const updateSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, sectionId } = req.params;
        const { title } = req.body;
        const course = yield Courses_1.default.findOneAndUpdate({
            _id: courseId,
            "sections.sectionId": sectionId,
        }, { $set: { "sections.$.title": title } }, { new: true });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course", course });
    }
    catch (error) {
        console.error("Error updating section: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateSection = updateSection;
const deleteSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, sectionId } = req.params;
        const course = yield Courses_1.default.findByIdAndUpdate(courseId, {
            $pull: { sections: { sectionId } },
        }, {
            new: true,
        });
        if (!course) {
            return res
                .status(404)
                .json({ message: "Course or section doesnot exists" });
        }
        res.status(200).json(course);
    }
    catch (error) {
        console.error("Error deleting section", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteSection = deleteSection;
