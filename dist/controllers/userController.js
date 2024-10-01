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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserProfile = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const userSchema_1 = require("../schemas/userSchema");
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    cloud_name: "de51cdx8q",
    api_key: "142799684141986",
    api_secret: "GDxxJBjJEy1DezYIq4eNUBR-m8w",
});
const upload = (0, multer_1.default)({ dest: "uploads/" });
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { email, phone } = _a, rest = __rest(_a, ["email", "phone"]);
        const parsed = userSchema_1.userRegisterSchema.safeParse(Object.assign({ email, phone }, rest));
        if (!parsed.success) {
            return res
                .status(400)
                .json({ message: "Validation failed", errors: parsed.error.errors });
        }
        const existingUser = yield User_1.default.findOne({ email, phone });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User with this email or phone already exists" });
        }
        const newUser = new User_1.default(Object.assign({ email, phone }, rest));
        yield newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("Error creating user: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        if (!users) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json({ users });
    }
    catch (error) {
        console.error("Error getting all users: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("Error getting user by id: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserById = getUserById;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parsed = userSchema_1.updateUserSchema.safeParse(req.body);
        if (!parsed.success) {
            return res
                .status(400)
                .json({ message: "Validation failed", errors: parsed.error.errors });
        }
        const updatedUser = yield User_1.default.findByIdAndUpdate(id, parsed.data, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
    }
    catch (error) {
        console.error("Error updating user by id: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield User_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user by id: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteUserById = deleteUserById;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID not provided" });
        }
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            id: user.id,
            email: user.email,
            phone: user.phone,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            image: user.image,
            password: user.password,
        });
    }
    catch (error) {
        console.error("Error getting user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserProfile = getUserProfile;
exports.updateUserProfile = [
    upload.single("profilePicture"),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(400).json({ message: "User ID not provided" });
            }
            const parsed = userSchema_1.updateUserSchema.safeParse(req.body);
            if (!parsed.success) {
                return res
                    .status(400)
                    .json({ message: "Validation failed", errors: parsed.error.errors });
            }
            if (req.file) {
                const result = yield cloudinary_1.v2.uploader.upload(req.file.path);
                folder: "profile-pictures";
                parsed.data.image = result.secure_url;
                fs_1.default.unlinkSync(req.file.path);
            }
            const updatedUser = yield User_1.default.findByIdAndUpdate(userId, parsed.data, {
                new: true,
            });
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({
                message: "User profile updated successfully",
                updatedUser,
                imageUrl: parsed.data.image,
            });
        }
        catch (error) {
            console.error("Error updating user profile:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }),
];
