import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollToSection } from '../../hooks/useScrollAnimation';

interface NavigationProps {
  isScrolled?: boolean;
}

export const Navigation = ({ isScrolled = false }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', href: '/', type: 'route' },
    { label: 'Marketplace', href: '/marketplace', type: 'route' }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    navigate(item.href);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 shadow-md backdrop-blur-md' 
        : 'bg-[#F5F3EE]/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-[#2C2C2C] rounded-full flex items-center justify-center text-white text-lg group-hover:scale-110 transition-transform">
              🌱
            </div>
            <span 
              className="font-bold text-2xl text-gray-900"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              BumiLestari
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item)}
                className={`font-medium transition-all duration-200 text-gray-700 hover:text-[#8B7355] relative group ${
                  item.type === 'route' && location.pathname === item.href ? 'text-[#8B7355]' : ''
                }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#8B7355] transition-all duration-300 group-hover:w-full ${
                  item.type === 'route' && location.pathname === item.href ? 'w-full' : ''
                }`}></span>
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 rounded-full font-medium transition-all duration-200 text-gray-700 hover:text-[#8B7355]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="px-6 py-2.5 rounded-full font-medium transition-all duration-200 bg-[#2C2C2C] text-white hover:bg-[#1a1a1a] hover:shadow-lg transform hover:scale-105"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => {
  const { scrollToSection } = useScrollToSection();

  const quickLinks = [
    { label: 'Tentang Kami', href: 'about' },
    { label: 'Produk', href: 'products' },
    { label: 'Testimoni', href: 'testimonials' },
    { label: 'Kontak', href: 'contact' }
  ];

  const categories = [
    'Tote Bag',
    'Botol Minum',
    'Sabun Organik',
    'Peralatan Bambu',
    'Kemasan Ramah Lingkungan'
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#8B7355] rounded-full flex items-center justify-center text-white text-xl">
                🌱
              </div>
              <span 
                className="font-bold text-2xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                BumiLestari
              </span>
            </div>
            <p 
              className="text-gray-400 mb-8 max-w-md leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Your trusted marketplace for eco-friendly products. 
              Join the movement for a more sustainable future.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#8B7355] transition-all hover:scale-110">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#8B7355] transition-all hover:scale-110">
                <span className="text-xl">📷</span>
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#8B7355] transition-all hover:scale-110">
                <span className="text-xl">🐦</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="font-semibold text-lg mb-6 text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-[#8B7355] transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 
              className="font-semibold text-lg mb-6 text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-[#8B7355] transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p 
            className="text-gray-500 text-sm"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            © 2025 BumiLestari. All rights reserved.
          </p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a 
              href="#" 
              className="text-gray-500 hover:text-[#8B7355] text-sm transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-[#8B7355] text-sm transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-[#8B7355] text-sm transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};