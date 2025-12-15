// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  price: number;
  category_id: string;
  image: string; // atau image_url
  image_path?: string;
  rating: number;
  reviews_count: number;
  description: string;
  stock: number;
  seller: string;
  tags: string[];
  is_featured: boolean;
  badge: string | null;
  created_at: string;
  updated_at: string;
  
  // Untuk kompatibilitas dengan kode yang mengharapkan properti lama
  category?: string; // tambahkan ini
  reviews?: Review[]; // tambahkan ini
  image_url?: string; // alias untuk image
}

// 🔴 TAMBAHKAN INI - Interface Review
export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  helpful: number;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}