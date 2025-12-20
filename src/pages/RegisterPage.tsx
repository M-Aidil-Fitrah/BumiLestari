// pages/RegisterPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, Leaf, ShoppingBag, Shield } from 'lucide-react';
import { authService } from '@/lib/auth';
import { logAuth, logError, logValidation, logUserAction } from '@/utils/logger';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error saat user mulai mengetik
    if (error) setError('');
  };

  const validateForm = () => {
    const startTime = Date.now();

    // Validasi password match
    if (formData.password !== formData.confirmPassword) {
      const errorMsg = 'Password tidak cocok!';
      setError(errorMsg);
      logValidation('confirmPassword', errorMsg, {
        email: formData.email,
      });
      return false;
    }

    // Validasi panjang password
    if (formData.password.length < 8) {
      const errorMsg = 'Password minimal 8 karakter';
      setError(errorMsg);
      logValidation('password', errorMsg, {
        email: formData.email,
        password_length: formData.password.length,
      });
      return false;
    }

    // Validasi terms
    if (!formData.acceptTerms) {
      const errorMsg = 'Harap setujui syarat dan ketentuan!';
      setError(errorMsg);
      logValidation('acceptTerms', errorMsg, {
        email: formData.email,
      });
      return false;
    }

    // Validasi nomor telepon (Indonesia)
    const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
    if (!phoneRegex.test(formData.phone)) {
      const errorMsg = 'Nomor telepon tidak valid';
      setError(errorMsg);
      logValidation('phone', errorMsg, {
        email: formData.email,
        phone: formData.phone,
      });
      return false;
    }

    // Log validation success
    logUserAction('form_validation_success', {
      email: formData.email,
      validation_duration_ms: Date.now() - startTime,
    });

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const submitStartTime = Date.now();

    // Log registration attempt
    logAuth('register', {
      stage: 'started',
      email: formData.email,
      has_phone: !!formData.phone,
    });

    // Validasi form
    if (!validateForm()) {
      logAuth('register', {
        stage: 'validation_failed',
        email: formData.email,
      });
      return;
    }

    setLoading(true);

    try {
      const registerStartTime = Date.now();

      // Call Supabase auth
      await authService.signUp({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      const registerDuration = Date.now() - registerStartTime;

      // Log successful registration
      logAuth('register', {
        stage: 'success',
        email: formData.email,
        full_name: formData.fullName,
        phone: formData.phone,
        registration_duration_ms: registerDuration,
        total_duration_ms: Date.now() - submitStartTime,
      });

      // Registrasi berhasil
      setSuccess(true);
      
      // Log redirect
      logUserAction('register_redirect_to_login', {
        email: formData.email,
      });

      // Redirect ke login setelah 3 detik
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err: any) {
      console.error('Register error:', err);
      
      let errorMessage = '';

      // Handle berbagai error dari Supabase
      if (err.message.includes('User already registered')) {
        errorMessage = 'Email sudah terdaftar. Silakan gunakan email lain atau login.';
      } else if (err.message.includes('Password should be at least 6 characters')) {
        errorMessage = 'Password minimal 6 karakter';
      } else if (err.message.includes('Unable to validate email address')) {
        errorMessage = 'Format email tidak valid';
      } else {
        errorMessage = err.message || 'Terjadi kesalahan saat mendaftar';
      }

      setError(errorMessage);

      // Log registration error
      logError(err, {
        context: 'register_page',
        stage: 'registration_failed',
        email: formData.email,
        error_message: errorMessage,
        error_type: err.name || 'Unknown',
        supabase_error: err.message,
        total_duration_ms: Date.now() - submitStartTime,
      });

    } finally {
      setLoading(false);
    }
  };

  // Log page view saat component mount
  useState(() => {
    logUserAction('page_view', {
      page: 'register',
      referrer: document.referrer,
    });
  });

  // Success message component
  if (success) {
    return (
      <div className="relative h-screen bg-[#F5F3EE] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-gray-600 mb-4">
            Silakan cek email Anda untuk verifikasi akun.
          </p>
          <p className="text-sm text-gray-500">
            Anda akan diarahkan ke halaman login dalam beberapa detik...
          </p>
          <Link 
            to="/login"
            onClick={() => logUserAction('click_manual_redirect_to_login')}
            className="inline-block mt-4 text-[#8B7355] hover:text-[#2C2C2C] font-medium"
          >
            Langsung ke Login →
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F5F3EE] overflow-hidden py-8">
      {/* Back Button */}
      <motion.button
        onClick={() => {
          logUserAction('click_back_button', { from_page: 'register' });
          navigate('/');
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-[#2C2C2C] hover:text-[#8B7355] transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Kembali</span>
      </motion.button>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#8B7355] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2C2C2C] rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Welcome Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="mb-8">
              <img 
                src="/BumiLestari.png" 
                alt="BumiLestari Logo" 
                className="max-w-[250px] h-auto object-contain mb-5"
              />
              <h1 className="text-5xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Bergabung dengan Kami
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
                Daftar sekarang dan jadilah bagian dari komunitas yang peduli terhadap masa depan bumi.
              </p>
            </div>
            
            {/* Feature Points */}
            <div className="space-y-4 max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8B7355]/10 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-[#8B7355]" />
                </div>
                <span className="text-gray-700">Akses ke Ribuan Produk Ramah Lingkungan</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8B7355]/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#8B7355]" />
                </div>
                <span className="text-gray-700">Transaksi Aman & Terpercaya</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8B7355]/10 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-5 h-5 text-[#8B7355]" />
                </div>
                <span className="text-gray-700">Belanja Mudah & Menyenangkan</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Register Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-[#8B7355]/10">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Bergabung dengan Kami
                </h2>
                <p className="text-[#8B7355]">Mulai perjalanan hidup berkelanjutan</p>
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

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Row 1: Nama & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name Field */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] w-5 h-5" />
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onFocus={() => logUserAction('focus_input', { field: 'fullName' })}
                        disabled={loading}
                        className="w-full pl-11 pr-4 py-3 border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all bg-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Nama lengkap"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] w-5 h-5" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => logUserAction('focus_input', { field: 'email' })}
                        disabled={loading}
                        className="w-full pl-11 pr-4 py-3 border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all bg-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="nama@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone Field - Full Width */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Nomor Telepon
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] w-5 h-5" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => logUserAction('focus_input', { field: 'phone' })}
                      disabled={loading}
                      className="w-full pl-11 pr-4 py-3 border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all bg-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </div>

                {/* Row 2: Password & Confirm Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] w-5 h-5" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={() => logUserAction('focus_input', { field: 'password' })}
                        disabled={loading}
                        className="w-full pl-11 pr-12 py-3 border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all bg-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Min. 8 karakter"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setShowPassword(!showPassword);
                          logUserAction('toggle_password_visibility', { field: 'password', visible: !showPassword });
                        }}
                        disabled={loading}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] hover:text-[#2C2C2C] transition-colors disabled:opacity-50"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                      Konfirmasi Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] w-5 h-5" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onFocus={() => logUserAction('focus_input', { field: 'confirmPassword' })}
                        disabled={loading}
                        className="w-full pl-11 pr-12 py-3 border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all bg-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Konfirmasi password"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setShowConfirmPassword(!showConfirmPassword);
                          logUserAction('toggle_password_visibility', { field: 'confirmPassword', visible: !showConfirmPassword });
                        }}
                        disabled={loading}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] hover:text-[#2C2C2C] transition-colors disabled:opacity-50"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start pt-2">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    required
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    onClick={() => logUserAction('click_accept_terms', { accepted: !formData.acceptTerms })}
                    disabled={loading}
                    className="h-4 w-4 text-[#8B7355] focus:ring-[#8B7355] border-[#8B7355]/30 rounded mt-1 disabled:opacity-50"
                  />
                  <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                    Saya menyetujui{' '}
                    <Link 
                      to="/terms" 
                      onClick={() => logUserAction('click_terms_link')}
                      className="text-[#8B7355] hover:text-[#2C2C2C] transition-colors" 
                      tabIndex={loading ? -1 : 0}
                    >
                      Syarat & Ketentuan
                    </Link>{' '}
                    dan{' '}
                    <Link 
                      to="/privacy" 
                      onClick={() => logUserAction('click_privacy_link')}
                      className="text-[#8B7355] hover:text-[#2C2C2C] transition-colors" 
                      tabIndex={loading ? -1 : 0}
                    >
                      Kebijakan Privasi
                    </Link>
                  </label>
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
                    'Daftar Sekarang'
                  )}
                </motion.button>

                {/* Login Link */}
                <div className="text-center pt-4">
                  <span className="text-gray-600">Sudah punya akun? </span>
                  <Link 
                    to="/login" 
                    onClick={() => logUserAction('click_login_link', { from_page: 'register' })}
                    className="text-[#8B7355] hover:text-[#2C2C2C] font-medium transition-colors"
                    tabIndex={loading ? -1 : 0}
                  >
                    Masuk di sini
                  </Link>
                </div>
              </form>
            </div>

            {/* Footer Text */}
            <div className="text-center text-xs text-gray-500 mt-6">
              <p>Bergabunglah dengan komunitas peduli lingkungan BumiLestari</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;