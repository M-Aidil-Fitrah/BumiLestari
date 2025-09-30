import React, { useState } from 'react';
import type { Product } from '../../data/products';

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
        <span key={i} className="text-yellow-400 text-lg">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-lg">☆</span>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-lg">☆</span>
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
          {product.category}
        </div>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {renderStars(product.rating)}
          <span className="ml-2 text-lg font-semibold text-gray-700">{product.rating}</span>
        </div>
        <div className="text-gray-500">|</div>
        <div className="text-gray-600">
          <span className="font-medium">{product.reviews}</span> ulasan
        </div>
        <div className="text-gray-500">|</div>
        <div className="text-gray-600">
          <span className="font-medium">{product.stock}</span> stok tersedia
        </div>
      </div>

      {/* Price */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-3xl font-bold text-green-600 mb-2">
          {formatPrice(product.price)}
        </div>
        <div className="text-sm text-gray-600">
          Harga sudah termasuk PPN
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi Produk</h3>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Seller Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Informasi Penjual</h3>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
            {product.seller.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{product.seller}</div>
            <div className="text-sm text-gray-600">Penjual Terpercaya</div>
          </div>
        </div>
      </div>

      {/* Quantity and Actions */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg sticky bottom-4 shadow-lg">
        <div className="space-y-4">
          {/* Quantity Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jumlah
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
              <span className="text-sm text-gray-500 ml-4">
                Maksimal {product.stock} item
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 border border-green-300"
            >
              + Keranjang
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Beli Sekarang
            </button>
          </div>

          {/* Stock Warning */}
          {product.stock < 10 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-sm text-red-700 font-medium">
                  Stok terbatas! Hanya tersisa {product.stock} item
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;