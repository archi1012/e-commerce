import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reviews from '../components/Reviews';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { ShoppingCart, Heart, Star } from 'lucide-react';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { addToCart, addToWishlist } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchProduct();
  }, [productId]);
  
  const fetchProduct = async () => {
    try {
      const data = await productsAPI.getProduct(productId);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="text-lg">Loading product...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold">Product not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast.success('Added to wishlist!');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-white rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="bg-white rounded-xl p-8">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            {product.brand && (
              <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
            )}
            
            <div className="flex items-center gap-2 mb-4">
              {product.rating > 0 ? (
                <>
                  <div className="flex items-center gap-1 bg-[#10B981] text-white px-3 py-1 rounded">
                    <span>{product.rating}</span>
                    <Star className="w-4 h-4" fill="currentColor" />
                  </div>
                  <span className="text-gray-600">({product.reviewCount || 0} reviews)</span>
                </>
              ) : (
                <span className="text-gray-600">No reviews yet</span>
              )}
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-lg text-[#10B981]">{product.discount}% off</span>
                </>
              )}
            </div>

            <p className="text-gray-700 mb-8">{product.description}</p>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#1F3C88] text-white py-3 rounded-lg hover:bg-[#1F3C88]/90 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="px-6 py-3 border-2 border-[#1F3C88] text-[#1F3C88] rounded-lg hover:bg-[#1F3C88] hover:text-white transition flex items-center justify-center"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-12">
          <Reviews 
            productId={product._id} 
            currentRating={product.rating || 0} 
            reviewCount={product.reviewCount || 0} 
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}