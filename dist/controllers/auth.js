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
exports.logout = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../schemas/userSchema");
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "15m",
    });
};
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_REFRESH_KEY, {
        expiresIn: "7d",
    });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, phone } = req.body;
        const parsed = userSchema_1.userRegisterSchema.safeParse(req.body);
        if (!parsed.success) {
            return res
                .status(400)
                .json({ message: "validation failed", errors: parsed.error.errors });
        }
        const existingEmail = yield User_1.default.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const existingPhone = yield User_1.default.findOne({ phone });
        if (existingPhone) {
            return res
                .status(400)
                .json({ message: "Phone number already registered" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new User_1.default({
            email,
            firstName,
            lastName,
            password: hashedPassword,
            phone,
        });
        yield user.save();
        const accessToken = generateAccessToken({
            id: user._id,
            role: user.role,
        });
        const refreshToken = generateRefreshToken({
            id: user._id,
            role: user.role,
        });
        user.refreshToken = refreshToken;
        yield user.save();
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/api",
            maxAge: 7 * 24 * 60 * 60 * 1000, //7days
        });
        res.status(201).json({
            message: "User registered successfully",
            accessToken: accessToken,
        });
    }
    catch (error) {
        console.error("Error registering user", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const parsed = userSchema_1.userLoginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res
                .status(400)
                .json({ message: "validation failed", errors: parsed.error.errors });
        }
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const comparePassword = yield bcrypt_1.default.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const accessToken = generateAccessToken({
            id: user._id,
            role: user.role,
        });
        const refreshToken = generateRefreshToken({
            id: user._id,
            role: user.role,
        });
        user.refreshToken = refreshToken;
        yield user.save();
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api",
        });
        res.status(200).json({
            message: "User logged in successfully",
            accessToken: accessToken,
        });
    }
    catch (error) {
        console.error("Error logging in user", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    try {
        const user = yield User_1.default.findOneAndUpdate({ refreshToken }, { refreshToken: null }, { new: true });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api",
        });
        res.status(200).json({ message: "User logged out successfully" });
    }
    catch (error) {
        console.error("Error logging out user", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.logout = logout;
