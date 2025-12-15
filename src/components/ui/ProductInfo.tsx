import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Truck, RotateCcw, CheckCircle } from 'lucide-react';
import type { Product } from '@/lib/supabase';

interface ProductInfoProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
  onBuyNow?: (product: Product, quantity: number) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);

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
        <span key={i} className="text-yellow-400 text-xl">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-xl">☆</span>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-xl">☆</span>
      );
    }

    return stars;
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart?.(product, quantity);
  };

  const handleBuyNow = () => {
    onBuyNow?.(product, quantity);
  };

  return (
    <div className="space-y-6">
      {/* Product Name */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-block bg-[#8B7355]/10 text-[#8B7355] text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
          {product.category}
        </div>
        <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          {product.name}
        </h1>
      </motion.div>

      {/* Rating and Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center flex-wrap gap-4 pb-6 border-b border-gray-200"
      >
        <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
          <div className="flex items-center mr-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-lg font-bold text-[#2C2C2C]">{product.rating}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <svg className="w-5 h-5 mr-1.5 text-[#8B7355]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
<span className="font-medium">{product.reviews_count || 0} ulasan</span>
        </div>
        <div className="flex items-center text-gray-600">
          <svg className="w-5 h-5 mr-1.5 text-[#8B7355]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">{product.stock} stok</span>
        </div>
      </motion.div>

      {/* Price */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[#8B7355]/10 to-[#8B7355]/5 p-6 rounded-2xl border border-[#8B7355]/20"
      >
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-4xl font-bold text-[#8B7355]">
            {formatPrice(product.price)}
          </span>
          {product.price < 100000 && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.price * 1.3)}
            </span>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 mr-1.5 text-[#8B7355]" />
          Harga sudah termasuk PPN
        </div>
      </motion.div>

      {/* Seller Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8B7355] to-[#6d5942] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              {product.seller.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-[#2C2C2C] text-lg">{product.seller}</div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-1 text-[#8B7355]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Seller Terpercaya
              </div>
            </div>
          </div>
          <button className="text-[#8B7355] hover:text-[#6d5942] font-semibold text-sm transition-colors">
            Kunjungi
          </button>
        </div>
      </motion.div>

      {/* Quantity and Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-5 pt-4"
      >
        {/* Quantity Selector */}
        <div>
          <label className="block text-sm font-bold text-[#2C2C2C] mb-3">
            Jumlah
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white border-2 border-gray-200 rounded-full overflow-hidden shadow-sm">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-12 h-12 flex items-center justify-center text-[#8B7355] hover:bg-[#8B7355]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xl font-bold"
              >
                −
              </button>
              <span className="text-xl font-bold text-[#2C2C2C] w-16 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
                className="w-12 h-12 flex items-center justify-center text-[#8B7355] hover:bg-[#8B7355]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xl font-bold"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-500">
              Maksimal <span className="font-semibold text-[#2C2C2C]">{product.stock}</span> item
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-white hover:bg-gray-50 text-[#8B7355] font-bold py-4 px-6 rounded-full transition-all duration-300 border-2 border-[#8B7355] hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>+ Keranjang</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-gradient-to-r from-[#8B7355] to-[#6d5942] hover:from-[#6d5942] hover:to-[#8B7355] text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Beli Sekarang
          </button>
        </div>

        {/* Stock Warning */}
        {product.stock < 10 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-xl p-4"
          >
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="text-sm font-bold text-red-700 block">Stok Terbatas!</span>
                <span className="text-sm text-red-600">
                  Hanya tersisa {product.stock} item tersedia
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 pt-4">
          {[
            { icon: Leaf, text: 'Eco-Friendly' },
            { icon: Truck, text: 'Gratis Ongkir' },
            { icon: RotateCcw, text: 'Bisa Retur' }
          ].map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-3 text-center hover:border-[#8B7355]/30 hover:shadow-md transition-all">
                <IconComponent className="w-6 h-6 mx-auto mb-1 text-[#8B7355]" />
                <div className="text-xs font-medium text-gray-600">{feature.text}</div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductInfo;