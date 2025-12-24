import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist, wishlist } = useCart();
  const productId = product._id || product.id;
  const isInWishlist = wishlist.some(item => (item._id || item.id) === productId);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast.success('Added to wishlist!');
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <Link to={`/product/${productId}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        {product.discount && (
          <div className="absolute top-3 left-3 bg-[#10B981] text-white px-3 py-1 rounded-full text-sm">
            {product.discount}% OFF
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddToWishlist();
          }}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition ${
            isInWishlist
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className="w-5 h-5" fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>
      </Link>

      <div className="p-4">
        <Link to={`/product/${productId}`}>
          <h3 className="font-medium mb-1 line-clamp-2 hover:text-[#1F3C88] transition">
            {product.name}
          </h3>
        </Link>

        {product.brand && (
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        )}

        <div className="flex items-center gap-2 mb-2">
          {product.rating > 0 ? (
            <>
              <div className="flex items-center gap-1 bg-[#10B981] text-white px-2 py-0.5 rounded text-sm">
                <span>{product.rating}</span>
                <Star className="w-3 h-3" fill="currentColor" />
              </div>
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </>
          ) : (
            <span className="text-sm text-gray-500">No reviews yet</span>
          )}
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-[#10B981]">{product.discount}% off</span>
            </>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-[#1F3C88] text-white py-2.5 rounded-lg hover:bg-[#1F3C88]/90 transition flex items-center justify-center gap-2 group-hover:bg-[#F9C74F] group-hover:text-[#2E2E2E]"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}