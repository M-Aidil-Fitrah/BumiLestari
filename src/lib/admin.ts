// src/lib/admin.ts
import { supabase } from './supabase';
import type { Product } from './supabase';

export const adminService = {
  // Check if current user is admin
  async isAdmin(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    return profile?.role === 'admin';
  },

  // Upload image helper (internal function)
  async uploadImage(file: File, folder: string = 'products') {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('letsgo')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('letsgo')
      .getPublicUrl(filePath);

    return {
      path: data.path,
      publicUrl,
    };
  },

  // Delete image helper (internal function)
  async deleteImage(filePath: string) {
    const { error } = await supabase.storage
      .from('letsgo')
      .remove([filePath]);

    if (error) throw error;
  },

  // Add product
  async addProduct(productData: {
    name: string;
    price: number;
    category_id: string;
    description: string;
    stock: number;
    tags: string[];
    is_featured: boolean;
    badge?: string | null;
    image?: File;
  }) {
    const isAdmin = await this.isAdmin();
    if (!isAdmin) throw new Error('Unauthorized: Admin access required');

    let imageUrl = '';

    // Upload image if provided
    if (productData.image) {
      const { publicUrl } = await this.uploadImage(
        productData.image,
        'products'
      );
      imageUrl = publicUrl;
    }

    const { data, error } = await supabase
      .from('products')
      .insert({
        name: productData.name,
        price: productData.price,
        category_id: productData.category_id,
        description: productData.description,
        stock: productData.stock,
        seller: 'BumiLestari Official',
        tags: productData.tags,
        is_featured: productData.is_featured,
        badge: productData.badge || null,
        image: imageUrl,
        rating: 0,
        reviews_count: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update product
  async updateProduct(
    productId: string,
    updates: Partial<Product>,
    newImage?: File
  ) {
    const isAdmin = await this.isAdmin();
    if (!isAdmin) throw new Error('Unauthorized: Admin access required');

    let imageUrl = updates.image;

    // Upload new image if provided
    if (newImage) {
      const { publicUrl } = await this.uploadImage(
        newImage,
        'products'
      );
      imageUrl = publicUrl;
    }

    const { data, error } = await supabase
      .from('products')
      .update({
        ...updates,
        image: imageUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', productId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete product
  async deleteProduct(productId: string) {
    const isAdmin = await this.isAdmin();
    if (!isAdmin) throw new Error('Unauthorized: Admin access required');

    // Delete product (will cascade delete reviews, etc)
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) throw error;

    return true;
  },

  // Get all categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },
};