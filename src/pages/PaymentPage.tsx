// src/pages/PaymentPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Leaf, Package, Loader2, CheckCircle2 } from 'lucide-react';
import { productService } from '@/lib/products';
import { orderService } from '@/lib/orders';
import type { Product } from '@/lib/supabase';

interface SnapCallbacks {
  onSuccess: (result: SnapResult) => void;
  onPending: (result: SnapResult) => void;
  onError: (result: SnapResult) => void;
  onClose: () => void;
}

interface SnapResult {
  order_id: string;
  payment_type?: string;
  transaction_status?: string;
}

interface SnapInstance {
  pay: (token: string, callbacks: SnapCallbacks) => void;
}

declare global {
  interface Window {
    snap?: SnapInstance;
  }
}

interface CartItem {
  product: Product;
  quantity: number;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadProductData();
  }, [location]);

  const loadProductData = async () => {
    setIsLoading(true);
    const state = location.state as { productId?: string; quantity?: number } | null;

    if (!state?.productId) {
      navigate('/marketplace');
      return;
    }

    try {
      const product = await productService.getProduct(state.productId);
      if (!product) {
        navigate('/marketplace');
        return;
      }
      setCartItem({ product, quantity: state.quantity ?? 1 });
    } catch (err) {
      const error = err as Error;
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = cartItem
    ? cartItem.product.price * cartItem.quantity
    : 0;

  const handleCheckout = async () => {
    if (!cartItem) return;

    if (!window.snap) {
      setErrorMsg('Sistem pembayaran belum siap. Coba muat ulang halaman.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    try {
      const { token, orderId } = await orderService.createCheckoutAndGetSnapToken(
        [{
          product_id: cartItem.product.id,
          quantity: cartItem.quantity,
          price: cartItem.product.price,
          name: cartItem.product.name,
        }],
        totalAmount
      );

      setIsProcessing(false);

      window.snap.pay(token, {
        onSuccess: (result) => {
          // Fire-and-forget: update status then redirect
          void orderService.updateOrderStatus(result.order_id, 'success').then(() => {
            setIsSuccess(true);
            setTimeout(() => navigate('/orders'), 2500);
          });
        },
        onPending: (_result) => {
          // Order already created, user can pay later from /orders
          navigate('/orders');
        },
        onError: (result) => {
          void orderService.updateOrderStatus(result.order_id, 'failed').catch(() => null);
          navigate('/orders');
        },
        onClose: () => {
          // Keep the pending order — user can pay later
          navigate('/orders');
        },
      });
    } catch (err) {
      const error = err as Error;
      setIsProcessing(false);
      setErrorMsg(error.message);
      if (error.message.toLowerCase().includes('logged in')) {
        navigate('/login');
      }
    }
  };

  // --- SUCCESS STATE ---
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-12 text-center shadow-xl max-w-md w-full border border-gray-100">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-200">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-[#2C2C2C] mb-3">Pembayaran Berhasil!</h1>
          <p className="text-gray-500 mb-2">Terima kasih telah berbelanja di BumiLestari 🌿</p>
          <p className="text-sm text-gray-400">Mengalihkan ke halaman pesanan...</p>
        </div>
      </div>
    );
  }

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-[#8B7355] animate-spin" />
          <p className="text-gray-500 font-medium">Memuat halaman pembayaran...</p>
        </div>
      </div>
    );
  }

  if (!cartItem) return null;

  const formatRp = (amount: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="min-h-screen bg-[#F5F3EE] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#8B7355] hover:text-[#2C2C2C] font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>
        <div className="flex items-center gap-2 text-[#2C2C2C] font-bold text-lg">
          <Leaf className="w-5 h-5 text-[#8B7355]" />
          BumiLestari
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          Pembayaran Aman
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-[#2C2C2C] mb-2">Ringkasan Pesanan</h1>
        <p className="text-gray-500 mb-8 text-sm">
          Periksa pesananmu sebelum melanjutkan pembayaran via Midtrans.
        </p>

        {/* Product Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
          <div className="flex gap-5 items-center">
            {cartItem.product.image ? (
              <img
                src={cartItem.product.image}
                alt={cartItem.product.name}
                className="w-24 h-24 object-cover rounded-xl border border-gray-100 flex-shrink-0"
              />
            ) : (
              <div className="w-24 h-24 bg-[#F5F3EE] rounded-xl flex items-center justify-center flex-shrink-0">
                <Package className="w-8 h-8 text-[#8B7355]" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-xs text-[#8B7355] font-medium mb-1 uppercase tracking-wider">
                {cartItem.product.category ?? 'Produk BumiLestari'}
              </p>
              <h2 className="font-bold text-[#2C2C2C] text-lg leading-snug mb-1">
                {cartItem.product.name}
              </h2>
              <p className="text-sm text-gray-500">Jumlah: {cartItem.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#2C2C2C] text-lg">{formatRp(cartItem.product.price)}</p>
              <p className="text-xs text-gray-400">per item</p>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
          <h3 className="font-semibold text-[#2C2C2C] mb-4">Rincian Pembayaran</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cartItem.quantity} item)</span>
              <span>{formatRp(totalAmount)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Ongkos Kirim</span>
              <span className="text-green-600 font-medium">Gratis</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-[#2C2C2C] text-base">
              <span>Total Pembayaran</span>
              <span className="text-[#8B7355]">{formatRp(totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
            {errorMsg}
          </div>
        )}

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full bg-[#2C2C2C] text-white py-4 rounded-2xl font-bold text-base hover:bg-black transition-all duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5" />
              Bayar Sekarang — {formatRp(totalAmount)}
            </>
          )}
        </button>

        <p className="text-xs text-center text-gray-400 mt-4">
          Dengan melanjutkan, kamu akan diarahkan ke halaman pembayaran aman Midtrans.
          Semua metode pembayaran tersedia (Transfer Bank, QRIS, E-Wallet, dll).
        </p>
      </main>
    </div>
  );
};

export default PaymentPage;