import User from '../models/User'
import { Request, Response } from 'express'
import { updateUserSchema, userRegisterSchema } from '../schemas/userSchema'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const upload = multer({ dest: 'uploads/' })

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, phone, ...rest } = req.body
    const parsed = userRegisterSchema.safeParse({ email, phone, ...rest })

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: 'Validation failed', errors: parsed.error.errors })
    }

    const existingUser = await User.findOne({ email, phone })
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email or phone already exists' })
    }

    const newUser = new User({ email, phone, ...rest })
    await newUser.save()

    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    console.error('Error creating user: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    if (!users) {
      return res.status(404).json({ message: 'No users found' })
    }

    res.status(200).json({ users })
  } catch (error) {
    console.error('Error getting all users: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ user })
  } catch (error) {
    console.error('Error getting user by id: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const parsed = updateUserSchema.safeParse(req.body)
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: 'Validation failed', errors: parsed.error.errors })
    }

    const updatedUser = await User.findByIdAndUpdate(id, parsed.data, {
      new: true
    })
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User updated successfully' })
  } catch (error) {
    console.error('Error updating user by id: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user by id: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(400).json({ message: 'User ID not provided' })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      id: user.id,
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      image: user.image
    })
  } catch (error) {
    console.error('Error getting user profile:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateUserProfile = [
  upload.single('profilePicture'),
  async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id
      if (!userId) {
        return res.status(400).json({ message: 'User ID not provided' })
      }

      const parsed = updateUserSchema.safeParse(req.body)
      if (!parsed.success) {
        return res
          .status(400)
          .json({ message: 'Validation failed', errors: parsed.error.errors })
      }

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path)
        folder: 'profile-pictures'

        parsed.data.image = result.secure_url
        fs.unlinkSync(req.file.path)
      }

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const existingUser = await User.findOne({ phone: req.body.phone })

      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({ message: 'Phone number already exists' })
      }

      const updatedUser = await User.findByIdAndUpdate(userId, parsed.data, {
        new: true
      })

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.status(200).json({
        message: 'User profile updated successfully',
        updatedUser,
        imageUrl: parsed.data.image
      })
    } catch (error) {
      console.error('Error updating user profile:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
]

export const getUserByRole = async (req: Request, res: Response) => {
  try {
    const role = 'teacher'
    const users = await User.find({ role })
    if (!users) {
      return res.status(404).json({ message: 'No users found' })
    }

    res.status(200).json({ users })
  } catch (error) {
    console.error('Error getting user by id: ', error)
    res.status(500).json({ message: 'TeacherFetchEror' })
  }
}
