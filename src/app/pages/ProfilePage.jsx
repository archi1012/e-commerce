import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProfilePage() {
  const { wishlist } = useCart();

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="bg-white rounded-xl p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <p className="text-gray-600">Welcome to your profile page!</p>
        </div>

        <div className="bg-white rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-6">My Wishlist ({wishlist.length} items)</h2>
          {wishlist.length === 0 ? (
            <p className="text-gray-600">Your wishlist is empty</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}