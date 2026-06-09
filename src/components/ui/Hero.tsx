import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Tag, TrendingUp, Package } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MagneticButton } from './MagneticButton';
import { TextReveal } from './TextReveal';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const Hero = ({
  title = "BumiLestari",
  subtitle = "untuk kehidupan berkelanjutan Anda",
  ctaText = "Jelajahi Produk",
  onCtaClick
}: HeroProps) => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    }
    navigate('/marketplace');
  };

  const featuredProducts = [
    {
      id: 1,
      name: 'Set Bambu Eco',
      image: '/images/bambueco.jpeg',
      tag: 'Terlaris',
      icon: Package
    },
    {
      id: 2,
      name: 'Diffuser Alami',
      image: '/images/diffuser.jpg',
      tag: 'Baru',
      icon: Tag
    },
    {
      id: 3,
      name: 'Lilin Organik',
      image: '/images/lilin.jpg',
      tag: 'Trending',
      icon: TrendingUp
    }
  ];

  useGSAP(() => {
    if (!heroRef.current) return;

    // Fade in section
    gsap.to(heroRef.current, { opacity: 1, duration: 1 });

    // Animate paragraph description
    gsap.fromTo('.hero-desc', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out' }
    );

    // Animate CTA
    gsap.fromTo('.hero-cta', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: 'back.out(1.7)' }
    );

    // Animate Cards with stagger and 3D rotation feel
    gsap.fromTo('.hero-card',
      { opacity: 0, y: 100, rotationX: -15 },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0, 
        duration: 1.2, 
        stagger: 0.2, 
        delay: 0.6, 
        ease: 'power4.out',
        transformPerspective: 1000
      }
    );

    // Parallax effect on cards container when scrolling
    gsap.to(imageContainerRef.current, {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

  }, { scope: heroRef });

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen bg-[#F5F3EE] overflow-hidden flex items-center justify-center opacity-0 pt-20 pb-10"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F3EE]/80 to-[#F5F3EE]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div ref={textContainerRef} className="text-left">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#2C2C2C] mb-4 overflow-hidden" style={{ fontFamily: 'var(--font-heading)' }}>
              <TextReveal delay={0.2}>{title}</TextReveal>
            </h1>
            <p className="text-2xl md:text-3xl text-[#8B7355] mb-8 italic overflow-hidden" style={{ fontFamily: 'var(--font-heading)' }}>
              <TextReveal delay={0.5}>{subtitle}</TextReveal>
            </p>
            <p className="hero-desc text-base md:text-lg text-gray-600 mb-8 max-w-lg leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Temukan koleksi produk ramah lingkungan yang dirancang untuk menciptakan gaya hidup berkelanjutan. 
              Dari peralatan rumah tangga hingga produk perawatan, semua dibuat dengan cinta untuk bumi.
            </p>
            
            <div className="hero-cta">
              <MagneticButton
                onClick={handleCtaClick}
                magneticForce={0.3}
                className="group flex items-center gap-3 bg-[#2C2C2C] text-white px-8 py-4 rounded-full font-medium transition-colors duration-300 hover:bg-[#1a1a1a]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </div>
          </div>

          {/* Right - Featured Products Cards */}
          <div ref={imageContainerRef} className="grid grid-cols-2 gap-4">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`hero-card relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group ${
                  index === 0 ? 'col-span-2 h-80' : 'h-64'
                }`}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity group-hover:opacity-90"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium mb-2">
                    {product.tag}
                  </span>
                  <h3 className="text-white text-xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                    {product.name}
                  </h3>
                  <div className="mt-2 text-white/80 flex items-center gap-1 text-sm group/btn overflow-hidden">
                    <span className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">View More</span>
                    <svg className="w-4 h-4 transform translate-y-full group-hover:translate-y-0 group-hover:translate-x-1 transition-all duration-500 delay-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};