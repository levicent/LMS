"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate emails
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student",
    },
    refreshToken: {
        type: String,
    },
    refreshTokenExp: {
        type: Date,
    },
    enrolledCourses: [
        {
            courseId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Course",
                required: true,
            },
            enrollmentDate: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    default: [],
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
