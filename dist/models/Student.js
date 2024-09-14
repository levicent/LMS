"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        unique: true,
    },
    courses: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "course",
    },
    cart: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "course",
    },
    wishlist: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "course",
    },
});
const Student = mongoose_1.default.model("Student", studentSchema);
exports.default = Student;
