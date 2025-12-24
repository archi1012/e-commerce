import { useState, useEffect } from 'react';
import { Star, Trash2, User, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { productsAPI } from '../services/api';

export default function ReviewManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productsAPI.getProducts();
      setProducts(data);
    } catch (error) {
      const logger = (await import('../utils/logger')).default;
      logger.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAverageRating = () => {
    if (products.length === 0) return 0;
    const totalRating = products.reduce((sum, product) => sum + (product.rating || 0), 0);
    return (totalRating / products.length).toFixed(1);
  };

  const getTotalReviews = () => {
    return products.reduce((sum, product) => sum + (product.reviewCount || 0), 0);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Review Management</h1>
        <p className="text-gray-600">Monitor and manage customer reviews</p>
      </div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Rating Overview</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl font-bold">{getAverageRating()}</div>
            <div>
              <div className="flex items-center gap-1">
                {renderStars(Math.round(getAverageRating()))}
              </div>
              <div className="text-sm text-gray-600">{getTotalReviews()} total reviews</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Review Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Products</span>
              <span className="font-semibold">{products.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Reviews</span>
              <span className="font-semibold">{getTotalReviews()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Rating</span>
              <span className="font-semibold">{getAverageRating()}/5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products with Reviews */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Products & Reviews</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {products.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No products found.
            </div>
          ) : (
            products.map((product) => (
              <div key={product._id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image || 'https://via.placeholder.com/60'}
                      alt={product.name}
                      className="w-15 h-15 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(product.rating || 0)}
                        <span className="text-sm text-gray-600">
                          ({product.reviewCount || 0} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-3 ml-19">
                    {product.reviews.map((review) => (
                      <div key={review._id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{review.userName}</span>
                              <div className="flex items-center gap-1">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm">{review.comment}</p>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ml-19 text-sm text-gray-500">
                    No reviews yet
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}