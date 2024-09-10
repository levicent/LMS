"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    instructor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    //   modules: [
    //     {
    //       titles: String,
    //       content: String,
    //       resources: [String],
    //       quizzes: [
    //         {
    //           question: String,
    //           options: [String],
    //           answer: String,
    //         },
    //       ],
    //     },
    //   ],
    category: {
        type: String,
        required: true,
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const Course = mongoose_1.default.model("Course", courseSchema);
exports.default = Course;
