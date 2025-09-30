import { useState, useEffect } from 'react';
import { Hero } from '../components/ui/Hero';
import { Navigation, Footer } from '../components/ui/Navigation';
import { ProductSection } from '../components/container/ProductSection';
import { AboutSection } from '../components/container/AboutSection';
import { TestimonialSection } from '../components/container/TestimonialSection';

export const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effects for navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation isScrolled={isScrolled} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero 
          title="BumiLestari"
          subtitle="Marketplace Produk Ramah Lingkungan untuk Masa Depan Berkelanjutan"
          ctaText="Jelajahi Produk Eco-Friendly"
        />

        {/* About Section */}
        <AboutSection />

        {/* Featured Products Section */}
        <ProductSection 
          title="Produk Pilihan Terbaik"
          showAll={false}
          maxProducts={8}
          categoryFilter="all"
        />

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* Newsletter Section */}
        <section id="contact" className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-white">
              <div className="text-5xl mb-6">📧</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Dapatkan Update Terbaru
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Berlangganan newsletter kami untuk mendapatkan info produk terbaru, 
                tips hidup berkelanjutan, dan penawaran eksklusif
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Masukkan email Anda"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="bg-white text-green-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    Berlangganan
                  </button>
                </div>
                <p className="text-sm opacity-75 mt-3">
                  *Kami tidak akan mengirim spam. Unsubscribe kapan saja.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all duration-300 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* Loading Spinner Overlay - Optional */}
      {/* You can add a loading state here if needed */}
    </div>
  );
};