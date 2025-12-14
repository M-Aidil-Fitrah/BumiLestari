import { motion } from 'framer-motion';

export const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      quote: "The quality is outstanding, from the texture to the design. Every detail feels intentional. This has completely transformed my evening routine!",
      author: "Ela Soleha",
      bgColor: 'bg-[#F5F3EE]'
    },
    {
      id: 2,
      quote: "I love how sustainable and beautiful these products are. They bring a sense of calm to my space while being good for the environment. Highly recommend!",
      author: "Sarah Smith",
      bgColor: 'bg-[#2C2C2C]',
      textColor: 'text-white'
    },
    {
      id: 3,
      quote: "Every product tells a story of craftsmanship and care. The natural scents are incredible, and I feel good knowing they're eco-friendly.",
      author: "Mike Foster",
      bgColor: 'bg-[#F5F3EE]'
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
            <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <h2 
              className="text-4xl md:text-5xl font-bold text-gray-900"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              What our<br />customers are saying
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
              <svg 
                className={`w-8 h-8 mb-6 ${testimonial.textColor === 'text-white' ? 'text-white/30' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Quote Text */}
              <p 
                className="text-base leading-relaxed mb-6"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${testimonial.textColor === 'text-white' ? 'bg-white/20' : 'bg-gray-200'} flex items-center justify-center font-bold`}>
                  {testimonial.author.charAt(0)}
                </div>
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
