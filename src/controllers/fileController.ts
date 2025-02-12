import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import fs from 'fs'
import Course from "../models/Courses";


export const uploadFile = async (req: Request, res: Response) => {
    try {
        const {
            courseId,
            sectionId,
            videoId
        } = req.params

        if (!courseId || !sectionId || !videoId) {
            res.status(400).json({ message: 'Course, section, and video IDs are required' })
            return
        }

        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' })
            return
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'raw',
            folder: "lms_pdfs"
        })

        const { secure_url, public_id } = result

        fs.unlinkSync(req.file.path)


        const course = await Course.findOneAndUpdate({
            _id: courseId, "sections.sectionId": sectionId, "sections.videos.videoId": videoId

        }, {
            $push: { "sections.$.videos.$.resources": secure_url }
        }, { new: true })




        res.status(201).json({
            message: 'File uploaded successfully',
            data: result,
            course
        });
    } catch (error) {
        console.error('Error uploading file: ', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}