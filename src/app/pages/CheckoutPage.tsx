import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Building2, Wallet } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Order placed successfully!');
    clearCart();
    setTimeout(() => navigate('/profile'), 1500);
  };

  const deliveryCharges = getTotalPrice() >= 499 ? 0 : 49;
  const discount = Math.floor(getTotalPrice() * 0.1);
  const finalTotal = getTotalPrice() + deliveryCharges - discount;

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="px-4 py-3 bg-[#F5F7FA] rounded-lg border-2 border-transparent focus:border-[#1F3C88] outline-none transition"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="px-4 py-3 bg-[#F5F7FA] rounded-lg border-2 border-transparent focus:border-[#1F3C88] outline-none transition"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="px-4 py-3 bg-[#F5F7FA] rounded-lg border-2 border-transparent focus:border-[#1F3C88] outline-none transition"
                  required
                />
                <input
                  type="text"
                  placeholder="PIN Code"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="px-4 py-3 bg-[#F5F7FA] rounded-lg border-2 border-transparent focus:border-[#1F3C88] outline-none transition"
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="md:col-span-2 px-4 py-3 bg-[#F5F7FA] rounded-lg border-2 border-transparent focus:border-[#1F3C88] outline-none transition"
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="px-4 py-3 bg-[#F5F7FA] rounded-lg border-2 border-transparent focus:border-[#1F3C88] outline-none transition"
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="px-4 py-3 bg-[#F5F7FA] rounded-lg border-2 border-transparent focus:border-[#1F3C88] outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition ${
                  paymentMethod === 'upi' ? 'border-[#1F3C88] bg-[#1F3C88]/5' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-[#1F3C88]"
                  />
                  <Smartphone className="w-5 h-5 text-[#1F3C88]" />
                  <span className="flex-1">UPI</span>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition ${
                  paymentMethod === 'card' ? 'border-[#1F3C88] bg-[#1F3C88]/5' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-[#1F3C88]"
                  />
                  <CreditCard className="w-5 h-5 text-[#1F3C88]" />
                  <span className="flex-1">Credit / Debit Card</span>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition ${
                  paymentMethod === 'netbanking' ? 'border-[#1F3C88] bg-[#1F3C88]/5' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-[#1F3C88]"
                  />
                  <Building2 className="w-5 h-5 text-[#1F3C88]" />
                  <span className="flex-1">Net Banking</span>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition ${
                  paymentMethod === 'cod' ? 'border-[#1F3C88] bg-[#1F3C88]/5' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-[#1F3C88]"
                  />
                  <Wallet className="w-5 h-5 text-[#1F3C88]" />
                  <span className="flex-1">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name} × {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-4 pb-4 border-t border-b border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{getTotalPrice().toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-[#10B981]">−₹{discount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className={deliveryCharges === 0 ? 'text-[#10B981]' : ''}>
                    {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-semibold mb-6">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#F9C74F] text-[#2E2E2E] py-3 rounded-lg font-semibold hover:bg-[#F9C74F]/90 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
