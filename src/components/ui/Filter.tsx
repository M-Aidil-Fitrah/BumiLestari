import React, { useState } from 'react';
import { categories } from '../../data/products';

export interface FilterOptions {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

interface FilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, className = "" }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'Semua Kategori',
    minPrice: 0,
    maxPrice: 1000000,
    minRating: 0,
    sortBy: 'name'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      category: 'Semua Kategori',
      minPrice: 0,
      maxPrice: 1000000,
      minRating: 0,
      sortBy: 'name'
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl border border-[#8B7355]/20 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <h3 className="text-xl font-bold text-[#2C2C2C] flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
          <svg className="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filter & Urutkan
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg hover:bg-[#8B7355]/10 text-[#8B7355] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExpanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
          </svg>
        </button>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ${isExpanded ? 'block' : 'hidden lg:grid'}`}>
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
            Kategori
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full p-3 bg-white border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none transition-all font-medium text-[#2C2C2C]"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
            Harga
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
              className="p-3 bg-white border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none transition-all font-medium text-[#2C2C2C]"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
              className="p-3 bg-white border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none transition-all font-medium text-[#2C2C2C]"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
            Rating
          </label>
          <select
            value={filters.minRating}
            onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
            className="w-full p-3 bg-white border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none transition-all font-medium text-[#2C2C2C]"
          >
            <option value={0}>Semua Rating</option>
            <option value={4}>4+ Bintang</option>
            <option value={4.5}>4.5+ Bintang</option>
            <option value={4.8}>4.8+ Bintang</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
            Urutkan
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value as FilterOptions['sortBy'])}
            className="w-full p-3 bg-white border border-[#8B7355]/30 rounded-xl focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] outline-none transition-all font-medium text-[#2C2C2C]"
          >
            <option value="name">Nama A-Z</option>
            <option value="price-asc">Harga Terendah</option>
            <option value="price-desc">Harga Tertinggi</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="newest">Terbaru</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="w-full bg-[#2C2C2C] hover:bg-[#1a1a1a] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
