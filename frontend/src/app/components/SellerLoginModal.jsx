import { useState } from 'react';
import { Lock, X, Store } from 'lucide-react';
import { toast } from 'sonner';
import { useSeller } from '../context/SellerContext';

export default function SellerLoginModal({ isOpen, onClose }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { loginSeller } = useSeller();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock seller authentication - replace with actual API call
      if (credentials.email === 'admin@winger.com' && credentials.password === 'admin123') {
        loginSeller({
          id: '1',
          name: 'Admin User',
          email: credentials.email,
          role: 'admin'
        });
        toast.success('Welcome to Seller Dashboard!');
        onClose();
      } else {
        toast.error('Invalid seller credentials');
      }
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1F3C88] rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Seller / Admin Login</h2>
              <p className="text-sm text-gray-600">WINGER Seller Portal</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              Seller access is restricted to authorized users only.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Seller ID / Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F3C88]"
              placeholder="admin@winger.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F3C88]"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1F3C88] text-white py-2 rounded-lg hover:bg-[#1F3C88]/90 transition disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Enter Seller Dashboard'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Demo credentials: admin@winger.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}