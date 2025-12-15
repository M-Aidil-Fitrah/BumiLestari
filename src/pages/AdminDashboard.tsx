// src/pages/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { adminService } from '@/lib/admin';
import { productService } from '@/lib/products';
import type { Product } from '@/lib/supabase';
import AddProductModal from '@/components/admin/AddProductModal';
import EditProductModal from '@/components/admin/EditProductModal';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const adminStatus = await adminService.isAdmin();
    setIsAdmin(adminStatus);
    
    if (!adminStatus) {
      alert('Akses ditolak! Anda bukan admin.');
      navigate('/');
      return;
    }

    loadProducts();
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;

    try {
      await adminService.deleteProduct(productId);
      alert('Produk berhasil dihapus!');
      loadProducts();
    } catch (error: any) {
      alert('Gagal menghapus produk: ' + error.message);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#F5F3EE] p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#2C2C2C] hover:text-[#8B7355] mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Beranda
        </button>

        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-[#2C2C2C]">
            Admin Dashboard
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#2C2C2C] text-white px-6 py-3 rounded-xl hover:bg-[#1a1a1a] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Tambah Produk
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#8B7355] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Gambar</th>
                  <th className="px-6 py-4 text-left">Nama</th>
                  <th className="px-6 py-4 text-left">Harga</th>
                  <th className="px-6 py-4 text-left">Stok</th>
                  <th className="px-6 py-4 text-left">Rating</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4">
                      Rp {product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                      {product.rating} ({product.reviews_count})
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            loadProducts();
          }}
        />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={() => {
            setEditingProduct(null);
            loadProducts();
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;  