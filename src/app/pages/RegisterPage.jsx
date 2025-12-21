import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-6">Create Account</h1>
          <p className="text-gray-600 mb-8">Join WINGER and start shopping!</p>
          <Link 
            to="/login" 
            className="block w-full bg-[#1F3C88] text-white text-center py-3 rounded-lg hover:bg-[#1F3C88]/90 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}