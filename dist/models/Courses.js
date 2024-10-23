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
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
        enum: ["beginner", "intermediate", "advanced"],
    },
    thumbnail: {
        type: String,
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
        enum: [
            "Development",
            "Business",
            "Finance & Acounting",
            "IT & Software",
            "Office Productivity",
            "Personal Development",
            "Design",
            "Marketing",
            "Lifestyle",
            "Photography & Video",
            "Health & Fitness",
            "Music",
            "Teaching & Academics",
        ],
    },
    tags: [String],
    studentsEnrolled: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "User",
            },
        },
    ],
    reviews: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "User",
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
            },
        },
    ],
    language: {
        type: String,
        required: true,
    },
    sections: [
        {
            sectionId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                default: new mongoose_1.default.Types.ObjectId(),
            },
            title: {
                type: String,
                required: true,
            },
            videos: [
                {
                    videoId: {
                        type: mongoose_1.default.Schema.Types.ObjectId,
                        default: new mongoose_1.default.Types.ObjectId(),
                    },
                    title: {
                        type: String,
                        required: true,
                    },
                    url: {
                        type: String,
                        required: true,
                    },
                    publicId: {
                        type: String,
                        required: true,
                    },
                    duration: {
                        type: String,
                    },
                },
            ],
        },
    ],
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
