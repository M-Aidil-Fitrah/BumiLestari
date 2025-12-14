import React, { useState } from 'react';
import { Building2, Wallet, Smartphone, Truck, CreditCard, Banknote } from 'lucide-react';

export interface PaymentMethodType {
  id: string;
  name: string;
  type: 'bank' | 'ewallet' | 'cod' | 'card';
  icon: string;
  description: string;
  fee?: number;
}

const paymentMethods: PaymentMethodType[] = [
  {
    id: 'bca',
    name: 'Transfer Bank BCA',
    type: 'bank',
    icon: 'Building2',
    description: 'Transfer manual ke rekening BCA',
    fee: 0
  },
  {
    id: 'mandiri',
    name: 'Transfer Bank Mandiri',
    type: 'bank',
    icon: 'Building2',
    description: 'Transfer manual ke rekening Mandiri',
    fee: 0
  },
  {
    id: 'gopay',
    name: 'GoPay',
    type: 'ewallet',
    icon: 'Wallet',
    description: 'Bayar dengan GoPay',
    fee: 0
  },
  {
    id: 'ovo',
    name: 'OVO',
    type: 'ewallet',
    icon: 'Wallet',
    description: 'Bayar dengan OVO',
    fee: 0
  },
  {
    id: 'dana',
    name: 'DANA',
    type: 'ewallet',
    icon: 'Wallet',
    description: 'Bayar dengan DANA',
    fee: 0
  },
  {
    id: 'cod',
    name: 'Bayar di Tempat (COD)',
    type: 'cod',
    icon: 'Banknote',
    description: 'Bayar saat barang diterima',
    fee: 5000
  }
];

interface PaymentMethodProps {
  selectedMethod: string;
  onMethodChange: (methodId: string) => void;
  className?: string;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selectedMethod,
  onMethodChange,
  className = ""
}) => {
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);

  const formatFee = (fee: number) => {
    if (fee === 0) return 'Gratis';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(fee);
  };

  const groupedMethods = {
    bank: paymentMethods.filter(method => method.type === 'bank'),
    ewallet: paymentMethods.filter(method => method.type === 'ewallet'),
    cod: paymentMethods.filter(method => method.type === 'cod')
  };

  const renderMethodGroup = (title: string, methods: PaymentMethodType[], groupKey: string) => {
    const getGroupIcon = () => {
      if (groupKey === 'bank') return <Building2 className="w-5 h-5 text-[#8B7355]" />;
      if (groupKey === 'ewallet') return <Smartphone className="w-5 h-5 text-[#8B7355]" />;
      if (groupKey === 'cod') return <Truck className="w-5 h-5 text-[#8B7355]" />;
      return null;
    };

    return (
    <div key={groupKey} className="mb-6">
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        {getGroupIcon()}
        <span>{title}</span>
      </h4>
      <div className="space-y-2">
        {methods.map((method) => (
          <div key={method.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div
              className={`p-4 cursor-pointer transition-colors duration-200 ${
                selectedMethod === method.id
                  ? 'bg-[#8B7355]/5 border-[#8B7355]'
                  : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => {
                onMethodChange(method.id);
                setExpandedMethod(expandedMethod === method.id ? null : method.id);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <input
                      type="radio"
                      checked={selectedMethod === method.id}
                      onChange={() => onMethodChange(method.id)}
                      className="w-4 h-4 text-[#8B7355] focus:ring-[#8B7355]"
                    />
                  </div>
                  {(() => {
                    const iconMap: { [key: string]: React.ReactNode } = {
                      'Building2': <Building2 className="w-6 h-6 text-gray-600" />,
                      'Wallet': <Wallet className="w-6 h-6 text-gray-600" />,
                      'Banknote': <Banknote className="w-6 h-6 text-gray-600" />
                    };
                    return iconMap[method.icon] || <CreditCard className="w-6 h-6 text-gray-600" />;
                  })()}
                  <div>
                    <div className="font-medium text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-500">{method.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    method.fee === 0 ? 'text-[#8B7355]' : 'text-gray-600'
                  }`}>
                    {formatFee(method.fee || 0)}
                  </div>
                  {method.fee && method.fee > 0 && (
                    <div className="text-xs text-gray-400">Biaya admin</div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            {selectedMethod === method.id && expandedMethod === method.id && (
              <div className="px-4 pb-4 bg-[#8B7355]/5 border-t border-[#8B7355]/20">
                <div className="mt-3">
                  {method.type === 'bank' && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-800">Instruksi Pembayaran:</h5>
                      <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                        <li>Transfer ke rekening: <strong>1234567890 (a.n. BumiLestari Store)</strong></li>
                        <li>Nominal: <strong>Sesuai total pembayaran</strong></li>
                        <li>Upload bukti transfer</li>
                        <li>Pesanan akan diproses setelah pembayaran dikonfirmasi</li>
                      </ol>
                    </div>
                  )}
                  
                  {method.type === 'ewallet' && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-800">Instruksi Pembayaran:</h5>
                      <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                        <li>Klik tombol "Bayar Sekarang"</li>
                        <li>Anda akan diarahkan ke aplikasi {method.name}</li>
                        <li>Konfirmasi pembayaran di aplikasi</li>
                        <li>Kembali ke halaman ini untuk konfirmasi</li>
                      </ol>
                    </div>
                  )}
                  
                  {method.type === 'cod' && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-800">Instruksi COD:</h5>
                      <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                        <li>Bayar saat barang diterima</li>
                        <li>Siapkan uang pas sesuai total pembayaran</li>
                        <li>Biaya admin COD: {formatFee(method.fee || 0)}</li>
                        <li>Pastikan ada yang menerima paket</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-800 mb-6">Pilih Metode Pembayaran</h3>
      
      {renderMethodGroup('Transfer Bank', groupedMethods.bank, 'bank')}
      {renderMethodGroup('E-Wallet', groupedMethods.ewallet, 'ewallet')}
      {renderMethodGroup('Bayar di Tempat', groupedMethods.cod, 'cod')}
    </div>
  );
};

export default PaymentMethod;