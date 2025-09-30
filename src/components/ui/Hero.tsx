import { useScrollToSection } from '../../hooks/useScrollAnimation';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const Hero = ({
  title = "BumiLestari",
  subtitle = "Marketplace Produk Ramah Lingkungan",
  ctaText = "Jelajahi Produk",
  onCtaClick
}: HeroProps) => {
  const { scrollToSection } = useScrollToSection();

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      scrollToSection('products');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-100 rounded-full opacity-10 animate-spin slow"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo/Icon */}
        <div className="mb-8 animate-bounce">
          <div className="w-20 h-20 mx-auto bg-green-600 rounded-full flex items-center justify-center text-white text-3xl">
            🌱
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 animate-fade-in-up">
          <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up delay-200">
          {subtitle}
        </p>

        {/* Description */}
        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto animate-fade-in-up delay-300">
          Temukan produk ramah lingkungan terbaik untuk gaya hidup berkelanjutan. 
          Dari tote bag canvas organik hingga sabun natural, wujudkan komitmen Anda untuk bumi.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-500">
          <button
            onClick={handleCtaClick}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            {ctaText} 🛍️
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300"
          >
            Pelajari Lebih Lanjut
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up delay-700">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">1000+</div>
            <div className="text-gray-600">Produk Ramah Lingkungan</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-600">Pelanggan Puas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">99%</div>
            <div className="text-gray-600">Produk Berkelanjutan</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};