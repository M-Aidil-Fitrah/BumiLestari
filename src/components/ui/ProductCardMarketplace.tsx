import React from 'react';
import type { Product } from '@/lib/supabase';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400 text-sm">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-sm">☆</span>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-sm">☆</span>
      );
    }

    return stars;
  };

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-gray-200"
      onClick={() => onClick?.(product)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x400?text=No+Image';
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.stock < 10 && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Sale
            </span>
          )}
          {product.rating >= 4.8 && (
            <span className="bg-[#8B7355] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Terbaik
            </span>
          )}
        </div>
        
        {/* Quick View Button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <button className="opacity-0 group-hover:opacity-100 bg-white text-[#2C2C2C] px-6 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            Lihat Detail
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Category Badge */}
        <span className="inline-block text-xs text-[#8B7355] font-medium mb-2">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="font-bold text-[#2C2C2C] text-base mb-2 line-clamp-2 min-h-[48px]" style={{ fontFamily: 'var(--font-heading)' }}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
            <span className="text-xs text-gray-500">
              ({product.reviews?.length || 0})
          </span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-[#2C2C2C]" style={{ fontFamily: 'var(--font-heading)' }}>
              {formatPrice(product.price)}
            </span>
          </div>
          
          {/* Add to Cart Icon */}
          <button 
            className="w-10 h-10 bg-[#2C2C2C] hover:bg-[#8B7355] text-white rounded-full flex items-center justify-center transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart functionality
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;