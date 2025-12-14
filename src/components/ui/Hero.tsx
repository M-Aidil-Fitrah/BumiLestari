import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const Hero = ({
  title = "BumiLestari",
  subtitle = "for your sustainable living",
  ctaText = "Explore Products",
  onCtaClick
}: HeroProps) => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      navigate('/marketplace');
    }
  };

  const featuredProducts = [
    {
      id: 1,
      name: 'Eco Bamboo Set',
      image: 'https://images.unsplash.com/photo-1556911261-6bd341186b2f?w=500',
      tag: 'Best Seller'
    },
    {
      id: 2,
      name: 'Natural Reed Diffuser',
      image: 'https://images.unsplash.com/photo-1602874801006-95d526319489?w=500',
      tag: 'New Arrival'
    },
    {
      id: 3,
      name: 'Organic Candles',
      image: 'https://images.unsplash.com/photo-1602874801234-01ad4c5c97e9?w=500',
      tag: 'Trending'
    }
  ];

  return (
    <motion.section 
      className="relative pt-24 pb-16 min-h-screen bg-[#F5F3EE] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F3EE]/80 to-[#F5F3EE]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left"
          >
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#2C2C2C] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {title}
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl text-[#8B7355] mb-8 italic"
              style={{ fontFamily: 'var(--font-heading)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
            <motion.p 
              className="text-base md:text-lg text-gray-600 mb-8 max-w-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Temukan koleksi produk ramah lingkungan yang dirancang untuk menciptakan gaya hidup berkelanjutan. 
              Dari peralatan rumah tangga hingga produk perawatan, semua dibuat dengan cinta untuk bumi.
            </motion.p>
            <motion.button
              onClick={handleCtaClick}
              className="group flex items-center gap-3 bg-[#2C2C2C] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-xl"
              style={{ fontFamily: 'var(--font-body)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span>{ctaText}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Right - Featured Products Cards */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className={`relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
                  index === 0 ? 'col-span-2 h-80' : 'h-64'
                }`}
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium mb-2">
                    {product.tag}
                  </span>
                  <h3 className="text-white text-xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                    {product.name}
                  </h3>
                  <button className="mt-2 text-white flex items-center gap-1 text-sm group/btn">
                    <span>View More</span>
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};