// lib/products.ts
import { supabase } from './supabase';
import type { Product } from './supabase';

export const productService = {
  // Get all products
  async getProducts(filters?: {
    category?: string;
    search?: string;
    featured?: boolean;
  }) {
    let query = supabase.from('products').select('*, categories(name)');

    if (filters?.category) {
      query = query.eq('category_id', filters.category);
    }

    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    if (filters?.featured) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data as any[]).map(p => ({
      ...p,
      category: p.categories?.name || 'Lifestyle'
    })) as Product[];
  },

  // Get single product
  async getProduct(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('id', id)
      .single();

    if (error) throw error;
    
    const p = data as any;
    return {
      ...p,
      category: p.categories?.name || 'Lifestyle'
    } as Product;
  },

  // Get featured products
  async getFeaturedProducts(limit: number = 3) {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('is_featured', true)
      .limit(limit);

    if (error) throw error;
    
    return (data as any[]).map(p => ({
      ...p,
      category: p.categories?.name || 'Lifestyle'
    })) as Product[];
  },
};