import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyProducts } from '../data/products';
import ProductImageGallery from '../components/ui/ProductImageGallery';
import ProductInfo from '../components/ui/ProductInfo';
import ReviewSection from '../components/ui/ReviewSection';
import { Navigation, Footer } from '../components/ui/Navigation';
import { ScrollToTopButton } from '../components/ui/ScrollToTopButton';
import type { Product } from '../data/products';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Find product by ID
  const product = dummyProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.084-2.334.414-.7.814-1.378 1.145-2.043A6.01 6.01 0 0112 9a6.01 6.01 0 014.939 2.623c.331.665.731 1.343 1.145 2.043A7.96 7.96 0 0117 13.291zM3 16.875C5.375 14.5 8.5 13 12 13s6.625 1.5 9 3.875v1.25C18.625 20.5 15.5 22 12 22s-6.625-1.5-9-3.875v-1.25z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Produk Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">
            Maaf, produk yang Anda cari tidak dapat ditemukan.
          </p>
          <button
            onClick={() => navigate('/marketplace')}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Kembali ke Marketplace
          </button>
        </div>
      </div>
    );
  }

  // Handle scroll effects for navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation isScrolled={isScrolled} />

      <main className="bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={handleBackToMarketplace}
              className="flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Marketplace
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div>
              <ProductImageGallery
                image={product.image}
                productName={product.name}
              />
            </div>

            {/* Product Info */}
            <div>
              <ProductInfo
                product={product}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            </div>
          </div>

          {/* Product Details & Reviews */}
          <div className="space-y-8">
            {/* Additional Product Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Detail Produk</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Kategori</h3>
                    <p className="text-gray-600">{product.category}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Stok Tersedia</h3>
                    <p className="text-gray-600">{product.stock} unit</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Rating</h3>
                    <p className="text-gray-600">{product.rating}/5 dari {product.reviews} ulasan</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Penjual</h3>
                    <p className="text-gray-600">{product.seller}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-700 mb-2">Keunggulan Produk</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>100% ramah lingkungan dan berkelanjutan</li>
                    <li>Kualitas premium dengan harga terjangkau</li>
                    <li>Tahan lama dan dapat digunakan berulang kali</li>
                    <li>Membantu mengurangi sampah plastik</li>
                    <li>Mendukung gaya hidup eco-friendly</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ReviewSection
                productId={product.id}
                productRating={product.rating}
                totalReviews={product.reviews}
              />
            </div>

            {/* Related Products */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Produk Serupa</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dummyProducts
                  .filter(p => p.category === product.category && p.id !== product.id)
                  .slice(0, 4)
                  .map((relatedProduct) => (
                    <div
                      key={relatedProduct.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                      onClick={() => navigate(`/marketplace/product/${relatedProduct.id}`)}
                    >
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                        }}
                      />
                      <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-green-600 font-semibold text-sm">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                        }).format(relatedProduct.price)}
                      </p>
                    </div>
                  ))}
              </div>
              {dummyProducts.filter(p => p.category === product.category && p.id !== product.id).length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  Tidak ada produk serupa yang ditemukan
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTopButton isVisible={isScrolled} onClick={scrollToTop} />
    </div>
  );
};

export default ProductDetailPage;