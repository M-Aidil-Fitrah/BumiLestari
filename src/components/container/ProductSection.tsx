import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyProducts } from '../../data/products';
import type { Product } from '../../data/products';
import ProductCardMarketplace from '../ui/ProductCardMarketplace';
import { withScrollAnimation } from '../../hoc/withScrollAnimation';
import { withAnalytics } from '../../hoc/withAnalytics';

interface ProductSectionProps {
  title?: string;
  showAll?: boolean;
  maxProducts?: number;
  categoryFilter?: string;
}

const ProductSectionBase = ({
  title = "Produk Pilihan",
  showAll = false,
  maxProducts = 8,
}: ProductSectionProps) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('Semua Kategori');

  const handleProductClick = (product: Product) => {
    navigate(`/marketplace/product/${product.id}`);
  };

  const getFilteredProducts = () => {
    let filteredProducts = dummyProducts;

    if (activeCategory !== 'Semua Kategori') {
      filteredProducts = dummyProducts.filter(product => product.category === activeCategory);
    }

    return filteredProducts.slice(0, maxProducts);
  };

  // Create category buttons from marketplace categories
  const categoryButtons = [
    { id: 'Semua Kategori', label: 'Semua Produk', icon: '🌍' },
    { id: 'Tas Ramah Lingkungan', label: 'Tas Eco-Friendly', icon: '👜' },
    { id: 'Botol Ramah Lingkungan', label: 'Botol Minum', icon: '🍶' },
    { id: 'Pembersih Organik', label: 'Pembersih Organik', icon: '🧼' },
    { id: 'Personal Care Ramah Lingkungan', label: 'Personal Care', icon: '🧴' },
    { id: 'Peralatan Makan Ramah Lingkungan', label: 'Peralatan Makan', icon: '🍽️' }
  ];

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilihan terbaik produk ramah lingkungan untuk gaya hidup berkelanjutan
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categoryButtons.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600'
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getFilteredProducts().map((product) => (
            <ProductCardMarketplace
              key={product.id}
              product={product}
              onClick={handleProductClick}
            />
          ))}
        </div>

        {/* Empty State */}
        {getFilteredProducts().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Tidak ada produk ditemukan
            </h3>
            <p className="text-gray-500">
              Coba ubah filter kategori atau periksa kembali nanti
            </p>
          </div>
        )}

        {/* View All Button */}
        {!showAll && getFilteredProducts().length >= maxProducts && (
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/marketplace')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Lihat Semua Produk
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Apply HOCs
export const ProductSection = withAnalytics(
  withScrollAnimation(ProductSectionBase),
  'product_section_view'
);