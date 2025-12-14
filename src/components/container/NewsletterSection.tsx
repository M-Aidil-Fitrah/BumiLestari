import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface NewsletterProps {
  onSubscribe?: (email: string) => void;
}

const Newsletter: React.FC<NewsletterProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubscribe) onSubscribe(email);
    alert(`Thank you! ${email} has been subscribed (Demo)`);
    setEmail('');
  };

  return (
    <section className="py-20 bg-[#2C2C2C] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B7355] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Level up Your Candle Game
            </h2>
            <p 
              className="text-gray-400 text-lg mb-8"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Enter your email and receive a coupon for 10% off your first order
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent transition-all"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
                <motion.button
                  type="submit"
                  className="bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Subscribe</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </div>
              <p className="text-sm text-gray-500">
                *We won't send spam. Unsubscribe at any time.
              </p>
            </form>
          </motion.div>

          {/* Right - Stats/Features */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#8B7355]/50 transition-all">
              <div className="text-3xl mb-2">🌱</div>
              <h4 className="text-white font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                100% Natural
              </h4>
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                Made from sustainable materials
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#8B7355]/50 transition-all">
              <div className="text-3xl mb-2">♻️</div>
              <h4 className="text-white font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                Eco-Friendly
              </h4>
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                Zero waste packaging
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#8B7355]/50 transition-all">
              <div className="text-3xl mb-2">🚚</div>
              <h4 className="text-white font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                Free Shipping
              </h4>
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                On orders over $50
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#8B7355]/50 transition-all">
              <div className="text-3xl mb-2">⭐</div>
              <h4 className="text-white font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                Premium Quality
              </h4>
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                Handcrafted with care
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B7355] to-transparent"></div>
    </section>
  );
};

export default Newsletter;
