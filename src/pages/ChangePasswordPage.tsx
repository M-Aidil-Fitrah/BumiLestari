// src/pages/ChangePasswordPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, ArrowLeft, KeyRound } from 'lucide-react';
import { authService } from '@/lib/auth';
import Navbar from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    if (formData.newPassword.length < 8) {
      setError('Password baru minimal 8 karakter');
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Password baru tidak cocok');
      return false;
    }

    if (formData.newPassword === formData.currentPassword) {
      setError('Password baru tidak boleh sama dengan password lama');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Verify current password by trying to sign in
      const user = await authService.getCurrentUser();
      if (!user || !user.email) {
        throw new Error('User not authenticated');
      }

      // Try to sign in with current password to verify it
      try {
        await authService.signIn(user.email, formData.currentPassword);
      } catch (signInError) {
        throw new Error('Password lama tidak benar');
      }

      // Update to new password
      await authService.updatePassword(formData.newPassword);

      setSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err: any) {
      console.error('Change password error:', err);
      setError(err.message || 'Gagal mengubah password');
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-[#F5F3EE]">
        <Navbar />
        <div className="pt-32 pb-20 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Password Berhasil Diubah!</h2>
            <p className="text-gray-600 mb-4">
              Password Anda telah berhasil diperbarui.
            </p>
            <p className="text-sm text-gray-500">
              Anda akan diarahkan ke halaman utama...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <Navbar />

      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#8B7355] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2C2C2C] rounded-full blur-3xl"></div>
      </div>

      <main className="pt-24 pb-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-[#2C2C2C] hover:text-[#8B7355] mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Kembali</span>
          </motion.button>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-[#8B7355]/10"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#8B7355]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <KeyRound className="w-8 h-8 text-[#8B7355]" />
              </div>
              <h2 className="text-3xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Ubah Password
              </h2>
              <p className="text-[#8B7355]">Perbarui password akun Anda</p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Current Password */}
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                  Password Lama *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] w-5 h-5" />
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    required
                    value={formData.currentPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, currentPassword: e.target.value });
                      setError('');
                    }}
                    disabled={loading}
                    className="w-full pl-11 pr-12 py-3 border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all bg-white/50 disabled:opacity-50"
                    placeholder="Masukkan password lama"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] hover:text-[#2C2C2C] transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                  Password Baru *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] w-5 h-5" />
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={formData.newPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, newPassword: e.target.value });
                      setError('');
                    }}
                    disabled={loading}
                    className="w-full pl-11 pr-12 py-3 border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all bg-white/50 disabled:opacity-50"
                    placeholder="Min. 8 karakter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] hover:text-[#2C2C2C] transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                  Konfirmasi Password Baru *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] w-5 h-5" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      setError('');
                    }}
                    disabled={loading}
                    className="w-full pl-11 pr-12 py-3 border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all bg-white/50 disabled:opacity-50"
                    placeholder="Konfirmasi password baru"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] hover:text-[#2C2C2C] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800 font-medium mb-2">Password harus:</p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li className="flex items-center gap-2">
                    <span className={formData.newPassword.length >= 8 ? 'text-green-600' : ''}>
                      {formData.newPassword.length >= 8 ? '✓' : '○'}
                    </span>
                    Minimal 8 karakter
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={formData.newPassword === formData.confirmPassword && formData.confirmPassword ? 'text-green-600' : ''}>
                      {formData.newPassword === formData.confirmPassword && formData.confirmPassword ? '✓' : '○'}
                    </span>
                    Password cocok
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="w-full bg-[#2C2C2C] hover:bg-[#1a1a1a] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  'Ubah Password'
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Security Note */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              Pastikan password baru Anda kuat dan tidak mudah ditebak
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChangePasswordPage;