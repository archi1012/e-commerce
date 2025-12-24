import { useState, useEffect } from 'react';
import { Star, User } from 'lucide-react';
import { toast } from 'sonner';
import { reviewsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Reviews({ productId, currentRating, reviewCount }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const fetchReviews = async () => {
    if (!productId) {
      setReviews([]);
      return;
    }
    
    try {
      const data = await reviewsAPI.getProductReviews(productId);
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to add a review');
      return;
    }
    
    if (newReview.rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setLoading(true);

    try {
      await reviewsAPI.addReview({
        productId,
        rating: newReview.rating,
        comment: newReview.comment
      });
      
      toast.success('Review added successfully!');
      setNewReview({ rating: 0, comment: '' });
      setShowAddReview(false);
      fetchReviews();
    } catch (error) {
      if (error.message.includes('401')) {
        toast.error('Please login to add a review');
      } else {
        toast.error(error.message || 'Failed to add review');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating, size = 'w-4 h-4') => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-3xl font-bold">{currentRating.toFixed(1)}</div>
          <div>
            <div className="flex items-center gap-1">
              {renderStars(Math.round(currentRating))}
            </div>
            <div className="text-sm text-gray-600">{reviewCount} reviews</div>
          </div>
        </div>

        {user ? (
          <button
            onClick={() => setShowAddReview(!showAddReview)}
            className="bg-[#1F3C88] text-white px-4 py-2 rounded-lg hover:bg-[#1F3C88]/90 transition"
          >
            Write a Review
          </button>
        ) : (
          <p className="text-gray-600 text-sm">Please login to write a review</p>
        )}
      </div>

      {/* Add Review Form */}
      {showAddReview && (
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Add Your Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating *</label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        i < newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {newReview.rating === 0 && (
                <p className="text-red-500 text-sm mt-1">Please select a rating</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Comment</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F3C88]"
                rows={4}
                required
                placeholder="Share your experience with this product..."
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading || newReview.rating === 0}
                className="bg-[#1F3C88] text-white px-4 py-2 rounded-lg hover:bg-[#1F3C88]/90 transition disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowAddReview(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="bg-white rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{review.userName}</span>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}