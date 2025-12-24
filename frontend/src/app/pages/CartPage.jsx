import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, RefreshCw } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, loadCart } = useCart();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Refresh cart when page loads
    loadCart();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadCart();
      toast.success('Cart refreshed');
    } catch (error) {
      toast.error('Failed to refresh cart');
    } finally {
      setIsRefreshing(false);
    }
  };

  const deliveryCharges = getTotalPrice() >= 499 ? 0 : 49;
  const discount = Math.floor(getTotalPrice() * 0.1);
  const finalTotal = getTotalPrice() + deliveryCharges - discount;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    
    const hasOutOfStock = cart.some(item => item.isOutOfStock || (item.product && item.product.stock === 0));
    if (hasOutOfStock) {
      toast.error('Please remove out of stock items before checkout');
      return;
    }
    
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <ShoppingBag className="w-24 h-24 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Link
              to="/"
              className="inline-block bg-[#1F3C88] text-white px-8 py-3 rounded-lg hover:bg-[#1F3C88]/90 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => {
                const product = item.product || item;
                const itemId = product._id || product.id;
                const price = product.price || 0;
                const originalPrice = product.originalPrice;
                const quantity = item.quantity || 0;
                const isOutOfStock = item.isOutOfStock || product.stock === 0;
                
                return (
                  <div key={itemId} className={`bg-white rounded-xl p-6 ${isOutOfStock ? 'opacity-60' : ''}`}>
                    <div className="flex gap-6">
                      <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
                        <img
                          src={product.image || '/placeholder.jpg'}
                          alt={product.name || 'Product'}
                          className="w-full h-full object-cover"
                        />
                        {isOutOfStock && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">OUT OF STOCK</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{product.name || 'Product'}</h3>
                            {product.brand && (
                              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                            )}
                            {isOutOfStock && (
                              <p className="text-sm text-red-600 font-semibold mb-2">Out of Stock</p>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              removeFromCart(itemId);
                              toast.success('Removed from cart');
                            }}
                            className="text-red-500 hover:text-red-600 transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-xl font-semibold">
                            ₹{price.toLocaleString('en-IN')}
                          </span>
                          {originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ₹{originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(itemId, Math.max(1, quantity - 1))}
                            disabled={isOutOfStock}
                            className={`w-8 h-8 rounded border-2 transition flex items-center justify-center ${
                              isOutOfStock 
                                ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'border-gray-300 hover:border-[#1F3C88]'
                            }`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-semibold">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(itemId, quantity + 1)}
                            disabled={isOutOfStock}
                            className={`w-8 h-8 rounded border-2 transition flex items-center justify-center ${
                              isOutOfStock 
                                ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'border-gray-300 hover:border-[#1F3C88]'
                            }`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <span className="ml-auto font-semibold">
                            Total: ₹{(price * quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Price Summary */}
            <div>
              <div className="bg-white rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Price Details</h2>
                
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price ({cart.reduce((sum, item) => sum + (item.quantity || 0), 0)} items)</span>
                    <span>₹{getTotalPrice().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-[#10B981]">−₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Charges</span>
                    <span className={deliveryCharges === 0 ? 'text-[#10B981]' : ''}>
                      {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-semibold mb-6">
                  <span>Total Amount</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#F9C74F] text-[#2E2E2E] py-3 rounded-lg font-semibold hover:bg-[#F9C74F]/90 transition"
                >
                  Proceed to Checkout
                </button>

                {getTotalPrice() < 499 && (
                  <p className="text-sm text-[#10B981] mt-4 text-center">
                    Add ₹{(499 - getTotalPrice()).toLocaleString('en-IN')} more for FREE delivery!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}