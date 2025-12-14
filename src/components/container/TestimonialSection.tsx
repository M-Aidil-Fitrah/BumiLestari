import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Kualitasnya luar biasa, dari tekstur hingga desainnya. Setiap detail terasa sangat diperhatikan. Ini benar-benar mengubah rutinitas malam saya!",
      author: "Ela Soleha",
      bgColor: 'bg-[#F5F3EE]',
      image: '/images/avatar1.jpg'
    },
    {
      id: 2,
      quote: "Saya sangat suka betapa berkelanjutan dan indahnya produk-produk ini. Mereka membawa rasa tenang ke rumah saya sambil ramah lingkungan. Sangat direkomendasikan!",
      author: "Sarah Putri",
      bgColor: 'bg-[#2C2C2C]',
      textColor: 'text-white',
      image: '/images/avatar2.jpg'
    },
    {
      id: 3,
      quote: "Setiap produk menceritakan kisah kerajinan dan perhatian. Aroma alaminya luar biasa, dan saya merasa senang mengetahui mereka ramah lingkungan.",
      author: "Budi Santoso",
      bgColor: 'bg-[#F5F3EE]',
      image: '/images/avatar3.jpg'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F5F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Quote className="w-10 h-10 text-gray-400" />
            <h2 
              className="text-4xl md:text-5xl font-bold text-gray-900"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Apa Kata Pelanggan Kami?
            </h2>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${testimonial.bgColor} ${testimonial.textColor || 'text-gray-900'} rounded-3xl p-8 hover:shadow-xl transition-all duration-300`}
            >
              {/* Quote Icon */}
              <Quote className={`w-8 h-8 mb-6 ${testimonial.textColor === 'text-white' ? 'text-white/30' : 'text-gray-300'}`} />

              {/* Quote Text */}
              <p 
                className="text-base leading-relaxed mb-6"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img src={testimonial.image} alt={testimonial.author} className="w-10 h-10 rounded-full object-cover" />
                <p 
                  className="font-semibold"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {testimonial.author}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
