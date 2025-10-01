import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollToSection } from '../../hooks/useScrollAnimation';

interface NavigationProps {
  isScrolled?: boolean;
}

export const Navigation = ({ isScrolled = false }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Marketplace', href: '/marketplace', type: 'route' }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    navigate(item.href);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg backdrop-blur-sm' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-lg">
              🌱
            </div>
            <span className={`font-bold text-xl ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              BumiLestari
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item)}
                className={`font-medium transition-colors duration-200 hover:text-green-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white hover:text-green-300'
                } ${
                  item.type === 'route' && location.pathname === item.href ? 'text-green-600' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => navigate('/login')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isScrolled
                  ? 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  : 'text-white hover:text-green-300 hover:bg-white/10'
              }`}
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isScrolled
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-white text-green-600 hover:bg-green-50'
              }`}
            >
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className={`p-2 rounded-md ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-lg">
                🌱
              </div>
              <span className="font-bold text-xl">BumiLestari</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Marketplace terpercaya untuk produk ramah lingkungan. 
              Bergabunglah dengan gerakan untuk bumi yang lebih lestari.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                📘
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                📷
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                🐦
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kategori</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 BumiLestari. Semua hak dilindungi.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};