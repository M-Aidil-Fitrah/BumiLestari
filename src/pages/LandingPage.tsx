import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/ui/Hero';
import { Navigation, Footer } from '../components/ui/Navigation';
import { ScrollToTopButton } from '../components/ui/ScrollToTopButton';
import { ProductSection } from '../components/container/ProductSection';
import { AboutSection } from '../components/container/AboutSection';
import { TestimonialSection } from '../components/container/TestimonialSection';
import Newsletter from '../components/container/NewsletterSection';

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
      <Navigation isScrolled={isScrolled} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero 
          title="BumiLestari"
          subtitle="for your sustainable living"
          ctaText="Explore Products"
        />

        {/* About Section */}
        <AboutSection />

        {/* Featured Products Section */}
        <ProductSection 
          title="Products"
          showAll={false}
          maxProducts={3}
          categoryFilter="all"
        />

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* Newsletter Section */}
        <Newsletter />
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