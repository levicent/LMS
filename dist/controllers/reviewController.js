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
exports.deleteReviewById = exports.getAllReviews = exports.addReview = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Courses_1 = __importDefault(require("../models/Courses"));
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { rating, review } = req.body;
        const courseId = req.params.id;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!rating || !review) {
            return res
                .status(400)
                .json({ message: "Rating and review are required" });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: "Invalid course ID" });
        }
        const course = yield Courses_1.default.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const alreadyReviewed = (_b = course.reviews) === null || _b === void 0 ? void 0 : _b.find((r) => r.user.toString() === userId);
        if (alreadyReviewed) {
            return res
                .status(400)
                .json({ message: "You have already reviewed this course" });
        }
        const newReview = {
            user: userId,
            rating: Number(rating),
            review,
        };
        (_c = course.reviews) === null || _c === void 0 ? void 0 : _c.push(newReview);
        course.numReviews = course.reviews.length;
        course.rating =
            course.reviews.reduce((acc, item) => item.rating + acc, 0) /
                course.reviews.length;
        yield course.save();
        const updatedCourse = yield Courses_1.default.findById(courseId).populate({
            path: "reviews.user",
            select: "firstName lastName",
            model: "User",
        });
        const addedReview = updatedCourse === null || updatedCourse === void 0 ? void 0 : updatedCourse.reviews[(updatedCourse === null || updatedCourse === void 0 ? void 0 : updatedCourse.reviews.length) - 1];
        res.status(201).json({ message: "Review added", addedReview });
    }
    catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.addReview = addReview;
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const course = yield Courses_1.default.findById(courseId).populate({
            path: "reviews.user",
            select: "firstName lastName",
            model: "User",
        });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course === null || course === void 0 ? void 0 : course.reviews);
    }
    catch (error) {
        console.error("Error getting reviews", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllReviews = getAllReviews;
const deleteReviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const reviewId = req.params.reviewId;
        const course = yield Courses_1.default.findByIdAndUpdate(courseId, {
            $pull: {
                reviews: { _id: reviewId },
            },
        }, { new: true });
        if (!course) {
            return res
                .status(404)
                .json({ message: "Course or Review doesnot exists" });
        }
        res.status(200).json({
            message: "Review deleted successfully",
            course,
        });
    }
    catch (error) {
        console.error("Error deleting review", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteReviewById = deleteReviewById;
