import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/ui/Hero';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import { ScrollToTopButton } from '../components/ui/ScrollToTopButton';
import { ProductSection } from '../components/container/ProductSection';
import { AboutSection } from '../components/container/AboutSection';
import { TestimonialSection } from '../components/container/TestimonialSection';
import CTASection from '../components/container/CTASection';

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
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation */}
      <Navbar isScrolled={isScrolled} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero 
          title="BumiLestari"
          subtitle="untuk kehidupan berkelanjutan Anda"
          ctaText="Jelajahi Produk"
        />

        {/* About Section */}
        <AboutSection />

        {/* Featured Products Section */}
        <ProductSection 
          title="Produk Pilihan"
          showAll={false}
          maxProducts={3}
          categoryFilter="all"
        />

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTopButton 
        isVisible={isScrolled} 
        onClick={scrollToTop} 
      />
    </motion.div>
  );
};