import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { paymentAPI } from '../services/api';
import { toast } from 'sonner';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    
    setLoading(true);
    try {
      const totalAmount = getTotalPrice();
      const order = await paymentAPI.createPaymentOrder(totalAmount);
      
      const options = {
        key: 'rzp_live_RK5YLrW4IHsqid',
        amount: order.amount,
        currency: order.currency,
        name: 'WINGER Store',
        description: 'Purchase from WINGER',
        order_id: order.id,
        handler: async (response) => {
          try {
            await paymentAPI.verifyPayment(response);
            clearCart();
            toast.success('Payment successful!');
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: { color: '#1F3C88' },
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled');
            setLoading(false);
          }
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        toast.error(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      rzp.open();
    } catch (error) {
      const logger = (await import('../utils/logger')).default;
      logger.error('Payment error:', error);
      toast.error(error.message || 'Payment failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="bg-white rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <p className="text-gray-600 mb-4">{cart.length} items</p>
          <p className="text-2xl font-bold">Total: ₹{getTotalPrice().toLocaleString('en-IN')}</p>
          <button 
            onClick={handlePayment}
            disabled={loading}
            className="w-full mt-6 bg-[#F9C74F] text-[#2E2E2E] py-3 rounded-lg font-semibold hover:bg-[#F9C74F]/90 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}