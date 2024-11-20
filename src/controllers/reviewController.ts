import { Request, Response } from 'express';
import Course from '../models/Courses';

export const addReview = async (req: Request, res: Response) => {
    try {
        const { rating, review } = req.body;
        const courseId = req.params.id;
        const userId = req.user?.id; 

        if (!rating || !review) {
            return res.status(400).json({ message: 'Rating and review are required' });
        }
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const alreadyReviewed = course.reviews?.find(
            (r: any) => r.user.toString() === userId
        );
        if (alreadyReviewed) {
            return res.status(400).json({ message: 'You have already reviewed this course' });
        }
        const newReview = {
            user: userId,
            rating: Number(rating),
            review,
        };
        course.reviews?.push(newReview as any);
        course.numReviews = course.reviews.length;
        course.rating =
            course.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
            course.reviews.length;
        await course.save();
        res.status(201).json({ message: 'Review added' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};