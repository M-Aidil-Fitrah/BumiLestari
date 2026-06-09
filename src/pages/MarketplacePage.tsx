import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { productService } from '@/lib/products';
import type { Product } from '@/lib/supabase';
import SearchBar from '../components/ui/SearchBar';
import type { FilterOptions } from '../components/ui/Filter';
import ProductCardMarketplace from '../components/ui/ProductCardMarketplace';
import Pagination from '../components/ui/Pagination';
import Navbar from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { CustomCursor } from '../components/ui/CustomCursor';

const MarketplacePage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'Semua Kategori',
    minPrice: 0,
    maxPrice: 1000000,
    minRating: 0,
    sortBy: 'newest'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Adjusted for a clean 3-column grid

  const categoriesList = [
    'Semua Kategori', 
    'Tas Ramah Lingkungan', 
    'Botol Ramah Lingkungan', 
    'Pembersih Organik', 
    'Alat Makan Ramah Lingkungan', 
    'Perawatan Pribadi Organik'
  ];

  // Load products from database
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = filters.category === 'Semua Kategori' || product.category === filters.category;

      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default: return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handleProductClick = (product: Product) => {
    navigate(`/marketplace/product/${product.id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#2C2C2C] selection:bg-[#8B7355] selection:text-white">
      <CustomCursor />
      <Navbar />

      {/* Main Content Area */}
      <main className="pt-28 pb-20 max-w-[95vw] mx-auto px-4 md:px-8">
        
        {/* Minimalist Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 border-b border-gray-200 pb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Koleksi Produk.
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-2xl">
            Pilihan kurasi barang-barang berkelanjutan untuk gaya hidup modern. Kualitas terjamin, ramah lingkungan.
          </p>
        </motion.div>

        {/* Layout Split: Sidebar & Grid */}
        <div className="flex flex-col lg:flex-row gap-12 items-start relative">
          
          {/* Sticky Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-32 h-auto lg:h-[calc(100vh-10rem)] overflow-y-auto no-scrollbar hidden md:block">
            <div className="flex flex-col gap-10">
              
              {/* Search */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400">Pencarian</h3>
                <SearchBar
                  onSearch={setSearchTerm}
                  placeholder="Cari produk..."
                  className="w-full border-b border-gray-300 rounded-none bg-transparent px-0 py-2 focus:ring-0"
                />
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400">Kategori</h3>
                <ul className="space-y-3">
                  {categoriesList.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setFilters({...filters, category: cat})}
                        className={`text-sm hover:text-[#8B7355] transition-colors text-left ${
                          filters.category === cat ? 'font-bold text-[#2C2C2C]' : 'text-gray-500 font-medium'
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sorting */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400">Urutkan</h3>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
                  className="w-full text-sm py-2 bg-transparent border-b border-gray-300 outline-none text-[#2C2C2C] cursor-pointer"
                >
                  <option value="newest">Terbaru</option>
                  <option value="price-asc">Harga: Rendah ke Tinggi</option>
                  <option value="price-desc">Harga: Tinggi ke Rendah</option>
                  <option value="name">Alfabetis (A-Z)</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>

              {/* Reset Filter */}
              {(searchTerm || filters.category !== 'Semua Kategori') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({...filters, category: 'Semua Kategori', sortBy: 'newest'});
                  }}
                  className="text-xs text-[#8B7355] hover:underline uppercase tracking-widest font-bold mt-4"
                >
                  Reset Filter
                </button>
              )}

            </div>
          </aside>

          {/* Mobile Filter Toggle (Hidden on Desktop) */}
          <div className="w-full lg:hidden block mb-6">
             <SearchBar
                onSearch={setSearchTerm}
                placeholder="Cari produk..."
                className="w-full mb-4"
              />
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 mb-4"
              >
                 {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
          </div>

          {/* Product Grid Area */}
          <div className="flex-1 w-full min-h-[50vh]">
            
            <div className="mb-6 text-sm text-gray-500">
              Menampilkan {currentProducts.length} dari {filteredProducts.length} produk
            </div>

            {loading ? (
              <div className="w-full h-64 flex flex-col items-center justify-center gap-4">
                <div className="w-8 h-8 border-2 border-[#2C2C2C] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium tracking-widest uppercase">Memuat...</p>
              </div>
            ) : currentProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="w-full h-64 flex flex-col items-center justify-center text-center border border-dashed border-gray-300 rounded-lg"
              >
                <h3 className="text-xl font-bold mb-2">Tidak Ditemukan</h3>
                <p className="text-gray-500">Koleksi yang Anda cari sedang tidak tersedia saat ini.</p>
              </motion.div>
            ) : (
              <>
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16"
                >
                  <AnimatePresence>
                    {currentProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                      >
                        <ProductCardMarketplace
                          product={product}
                          onClick={handleProductClick}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {totalPages > 1 && (
                  <div className="mt-20 border-t border-gray-100 pt-10">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalItems={filteredProducts.length}
                      itemsPerPage={itemsPerPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MarketplacePage;