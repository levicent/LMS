"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    items: [
        {
            productId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Course",
            },
            name: {
                type: String,
            },
            price: {
                type: Number,
            },
            thumbnail: {
                type: String,
            },
            instructor: {
                id: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                },
                firstName: {
                    type: String,
                },
                lastName: {
                    type: String,
                },
            },
            duration: {
                type: String,
            },
            level: {
                type: String,
                enum: ["beginner", "intermediate", "advanced"],
            },
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
const Cart = mongoose_1.default.model("Cart", cartSchema);
exports.default = Cart;
