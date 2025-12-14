import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Leaf, Sparkles, Truck } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static login - untuk demo sementara
    console.log('Login attempt:', formData);
    alert('Login berhasil! (Demo)');
    navigate('/');
  };

  return (
    <div className="relative h-screen bg-[#F5F3EE] overflow-hidden">
      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/')}
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
                Selamat Datang
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
                Masuk untuk melanjutkan perjalanan Anda menuju gaya hidup yang lebih berkelanjutan.
              </p>
            </div>
            
            {/* Feature Points */}
            <div className="space-y-4 max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8B7355]/10 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-[#8B7355]" />
                </div>
                <span className="text-gray-700">Produk 100% Ramah Lingkungan</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8B7355]/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-[#8B7355]" />
                </div>
                <span className="text-gray-700">Kualitas Premium & Terpercaya</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8B7355]/10 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-[#8B7355]" />
                </div>
                <span className="text-gray-700">Pengiriman Cepat & Aman</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
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
                  Selamat Datang Kembali
                </h2>
                <p className="text-[#8B7355]">Masuk ke akun Anda</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
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
                      className="w-full pl-11 pr-4 py-3 border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all bg-white/50"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

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
                      className="w-full pl-11 pr-12 py-3 border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all bg-white/50"
                      placeholder="Masukkan password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] hover:text-[#2C2C2C] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#8B7355] focus:ring-[#8B7355] border-[#8B7355]/30 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Ingat saya
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-[#8B7355] hover:text-[#2C2C2C] transition-colors">
                    Lupa password?
                  </Link>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#2C2C2C] hover:bg-[#1a1a1a] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Masuk
                </motion.button>

                {/* Register Link */}
                <div className="text-center pt-4">
                  <span className="text-gray-600">Belum punya akun? </span>
                  <Link to="/register" className="text-[#8B7355] hover:text-[#2C2C2C] font-medium transition-colors">
                    Daftar sekarang
                  </Link>
                </div>
              </form>
            </div>

            {/* Footer Text */}
            <div className="text-center text-xs text-gray-500 mt-6">
              <p>
                Dengan masuk, Anda menyetujui{' '}
                <Link to="/terms" className="text-[#8B7355] hover:underline">Syarat & Ketentuan</Link>
                {' '}dan{' '}
                <Link to="/privacy" className="text-[#8B7355] hover:underline">Kebijakan Privasi</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;