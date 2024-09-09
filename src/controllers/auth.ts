import { Request, Response } from "express";
import User from "../models/User";
import { userRegisterSchema } from "../schemas/userSchema";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone, role } = req.body;
    const parsed = userRegisterSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "validation failed", errors: parsed.error.errors });
    }
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
