// src/pages/OrdersPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ArrowLeft, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { orderService } from '@/lib/orders';
import type { Order } from '@/lib/supabase';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch (err) {
      const e = err as Error;
      if (e.message.includes('logged in')) {
        navigate('/login');
      } else {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = (orderId: string, token: string | null) => {
    if (!token) {
      alert('Token pembayaran tidak ditemukan. Silakan hubungi admin.');
      return;
    }
    
    if (typeof window !== 'undefined' && window.snap) {
      window.snap.pay(token, {
        onSuccess: async function() {
          // Directly update status in Supabase (since webhook can't reach localhost)
          await orderService.updateOrderStatus(orderId, 'success');
          loadOrders();
        },
        onPending: function() {
          loadOrders();
        },
        onError: async function() {
          await orderService.updateOrderStatus(orderId, 'failed');
          loadOrders();
        },
        onClose: function() {
          // User closed without finishing
          loadOrders();
        }
      });
    } else {
      alert('Sistem pembayaran sedang memuat, silakan muat ulang halaman.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 container mx-auto px-6 py-12 lg:py-24 max-w-4xl mt-20">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Pesanan Saya</h1>
            <p className="text-gray-600">Riwayat transaksi dan status pesanan Anda.</p>
          </div>
          <button 
            onClick={() => navigate('/marketplace')}
            className="flex items-center gap-2 text-[#8B7355] hover:text-[#2C2C2C] transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali Belanja
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#8B7355] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">Memuat pesanan Anda...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-[#F5F3EE] rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-[#8B7355]" />
            </div>
            <h3 className="text-2xl font-bold text-[#2C2C2C] mb-3">Belum Ada Pesanan</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Anda belum melakukan transaksi apapun. Yuk, jelajahi produk lestari kami!</p>
            <button 
              onClick={() => navigate('/marketplace')}
              className="bg-[#2C2C2C] text-white px-8 py-3 rounded-full font-medium hover:bg-black transition-colors"
            >
              Mulai Belanja
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      {new Date(order.created_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="font-mono text-sm font-medium text-[#2C2C2C]">
                      Order ID: {order.id.substring(0,8).toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {order.status === 'success' && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-200">
                        <CheckCircle2 className="w-4 h-4" /> Berhasil
                      </span>
                    )}
                    {order.status === 'pending' && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-700 text-sm font-medium border border-yellow-200">
                        <Clock className="w-4 h-4" /> Menunggu Pembayaran
                      </span>
                    )}
                    {(order.status === 'failed' || order.status === 'expired') && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-sm font-medium border border-red-200">
                        <XCircle className="w-4 h-4" /> Gagal / Kadaluarsa
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Pembayaran</p>
                    <p className="text-xl font-bold text-[#2C2C2C]">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(order.total_amount)}
                    </p>
                  </div>
                  
                  {order.status === 'pending' && (
                    <button 
                      onClick={() => handlePayNow(order.id, order.snap_token)}
                      className="bg-[#8B7355] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#7a6548] transition-colors shadow-md text-sm whitespace-nowrap"
                    >
                      Bayar Sekarang
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default OrdersPage;
