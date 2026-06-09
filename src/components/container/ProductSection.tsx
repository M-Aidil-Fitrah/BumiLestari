import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/lib/supabase';
import { productService } from '@/lib/products';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const hardcodedFallback: Product[] = [
  {
    id: '1',
    name: 'Set Botol Minum Bambu',
    category: 'Lifestyle',
    price: 150000,
    image: '/images/bambueco.jpeg',
    category_id: '',
    rating: 0,
    reviews_count: 0,
    description: '',
    stock: 0,
    seller: '',
    tags: [],
    is_featured: true,
    badge: null,
    created_at: '',
    updated_at: ''
  },
  {
    id: '2',
    name: 'Diffuser Aromaterapi',
    category: 'Home',
    price: 250000,
    image: '/images/diffuser.jpg',
    category_id: '',
    rating: 0,
    reviews_count: 0,
    description: '',
    stock: 0,
    seller: '',
    tags: [],
    is_featured: true,
    badge: null,
    created_at: '',
    updated_at: ''
  },
  {
    id: '3',
    name: 'Lilin Kedelai Organik',
    category: 'Home',
    price: 85000,
    image: '/images/lilin.jpg',
    category_id: '',
    rating: 0,
    reviews_count: 0,
    description: '',
    stock: 0,
    seller: '',
    tags: [],
    is_featured: true,
    badge: null,
    created_at: '',
    updated_at: ''
  }
];

export const ProductSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await productService.getProducts();
        if (data && data.length > 0) {
          setFeaturedProducts(data.slice(0, 3));
        } else {
          setFeaturedProducts(hardcodedFallback);
        }
      } catch (err) {
        console.error('Error loading featured products:', err);
        setFeaturedProducts(hardcodedFallback);
      }
    };
    loadFeatured();
  }, []);

  useGSAP(() => {
    if (!sectionRef.current || featuredProducts.length === 0) return;

    // Fast scroll skew effect
    let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".product-skew-item", "skewY", "deg"), // fast
        clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees. 

    gsap.to(".product-skew-item", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -300);
          // only do something if the skew is MORE severe. Remember, we're always tweening back to 0
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
          }
        }
      }
    });

    // Parallax entrance for products
    const items = gsap.utils.toArray<HTMLElement>('.product-item-container');
    items.forEach((item, i) => {
      // Different speed for odd/even to enhance asymmetric feel
      const speed = i % 2 === 0 ? 100 : 200;
      gsap.fromTo(item, 
        { y: speed, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 50%",
            scrub: 1
          }
        }
      );
    });

  }, { dependencies: [featuredProducts], scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-32 bg-[#F5F3EE] relative overflow-hidden">
      <div className="max-w-[90vw] mx-auto">
        
        {/* Header Asymmetric */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 gap-8">
          <h2 className="text-6xl md:text-8xl font-bold text-[#2C2C2C] max-w-3xl leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Elegance <br/> <span className="italic text-[#8B7355] font-light">& Sustainability</span>
          </h2>
          <button
            onClick={() => navigate('/marketplace')}
            className="magnetic flex items-center gap-4 bg-transparent border border-[#2C2C2C] text-[#2C2C2C] px-8 py-4 rounded-full font-medium hover:bg-[#2C2C2C] hover:text-white transition-all duration-300"
          >
            <span>Koleksi Lengkap</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Asymmetric Grid */}
        <div className="flex flex-col gap-32">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`product-item-container w-full flex ${index % 2 !== 0 ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className="w-full md:w-[45vw] group cursor-pointer"
                onClick={() => navigate(`/marketplace/product/${product.id}`)}
              >
                {/* Skew Container */}
                <div className="product-skew-item origin-center">
                  <div className="relative overflow-hidden aspect-[4/5] rounded-none mb-6">
                    <img 
                      src={product.image || ''} 
                      alt={product.name}
                      className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out"
                    />
                    
                    {/* Floating Hover Text */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-white text-lg tracking-widest uppercase border border-white/50 px-6 py-2 rounded-full backdrop-blur-sm">View</span>
                    </div>
                  </div>
                  
                  {/* Product Details outside card */}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        {product.name}
                      </h3>
                    </div>
                    <span className="text-xl font-medium text-[#8B7355]">
                      Rp {product.price?.toLocaleString('id-ID')}
                    </span>
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
