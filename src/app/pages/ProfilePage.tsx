import { Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProfilePage() {
  const { wishlist } = useCart();

  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-12-15',
      status: 'Delivered',
      total: 4599,
      items: 2,
    },
    {
      id: 'ORD002',
      date: '2024-12-18',
      status: 'In Transit',
      total: 2999,
      items: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1F3C88] to-[#5B73C5] rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">JD</span>
                </div>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-gray-600">john@example.com</p>
                </div>
              </div>

              <nav className="space-y-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1F3C88]/10 text-[#1F3C88] font-medium"
                >
                  <User className="w-5 h-5" />
                  My Profile
                </Link>
                <Link
                  to="/profile/orders"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F5F7FA] transition"
                >
                  <Package className="w-5 h-5" />
                  My Orders
                </Link>
                <Link
                  to="/profile/wishlist"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F5F7FA] transition"
                >
                  <Heart className="w-5 h-5" />
                  Wishlist
                </Link>
                <Link
                  to="/profile/addresses"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F5F7FA] transition"
                >
                  <MapPin className="w-5 h-5" />
                  Addresses
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-[#1F3C88] transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">
                          Placed on {new Date(order.date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.status === 'Delivered'
                            ? 'bg-[#10B981]/10 text-[#10B981]'
                            : 'bg-[#F9C74F]/20 text-[#2E2E2E]'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{order.items} item(s)</span>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
                        <button className="text-[#1F3C88] hover:underline">
                          Track Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishlist */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">My Wishlist</h2>
                <span className="text-gray-600">{wishlist.length} items</span>
              </div>
              {wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-600">Your wishlist is empty</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>

            {/* Saved Addresses */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Saved Addresses</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">Home</h3>
                    <span className="text-xs bg-[#1F3C88]/10 text-[#1F3C88] px-2 py-1 rounded">
                      Default
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    123 Main Street, Andheri West<br />
                    Mumbai, Maharashtra 400001<br />
                    +91 98765 43210
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="text-[#1F3C88] text-sm hover:underline">Edit</button>
                    <button className="text-red-600 text-sm hover:underline">Delete</button>
                  </div>
                </div>

                <button className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[#1F3C88] transition text-center">
                  <span className="text-gray-600">+ Add New Address</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
