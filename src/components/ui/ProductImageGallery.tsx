import React, { useState } from 'react';

interface ProductImageGalleryProps {
  image: string;
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ image, productName }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const closeZoom = () => {
    setIsZoomed(false);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
        <img
          src={imageError ? 'https://via.placeholder.com/600x600?text=No+Image' : image}
          alt={productName}
          className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-105"
          onClick={toggleZoom}
          onError={handleImageError}
        />
        <button
          onClick={toggleZoom}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-colors duration-200"
          title="Zoom gambar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Thumbnail Gallery (for future multiple images) */}
      <div className="flex space-x-2">
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border-2 border-green-500">
          <img
            src={imageError ? 'https://via.placeholder.com/64x64?text=No+Image' : image}
            alt={`${productName} thumbnail`}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
        {/* Placeholder for additional images */}
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center opacity-50">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeZoom}>
          <div className="relative max-w-4xl max-h-full">
            <img
              src={imageError ? 'https://via.placeholder.com/800x800?text=No+Image' : image}
              alt={productName}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeZoom}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;