import { motion } from 'framer-motion';

export const AboutSection = () => {
  const features = [
    {
      number: '01',
      title: 'Crafted With Intention',
      description: 'Setiap produk kami dibuat dengan perhatian terhadap detail dan dampak lingkungan. Kami memilih bahan-bahan terbaik yang ramah lingkungan untuk memastikan kualitas dan keberlanjutan.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600'
    },
    {
      number: '02',
      title: 'Scents That Tell A Story',
      description: 'Koleksi produk kami dirancang untuk menciptakan pengalaman yang bermakna. Dari aroma natural hingga tekstur organik, semuanya bercerita tentang komitmen kami pada bumi.',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600'
    },
    {
      number: '03',
      title: 'Designed For Serenity',
      description: 'Menciptakan ketenangan dalam kehidupan sehari-hari melalui produk yang tidak hanya indah, tetapi juga bertanggung jawab terhadap lingkungan dan masa depan planet kita.',
      image: 'https://images.unsplash.com/photo-1615486511262-2f3fa7c54c81?w=600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <span>Learn More</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
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
              Discover How Serenity Can Transform Your Space Into A Haven Of Calm
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
