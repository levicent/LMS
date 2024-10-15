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
exports.refreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        role: user.role,
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: "15m",
    });
};
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refreshToken = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token is required" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_KEY);
        const user = yield User_1.default.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            res.clearCookie("refreshToken");
            return res
                .status(401)
                .json({ message: "Invalid or expired refresh token" });
        }
        const accessToken = generateAccessToken({
            id: user._id,
            role: user.role,
        });
        // const newRefreshToken = generateRefreshToken({
        //   id: user._id as string,
        //   role: user.role,
        // });
        // user.refreshToken = newRefreshToken;
        // await user.save();
        console.log("Access token generated successfully");
        res.status(200).json({ accessToken: accessToken });
    }
    catch (error) {
        console.error("Error refreshing token: ", error);
        res.clearCookie("refreshToken");
        res.status(500).json({ message: "Invalid or expired refresh token" });
    }
});
exports.refreshToken = refreshToken;
