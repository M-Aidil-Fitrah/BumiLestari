import React, { useState } from 'react';

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    notes?: string;
  };
}

interface PaymentFormProps {
  customerData: CustomerData;
  onCustomerDataChange: (data: CustomerData) => void;
  className?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  customerData,
  onCustomerDataChange,
  className = ""
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Nama wajib diisi';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Nama minimal 2 karakter';
        } else {
          delete newErrors.name;
        }
        break;
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = 'Email wajib diisi';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Format email tidak valid';
        } else {
          delete newErrors.email;
        }
        break;
      
      case 'phone':
        const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
        if (!value.trim()) {
          newErrors.phone = 'Nomor telepon wajib diisi';
        } else if (!phoneRegex.test(value.replace(/\s/g, ''))) {
          newErrors.phone = 'Nomor telepon tidak valid';
        } else {
          delete newErrors.phone;
        }
        break;
      
      case 'street':
        if (!value.trim()) {
          newErrors.street = 'Alamat lengkap wajib diisi';
        } else if (value.trim().length < 10) {
          newErrors.street = 'Alamat terlalu singkat (minimal 10 karakter)';
        } else {
          delete newErrors.street;
        }
        break;
      
      case 'city':
        if (!value.trim()) {
          newErrors.city = 'Kota wajib diisi';
        } else {
          delete newErrors.city;
        }
        break;
      
      case 'province':
        if (!value.trim()) {
          newErrors.province = 'Provinsi wajib diisi';
        } else {
          delete newErrors.province;
        }
        break;
      
      case 'postalCode':
        const postalRegex = /^[0-9]{5}$/;
        if (!value.trim()) {
          newErrors.postalCode = 'Kode pos wajib diisi';
        } else if (!postalRegex.test(value)) {
          newErrors.postalCode = 'Kode pos harus 5 digit angka';
        } else {
          delete newErrors.postalCode;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (field: string, value: string) => {
    validateField(field, value);

    if (field.startsWith('address.')) {
      const addressField = field.replace('address.', '');
      onCustomerDataChange({
        ...customerData,
        address: {
          ...customerData.address,
          [addressField]: value
        }
      });
    } else {
      onCustomerDataChange({
        ...customerData,
        [field]: value
      });
    }
  };

  const provinces = [
    'Aceh','DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Yogyakarta',
    'Banten', 'Bali', 'Sumatera Utara', 'Sumatera Selatan', 'Sumatera Barat',
    'Riau', 'Lampung', 'Kalimantan Barat', 'Kalimantan Timur', 'Sulawesi Selatan',
    'Sulawesi Utara', 'Papua', 'Maluku', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur'
  ];

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-800 mb-6">Informasi Pembeli</h3>
      
      <form className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap *
            </label>
            <input
              type="text"
              id="name"
              value={customerData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none transition-colors ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Masukkan nama lengkap"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Nomor Telepon *
            </label>
            <input
              type="tel"
              id="phone"
              value={customerData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none transition-colors ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="08xxxxxxxxxx"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={customerData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="email@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Shipping Address */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Alamat Pengiriman</h4>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                Alamat Lengkap *
              </label>
              <textarea
                id="street"
                rows={3}
                value={customerData.address.street}
                onChange={(e) => handleInputChange('address.street', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none transition-colors resize-none ${
                  errors.street ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Jalan, Gang, Blok, Nomor Rumah, RT/RW"
              />
              {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  Kota/Kabupaten *
                </label>
                <input
                  type="text"
                  id="city"
                  value={customerData.address.city}
                  onChange={(e) => handleInputChange('address.city', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none transition-colors ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nama kota/kabupaten"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Kode Pos *
                </label>
                <input
                  type="text"
                  id="postalCode"
                  value={customerData.address.postalCode}
                  onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none transition-colors ${
                    errors.postalCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="12345"
                  maxLength={5}
                />
                {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">
                Provinsi *
              </label>
              <select
                id="province"
                value={customerData.address.province}
                onChange={(e) => handleInputChange('address.province', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none transition-colors ${
                  errors.province ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Catatan untuk Kurir (Opsional)
              </label>
              <textarea
                id="notes"
                rows={2}
                value={customerData.address.notes || ''}
                onChange={(e) => handleInputChange('address.notes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none transition-colors resize-none"
                placeholder="Contoh: Rumah cat biru, sebelah warung Bu Sri"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
