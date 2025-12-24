import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Star, 
  ShoppingCart, 
  LogOut, 
  User,
  Plus,
  Edit,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { useSeller } from '../context/SellerContext';
import ProductManagement from './ProductManagement';
import ReviewManagement from './ReviewManagement';
import SellerOverview from './SellerOverview';

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { seller, logoutSeller, switchToUserMode } = useSeller();

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Product Management', icon: Package },
    { id: 'reviews', label: 'Review Management', icon: Star },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <SellerOverview />;
      case 'products':
        return <ProductManagement />;
      case 'reviews':
        return <ReviewManagement />;
      case 'orders':
        return (
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Orders Management</h2>
            <p className="text-gray-600">Order management feature coming soon...</p>
          </div>
        );
      default:
        return <SellerOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-[#1F3C88]">WINGER Seller Portal</h1>
            <div className="bg-[#10B981] text-white px-3 py-1 rounded-full text-sm font-medium">
              {seller?.role === 'admin' ? 'Admin' : 'Seller'}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={switchToUserMode}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#1F3C88] transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shopping
            </button>
            
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">{seller?.name}</span>
            </div>
            
            <button
              onClick={logoutSeller}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                        activeTab === item.id
                          ? 'bg-[#1F3C88] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}