import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber?: string;
  customerName?: string;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isOpen,
  onClose,
  orderNumber = `BL${Date.now()}`,
  customerName = "Pelanggan"
}) => {
  const navigate = useNavigate();

  // Auto close modal and redirect after 5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        handleGoToHome();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleGoToHome = () => {
    onClose();
    navigate('/');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
        <div className="p-6 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Pembayaran Berhasil! 🎉
          </h2>
          
          <p className="text-gray-600 mb-4">
            Terima kasih <span className="font-semibold text-green-600">{customerName}</span>! 
            Pesanan Anda telah berhasil diproses.
          </p>

          {/* Order Details */}
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600 mb-1">Nomor Pesanan:</div>
            <div className="font-bold text-lg text-green-600 mb-3">#{orderNumber}</div>
            
            <div className="text-sm text-gray-600">
              <p className="mb-1">📧 Konfirmasi telah dikirim ke email Anda</p>
              <p className="mb-1">📱 Status pesanan dapat dipantau via WhatsApp</p>
              <p>🚚 Estimasi pengiriman: 2-4 hari kerja</p>
            </div>
          </div>

          {/* Environmental Message */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <span className="text-2xl">🌱</span>
            </div>
            <p className="text-sm text-blue-700">
              Dengan memilih produk ramah lingkungan, Anda telah berkontribusi 
              untuk kelestarian bumi. Terima kasih telah menjadi bagian dari 
              <span className="font-semibold"> BumiLestari</span>!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoToHome}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Kembali ke Beranda
            </button>
            
            <button
              onClick={() => {
                // In real app, this would open a new tab with order tracking
                alert('Fitur pelacakan pesanan akan segera hadir!');
              }}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Lacak Pesanan
            </button>
          </div>

          {/* Auto redirect info */}
          <p className="text-xs text-gray-400 mt-4">
            Otomatis kembali ke beranda dalam 5 detik...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;