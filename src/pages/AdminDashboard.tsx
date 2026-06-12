// src/pages/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowLeft, Package, AlertCircle, Star, LayoutDashboard, Users, Leaf, Mail, Phone, Calendar } from 'lucide-react';
import { adminService } from '@/lib/admin';
import { productService } from '@/lib/products';
import type { Product, Profile } from '@/lib/supabase';
import AddProductModal from '@/components/admin/AddProductModal';
import EditProductModal from '@/components/admin/EditProductModal';

type Tab = 'dashboard' | 'pelanggan';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  
  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Profile[]>([]);
  
  // Loading States
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  
  // Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    checkAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAdmin) {
      if (activeTab === 'dashboard') {
        loadProducts();
      } else if (activeTab === 'pelanggan') {
        loadCustomers();
      }
    }
  }, [isAdmin, activeTab]);

  const checkAdmin = async () => {
    try {
      const adminStatus = await adminService.isAdmin();
      setIsAdmin(adminStatus);
      
      if (!adminStatus) {
        alert('Akses ditolak! Anda bukan admin.');
        navigate('/');
      }
    } catch (error) {
      console.error('Check admin error:', error);
      navigate('/');
    }
  };

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadCustomers = async () => {
    setLoadingCustomers(true);
    try {
      const data = await adminService.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error loading customers:', error);
    } finally {
      setLoadingCustomers(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;

    try {
      await adminService.deleteProduct(productId);
      alert('Produk berhasil dihapus!');
      loadProducts();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Gagal menghapus produk: ' + error.message);
      } else {
        alert('Gagal menghapus produk.');
      }
    }
  };

  if (!isAdmin) return null;

  // Calculate Stats
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStock = products.filter(p => p.stock <= 5).length;
  const featuredCount = products.filter(p => p.is_featured).length;

  const renderDashboardTab = () => (
    <div className="animate-in fade-in duration-500">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Produk', value: loadingProducts ? '-' : totalProducts, icon: Package },
          { label: 'Total Stok', value: loadingProducts ? '-' : totalStock, icon: LayoutDashboard },
          { label: 'Stok Menipis (≤5)', value: loadingProducts ? '-' : lowStock, icon: AlertCircle },
          { label: 'Produk Unggulan', value: loadingProducts ? '-' : featuredCount, icon: Star },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#F5F3EE] flex items-center justify-center text-[#2C2C2C] shrink-0 border border-[#8B7355]/20">
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-[#2C2C2C]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
          <div>
            <h2 className="text-lg font-bold text-[#2C2C2C]">Daftar Produk</h2>
            <p className="text-sm text-gray-500">Kelola inventaris dan katalog produk toko Anda.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#2C2C2C] text-white px-5 py-2.5 rounded-xl hover:bg-[#1a1a1a] transition-colors font-medium text-sm shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            Tambah Produk
          </button>
        </div>

        {loadingProducts ? (
          <div className="p-16 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#8B7355] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">Memuat data produk...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-24 h-24 bg-[#F5F3EE] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#8B7355]/20">
              <Package className="w-10 h-10 text-[#8B7355]" />
            </div>
            <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">Belum Ada Produk</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">Mulai tambahkan produk pertamamu untuk menampilkannya di katalog toko.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 bg-[#2C2C2C] text-white px-6 py-3 rounded-xl hover:bg-[#1a1a1a] transition-colors font-medium shadow-md"
            >
              <Plus className="w-5 h-5" />
              Tambah Produk Pertama
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-white">
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
                      <div className="font-semibold text-[#2C2C2C] mb-1 truncate max-w-[200px] lg:max-w-[300px]">{product.name}</div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-gray-400 font-mono bg-gray-50 px-2 py-0.5 rounded border border-gray-100">ID: {product.id.substring(0,8)}</span>
                        {product.is_featured && (
                          <span className="text-[#8B7355] px-2 py-0.5 bg-[#8B7355]/10 border border-[#8B7355]/20 rounded-md font-medium flex items-center gap-1">
                            <Star className="w-3 h-3 fill-[#8B7355]" /> Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-[#2C2C2C]">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.stock <= 5 ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#F5F3EE] text-[#2C2C2C] border border-[#2C2C2C]/20 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-[#2C2C2C] animate-pulse"></span>
                          {product.stock} Sisa
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#F5F3EE] text-[#8B7355] border border-[#8B7355]/20">
                          <span className="w-2 h-2 rounded-full bg-[#8B7355]"></span>
                          {product.stock} Unit
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="inline-flex items-center justify-center w-9 h-9 sm:w-auto sm:px-3 sm:py-1.5 text-sm font-medium text-gray-600 hover:text-[#8B7355] hover:bg-[#8B7355]/10 rounded-lg transition-colors border border-gray-200 hover:border-[#8B7355]/30"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4 sm:mr-1.5" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="inline-flex items-center justify-center w-9 h-9 sm:w-auto sm:px-3 sm:py-1.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200 hover:border-red-200"
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
  );

  const renderPelangganTab = () => (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-[#2C2C2C]">Daftar Pelanggan</h2>
          <p className="text-sm text-gray-500">Data semua pengguna yang terdaftar sebagai pelanggan.</p>
        </div>

        {loadingCustomers ? (
          <div className="p-16 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#8B7355] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">Memuat data pelanggan...</p>
          </div>
        ) : customers.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-24 h-24 bg-[#F5F3EE] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#8B7355]/20">
              <Users className="w-10 h-10 text-[#8B7355]" />
            </div>
            <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">Belum Ada Pelanggan</h3>
            <p className="text-gray-500">Saat ini belum ada pengguna yang mendaftar.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-white">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 w-16">No</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Info Pengguna</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Kontak</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Bergabung Sejak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.map((customer, index) => (
                  <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#8B7355] flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
                          {customer.full_name ? customer.full_name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div className="font-semibold text-[#2C2C2C]">{customer.full_name || 'Pengguna Tanpa Nama'}</div>
                          <div className="text-xs text-gray-400 font-mono mt-0.5">ID: {customer.id.substring(0,8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          {customer.phone || 'Tidak ada no. HP'}
                        </div>
                        {/* Assuming email is fetched or just show placeholder if not in profile, since email is in auth.users */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-gray-400 italic">Tersembunyi</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(customer.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
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
  );

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200 bg-white">
          <h2 className="text-2xl font-bold text-[#8B7355] flex items-center gap-2">
            <Leaf className="w-6 h-6 text-[#8B7355]" />
            BumiLestari
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">Admin Workspace</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'dashboard' 
              ? 'bg-[#2C2C2C] text-white shadow-md' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-[#2C2C2C]'
            }`}
          >
            <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-white' : 'text-gray-400'}`} />
            Produk
          </button>
          
          <button 
            onClick={() => setActiveTab('pelanggan')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'pelanggan' 
              ? 'bg-[#2C2C2C] text-white shadow-md' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-[#2C2C2C]'
            }`}
          >
            <Users className={`w-5 h-5 ${activeTab === 'pelanggan' ? 'text-white' : 'text-gray-400'}`} />
            Pelanggan
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200 bg-gray-50/50">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:bg-white hover:text-[#2C2C2C] rounded-xl font-medium transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            Keluar Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white px-8 py-6 border-b border-gray-200 flex justify-between items-center z-10 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-[#2C2C2C]">
              {activeTab === 'dashboard' ? 'Katalog Produk' : 'Manajemen Pelanggan'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {activeTab === 'dashboard' ? 'Ringkasan performa dan inventaris.' : 'Daftar pengguna terdaftar.'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#8B7355] flex items-center justify-center text-white font-bold shadow-md ring-2 ring-[#F5F3EE]">
              A
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          {activeTab === 'dashboard' ? renderDashboardTab() : renderPelangganTab()}
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