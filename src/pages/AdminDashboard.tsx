// src/pages/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowLeft, Package, AlertCircle, Star, LayoutDashboard, ShoppingBag, Users, Settings, Leaf } from 'lucide-react';
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

  // Calculate Stats
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStock = products.filter(p => p.stock <= 5).length;
  const featuredCount = products.filter(p => p.is_featured).length;

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#8B7355] flex items-center gap-2">
            <Leaf className="w-6 h-6" />
            BumiLestari
          </h2>
          <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#8B7355]/10 text-[#8B7355] rounded-xl font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors opacity-60 cursor-not-allowed" title="Segera Hadir">
            <ShoppingBag className="w-5 h-5" />
            Pesanan
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors opacity-60 cursor-not-allowed" title="Segera Hadir">
            <Users className="w-5 h-5" />
            Pelanggan
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors opacity-60 cursor-not-allowed" title="Segera Hadir">
            <Settings className="w-5 h-5" />
            Pengaturan
          </a>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Ke Beranda
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white px-8 py-6 border-b border-gray-200 flex justify-between items-center z-10 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manajemen Produk</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola inventaris dan katalog produk Anda.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#8B7355] flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Produk</p>
                <p className="text-2xl font-bold text-gray-800">{loading ? '-' : totalProducts}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Stok</p>
                <p className="text-2xl font-bold text-gray-800">{loading ? '-' : totalStock}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Stok Menipis (≤5)</p>
                <p className="text-2xl font-bold text-gray-800">{loading ? '-' : lowStock}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600 shrink-0">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Produk Unggulan</p>
                <p className="text-2xl font-bold text-gray-800">{loading ? '-' : featuredCount}</p>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg font-bold text-gray-800">Daftar Produk</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-[#8B7355] text-white px-5 py-2.5 rounded-xl hover:bg-[#6d5942] transition-colors font-medium text-sm shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4" />
                Tambah Produk Baru
              </button>
            </div>

            {loading ? (
              <div className="p-16 flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#8B7355] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Memuat data produk...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="p-16 text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                  <Package className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Produk</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">Mulai tambahkan produk pertamamu untuk mulai berjualan dan menampilkannya di katalog toko.</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-2 bg-[#8B7355] text-white px-6 py-3 rounded-xl hover:bg-[#6d5942] transition-colors font-medium shadow-md hover:shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Produk Pertama
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-gray-50/80">
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 w-24">Gambar</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Info Produk</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Harga</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Stok</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-800 mb-1 truncate max-w-[200px] lg:max-w-[300px]">{product.name}</div>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-gray-400 font-mono bg-gray-50 px-2 py-0.5 rounded">ID: {product.id.substring(0,8)}</span>
                            {product.is_featured && (
                              <span className="text-yellow-700 px-2 py-0.5 bg-yellow-50 border border-yellow-200 rounded-md font-medium flex items-center gap-1 shadow-sm">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-500" /> Featured
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-[#8B7355] bg-[#8B7355]/10 px-3 py-1.5 rounded-lg">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {product.stock <= 5 ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100 shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                              {product.stock} Tersisa
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                              {product.stock} Unit
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="inline-flex items-center justify-center w-9 h-9 sm:w-auto sm:px-3 sm:py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200 hover:border-blue-200"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4 sm:mr-1.5" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="inline-flex items-center justify-center w-9 h-9 sm:w-auto sm:px-3 sm:py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200 hover:border-red-200"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4 sm:mr-1.5" />
                              <span className="hidden sm:inline">Hapus</span>
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
        </div>
      </main>

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