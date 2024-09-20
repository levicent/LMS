import User from "../models/User";
import { Request, Response } from "express";
import { updateUserSchema, userRegisterSchema } from "../schemas/userSchema";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only JPEG, JPG, PNG files are allowed"));
    }
  },
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, phone, ...rest } = req.body;
    const parsed = userRegisterSchema.safeParse({ email, phone, ...rest });

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.errors });
    }

    const existingUser = await User.findOne({ email, phone });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or phone already exists" });
    }

    const newUser = new User({ email, phone, ...rest });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error getting all users: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting user by id: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserById = [
  upload.single("profilePicture"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const parsed = updateUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res
          .status(400)
          .json({ message: "Validation failed", errors: parsed.error.errors });
      }

      if (req.file) {
        parsed.data.image = req.file.path;
      }

      const updatedUser = await User.findByIdAndUpdate(id, parsed.data, {
        new: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user by id: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user by id: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const user = await User.findById(userId);
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
      password: user.password,
    });
  } catch (error) {
    console.error("Error getting user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.errors });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, parsed.data, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
