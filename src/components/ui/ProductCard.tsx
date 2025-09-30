import { motion } from 'framer-motion';
import type { Product } from '../../hooks/useProducts';
import { cardHoverVariants, buttonVariants } from '../../animations/variants';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onViewDetails?: (productId: string) => void;
}

export const ProductCard = ({ product, onAddToCart, onViewDetails }: ProductCardProps) => {
  const handleAddToCart = () => {
    onAddToCart?.(product.id);
  };

  const handleViewDetails = () => {
    onViewDetails?.(product.id);
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      layout
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Stok Habis</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Eco Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.ecoFeatures.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
          {product.ecoFeatures.length > 2 && (
            <span className="text-green-600 text-xs px-2 py-1">
              +{product.ecoFeatures.length - 2} lagi
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews} ulasan)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            Rp {product.price.toLocaleString('id-ID')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              Rp {product.originalPrice.toLocaleString('id-ID')}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <motion.button
            onClick={handleViewDetails}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            Detail
          </motion.button>
          <motion.button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 font-medium py-2 px-4 rounded-lg ${
              product.inStock
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            variants={product.inStock ? buttonVariants : {}}
            initial="rest"
            whileHover={product.inStock ? "hover" : undefined}
            whileTap={product.inStock ? "tap" : undefined}
          >
            {product.inStock ? 'Tambah ke Keranjang' : 'Stok Habis'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};