import React from 'react';
import type { Product } from '@/lib/supabase';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

const ProductCardMarketplace: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div 
      className="group cursor-pointer flex flex-col gap-3"
      onClick={() => onClick?.(product)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Image Container - High Fashion 4:5 Aspect Ratio */}
      <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 w-full rounded-sm">
        <img
          src={product.image || ''}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x500?text=No+Image';
          }}
        />
        
        {/* Subtle Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>

        {/* Minimalist Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.stock < 10 && (
            <span className="bg-[#2C2C2C] text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-sm">
              Few Left
            </span>
          )}
          {product.rating >= 4.8 && (
            <span className="bg-[#8B7355] text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-sm">
              Top Rated
            </span>
          )}
        </div>
      </div>
      
      {/* Content - Hyper Minimalist */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-medium text-[#2C2C2C] text-sm leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
            {product.name}
          </h3>
          <span className="text-sm font-bold text-[#2C2C2C] whitespace-nowrap" style={{ fontFamily: 'var(--font-body)' }}>
            {formatPrice(product.price)}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span className="uppercase tracking-widest text-[10px]">{product.category || 'Lifestyle'}</span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardMarketplace;