import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRegisterSchema, userLoginSchema } from "../schemas/userSchema";

const generateAccessToken = (user: { id: string; role: string }) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "15m",
    }
  );
};

const generateRefreshToken = (user: { id: string; role: string }) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_REFRESH_KEY as string,
    {
      expiresIn: "7d",
    }
  );
};

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    const parsed = userRegisterSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "validation failed", errors: parsed.error.errors });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "Phone number already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      phone,
    });
    await user.save();

    const accessToken = generateAccessToken({
      id: user._id as string,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      id: user._id as string,
      role: user.role,
    });

    user.refreshToken = refreshToken;
    await user.save();

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
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const parsed = userLoginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "validation failed", errors: parsed.error.errors });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const comparePassword = await bcrypt.compare(
      password,
      user.password as string
    );
    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken({
      id: user._id as string,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      id: user._id as string,
      role: user.role,
    });

    user.refreshToken = refreshToken;
    await user.save();

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
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  try {
    const user = await User.findOneAndUpdate(
      { refreshToken },
      { refreshToken: null },
      { new: true }
    );
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
  } catch (error) {
    console.error("Error logging out user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
