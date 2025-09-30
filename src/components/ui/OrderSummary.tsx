import React from 'react';
import type { Product } from '../../data/products';

export interface OrderItem {
  product: Product;
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  shippingCost: number;
  paymentFee: number;
  className?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  shippingCost,
  paymentFee,
  className = ""
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const total = subtotal + shippingCost + paymentFee;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-800 mb-6">Ringkasan Pesanan</h3>
      
      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 flex-shrink-0">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-800 text-sm line-clamp-2">
                {item.product.name}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {item.product.seller}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-600">
                  Qty: {item.quantity}
                </span>
                <span className="font-semibold text-green-600">
                  {formatPrice(item.product.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} item)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Ongkos Kirim</span>
          <span>{shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}</span>
        </div>
        
        {paymentFee > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Biaya Admin</span>
            <span>{formatPrice(paymentFee)}</span>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold text-gray-800">
            <span>Total Pembayaran</span>
            <span className="text-green-600">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Discount Info */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-green-600 text-lg">🎉</span>
          <div>
            <h4 className="font-medium text-green-800">Hemat Lingkungan!</h4>
            <p className="text-sm text-green-600">
              Dengan membeli produk ramah lingkungan, Anda turut menjaga kelestarian bumi.
            </p>
          </div>
        </div>
      </div>

      {/* Estimated Delivery */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 text-lg">🚚</span>
          <div>
            <h4 className="font-medium text-blue-800">Estimasi Pengiriman</h4>
            <p className="text-sm text-blue-600">
              2-4 hari kerja (untuk area Jabodetabek)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;