import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, LogOut, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSeller } from '../context/SellerContext';
import { categories } from '../data/products';
import { useState } from 'react';
import SellerLoginModal from './SellerLoginModal';
import logger from '../utils/logger';

export default function Header() {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const { seller, switchToSellerMode } = useSeller();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [showSellerLogin, setShowSellerLogin] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSellerAccess = () => {
    if (seller) {
      switchToSellerMode();
    } else {
      setShowSellerLogin(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-[#1F3C88] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-sm">🎉 Free Shipping on orders above ₹499</p>
          <div className="flex gap-4 text-sm">
            <Link to="/help" className="hover:text-[#F9C74F] transition">Help Center</Link>
            <Link to="/track" className="hover:text-[#F9C74F] transition">Track Order</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-[#1F3C88] to-[#5B73C5] w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#1F3C88] to-[#5B73C5] bg-clip-text text-transparent">
              WINGER
            </span>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-12 bg-[#F5F7FA] rounded-full border-2 border-transparent focus:border-[#1F3C88] focus:bg-white outline-none transition"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </form>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#F5F7FA] transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden md:block">Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#F5F7FA] transition"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:block">Login</span>
              </button>
            )}

            <button
              onClick={handleSellerAccess}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#F5F7FA] transition"
            >
              <Store className="w-5 h-5" />
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">Become a Seller</div>
                <div className="text-xs text-gray-500">Manage products & orders</div>
              </div>
            </button>

            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#F5F7FA] transition"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden md:block">Wishlist</span>
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-2 px-4 py-2 bg-[#F9C74F] text-[#2E2E2E] rounded-lg hover:bg-[#F9C74F]/90 transition relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden md:block">Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1F3C88] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Categories navigation */}
        <div className="mt-4 flex items-center gap-4 overflow-x-auto pb-2">
          <div className="relative">
            <button
              onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-[#1F3C88] text-white rounded-lg hover:bg-[#1F3C88]/90 transition whitespace-nowrap"
            >
              <Menu className="w-4 h-4" />
              All Categories
            </button>
            
            {showCategoriesMenu && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden min-w-[200px] z-10">
                {categories.map(category => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    onClick={() => setShowCategoriesMenu(false)}
                    className="block px-4 py-3 hover:bg-[#F5F7FA] transition"
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {categories.slice(0, 6).map(category => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#F5F7FA] transition whitespace-nowrap"
            >
              <span>{category.icon}</span>
              <span className="hidden lg:block">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
      
      <SellerLoginModal 
        isOpen={showSellerLogin} 
        onClose={() => setShowSellerLogin(false)} 
      />
    </header>
  );
}