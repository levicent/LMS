import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import fs from 'fs'


export const uploadFile = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' })
            return
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'raw',
            folder: "lms_pdfs"
        })

        fs.unlinkSync(req.file.path)


        res.status(200).json({
            message: 'File uploaded successfully',
            data: result,
        });
    } catch (error) {
        console.error('Error uploading file: ', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}