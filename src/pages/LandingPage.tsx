import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/ui/Hero';
import { Navigation, Footer } from '../components/ui/Navigation';
import { ScrollToTopButton } from '../components/ui/ScrollToTopButton';
import { ProductSection } from '../components/container/ProductSection';
import { AboutSection } from '../components/container/AboutSection';
import { TestimonialSection } from '../components/container/TestimonialSection';
import Newsletter from '../components/container/NewsletterSection';
import { pageVariants, staggerChildrenVariants } from '../animations/variants';

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
      className="min-h-screen"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Navigation */}
      <Navigation isScrolled={isScrolled} />

      {/* Main Content */}
      <motion.main
        variants={staggerChildrenVariants}
        initial="hidden"
        animate="visible"
      >
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
        <Newsletter />
      </motion.main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTopButton 
        isVisible={isScrolled} 
        onClick={scrollToTop} 
      />

      {/* Loading Spinner Overlay - Optional */}
      {/* You can add a loading state here if needed */}
    </motion.div>
  );
};