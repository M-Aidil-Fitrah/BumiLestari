import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = ""
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          visiblePages.push(i);
        }
        visiblePages.push('...');
        visiblePages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        visiblePages.push(1);
        visiblePages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          visiblePages.push(i);
        }
      } else {
        visiblePages.push(1);
        visiblePages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          visiblePages.push(i);
        }
        visiblePages.push('...');
        visiblePages.push(totalPages);
      }
    }
    
    return visiblePages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#8B7355]/20 p-6 ${className}`}>
      {/* Items info */}
      <div className="text-sm text-[#2C2C2C] font-medium" style={{ fontFamily: 'var(--font-body)' }}>
        Menampilkan <span className="font-bold text-[#8B7355]">{startItem}</span> sampai{' '}
        <span className="font-bold text-[#8B7355]">{endItem}</span> dari{' '}
        <span className="font-bold text-[#8B7355]">{totalItems}</span> produk
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
            currentPage === 1
              ? 'text-gray-300 cursor-not-allowed bg-gray-100'
              : 'text-[#2C2C2C] hover:bg-[#8B7355]/10 hover:text-[#8B7355] cursor-pointer'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page numbers */}
        {getVisiblePages().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-400 font-bold">...</span>
            ) : (
              <button
                type="button"
                onClick={() => onPageChange(page as number)}
                className={`min-w-[44px] px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#2C2C2C] text-white shadow-md'
                    : 'text-[#2C2C2C] hover:bg-[#8B7355]/10 hover:text-[#8B7355] cursor-pointer'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
            currentPage === totalPages
              ? 'text-gray-300 cursor-not-allowed bg-gray-100'
              : 'text-[#2C2C2C] hover:bg-[#8B7355]/10 hover:text-[#8B7355] cursor-pointer'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;