import express from 'express'
import { uploadFile } from '../controllers/fileController'
import authMiddleware from '../middleware/auth'
import checkRole from '../middleware/role'

const router = express.Router()


router.post('/upload/:courseId/:sectionId/:videoId', authMiddleware, checkRole(['teacher']), uploadFile)


export default router