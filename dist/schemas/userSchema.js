"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.userLoginSchema = exports.userRegisterSchema = exports.enrolledCourseSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.enrolledCourseSchema = zod_1.z.object({
    courseId: zod_1.z.string().refine((id) => mongoose_1.Types.ObjectId.isValid(id), {
        message: "Invalid course ID",
    }),
    enrollmentDate: zod_1.z.date(),
});
exports.userRegisterSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    phone: zod_1.z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be at most 15 digits"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    enrolledCourses: zod_1.z.array(exports.enrolledCourseSchema).optional(),
});
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
exports.updateUserSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "First name is required").optional(),
    lastName: zod_1.z.string().min(1, "Last name is required").optional(),
    email: zod_1.z.string().email("Invalid email address").optional(),
    phone: zod_1.z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be at most 15 digits")
        .optional(),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters")
        .optional(),
    image: zod_1.z.string().optional(),
    role: zod_1.z.enum(["admin", "student", "teacher"]).optional(),
});
