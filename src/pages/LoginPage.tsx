import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { authService } from '@/lib/auth';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CustomCursor } from '../components/ui/CustomCursor';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const formPanelRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.signIn(formData.email, formData.password);
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => { void navigate('/'); }
      });
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.message?.includes('Invalid login credentials')) {
        setError('Email atau password salah');
      } else if (err.message?.includes('Email not confirmed')) {
        setError('Silakan verifikasi email Anda terlebih dahulu');
      } else {
        setError(err.message || 'Terjadi kesalahan saat login');
      }
      setLoading(false);
    }
  };

  useGSAP(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline();

    const isMobile = window.innerWidth < 768;

    // Reset initial states
    if (!isMobile) {
      gsap.set(imagePanelRef.current, { xPercent: -100 });
      gsap.set(formPanelRef.current, { xPercent: 100 });
    } else {
      gsap.set(formPanelRef.current, { opacity: 0 });
    }
    
    gsap.set('.reveal-text', { yPercent: 100, opacity: 0 });
    gsap.set('.form-element', { opacity: 0, y: 20 });
    gsap.set('.back-btn', { opacity: 0, x: -20 });

    if (!isMobile) {
      // Desktop Curtain Reveal
      tl.to([imagePanelRef.current, formPanelRef.current], {
        xPercent: 0,
        duration: 1.5,
        ease: 'power4.inOut',
        stagger: 0.1
      });
    } else {
      // Mobile Fade Reveal
      tl.to(formPanelRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: 'power3.inOut'
      });
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
      stagger: 0.1
    }, "-=0.6")
    .to('.back-btn', {
      opacity: 1,
      x: 0,
      duration: 0.5
    }, "-=0.5");

    gsap.to(bgImageRef.current, {
      scale: 1.15,
      duration: 30,
      ease: 'none',
      repeat: -1,
      yoyo: true
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="h-[100dvh] w-full bg-[#1A1A1A] overflow-hidden flex flex-col md:flex-row font-sans relative">
      <CustomCursor />
      
      {/* Magnetic Back Button */}
      <button
        onClick={() => {
          gsap.to(containerRef.current, { opacity: 0, duration: 0.5, onComplete: () => { void navigate('/'); }});
        }}
        className="back-btn absolute top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 text-white/80 hover:text-white transition-colors magnetic"
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
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920&auto=format&fit=crop" 
          alt="Nature" 
          className="w-full h-full object-cover opacity-60 md:opacity-80"
        />
        {/* Mobile dark overlay */}
        <div className="absolute inset-0 bg-black/60 md:bg-gradient-to-r md:from-black/60 md:to-transparent flex flex-col justify-end p-8 md:p-16 z-10">
          <div className="hidden md:block">
            <div className="overflow-hidden mb-2">
              <h1 className="reveal-text text-6xl xl:text-7xl font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Welcome.
              </h1>
            </div>
            <div className="overflow-hidden max-w-md">
              <p className="reveal-text text-xl text-white/80 font-light">
                Kembali ke perjalanan gaya hidup yang lebih bermakna dan berkelanjutan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div 
        ref={formPanelRef}
        className="relative z-10 w-full h-full flex items-center justify-center p-8 md:w-1/2 md:bg-[#F5F3EE] overflow-hidden"
      >
        {/* Watermark (Desktop Only) */}
        <div className="absolute -top-20 -right-10 opacity-[0.03] select-none pointer-events-none hidden md:block text-[#2C2C2C]">
          <h1 className="text-[20rem] font-bold leading-none tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>01</h1>
        </div>

        {/* Logo (Desktop Only) */}
        <div className="absolute top-10 left-12 form-element hidden md:block">
          <img src="/BumiLestari.png" alt="BumiLestari" className="h-6 object-contain opacity-70 grayscale hover:grayscale-0 transition-all duration-500" />
        </div>

        <div className="w-full max-w-sm relative z-20">
          <div className="overflow-hidden mb-2 md:mb-10">
            <h2 className="reveal-text text-4xl md:text-5xl font-bold text-white md:text-[#2C2C2C]" style={{ fontFamily: 'var(--font-heading)' }}>
              Sign In
            </h2>
            <p className="reveal-text text-white/70 md:text-gray-500 mt-2 text-sm md:hidden">
              Melanjutkan gaya hidup berkelanjutan.
            </p>
          </div>

          {error && (
            <div className="form-element mb-6 text-sm text-red-400 md:text-red-600 border-b border-red-400/50 md:border-red-300 pb-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10 mt-10 md:mt-0">
            {/* Minimalist Input Field */}
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
              <label 
                htmlFor="email" 
                className="absolute left-0 top-3 text-white/50 md:text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white md:peer-focus:text-[#2C2C2C] peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white md:peer-not-placeholder-shown:text-[#2C2C2C]"
              >
                Email Address
              </label>
            </div>

            {/* Password Field */}
            <div className="form-element relative group">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
                className="peer w-full bg-transparent border-b border-white/30 md:border-gray-300 py-3 pr-10 outline-none text-white md:text-[#2C2C2C] focus:border-white md:focus:border-[#2C2C2C] transition-colors disabled:opacity-50"
                placeholder=" "
              />
              <label 
                htmlFor="password" 
                className="absolute left-0 top-3 text-white/50 md:text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white md:peer-focus:text-[#2C2C2C] peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white md:peer-not-placeholder-shown:text-[#2C2C2C]"
              >
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

            <div className="form-element flex justify-between items-center pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="accent-white md:accent-[#2C2C2C] w-4 h-4" />
                <span className="text-xs text-white/60 md:text-gray-500 uppercase tracking-widest group-hover:text-white md:group-hover:text-[#2C2C2C] transition-colors">Remember Me</span>
              </label>
              <Link to="/forgot-password" className="text-xs text-white/60 md:text-gray-500 hover:text-white md:hover:text-[#2C2C2C] uppercase tracking-widest transition-colors magnetic">
                Forgot?
              </Link>
            </div>

            <div className="form-element pt-4">
              <button
                type="submit"
                disabled={loading}
                className="magnetic w-full bg-white text-black md:bg-[#2C2C2C] md:text-white py-4 rounded-none font-medium tracking-widest uppercase hover:bg-gray-200 md:hover:bg-black transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="form-element mt-12 md:mt-16 flex items-center justify-center gap-2 text-sm text-white/60 md:text-gray-500">
            <span>Baru di BumiLestari?</span>
            <button 
              onClick={() => {
                gsap.to(containerRef.current, { opacity: 0, duration: 0.5, onComplete: () => { void navigate('/register'); }});
              }}
              className="text-white md:text-[#2C2C2C] font-bold hover:underline magnetic"
            >
              Buat Akun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;