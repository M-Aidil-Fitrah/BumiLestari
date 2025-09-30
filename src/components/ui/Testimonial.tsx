interface TestimonialProps {
  name: string;
  role?: string;
  content: string;
  rating: number;
  avatar?: string;
  className?: string;
}

export const Testimonial = ({
  name,
  role,
  content,
  rating,
  avatar,
  className = ""
}: TestimonialProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ${className}`}>
      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-gray-700 mb-6 italic">
        "{content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500 text-lg font-semibold">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <div className="font-semibold text-gray-800">{name}</div>
          {role && <div className="text-sm text-gray-500">{role}</div>}
        </div>
      </div>
    </div>
  );
};

interface TestimonialsGridProps {
  testimonials: Array<{
    name: string;
    role?: string;
    content: string;
    rating: number;
    avatar?: string;
  }>;
}

export const TestimonialsGrid = ({ testimonials }: TestimonialsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <Testimonial
          key={index}
          name={testimonial.name}
          role={testimonial.role}
          content={testimonial.content}
          rating={testimonial.rating}
          avatar={testimonial.avatar}
        />
      ))}
    </div>
  );
};