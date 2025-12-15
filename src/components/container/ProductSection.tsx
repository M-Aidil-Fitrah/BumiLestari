import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/lib/supabase';
import { ArrowRight, Star, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProductSectionProps {
  title?: string;
  showAll?: boolean;
  maxProducts?: number;
  categoryFilter?: string;
}

export const ProductSection = ({
  title = "Produk",
  maxProducts = 3,
}: ProductSectionProps) => {
  const navigate = useNavigate();
  const [featuredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // TODO: Fetch products from your API/database
    // const products = await fetchProducts();
    // setFeaturedProducts(products.slice(0, maxProducts));
  }, [maxProducts]);

  const handleProductClick = (product: Product) => {
    navigate(`/marketplace/product/${product.id}`);
  };

  return (
    <section className="py-20 bg-[#1a1a1a] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.button
            onClick={() => navigate('/marketplace')}
            className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all"
            style={{ fontFamily: 'var(--font-body)' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              {/* Product Card */}
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Badge */}
                {index === 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-xs font-bold">
                    TERLARIS
                  </div>
                )}
                
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 
                        className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#8B7355] transition-colors"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {product.name}
                      </h3>
                      <p 
                        className="text-sm text-gray-500"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {product.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-2xl font-bold text-gray-900"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <button className="flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-full group-hover:bg-[#8B7355] transition-all group-hover:scale-110">
                      <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
