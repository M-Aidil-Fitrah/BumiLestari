import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      number: '01',
      title: 'Crafted With Care',
      description: 'Setiap produk BumiLestari dipilih dengan cermat untuk memastikan kualitas terbaik dan dampak minimal terhadap lingkungan. Kami hanya bekerja sama dengan produsen yang berkomitmen pada keberlanjutan.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800'
    },
    {
      number: '02',
      title: 'Sustainable Materials',
      description: 'Dari bambu organik hingga bahan daur ulang, setiap produk menggunakan material ramah lingkungan yang dapat terurai secara alami atau didaur ulang dengan mudah.',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800'
    },
    {
      number: '03',
      title: 'Designed For Earth',
      description: 'BumiLestari hadir untuk memudahkan Anda menjalani gaya hidup berkelanjutan tanpa mengorbankan kualitas dan estetika. Bersama kita ciptakan masa depan yang hijau.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
    }
  ];

  useGSAP(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    // Calculate total scroll distance needed:
    // Total width of container minus viewport width
    const walkDistance = container.scrollWidth - window.innerWidth;

    gsap.to(container, {
      x: -walkDistance,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${walkDistance}`,
        pin: true,
        scrub: 1, // Smooth scrubbing
        invalidateOnRefresh: true, // Recalculates on resize
      }
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative h-screen bg-[#111] overflow-hidden flex items-center">
      {/* Background massive typography */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <h2 className="text-[20vw] font-black text-white whitespace-nowrap">OUR MISSION</h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef} 
        className="flex gap-16 px-[10vw] items-center h-full w-[max-content]"
      >
        
        {/* Intro Text Card */}
        <div className="w-[40vw] flex-shrink-0 text-white">
          <h2 className="text-6xl md:text-8xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Tentang <br/> <span className="text-[#8B7355]">Kami</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
            Menyediakan produk ramah lingkungan untuk gaya hidup berkelanjutan. Kami percaya bahwa setiap pilihan yang kita buat hari ini akan membentuk dunia esok.
          </p>
        </div>

        {/* Feature Cards Gallery */}
        {features.map((feature) => (
          <div 
            key={feature.number} 
            className="w-[70vw] md:w-[50vw] h-[70vh] flex-shrink-0 relative rounded-3xl overflow-hidden group"
          >
            <img 
              src={feature.image} 
              alt={feature.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
              <div className="flex items-center gap-6 mb-6">
                <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white/80 to-white/20">
                  {feature.number}
                </span>
                <div className="h-[2px] flex-1 bg-white/20"></div>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                {feature.title}
              </h3>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 font-light">
                {feature.description}
              </p>
              <button className="magnetic flex items-center gap-3 text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                <span>Pelajari Lebih Lanjut</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        
        {/* End Spacer */}
        <div className="w-[10vw] flex-shrink-0 h-full"></div>

      </div>
    </section>
  );
};
