import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { dummyReviews } from '../../data/reviews';

interface ReviewSectionProps {
  productId: string;
  productRating: number;
  totalReviews: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId, productRating, totalReviews }) => {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  
  // Filter reviews for this product
  const productReviews = dummyReviews.filter(review => review.productId === productId);

  // Sort reviews
  const sortedReviews = [...productReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-lg ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    productReviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-gradient-to-br from-[#8B7355]/5 to-[#8B7355]/10 p-8 rounded-2xl border border-[#8B7355]/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="flex items-center space-x-6">
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-5xl font-bold text-[#8B7355] mb-2">{productRating}</div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(productRating))}
              </div>
              <div className="text-sm text-gray-600 font-medium">{totalReviews} ulasan</div>
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Rating Pembeli
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Produk ini mendapat rating tinggi dari pembeli yang puas dengan kualitas dan pelayanan kami.
              </p>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingDistribution[star as keyof typeof ratingDistribution];
              const percentage = productReviews.length > 0 ? (count / productReviews.length) * 100 : 0;
              
              return (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-semibold text-[#2C2C2C] w-3">{star}</span>
                    <span className="text-yellow-400 text-sm">★</span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: star * 0.1 }}
                      className="bg-gradient-to-r from-[#8B7355] to-[#6d5942] h-3 rounded-full"
                    ></motion.div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium w-12 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: 'var(--font-heading)' }}>
          Semua Ulasan <span className="text-[#8B7355]">({productReviews.length})</span>
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Urutkan:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none text-sm font-medium text-gray-700 cursor-pointer hover:border-[#8B7355]/50 transition-colors"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="highest">Rating Tertinggi</option>
            <option value="lowest">Rating Terendah</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <div className="text-gray-400 mb-4">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg font-medium">Belum ada ulasan untuk produk ini</p>
            <p className="text-gray-400 text-sm mt-2">Jadilah yang pertama memberikan ulasan</p>
          </div>
        ) : (
          sortedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B7355] to-[#6d5942] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
                    {review.userName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <span className="font-bold text-[#2C2C2C] text-lg">{review.userName}</span>
                      {review.verified && (
                        <span className="bg-[#8B7355] text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Terverifikasi
                        </span>
                      )}
                    </div>
                    <div className="flex items-center flex-wrap gap-3 text-sm">
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{formatDate(review.date)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed text-base mb-4">{review.comment}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-[#8B7355] transition-colors group">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span className="font-medium">Membantu ({review.helpful})</span>
                </button>
                <button className="text-gray-500 hover:text-[#8B7355] transition-colors font-medium text-sm">
                  Balas
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {sortedReviews.length > 0 && sortedReviews.length >= 3 && (
        <div className="text-center pt-4">
          <button className="bg-white hover:bg-gray-50 text-[#8B7355] font-bold py-3 px-8 rounded-full border-2 border-[#8B7355] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            Lihat Ulasan Lainnya
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;