import { useAddReview } from "@/hooks/useAddReview";
import React, { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "react-toastify";

interface ReviewProps {
  courseId: string;
  userId?: string;
}

const Review: React.FC<ReviewProps> = ({ courseId }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const addReviewMutation = useAddReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await addReviewMutation.mutateAsync({
        courseId,
        rating,
        review: review.trim(),
      });
      toast.success("Review submitted successfully");
      console.log(data);
      toast.success(data.addedReview.user.firstName);
      setRating(0);
      setReview("");
      setHover(0);
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  const isLoggedIn = true;

  if (!isLoggedIn) {
    return (
      <div className="text-center p-4 text-gray-600">
        Please log in to submit a review
      </div>
    );
  }

  //Reviews

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit}>
        {/* Star Rating Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating:</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(rating)}
                className={`cursor-pointer mr-1 ${
                  star <= (hover || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            {rating > 0 && (
              <span className="ml-2 text-gray-700">
                {rating} Star{rating > 1 && "s"}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md text-gray-900"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={addReviewMutation.isLoading || rating === 0}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addReviewMutation.isLoading ? "Submitting..." : "Submit Review"}
        </button>
        {addReviewMutation.isError && (
          <p className="text-red-500 mt-2">
            Error: {addReviewMutation.error?.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Review;
