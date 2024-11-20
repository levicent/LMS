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
        const addedReview = course.reviews[course.reviews.length - 1];
        res.status(201).json({ message: 'Review added', addedReview});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
export const deleteReview = async (req: Request, res: Response) => {
    try {
      const courseId = req.params.courseId;
      const reviewId = req.params.reviewId;
      const userId = req.user?.id;
  
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      const reviewIndex = course.reviews.findIndex((review: any) => review._id.toString() === reviewId);
      if (reviewIndex === -1) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      const review = course.reviews[reviewIndex];
      if (review.user.toString() !== userId) {
        return res.status(403).json({ message: 'You can only delete your own reviews' });
      }
  
      course.reviews.splice(reviewIndex, 1);
      course.numReviews = course.reviews.length;
      course.rating = course.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / course.reviews.length || 0;
  
      await course.save();
  
      res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };