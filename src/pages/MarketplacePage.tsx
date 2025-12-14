import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyProducts } from '../data/products';
import type { Product } from '../data/products';
import SearchBar from '../components/ui/SearchBar';
import Filter, { type FilterOptions } from '../components/ui/Filter';
import ProductCardMarketplace from '../components/ui/ProductCardMarketplace';
import Pagination from '../components/ui/Pagination';
import Navbar from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';

const MarketplacePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'Semua Kategori',
    minPrice: 0,
    maxPrice: 1000000,
    minRating: 0,
    sortBy: 'name'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = dummyProducts.filter((product) => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory = filters.category === 'Semua Kategori' || product.category === filters.category;

      // Price filter
      const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;

      // Rating filter
      const matchesRating = product.rating >= filters.minRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id.localeCompare(a.id); // Assuming higher ID means newer
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handleProductClick = (product: Product) => {
    navigate(`/marketplace/product/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filter */}
          <div className="lg:w-1/4">
            <Filter onFilterChange={setFilters} className="sticky top-4" />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar
                onSearch={setSearchTerm}
                placeholder="Cari produk, kategori, atau kata kunci..."
                className="w-full"
              />
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-600">
                {filteredProducts.length === 0 ? (
                  "Tidak ada produk yang ditemukan"
                ) : (
                  <>
                    Menampilkan {filteredProducts.length} produk
                    {searchTerm && (
                      <span className="ml-2 text-green-600 font-medium">
                        untuk "{searchTerm}"
                      </span>
                    )}
                  </>
                )}
              </div>
              
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-sm text-red-600 hover:text-red-700 underline"
                >
                  Hapus pencarian
                </button>
              )}
            </div>

            {/* Products Grid */}
            {currentProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="mb-4">
                  <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.084-2.334.414-.7.814-1.378 1.145-2.043A6.01 6.01 0 0112 9a6.01 6.01 0 014.939 2.623c.331.665.731 1.343 1.145 2.043A7.96 7.96 0 0117 13.291zM3 16.875C5.375 14.5 8.5 13 12 13s6.625 1.5 9 3.875v1.25C18.625 20.5 15.5 22 12 22s-6.625-1.5-9-3.875v-1.25z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada produk ditemukan
                </h3>
                <p className="text-gray-500 mb-4">
                  Coba ubah kriteria pencarian atau filter Anda
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      category: 'Semua Kategori',
                      minPrice: 0,
                      maxPrice: 1000000,
                      minRating: 0,
                      sortBy: 'name'
                    });
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {currentProducts.map((product) => (
                    <ProductCardMarketplace
                      key={product.id}
                      product={product}
                      onClick={handleProductClick}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredProducts.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  className="mt-8"
                />
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );

};

export default MarketplacePage;