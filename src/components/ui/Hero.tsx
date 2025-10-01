import { motion } from 'framer-motion';
import { useScrollToSection } from '../../hooks/useScrollAnimation';
import { 
  heroTextVariants, 
  buttonVariants, 
  floatingVariants, 
  rotateVariants,
  staggerChildrenVariants,
  itemVariants 
} from '../../animations/variants';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const Hero = ({
  title = "BumiLestari",
  subtitle = "Marketplace Produk Ramah Lingkungan",
  ctaText = "Jelajahi Produk",
  onCtaClick
}: HeroProps) => {
  const { scrollToSection } = useScrollToSection();

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      scrollToSection('products');
    }
  };

  return (
    <motion.section 
      className="relative pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={staggerChildrenVariants}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
        ></motion.div>
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        ></motion.div>
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-100 rounded-full opacity-10"
          variants={rotateVariants}
          animate="animate"
        ></motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo/Icon */}
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <motion.div 
            className="w-20 h-20 mx-auto bg-green-600 rounded-full flex items-center justify-center text-white text-3xl"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            🌱
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-gray-800 mb-6"
          variants={heroTextVariants}
        >
          <motion.span 
            className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {title}
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>

        {/* Description */}
        <motion.p 
          className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Temukan produk ramah lingkungan terbaik untuk gaya hidup berkelanjutan. 
          Dari tote bag canvas organik hingga sabun natural, wujudkan komitmen Anda untuk bumi.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <motion.button
            onClick={handleCtaClick}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full text-lg"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            {ctaText} 🛍️
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('about')}
            className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-4 px-8 rounded-full text-lg"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            Pelajari Lebih Lanjut
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerChildrenVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center" variants={itemVariants}>
            <motion.div 
              className="text-3xl md:text-4xl font-bold text-green-600 mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              1000+
            </motion.div>
            <div className="text-gray-600">Produk Ramah Lingkungan</div>
          </motion.div>
          <motion.div className="text-center" variants={itemVariants}>
            <motion.div 
              className="text-3xl md:text-4xl font-bold text-blue-600 mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              50K+
            </motion.div>
            <div className="text-gray-600">Pelanggan Puas</div>
          </motion.div>
          <motion.div className="text-center" variants={itemVariants}>
            <motion.div 
              className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              99%
            </motion.div>
            <div className="text-gray-600">Produk Berkelanjutan</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </motion.svg>
      </motion.div>
    </motion.section>
  );
};