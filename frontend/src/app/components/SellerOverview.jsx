import { Package, Star, ShoppingCart, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

export default function SellerOverview() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalReviews: 0,
    activeListings: 0,
    orders: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const products = await productsAPI.getProducts();
      const totalProducts = products.length;
      const activeListings = products.filter(p => p.inStock).length;
      const totalReviews = products.reduce((sum, p) => sum + (p.reviewCount || 0), 0);
      
      setStats({
        totalProducts,
        totalReviews,
        activeListings,
        orders: 0
      });
      
      setRecentProducts(products.slice(0, 3));
    } catch (error) {
      const logger = (await import('../utils/logger')).default;
      logger.error('Error fetching stats:', error);
    }
  };

  const statsData = [
    {
      title: 'Total Products',
      value: stats.totalProducts.toString(),
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Reviews',
      value: stats.totalReviews.toString(),
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      title: 'Active Listings',
      value: stats.activeListings.toString(),
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Orders',
      value: stats.orders.toString(),
      icon: ShoppingCart,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Recent Products</h3>
        {recentProducts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No products added yet</p>
        ) : (
          <div className="space-y-3">
            {recentProducts.map((product) => (
              <div key={product._id} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">₹{product.price}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.inStock && product.stock > 0
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock && product.stock > 0 ? 'Active' : 'Out of Stock'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}