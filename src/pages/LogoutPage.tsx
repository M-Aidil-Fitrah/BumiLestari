// src/pages/LogoutPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/lib/auth';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.signOut();
      // Redirect ke home
      navigate('/');
      // Force reload untuk clear semua state
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
      alert('Gagal logout');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#8B7355] border-t-transparent mb-4"></div>
        <p className="text-gray-600">Logging out...</p>
      </div>
    </div>
  );
};

export default LogoutPage;