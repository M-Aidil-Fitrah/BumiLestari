import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/lib/supabase';
import { ArrowRight, Star, ShoppingBag } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextReveal } from '../ui/TextReveal';
import { MagneticButton } from '../ui/MagneticButton';

interface ProductSectionProps {
  title?: string;
  showAll?: boolean;
  maxProducts?: number;
  categoryFilter?: string;
}

export const ProductSection = ({
  title = "Produk",
  maxProducts = 3,
}: ProductSectionProps) => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  // Mock data for display purposes
  const [featuredProducts] = useState<Partial<Product>[]>([
    {
      id: '1',
      name: 'Set Botol Minum Bambu',
      category: 'Lifestyle',
      price: 150000,
      rating: 4.8,
      image: '/images/bambueco.jpeg'
    },
    {
      id: '2',
      name: 'Diffuser Aromaterapi',
      category: 'Home',
      price: 250000,
      rating: 4.9,
      image: '/images/diffuser.jpg'
    },
    {
      id: '3',
      name: 'Lilin Kedelai Organik',
      category: 'Home',
      price: 85000,
      rating: 4.7,
      image: '/images/lilin.jpg'
    }
  ]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo('.product-header-btn',
      { opacity: 0, x: 50 },
      { 
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.product-header-btn',
          start: 'top 90%',
        }
      }
    );

    gsap.fromTo('.product-card',
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.product-grid',
          start: 'top 85%',
        }
      }
    );

  }, { scope: sectionRef });

  const handleProductClick = (product: Partial<Product>) => {
    navigate(`/marketplace/product/${product.id}`);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-[#1a1a1a] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white overflow-hidden" style={{ fontFamily: 'var(--font-heading)' }}>
            <TextReveal>{title}</TextReveal>
          </h2>
          <div className="product-header-btn">
            <MagneticButton
              onClick={() => navigate('/marketplace')}
              className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-medium transition-colors hover:bg-gray-200"
              style={{ fontFamily: 'var(--font-body)' }}
              magneticForce={0.2}
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
          </div>
        </div>

        {/* Products Grid */}
        <div className="product-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.slice(0, maxProducts).map((product, index) => (
            <div
              key={product.id}
              className="product-card group cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              {/* Product Card */}
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                {/* Badge */}
                {index === 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    TERLARIS
                  </div>
                )}
                
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={product.image || ''} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 
                        className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#8B7355] transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {product.name}
                      </h3>
                      <p 
                        className="text-sm text-gray-500"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {product.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-bold text-gray-700">{product.rating}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mt-4">
                    <span 
                      className="text-2xl font-bold text-gray-900"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Rp {product.price?.toLocaleString('id-ID')}
                    </span>
                    <button className="flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-full group-hover:bg-[#8B7355] transition-all duration-300 group-hover:scale-110 shadow-md">
                      <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
