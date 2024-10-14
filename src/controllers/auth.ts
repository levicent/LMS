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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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

    res.status(201).json({
      message: "User registered successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
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

    res.status(200).json({
      message: "User logged in successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};