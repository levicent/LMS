import express from "express";
import { register, login, logout } from "../controllers/auth";
import { refreshToken } from "../controllers/refreshToken";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
export default router;
