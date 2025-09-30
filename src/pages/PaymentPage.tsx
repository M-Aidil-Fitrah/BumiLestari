import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { dummyProducts } from '../data/products';
import PaymentMethod from '../components/ui/PaymentMethod';
import OrderSummary, { type OrderItem } from '../components/ui/OrderSummary';
import PaymentForm, { type CustomerData } from '../components/ui/PaymentForm';
import PaymentSuccessModal from '../components/ui/PaymentSuccessModal';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get product data from navigation state or redirect if not available
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Payment states
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      province: '',
      postalCode: '',
      notes: ''
    }
  });
  
  // Modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Initialize order data from navigation state or URL params
  useEffect(() => {
    const state = location.state as { productId?: string; quantity?: number } | null;
    
    if (state?.productId) {
      const product = dummyProducts.find(p => p.id === state.productId);
      if (product) {
        setOrderItems([{
          product,
          quantity: state.quantity || 1
        }]);
      } else {
        // Product not found, redirect to marketplace
        navigate('/marketplace');
        return;
      }
    } else {
      // No product data, redirect to marketplace
      navigate('/marketplace');
      return;
    }
    
    setIsLoading(false);
  }, [location, navigate]);

  // Calculate payment fee based on selected method
  const getPaymentFee = () => {
    if (selectedPaymentMethod === 'cod') return 5000;
    return 0;
  };

  // Validate form
  const isFormValid = () => {
    return (
      customerData.name.trim() &&
      customerData.email.trim() &&
      customerData.phone.trim() &&
      customerData.address.street.trim() &&
      customerData.address.city.trim() &&
      customerData.address.province.trim() &&
      customerData.address.postalCode.trim() &&
      selectedPaymentMethod &&
      orderItems.length > 0
    );
  };

  // Handle payment submission
  const handlePayment = () => {
    if (!isFormValid()) {
      alert('Mohon lengkapi semua data yang diperlukan');
      return;
    }

    // Simulate payment processing
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat halaman pembayaran...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Kembali
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Pembayaran</h1>
            </div>
            
            {/* Security Badge */}
            <div className="flex items-center space-x-2 text-green-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Pembayaran Aman</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Form */}
            <PaymentForm
              customerData={customerData}
              onCustomerDataChange={setCustomerData}
            />

            {/* Payment Method */}
            <PaymentMethod
              selectedMethod={selectedPaymentMethod}
              onMethodChange={setSelectedPaymentMethod}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <OrderSummary
                items={orderItems}
                shippingCost={0} // Free shipping for eco-friendly products
                paymentFee={getPaymentFee()}
              />

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={!isFormValid()}
                className={`w-full mt-6 py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  isFormValid()
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isFormValid() ? 'Bayar Sekarang' : 'Lengkapi Data Pembayaran'}
              </button>

              {/* Security Info */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-blue-800 text-sm">Pembayaran Terjamin</h4>
                    <p className="text-blue-600 text-xs mt-1">
                      Data Anda dilindungi dengan enkripsi SSL. Kami tidak menyimpan informasi kartu kredit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Support Info */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 text-sm mb-2">Butuh Bantuan?</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>📞 WhatsApp: +62 812-3456-7890</p>
                  <p>📧 Email: support@bumilestari.com</p>
                  <p>🕐 Layanan: Senin-Jumat 09:00-17:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        customerName={customerData.name}
      />
    </div>
  );
};

export default PaymentPage;