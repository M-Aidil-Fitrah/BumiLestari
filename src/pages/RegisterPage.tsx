import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { authService } from '@/lib/auth';
import { logAuth, logError, logValidation, logUserAction } from '@/utils/logger';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CustomCursor } from '../components/ui/CustomCursor';

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

  const containerRef = useRef<HTMLDivElement>(null);
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const formPanelRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (error) setError('');
  };

  const validateForm = () => {
    const startTime = Date.now();
    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok!');
      logValidation('confirmPassword', 'Password tidak cocok!', { email: formData.email });
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password minimal 8 karakter');
      logValidation('password', 'Password minimal 8 karakter', { email: formData.email });
      return false;
    }
    if (!formData.acceptTerms) {
      setError('Harap setujui syarat dan ketentuan!');
      logValidation('acceptTerms', 'Harap setujui syarat dan ketentuan!', { email: formData.email });
      return false;
    }
    const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Nomor telepon tidak valid');
      logValidation('phone', 'Nomor telepon tidak valid', { email: formData.email });
      return false;
    }
    logUserAction('form_validation_success', { email: formData.email, validation_duration_ms: Date.now() - startTime });
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const submitStartTime = Date.now();
    logAuth('register', { stage: 'started', email: formData.email, has_phone: !!formData.phone });

    if (!validateForm()) {
      logAuth('register', { stage: 'validation_failed', email: formData.email });
      return;
    }

    setLoading(true);

    try {
      const registerStartTime = Date.now();
      await authService.signUp({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      logAuth('register', {
        stage: 'success',
        email: formData.email,
        registration_duration_ms: Date.now() - registerStartTime,
        total_duration_ms: Date.now() - submitStartTime,
      });

      setSuccess(true);
      logUserAction('register_redirect_to_login', { email: formData.email });

      setTimeout(() => {
        gsap.to(containerRef.current, { opacity: 0, duration: 0.8, onComplete: () => { void navigate('/login'); }});
      }, 3000);

    } catch (err: any) {
      console.error('Register error:', err);
      let errorMessage = err.message?.includes('User already registered') ? 'Email sudah terdaftar.' : err.message || 'Terjadi kesalahan saat mendaftar';
      setError(errorMessage);
      logError(err, { context: 'register_page', email: formData.email });
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    logUserAction('page_view', { page: 'register', referrer: document.referrer });
  });

  useGSAP(() => {
    if (!containerRef.current || success) return;
    const tl = gsap.timeline();
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      gsap.set(imagePanelRef.current, { xPercent: 100 });
      gsap.set(formPanelRef.current, { xPercent: -100 });
    } else {
      gsap.set(formPanelRef.current, { opacity: 0 });
    }

    gsap.set('.reveal-text', { yPercent: 100, opacity: 0 });
    gsap.set('.form-element', { opacity: 0, y: 20 });
    gsap.set('.back-btn', { opacity: 0, x: -20 });

    if (!isMobile) {
      tl.to([imagePanelRef.current, formPanelRef.current], {
        xPercent: 0,
        duration: 1.5,
        ease: 'power4.inOut',
        stagger: 0.1
      });
    } else {
      tl.to(formPanelRef.current, { opacity: 1, duration: 1.5, ease: 'power3.inOut' });
    }

    tl.to('.reveal-text', {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.1
    }, "-=0.8")
    .to('.form-element', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.05
    }, "-=0.6")
    .to('.back-btn', {
      opacity: 1,
      x: 0,
      duration: 0.5
    }, "-=0.5");

    gsap.to(bgImageRef.current, { scale: 1.15, duration: 30, ease: 'none', repeat: -1, yoyo: true });

  }, { scope: containerRef, dependencies: [success] });

  if (success) {
    return (
      <div className="h-screen w-full bg-[#1A1A1A] flex items-center justify-center font-sans">
        <CustomCursor />
        <div className="text-center text-white p-8">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Success.</h2>
          <p className="text-white/70 mb-8">Silakan cek email Anda untuk verifikasi akun.</p>
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-white/50">Mengarahkan ke halaman login...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-[100dvh] w-full bg-[#1A1A1A] overflow-hidden flex flex-col md:flex-row-reverse font-sans relative">
      <CustomCursor />
      
      {/* Magnetic Back Button */}
      <button
        onClick={() => { gsap.to(containerRef.current, { opacity: 0, duration: 0.5, onComplete: () => { void navigate('/'); }}); }}
        className="back-btn absolute top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 text-white/80 md:text-[#2C2C2C]/70 hover:text-white md:hover:text-[#2C2C2C] transition-colors magnetic"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium text-xs md:text-sm tracking-widest uppercase">Kembali</span>
      </button>

      {/* Background Image (Absolute on mobile, relative panel on Desktop) */}
      <div 
        ref={imagePanelRef}
        className="absolute inset-0 z-0 md:relative md:z-auto md:w-1/2 md:h-full overflow-hidden bg-black"
      >
        <img 
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop" 
          alt="Forest" 
          className="w-full h-full object-cover opacity-50 md:opacity-80"
        />
        {/* Mobile dark overlay */}
        <div className="absolute inset-0 bg-black/60 md:bg-gradient-to-l md:from-black/60 md:to-transparent flex flex-col justify-end p-8 md:p-16 items-start md:items-end text-left md:text-right z-10">
          <div className="hidden md:block">
            <div className="overflow-hidden mb-2">
              <h1 className="reveal-text text-6xl xl:text-7xl font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Join Us.
              </h1>
            </div>
            <div className="overflow-hidden max-w-md">
              <p className="reveal-text text-xl text-white/80 font-light">
                Mulai langkah kecil Anda untuk masa depan bumi yang lebih baik bersama BumiLestari.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div 
        ref={formPanelRef}
        className="relative z-10 w-full h-full flex items-center justify-center p-6 md:p-8 md:w-1/2 md:bg-[#F5F3EE] overflow-hidden"
      >
        {/* Watermark (Desktop Only) */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 opacity-[0.03] select-none pointer-events-none hidden md:block text-[#2C2C2C]">
          <h1 className="text-[18rem] font-bold leading-none tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>J<br/>O<br/>I<br/>N</h1>
        </div>

        {/* Logo (Desktop Only) */}
        <div className="absolute top-10 right-12 form-element hidden md:block">
          <img src="/BumiLestari.png" alt="BumiLestari" className="h-6 object-contain opacity-70 grayscale hover:grayscale-0 transition-all duration-500" />
        </div>

        <div className="w-full max-w-lg relative z-20">
          
          <div className="overflow-hidden mb-8 md:mb-10">
            <h2 className="reveal-text text-4xl md:text-5xl font-bold text-white md:text-[#2C2C2C]" style={{ fontFamily: 'var(--font-heading)' }}>
              Sign Up
            </h2>
            <p className="reveal-text text-white/70 md:text-gray-500 mt-2 text-sm md:hidden">
              Bergabung untuk langkah kecil yang bermakna.
            </p>
          </div>

          {error && (
            <div className="form-element mb-6 text-sm text-red-400 md:text-red-600 border-b border-red-400/50 md:border-red-300 pb-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            
            {/* Grid 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="form-element relative group">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="peer w-full bg-transparent border-b border-white/30 md:border-gray-300 py-3 outline-none text-white md:text-[#2C2C2C] focus:border-white md:focus:border-[#2C2C2C] transition-colors disabled:opacity-50"
                  placeholder=" "
                />
                <label className="absolute left-0 top-3 text-white/50 md:text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white md:peer-focus:text-[#2C2C2C] peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white md:peer-not-placeholder-shown:text-[#2C2C2C]">
                  Full Name
                </label>
              </div>

              <div className="form-element relative group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="peer w-full bg-transparent border-b border-white/30 md:border-gray-300 py-3 outline-none text-white md:text-[#2C2C2C] focus:border-white md:focus:border-[#2C2C2C] transition-colors disabled:opacity-50"
                  placeholder=" "
                />
                <label className="absolute left-0 top-3 text-white/50 md:text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white md:peer-focus:text-[#2C2C2C] peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white md:peer-not-placeholder-shown:text-[#2C2C2C]">
                  Email Address
                </label>
              </div>
            </div>

            {/* Row: Phone */}
            <div className="form-element relative group">
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                disabled={loading}
                className="peer w-full bg-transparent border-b border-white/30 md:border-gray-300 py-3 pr-10 outline-none text-white md:text-[#2C2C2C] focus:border-white md:focus:border-[#2C2C2C] transition-colors disabled:opacity-50"
                placeholder=" "
              />
              <label className="absolute left-0 top-3 text-white/50 md:text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white md:peer-focus:text-[#2C2C2C] peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white md:peer-not-placeholder-shown:text-[#2C2C2C]">
                Phone Number
              </label>
            </div>

            {/* Grid 2: Password & Confirm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="form-element relative group">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="peer w-full bg-transparent border-b border-white/30 md:border-gray-300 py-2 pr-10 outline-none text-white md:text-[#2C2C2C] focus:border-white md:focus:border-[#2C2C2C] transition-colors disabled:opacity-50"
                  placeholder=" "
                />
                <label className="absolute left-0 top-2 text-white/50 md:text-gray-400 text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-white md:peer-focus:text-[#2C2C2C] peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white md:peer-not-placeholder-shown:text-[#2C2C2C]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-2 text-white/50 md:text-gray-400 hover:text-white md:hover:text-[#2C2C2C] transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="form-element relative group">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="peer w-full bg-transparent border-b border-white/30 md:border-gray-300 py-2 pr-10 outline-none text-white md:text-[#2C2C2C] focus:border-white md:focus:border-[#2C2C2C] transition-colors disabled:opacity-50"
                  placeholder=" "
                />
                <label className="absolute left-0 top-2 text-white/50 md:text-gray-400 text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-white md:peer-focus:text-[#2C2C2C] peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white md:peer-not-placeholder-shown:text-[#2C2C2C]">
                  Confirm Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-2 text-white/50 md:text-gray-400 hover:text-white md:hover:text-[#2C2C2C] transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="form-element flex items-start pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-1">
                  <input 
                    type="checkbox" 
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="peer appearance-none w-4 h-4 border border-white/50 md:border-gray-400 rounded-sm checked:bg-white md:checked:bg-[#2C2C2C] checked:border-white md:checked:border-[#2C2C2C] transition-colors cursor-pointer"
                  />
                  <svg className="absolute inset-0 w-4 h-4 text-black md:text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-xs text-white/70 md:text-gray-500 leading-tight">
                  I agree to the <Link to="/terms" className="text-white md:text-[#2C2C2C] hover:underline magnetic font-semibold md:font-normal">Terms</Link> and <Link to="/privacy" className="text-white md:text-[#2C2C2C] hover:underline magnetic font-semibold md:font-normal">Privacy Policy</Link>
                </span>
              </label>
            </div>

            <div className="form-element pt-4">
              <button
                type="submit"
                disabled={loading}
                className="magnetic w-full bg-white text-black md:bg-[#2C2C2C] md:text-white py-4 rounded-none font-medium tracking-widest uppercase hover:bg-gray-200 md:hover:bg-black transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Create Account'}
              </button>
            </div>

          </form>

          <div className="form-element mt-10 md:mt-12 flex items-center justify-center gap-2 text-sm text-white/70 md:text-gray-500">
            <span>Sudah memiliki akun?</span>
            <button 
              onClick={() => { gsap.to(containerRef.current, { opacity: 0, duration: 0.5, onComplete: () => { void navigate('/login'); }}); }}
              className="text-white md:text-[#2C2C2C] font-bold hover:underline magnetic"
            >
              Masuk di sini
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;