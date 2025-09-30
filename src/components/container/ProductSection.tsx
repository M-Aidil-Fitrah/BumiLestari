import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../ui/ProductCard';
import { withScrollAnimation } from '../../hoc/withScrollAnimation';
import { withAnalytics } from '../../hoc/withAnalytics';

interface ProductSectionProps {
  title?: string;
  showAll?: boolean;
  maxProducts?: number;
  categoryFilter?: 'all' | 'totebag' | 'bottle' | 'soap' | 'other';
}

const ProductSectionBase = ({
  title = "Produk Pilihan",
  showAll = false,
  maxProducts = 8,
  categoryFilter = 'all'
}: ProductSectionProps) => {
  const { products, loading, error, getProductsByCategory, getFeaturedProducts } = useProducts();
  const [activeCategory, setActiveCategory] = useState<string>(categoryFilter);

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
    // Implement cart logic here
  };

  const handleViewDetails = (productId: string) => {
    console.log('View details:', productId);
    // Implement product detail navigation here
  };

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (!showAll) {
      filteredProducts = getFeaturedProducts();
    }

    if (activeCategory !== 'all') {
      filteredProducts = getProductsByCategory(activeCategory as any);
    }

    return filteredProducts.slice(0, maxProducts);
  };

  const categories = [
    { id: 'all', label: 'Semua Produk', icon: '🌍' },
    { id: 'totebag', label: 'Tote Bag', icon: '👜' },
    { id: 'bottle', label: 'Botol Minum', icon: '🍶' },
    { id: 'soap', label: 'Sabun Organik', icon: '🧼' },
    { id: 'other', label: 'Lainnya', icon: '♻️' }
  ];

  if (error) {
    return (
      <section id="products" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-red-500 text-lg">
            Gagal memuat produk: {error}
          </div>
        </div>
      </section>
    );
  }

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
          {categories.map((category) => (
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

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getFilteredProducts().map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && getFilteredProducts().length === 0 && (
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
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
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