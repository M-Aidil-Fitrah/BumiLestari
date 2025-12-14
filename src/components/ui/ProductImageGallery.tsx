import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductImageGalleryProps {
  image: string;
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ image, productName }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock multiple images - in real app, this would come from product data
  const images = [image, image, image, image];

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
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-3xl overflow-hidden aspect-square shadow-lg border border-gray-100"
      >
        <img
          src={imageError ? 'https://via.placeholder.com/600x600?text=No+Image' : images[selectedImage]}
          alt={productName}
          className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 hover:scale-105"
          onClick={toggleZoom}
          onError={handleImageError}
        />
        
        {/* Zoom Button */}
        <button
          onClick={toggleZoom}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-[#2C2C2C] p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          title="Zoom gambar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-[#2C2C2C]/80 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
          {selectedImage + 1} / {images.length}
        </div>
      </motion.div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
              selectedImage === index
                ? 'ring-2 ring-[#8B7355] shadow-lg scale-105'
                : 'ring-1 ring-gray-200 hover:ring-[#8B7355]/50 hover:scale-105'
            }`}
          >
            <img
              src={imageError ? 'https://via.placeholder.com/150x150?text=No+Image' : img}
              alt={`${productName} view ${index + 1}`}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            {selectedImage === index && (
              <div className="absolute inset-0 bg-[#8B7355]/20"></div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeZoom}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imageError ? 'https://via.placeholder.com/1200x1200?text=No+Image' : images[selectedImage]}
                alt={productName}
                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              />
              
              {/* Close Button */}
              <button
                onClick={closeZoom}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:rotate-90"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full">
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductImageGallery;