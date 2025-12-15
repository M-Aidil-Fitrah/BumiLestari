// src/components/ui/ReviewSection.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { reviewService } from '@/lib/reviews';
import { authService } from '@/lib/auth';
import type { Review } from '@/lib/supabase';

interface ReviewSectionProps {
  productId: string;
  productRating: number;
  totalReviews: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  productId,
  productRating,
  totalReviews,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    loadReviews();
    checkLoginStatus();
  }, [productId]);

  const checkLoginStatus = async () => {
    const user = await authService.getCurrentUser();
    setIsLoggedIn(!!user);
  };

  const loadReviews = async () => {
    setLoading(true);
    try {
      const data = await reviewService.getProductReviews(productId);
      setReviews(data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      alert('Silakan login terlebih dahulu untuk memberikan ulasan');
      return;
    }

    if (reviewForm.comment.trim().length < 10) {
      alert('Ulasan minimal 10 karakter');
      return;
    }

    setSubmitting(true);

    try {
      await reviewService.addReview({
        product_id: productId,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });

      alert('Ulasan berhasil ditambahkan!');
      
      // Reset form
      setReviewForm({ rating: 5, comment: '' });
      setShowReviewForm(false);
      
      // Reload reviews
      loadReviews();
    } catch (error: any) {
      alert('Gagal menambahkan ulasan: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            disabled={!interactive}
            onClick={() => interactive && setReviewForm({ ...reviewForm, rating: star })}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => Math.floor(r.rating) === rating).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { rating, count, percentage };
  });

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b">
        {/* Average Rating */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <div className="text-6xl font-bold text-[#2C2C2C]">{productRating.toFixed(1)}</div>
            <div>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= Math.round(productRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">
                Berdasarkan {totalReviews} ulasan
              </p>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 w-8">
                {rating} ★
              </span>
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Button */}
      {isLoggedIn && !showReviewForm && (
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowReviewForm(true)}
            className="inline-flex items-center gap-2 bg-[#8B7355] hover:bg-[#7a6349] text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg"
          >
            <MessageSquare className="w-5 h-5" />
            Tulis Ulasan
          </motion.button>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#F5F3EE] rounded-2xl p-6 border border-[#8B7355]/20"
        >
          <h3 className="text-xl font-bold text-[#2C2C2C] mb-4">
            Tulis Ulasan Anda
          </h3>
          
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
              {renderStars(reviewForm.rating, true)}
            </div>

            {/* Comment */}
            <div>
              <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700 mb-2">
                Ulasan * (minimal 10 karakter)
              </label>
              <textarea
                id="review-comment"
                required
                rows={5}
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                placeholder="Bagikan pengalaman Anda dengan produk ini..."
                className="w-full px-4 py-3 border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none transition-all resize-none"
              />
              <p className="text-sm text-gray-500 mt-1">
                {reviewForm.comment.length} karakter
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowReviewForm(false);
                  setReviewForm({ rating: 5, comment: '' });
                }}
                disabled={submitting}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#2C2C2C] text-white py-3 rounded-xl hover:bg-[#1a1a1a] transition-colors disabled:opacity-50"
              >
                {submitting ? 'Mengirim...' : 'Kirim Ulasan'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Login Prompt for Non-logged users */}
      {!isLoggedIn && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <p className="text-gray-700 mb-3">
            Silakan login untuk memberikan ulasan produk
          </p>
          <a
            href="/login"
            className="inline-block bg-[#8B7355] hover:bg-[#7a6349] text-white font-semibold py-2 px-6 rounded-xl transition-colors"
          >
            Login Sekarang
          </a>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-[#2C2C2C]">
          Ulasan Pelanggan ({reviews.length})
        </h3>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#8B7355] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Memuat ulasan...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              Belum ada ulasan untuk produk ini
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Jadilah yang pertama memberikan ulasan!
            </p>
          </div>
        ) : (
          reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-[#8B7355] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.user_name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-[#2C2C2C]">
                        {review.user_name || 'User'}
                      </h4>
                      {review.verified && (
                        <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDate(review.created_at)}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                {renderStars(review.rating)}
              </div>

              {/* Comment */}
              <p className="text-gray-700 leading-relaxed mb-4">
                {review.comment}
              </p>

              {/* Helpful Button */}
              <button
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#8B7355] transition-colors"
                onClick={() => {
                  console.log('Helpful clicked for review:', review.id);
                }}
                aria-label={`Mark review as helpful (currently ${review.helpful || 0} helpful)`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Membantu ({review.helpful || 0})</span>
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;