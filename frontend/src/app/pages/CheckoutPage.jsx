import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cart, getTotalPrice } = useCart();

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="bg-white rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <p className="text-gray-600 mb-4">{cart.length} items</p>
          <p className="text-2xl font-bold">Total: ₹{getTotalPrice().toLocaleString('en-IN')}</p>
          <button className="w-full mt-6 bg-[#F9C74F] text-[#2E2E2E] py-3 rounded-lg font-semibold hover:bg-[#F9C74F]/90 transition">
            Place Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}