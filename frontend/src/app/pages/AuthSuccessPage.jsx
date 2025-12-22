import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function AuthSuccessPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      // Decode token to get user info (simplified)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.id });
        toast.success('Login successful!');
        navigate('/');
      } catch (error) {
        toast.error('Authentication failed');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3C88] mx-auto mb-4"></div>
        <p>Completing authentication...</p>
      </div>
    </div>
  );
}