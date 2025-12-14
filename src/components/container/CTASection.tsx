import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Leaf, Package, Truck, Shield, ArrowRight } from 'lucide-react';

export const CTASection: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Leaf,
      title: '100% Alami',
      description: 'Dari bahan berkelanjutan'
    },
    {
      icon: Package,
      title: 'Kemasan Eco',
      description: 'Zero waste packaging'
    },
    {
      icon: Truck,
      title: 'Pengiriman Cepat',
      description: 'Gratis ongkir minimal 50rb'
    },
    {
      icon: Shield,
      title: 'Kualitas Terjamin',
      description: 'Produk berkualitas premium'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#2C2C2C] via-[#1a1a1a] to-[#2C2C2C] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B7355] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Mulai Gaya Hidup Berkelanjutan
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Bergabunglah dengan ribuan pelanggan yang telah memilih produk ramah lingkungan untuk masa depan yang lebih baik
          </motion.p>
          
          <motion.button
            onClick={() => navigate('/marketplace')}
            className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
            style={{ fontFamily: 'var(--font-body)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Mulai Belanja Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#8B7355]/50 transition-all hover:bg-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Icon className="w-10 h-10 text-[#8B7355] mb-4" />
                <h4 
                  className="text-white font-bold text-lg mb-2" 
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {feature.title}
                </h4>
                <p 
                  className="text-gray-400 text-sm" 
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B7355] to-transparent"></div>
    </section>
  );
};

export default CTASection;
