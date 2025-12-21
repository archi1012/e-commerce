import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const deliveryCharges = getTotalPrice() >= 499 ? 0 : 49;
  const discount = Math.floor(getTotalPrice() * 0.1);
  const finalTotal = getTotalPrice() + deliveryCharges - discount;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

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
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-6">
                  <div className="flex gap-6">
                    <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                          {item.brand && (
                            <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            removeFromCart(item.id);
                            toast.success('Removed from cart');
                          }}
                          className="text-red-500 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-xl font-semibold">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{item.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 rounded border-2 border-gray-300 hover:border-[#1F3C88] transition flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded border-2 border-gray-300 hover:border-[#1F3C88] transition flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="ml-auto font-semibold">
                          Total: ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div>
              <div className="bg-white rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Price Details</h2>
                
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
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