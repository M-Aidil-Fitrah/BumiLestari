// src/components/admin/AddProductModal.tsx
import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { adminService } from '@/lib/admin';
import type { Category } from '@/lib/supabase';

interface AddProductModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddProductModal = ({ onClose, onSuccess }: AddProductModalProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category_id: '',
    description: '',
    stock: 0,
    tags: '',
    is_featured: false,
    badge: '',
    image: null as File | null,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await adminService.getCategories();
    setCategories(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Fix: Hanya kirim image jika ada (bukan null)
    await adminService.addProduct({
      name: formData.name,
      price: formData.price,
      category_id: formData.category_id,
      description: formData.description,
      stock: formData.stock,
      tags: formData.tags.split(',').map(t => t.trim()),
      is_featured: formData.is_featured,
      badge: formData.badge || null,
      ...(formData.image && { image: formData.image }), // ✅ Hanya tambahkan jika ada
    });
    alert('Produk berhasil ditambahkan!');
    onSuccess();
  } catch (error: any) {
    alert('Gagal menambahkan produk: ' + error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tambah Produk Baru</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Gambar Produk *</label>
            <div className="border-2 border-dashed rounded-xl p-4 text-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover mx-auto rounded" />
              ) : (
                <Upload className="w-12 h-12 mx-auto text-gray-400" />
              )}
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleImageChange}
                className="mt-2"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Nama Produk *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#8B7355]"
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Harga *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#8B7355]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stok *</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#8B7355]"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Kategori *</label>
            <select
              required
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#8B7355]"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Deskripsi *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#8B7355]"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags (pisahkan dengan koma)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="organik, ramah lingkungan, natural"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#8B7355]"
            />
          </div>

          {/* Badge & Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Badge</label>
              <select
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#8B7355]"
              >
                <option value="">Tidak Ada</option>
                <option value="TERLARIS">TERLARIS</option>
                <option value="BARU">BARU</option>
                <option value="TRENDING">TRENDING</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Produk Unggulan</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2C2C2C] text-white py-3 rounded-xl hover:bg-[#1a1a1a] disabled:opacity-50"
          >
            {loading ? 'Menambahkan...' : 'Tambah Produk'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;