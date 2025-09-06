import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaStar, FaPaperPlane } from "react-icons/fa";
import { useState } from "react";

const AddReview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState("");
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        if (rating === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Rating Required',
                text: 'Please select a rating by clicking on the stars',
            });
            return;
        }

        const reviewData = {
            name: user.displayName,
            email: user.email,
            rating: rating,
            review: data.review,
            date: new Date(),
        };

        try {
            const res = await axiosSecure.post('/reviews', reviewData);
            
            if (res.data.insertedId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your review has been submitted!',
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                setRating(0);
                setReviewText("");
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'There was an error submitting your review. Please try again.',
            });
        }
    };

    const handleReviewChange = (e) => {
        setReviewText(e.target.value);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Share Your Experience</h2>
                <p className="text-gray-600 mt-2">We value your feedback about our food and service</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* User Info */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="avatar">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-lg font-semibold text-green-800">
                                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                            </span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            {user?.displayName || 'User'}
                        </h3>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                </div>

                {/* Star Rating */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        How would you rate your experience? *
                    </label>
                    <div className="flex space-x-1">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={index} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                        className="hidden"
                                    />
                                    <FaStar
                                        className="text-3xl"
                                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                    />
                                </label>
                            );
                        })}
                    </div>
                    {rating === 0 && (
                        <p className="text-red-500 text-sm">Please select a rating</p>
                    )}
                    <div className="text-sm text-gray-600">
                        {rating === 1 && 'Poor'}
                        {rating === 2 && 'Fair'}
                        {rating === 3 && 'Good'}
                        {rating === 4 && 'Very Good'}
                        {rating === 5 && 'Excellent'}
                    </div>
                </div>

                {/* Review Text */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Your Review *
                    </label>
                    <textarea
                        {...register("review", {
                            required: "Review is required",
                            minLength: {
                                value: 10,
                                message: "Review must be at least 10 characters long"
                            },
                            maxLength: {
                                value: 500,
                                message: "Review cannot exceed 500 characters"
                            }
                        })}
                        rows="5"
                        className="textarea textarea-bordered w-full"
                        placeholder="Share your experience with our food and service..."
                        value={reviewText}
                        onChange={handleReviewChange}
                    ></textarea>
                    {errors.review && (
                        <p className="text-red-500 text-sm">{errors.review.message}</p>
                    )}
                    <div className="text-sm text-gray-600">
                        {reviewText.length}/500 characters
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full bg-green-600 hover:bg-green-700 border-green-600 text-white"
                >
                    <FaPaperPlane className="mr-2" />
                    Submit Review
                </button>
            </form>

            {/* Review Guidelines */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Review Guidelines</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Be specific about what you liked or didn't like</li>
                    <li>• Mention specific dishes if possible</li>
                    <li>• Keep your review respectful and constructive</li>
                    <li>• Your review will be visible to other customers</li>
                </ul>
            </div>
        </div>
    );
};

export default AddReview;