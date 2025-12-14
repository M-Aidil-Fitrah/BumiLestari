import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const AboutSection = () => {
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
      image: 'https://images.unsplash.com/photo-1615486511262-2f3fa7c54c81?w=600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-5xl md:text-6xl font-bold text-[#2C2C2C] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Tentang BumiLestari
          </h2>
          <p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Menyediakan produk ramah lingkungan untuk gaya hidup berkelanjutan
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.slice(0, 2).map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-10 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-start justify-between mb-6">
                  <span 
                    className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-300"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {feature.number}
                  </span>
                </div>
                <h3 
                  className="text-3xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-gray-600 leading-relaxed mb-6"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {feature.description}
                </p>
                <button className="flex items-center gap-2 text-gray-900 font-medium group-hover:gap-3 transition-all">
                  <span>Pelajari Lebih Lanjut</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Third Feature with Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-10">
            <span 
              className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-300"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {features[2].number}
            </span>
            <h3 
              className="text-3xl font-bold text-gray-900 mt-6 mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {features[2].title}
            </h3>
            <p 
              className="text-gray-600 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {features[2].description}
            </p>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl">
            <img 
              src={features[2].image} 
              alt={features[2].title}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 relative h-96 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
        >
          <img 
            src="https://images.unsplash.com/photo-1608181563494-bb4d8939afa4?w=1200" 
            alt="Sustainable Living"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:bg-white transition-all"
            >
              <svg className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p 
              className="text-white text-xl md:text-2xl font-medium"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Discover How BumiLestari Transforms Your Lifestyle Into A Sustainable Journey
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

