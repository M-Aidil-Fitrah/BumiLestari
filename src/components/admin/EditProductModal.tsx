// src/components/admin/EditProductModal.tsx
import { useState, useEffect } from 'react';
import { X, Pencil, Image as ImageIcon } from 'lucide-react';
import { adminService } from '@/lib/admin';
import type { Product, Category } from '@/lib/supabase';

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
}

const EditProductModal = ({ product, onClose, onSuccess }: EditProductModalProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(product.image);
  const [isDragging, setIsDragging] = useState(false);
  
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    category_id: product.category_id,
    description: product.description,
    stock: product.stock,
    tags: product.tags ? product.tags.join(', ') : '',
    is_featured: product.is_featured,
    badge: product.badge || '',
    image: null as File | null,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await adminService.getCategories();
    setCategories(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>, draggedFile?: File) => {
    let file: File | undefined;
    
    if (draggedFile) {
        file = draggedFile;
    } else if (e.target && 'files' in e.target) {
        file = (e.target as HTMLInputElement).files?.[0];
    }

    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        handleImageChange(e as any, file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminService.updateProduct(
        product.id,
        {
          name: formData.name,
          price: formData.price,
          category_id: formData.category_id,
          description: formData.description,
          stock: formData.stock,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
          is_featured: formData.is_featured,
          badge: formData.badge || null,
        },
        formData.image || undefined
      );
      onSuccess();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Gagal memperbarui produk: ' + error.message);
      } else {
        alert('Gagal memperbarui produk.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header - Blue tint for edit mode */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-blue-100">
                <Pencil className="w-5 h-5 text-blue-600" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800">Edit Produk</h2>
                <p className="text-xs text-gray-500">Ubah informasi untuk produk <span className="font-semibold text-gray-700">"{product.name}"</span></p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-blue-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <form id="editProductForm" onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    
                    {/* Left Column - Image Upload */}
                    <div className="md:col-span-5 space-y-4">
                        <label className="block text-sm font-semibold text-gray-700">Foto Produk</label>
                        <div 
                            className={`relative group border-2 border-dashed rounded-2xl p-2 text-center flex flex-col items-center justify-center min-h-[300px] transition-all duration-200 overflow-hidden cursor-pointer ${
                                isDragging 
                                ? 'border-blue-400 bg-blue-50 scale-[1.02]' 
                                : 'border-gray-200 bg-gray-50 hover:border-blue-300'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                title="Klik untuk mengganti gambar"
                            />
                            
                            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm">
                                <img src={imagePreview} alt="Preview" className="w-full aspect-square object-cover" />
                                
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                                        <ImageIcon className="w-6 h-6" />
                                    </div>
                                    <span className="text-white font-medium text-sm">Ganti Gambar</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                            <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-[10px] font-bold">i</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Upload gambar baru hanya jika Anda ingin mengubah foto produk yang sudah ada.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Form Fields */}
                    <div className="md:col-span-7 space-y-5">
                        
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Produk <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategori <span className="text-red-500">*</span></label>
                            <select
                                required
                                value={formData.category_id}
                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none appearance-none"
                            >
                                <option value="" disabled>-- Pilih Kategori --</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price & Stock */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Harga (Rp) <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.price || ''}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Stok <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.stock || ''}
                                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi <span className="text-red-500">*</span></label>
                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tags <span className="text-xs font-normal text-gray-400">(pisahkan dengan koma)</span></label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                            />
                        </div>

                        {/* Badge & Featured */}
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Badge Produk</label>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { id: '', label: 'None' },
                                        { id: 'TERLARIS', label: 'Terlaris', color: 'bg-orange-100 text-orange-700 border-orange-200' },
                                        { id: 'BARU', label: 'Baru', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                                        { id: 'TRENDING', label: 'Trending', color: 'bg-purple-100 text-purple-700 border-purple-200' },
                                    ].map((badge) => (
                                        <button
                                            key={badge.id}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, badge: badge.id })}
                                            className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${
                                                formData.badge === badge.id 
                                                ? badge.id === '' ? 'bg-gray-800 text-white border-gray-800 shadow-sm' : `${badge.color!} ring-2 ring-offset-2 ring-${badge.color!.split('-')[1]}-400 shadow-sm`
                                                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'
                                            }`}
                                        >
                                            {badge.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="w-px bg-gray-200 hidden sm:block"></div>
                            
                            <div className="flex-shrink-0">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Visibilitas</label>
                                <label className="flex items-center cursor-pointer group">
                                    <div className="relative">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only" 
                                            checked={formData.is_featured}
                                            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                        />
                                        <div className={`block w-11 h-6 rounded-full transition-colors ${formData.is_featured ? 'bg-blue-600' : 'bg-gray-300 group-hover:bg-gray-400'}`}></div>
                                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.is_featured ? 'translate-x-5' : ''}`}></div>
                                    </div>
                                    <div className="ml-3">
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Featured</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
            <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-all"
            >
                Batal
            </button>
            <button
                type="submit"
                form="editProductForm"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:hover:shadow-md disabled:cursor-not-allowed flex items-center gap-2"
            >
                {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
        </div>

      </div>
    </div>
  );
};

export default EditProductModal;
