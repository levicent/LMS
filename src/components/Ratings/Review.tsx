import { useAddReview } from '@/hooks/useAddReview';
import { useGetUserId } from '@/hooks/useGetUserId';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';


interface ReviewComponentProps {
  courseId: string;
}

export const ReviewComponent = ({ courseId }: ReviewComponentProps) => {
  const { userId } = useGetUserId();
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [review, setReview] = useState('');
  const addReviewMutation = useAddReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      toast.error('Please login to submit a review');
      return;
    }

    if (!rating || !review.trim()) {
      toast.error('Please provide both rating and review');
      return;
    }

    try {
      await addReviewMutation.mutateAsync({
        courseId,
        userId : userId,
        rating,
        review: review.trim()
      });
      
      toast.success('Review submitted successfully');
      setRating(0);
      setReview('');
    } catch (error) {
      toast.error('Failed to submit review');
    }
  };

  if (!userId) {
    return (
      <div className="text-center p-4 text-gray-600">
        Please login to submit a review
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none"
              >
                <FaStar
                  className={`w-6 h-6 ${
                    star <= (hover || rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="review" className="block text-sm font-medium mb-2">
            Your Review
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm resize-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Share your experience..."
            disabled={addReviewMutation.isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={addReviewMutation.isLoading || !rating || !review.trim()}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {addReviewMutation.isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewComponent;