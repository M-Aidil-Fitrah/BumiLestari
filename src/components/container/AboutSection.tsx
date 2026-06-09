import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextReveal } from '../ui/TextReveal';
import { MagneticButton } from '../ui/MagneticButton';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      number: '01',
      title: 'Crafted With Care',
      description: 'Setiap produk BumiLestari dipilih dengan cermat untuk memastikan kualitas terbaik dan dampak minimal terhadap lingkungan. Kami hanya bekerja sama dengan produsen yang berkomitmen pada keberlanjutan.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600'
    },
    {
      number: '02',
      title: 'Sustainable Materials',
      description: 'Dari bambu organik hingga bahan daur ulang, setiap produk di BumiLestari menggunakan material ramah lingkungan yang dapat terurai secara alami atau didaur ulang dengan mudah.',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600'
    },
    {
      number: '03',
      title: 'Designed For Earth',
      description: 'BumiLestari hadir untuk memudahkan Anda menjalani gaya hidup berkelanjutan tanpa mengorbankan kualitas dan estetika. Bersama-sama kita ciptakan masa depan yang lebih hijau.',
      image: 'https://static.tweaktown.com/news/1/0/101704_651651_microsoft-confirms-its-creating-new-ai-thats-trained-on-nasas-100-petabytes-of-earth-data_full.png'
    }
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Fanned-out effect for the first two cards on scroll
    const cards = gsap.utils.toArray<HTMLElement>('.feature-card');
    
    cards.forEach((card, i) => {
      gsap.fromTo(card, 
        { 
          y: 100, 
          opacity: 0, 
          rotation: i % 2 === 0 ? -5 : 5 
        },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });

    // Third feature and video animation
    gsap.fromTo('.feature-third', 
      { y: 100, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.feature-third',
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('.video-container', 
      { scale: 0.9, opacity: 0 },
      { 
        scale: 1, opacity: 1, duration: 1.2, ease: 'power4.out',
        scrollTrigger: {
          trigger: '.video-container',
          start: 'top 80%',
        }
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-[#2C2C2C] mb-4 overflow-hidden" style={{ fontFamily: 'var(--font-heading)' }}>
            <TextReveal>Tentang BumiLestari</TextReveal>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto overflow-hidden" style={{ fontFamily: 'var(--font-body)' }}>
            <TextReveal delay={0.2}>Menyediakan produk ramah lingkungan untuk gaya hidup berkelanjutan</TextReveal>
          </p>
        </div>

        {/* Feature Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 mb-16 perspective-1000">
          {features.slice(0, 2).map((feature) => (
            <div key={feature.number} className="feature-card group origin-bottom">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-10 hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-300 to-gray-400" style={{ fontFamily: 'var(--font-heading)' }}>
                    {feature.number}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                  {feature.description}
                </p>
                <MagneticButton className="flex items-center gap-2 text-gray-900 font-medium transition-all" magneticForce={0.2}>
                  <span>Pelajari Lebih Lanjut</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </div>
            </div>
          ))}
        </div>

        {/* Third Feature with Image */}
        <div className="feature-third grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-10 border border-gray-100">
            <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-300 to-gray-400" style={{ fontFamily: 'var(--font-heading)' }}>
              {features[2].number}
            </span>
            <h3 className="text-3xl font-bold text-gray-900 mt-6 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {features[2].title}
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              {features[2].description}
            </p>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl group">
            <img 
              src={features[2].image} 
              alt={features[2].title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        {/* Video Section */}
        <div className="video-container mt-16 relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/j4qezIj3tsc"
              title="BumiLestari - Sustainable Living"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
