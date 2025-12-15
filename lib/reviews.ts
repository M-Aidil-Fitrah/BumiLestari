// lib/reviews.ts
import { supabase } from './supabase';
import type { Review } from './supabase';

export const reviewService = {
  // Get product reviews
  async getProductReviews(productId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Review[];
  },

  // Add review
  async addReview(review: {
    product_id: string;
    rating: number;
    comment: string;
  }) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    const profile = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.data.user.id)
      .single();

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        product_id: review.product_id,
        user_id: user.data.user.id,
        user_name: profile.data?.full_name || 'Anonymous',
        rating: review.rating,
        comment: review.comment,
        verified: true,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update helpful count
  async updateHelpful(reviewId: string) {
    const { data, error } = await supabase.rpc('increment_helpful', {
      review_id: reviewId,
    });

    if (error) throw error;
    return data;
  },
};