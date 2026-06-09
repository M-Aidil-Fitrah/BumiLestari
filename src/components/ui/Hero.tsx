import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const Hero = ({
  title = "BUMI LESTARI",
  onCtaClick
}: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    if (!containerRef.current || !videoWrapperRef.current || !textRef.current) return;

    // Initial entrance
    gsap.fromTo(textRef.current, 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power4.out' }
    );

    // Scroll pinned animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%', // Pin for 150% of viewport height
        pin: true,
        scrub: true,
      }
    });

    // Animate the clip-path of the video wrapper from a small circle to full screen
    tl.fromTo(videoWrapperRef.current,
      { clipPath: 'circle(10% at 50% 50%)' },
      { clipPath: 'circle(150% at 50% 50%)', ease: 'none' },
      0
    );

    // Animate the text to move up and fade out
    tl.to(textRef.current, {
      y: '-50vh',
      opacity: 0,
      scale: 1.5,
      ease: 'power2.in'
    }, 0);

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full bg-[#F5F3EE] flex items-center justify-center overflow-hidden"
    >
      {/* Massive Background Typography */}
      <h1 
        ref={textRef}
        className="absolute z-10 text-[12vw] font-black text-[#2C2C2C] leading-none text-center whitespace-nowrap mix-blend-difference pointer-events-none"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h1>

      {/* Center Image/Video that will expand */}
      <div 
        ref={videoWrapperRef}
        className="absolute inset-0 z-0 w-full h-full flex items-center justify-center bg-black"
        style={{ clipPath: 'circle(10% at 50% 50%)' }}
      >
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80" 
          alt="Nature Landscape" 
          className="w-full h-full object-cover opacity-80"
        />
        
        {/* Expanded Content inside the mask */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <p className="text-xl md:text-3xl italic mb-8 mt-40 opacity-90 max-w-2xl text-center font-light">
            "Satu langkah kecil untuk gaya hidup yang lebih baik."
          </p>
          <button 
            onClick={() => onCtaClick ? onCtaClick() : navigate('/marketplace')}
            className="magnetic px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white font-medium hover:bg-white hover:text-black transition-colors duration-300"
          >
            Mulai Perjalanan Anda
          </button>
        </div>
      </div>
    </section>
  );
};