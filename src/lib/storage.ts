// src/lib/storage.ts
import { supabase } from './supabase';

export const storageService = {
  // Upload single image
  async uploadImage(file: File, folder: string = 'products') {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return {
      path: data.path,
      publicUrl,
    };
  },

  // Delete image
  async deleteImage(filePath: string) {
    const { error } = await supabase.storage
      .from('product-images')
      .remove([filePath]);

    if (error) throw error;
  },

  // Get public URL
  getPublicUrl(filePath: string) {
    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },
};