import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { useState } from 'react';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);
  const { addToCart, addToWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/" className="text-[#1F3C88] hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const similarProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-[#1F3C88]">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-[#1F3C88]">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#2E2E2E]">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div>
            <div className="bg-white rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="flex gap-4 mt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 bg-white rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#1F3C88]">
                  <img
                    src={product.image}
                    alt={`View ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            {product.brand && (
              <p className="text-gray-600 mb-4">by {product.brand}</p>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-[#10B981] text-white px-3 py-1 rounded-lg">
                <span className="font-semibold">{product.rating}</span>
                <Star className="w-4 h-4" fill="currentColor" />
              </div>
              <span className="text-gray-600">{product.reviews.toLocaleString()} reviews</span>
            </div>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xl text-[#10B981] font-semibold">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-[#1F3C88] transition"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-[#1F3C88] transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#F9C74F] text-[#2E2E2E] py-4 rounded-lg font-semibold hover:bg-[#F9C74F]/90 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToWishlist(product);
                  toast.success('Added to wishlist!');
                }}
                className="w-14 h-14 border-2 border-gray-300 rounded-lg hover:border-[#1F3C88] hover:bg-[#1F3C88] hover:text-white transition flex items-center justify-center"
              >
                <Heart className="w-6 h-6" />
              </button>
              <button className="w-14 h-14 border-2 border-gray-300 rounded-lg hover:border-[#1F3C88] hover:bg-[#1F3C88] hover:text-white transition flex items-center justify-center">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1F3C88]/10 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-[#1F3C88]" />
                </div>
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-sm text-gray-600">On orders above ₹499</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1F3C88]/10 rounded-lg flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-[#1F3C88]" />
                </div>
                <div>
                  <p className="font-medium">7 Days Return</p>
                  <p className="text-sm text-gray-600">Easy return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1F3C88]/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#1F3C88]" />
                </div>
                <div>
                  <p className="font-medium">Warranty</p>
                  <p className="text-sm text-gray-600">1 year manufacturer warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
