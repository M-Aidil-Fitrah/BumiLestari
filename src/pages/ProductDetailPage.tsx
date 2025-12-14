import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { dummyProducts } from '../data/products';
import ProductImageGallery from '../components/ui/ProductImageGallery';
import ProductInfo from '../components/ui/ProductInfo';
import ReviewSection from '../components/ui/ReviewSection';
import Navbar from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import type { Product } from '../data/products';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');

  // Find product by ID
  const product = dummyProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F3EE]">
        <Navbar />
        <div className="pt-32 pb-20 flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="mb-6">
              <svg className="mx-auto h-32 w-32 text-[#8B7355]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Produk Tidak Ditemukan
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Maaf, produk yang Anda cari tidak dapat ditemukan.
            </p>
            <button
              onClick={() => navigate('/marketplace')}
              className="bg-[#8B7355] hover:bg-[#6d5942] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Kembali ke Marketplace
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product: Product, quantity: number) => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', product, quantity);
    alert(`${quantity} ${product.name} ditambahkan ke keranjang!`);
  };

  const handleBuyNow = (product: Product, quantity: number) => {
    // Navigate to payment page with product data
    navigate('/payment', {
      state: {
        productId: product.id,
        quantity: quantity
      }
    });
  };

  const handleBackToMarketplace = () => {
    navigate('/marketplace');
  };

  const tabs = [
    { id: 'description', label: 'Deskripsi' },
    { id: 'details', label: 'Detail Produk' },
    { id: 'reviews', label: `Ulasan (${product.reviews})` }
  ] as const;

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      {/* Navigation */}
      <Navbar />

      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#8B7355] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#2C2C2C] rounded-full blur-3xl"></div>
      </div>

      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => navigate('/')}
                className="text-gray-500 hover:text-[#8B7355] transition-colors"
              >
                Home
              </button>
              <span className="text-gray-400">/</span>
              <button
                onClick={handleBackToMarketplace}
                className="text-gray-500 hover:text-[#8B7355] transition-colors"
              >
                Shop
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-[#2C2C2C] font-medium">Product Details</span>
            </div>
          </motion.div>

          {/* Product Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          >
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ProductImageGallery
                image={product.image}
                productName={product.name}
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ProductInfo
                product={product}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            </motion.div>
          </div>

          {/* Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden mb-12"
          >
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 font-semibold text-sm transition-all duration-300 border-b-2 ${
                      activeTab === tab.id
                        ? 'border-[#8B7355] text-[#8B7355]'
                        : 'border-transparent text-gray-500 hover:text-[#8B7355]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="prose max-w-none"
                >
                  <h3 className="text-2xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    Tentang Produk Ini
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {product.description}
                  </p>

                  <div className="bg-[#F5F3EE] rounded-2xl p-6 mb-6">
                    <h4 className="text-lg font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                      Keunggulan Produk
                    </h4>
                    <ul className="space-y-3">
                      {[
                        '100% ramah lingkungan dan berkelanjutan',
                        'Kualitas premium dengan harga terjangkau',
                        'Tahan lama dan dapat digunakan berulang kali',
                        'Membantu mengurangi sampah plastik',
                        'Mendukung gaya hidup eco-friendly'
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-6 h-6 text-[#8B7355] mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="text-lg font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-[#8B7355]/10 text-[#8B7355] text-sm font-medium px-4 py-2 rounded-full hover:bg-[#8B7355]/20 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                    Informasi Detail
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: 'Kategori', value: product.category },
                      { label: 'Stok Tersedia', value: `${product.stock} unit` },
                      { label: 'Rating', value: `${product.rating}/5.0 (${product.reviews} ulasan)` },
                      { label: 'Penjual', value: product.seller },
                      { label: 'SKU', value: `BL-${product.id.padStart(6, '0')}` },
                      { label: 'Berat', value: '500 gram' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-40 flex-shrink-0">
                          <span className="text-gray-500 font-medium">{item.label}</span>
                        </div>
                        <div className="flex-1">
                          <span className="text-[#2C2C2C] font-semibold">: {item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-[#8B7355]/5 rounded-2xl border border-[#8B7355]/10">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-[#8B7355] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-bold text-[#2C2C2C] mb-2">Informasi Penjual</h4>
                        <p className="text-gray-700 mb-3">
                          <strong>{product.seller}</strong> adalah seller terpercaya dengan rating tinggi dan komitmen pada produk ramah lingkungan.
                        </p>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="bg-[#8B7355] text-white px-3 py-1 rounded-full font-medium">✓ Terverifikasi</span>
                          <span className="bg-white text-[#8B7355] px-3 py-1 rounded-full font-medium border border-[#8B7355]/20">Seller Terpercaya</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReviewSection
                    productId={product.id}
                    productRating={product.rating}
                    totalReviews={product.reviews}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Related Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-[#2C2C2C] mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              Produk Serupa
            </h2>
            
            {dummyProducts.filter(p => p.category === product.category && p.id !== product.id).length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {dummyProducts
                  .filter(p => p.category === product.category && p.id !== product.id)
                  .slice(0, 4)
                  .map((relatedProduct, index) => (
                    <motion.div
                      key={relatedProduct.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="group cursor-pointer"
                      onClick={() => {
                        navigate(`/marketplace/product/${relatedProduct.id}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="relative aspect-square overflow-hidden bg-gray-50">
                          <img
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                            }}
                          />
                          {relatedProduct.rating >= 4.8 && (
                            <span className="absolute top-3 left-3 bg-[#8B7355] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-[#2C2C2C] text-sm mb-2 line-clamp-2 min-h-[40px]">
                            {relatedProduct.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <p className="text-[#8B7355] font-bold text-lg">
                              {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0,
                              }).format(relatedProduct.price)}
                            </p>
                            <div className="flex items-center text-xs text-gray-500">
                              <span className="text-yellow-400 mr-1">★</span>
                              {relatedProduct.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-gray-500 text-lg">
                  Tidak ada produk serupa yang ditemukan
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;