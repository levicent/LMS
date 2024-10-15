"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const refreshToken_1 = require("../controllers/refreshToken");
const router = express_1.default.Router();
router.post("/register", auth_1.register);
router.post("/login", auth_1.login);
router.post("/refresh-token", refreshToken_1.refreshToken);
router.post("/logout", auth_1.logout);
exports.default = router;
