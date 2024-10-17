import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const generateAccessToken = (user: { id: string; role: string }) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "15m",
    }
  );
};
export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_KEY as string
    ) as jwt.JwtPayload;

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      res.clearCookie("refreshToken");
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token" });
    }

    const accessToken = generateAccessToken({
      id: user._id as string,
      role: user.role,
    });

    // const newRefreshToken = generateRefreshToken({
    //   id: user._id as string,
    //   role: user.role,
    // });

    // user.refreshToken = newRefreshToken;
    // await user.save();

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.error("Error refreshing token: ", error);
    res.clearCookie("refreshToken");
    res.status(500).json({ message: "Invalid or expired refresh token" });
  }
};
