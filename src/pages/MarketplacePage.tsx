import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { dummyProducts } from '../data/products';
import type { Product } from '../data/products';
import SearchBar from '../components/ui/SearchBar';
import type { FilterOptions } from '../components/ui/Filter';
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
  const itemsPerPage = 10;

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

  const handlePageChange = (page: number) => {
    console.log('✅ Pagination clicked! Changing page to:', page);
    setCurrentPage(page);
    // Scroll to top of products section
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-20 relative overflow-x-hidden">
      {/* Background Pattern - Behind everything */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#8B7355] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2C2C2C] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Hero Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-[#2C2C2C] to-[#3d3d3d] rounded-3xl overflow-hidden shadow-2xl isolate"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            {/* Left Content */}
            <div className="text-white z-10">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" 
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Belanja Produk <span className="text-[#8B7355]">Ramah Lingkungan</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-300 mb-6" 
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Dapatkan produk organik berkualitas dengan harga terjangkau. Gratis ongkir untuk belanja di atas Rp 200.000
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#8B7355] hover:bg-[#7a6349] text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg"
              >
                Belanja Sekarang
              </motion.button>
            </div>
            
            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative hidden md:block"
            >
              <img
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop"
                alt="Fresh Vegetables"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B7355]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8B7355]/10 rounded-full blur-3xl pointer-events-none"></div>
        </motion.div>
      </div>

      {/* All Products Section */}
      <div id="products" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
        {/* Header with Search and Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-[#2C2C2C]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Semua Produk
          </motion.h2>
          
          <div className="flex items-center gap-4">
            {/* Search Bar - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 md:w-80"
            >
              <SearchBar
                onSearch={setSearchTerm}
                placeholder="Cari produk..."
                className="w-full"
              />
            </motion.div>
            
            {/* Sort Dropdown */}
            <motion.select
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
              className="px-4 py-3 bg-white border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none transition-all font-medium text-[#2C2C2C]"
            >
              <option value="name">A-Z</option>
              <option value="price-asc">Termurah</option>
              <option value="price-desc">Termahal</option>
              <option value="rating">Rating</option>
              <option value="newest">Terbaru</option>
            </motion.select>
          </div>
        </div>

        {/* Category Pills - Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6"
        >
          {['Semua Kategori', 'Tas Ramah Lingkungan', 'Botol Ramah Lingkungan', 'Pembersih Organik', 'Alat Makan Ramah Lingkungan', 'Perawatan Pribadi Organik'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters({...filters, category: cat})}
              className={`px-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                filters.category === cat
                  ? 'bg-[#2C2C2C] text-white shadow-lg'
                  : 'bg-white text-[#2C2C2C] border border-gray-200 hover:shadow-md'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Results Info - Simple */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 text-sm">
            <span className="font-bold text-[#2C2C2C]">{filteredProducts.length}</span> produk ditemukan
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-sm text-[#8B7355] hover:text-[#2C2C2C] font-medium transition-colors"
            >
              Hapus pencarian
            </button>
          )}
        </div>

        {/* Products Grid */}
        {currentProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl border border-[#8B7355]/20"
              >
                <div className="mb-6">
                  <svg className="mx-auto h-32 w-32 text-[#8B7355]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Tidak ada produk ditemukan
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
                  Coba ubah kriteria pencarian atau filter untuk menemukan produk yang sesuai
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
                  className="bg-[#2C2C2C] hover:bg-[#1a1a1a] text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset Semua Filter
                </motion.button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-8"
                >
                  {currentProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <ProductCardMarketplace
                        product={product}
                        onClick={handleProductClick}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                <div className="relative z-30 mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredProducts.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
      </div>

      <Footer />
    </div>
  );

};

export default MarketplacePage;