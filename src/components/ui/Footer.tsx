import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const quickLinks = [
    { label: 'Tentang Kami', href: '#about' },
    { label: 'Produk', href: '#products' },
    { label: 'Testimoni', href: '#testimonials' },
    { label: 'Kontak', href: '#contact' }
  ];

  const categories = [
    'Tas Ramah Lingkungan',
    'Botol Minum',
    'Sabun Organik',
    'Produk Bambu',
    'Kemasan Zero Waste'
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/BumiLestari.png" 
                alt="BumiLestari Logo" 
                className="h-18 w-auto object-contain"
              />
            </div>
            <p 
              className="text-gray-400 mb-8 max-w-md leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Marketplace terpercaya untuk produk ramah lingkungan. 
              Bergabunglah dengan gerakan untuk masa depan yang lebih berkelanjutan.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400 hover:text-[#8B7355] transition-colors">
                <Mail className="w-5 h-5" />
                <span className="text-sm">info@bumilestari.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-[#8B7355] transition-colors">
                <Phone className="w-5 h-5" />
                <span className="text-sm">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-[#8B7355] transition-colors">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">Jakarta, Indonesia</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#8B7355] transition-all hover:scale-110 group">
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#8B7355] transition-all hover:scale-110 group">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#8B7355] transition-all hover:scale-110 group">
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="font-semibold text-lg mb-6 text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Tautan Cepat
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#8B7355] transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {link.label}
                  </a>
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
              Kategori
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
            © 2025 BumiLestari. Hak cipta dilindungi.
          </p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a 
              href="#" 
              className="text-gray-500 hover:text-[#8B7355] text-sm transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Kebijakan Privasi
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-[#8B7355] text-sm transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Syarat & Ketentuan
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-[#8B7355] text-sm transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
