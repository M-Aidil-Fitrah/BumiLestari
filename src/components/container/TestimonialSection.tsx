import { TestimonialsGrid } from '../ui/Testimonial';
import { withScrollAnimation } from '../../hoc/withScrollAnimation';
import { withAnalytics } from '../../hoc/withAnalytics';

interface TestimonialSectionProps {
  title?: string;
  subtitle?: string;
}

const TestimonialSectionBase = ({
  title = "Apa Kata Pelanggan Kami",
  subtitle = "Testimoni nyata dari pelanggan yang puas dengan produk ramah lingkungan kami"
}: TestimonialSectionProps) => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Environmental Activist",
      content: "BumiLestari benar-benar mengubah cara saya berbelanja. Produk-produknya berkualitas tinggi dan benar-benar ramah lingkungan. Tote bag yang saya beli sudah dipakai lebih dari 6 bulan dan masih sangat bagus!",
      rating: 5,
      avatar: "/api/placeholder/50/50"
    },
    {
      name: "Ahmad Rizky",
      role: "Sustainability Consultant",
      content: "Sebagai konsultan sustainability, saya sangat merekomendasikan BumiLestari. Mereka tidak hanya menjual produk, tapi juga edukasi tentang gaya hidup berkelanjutan. Botol minum stainless steel mereka kualitasnya luar biasa.",
      rating: 5,
      avatar: "/api/placeholder/50/50"
    },
    {
      name: "Maya Sari",
      role: "Ibu Rumah Tangga",
      content: "Senang banget menemukan platform ini! Sabun organik dan produk rumah tangga eco-friendly lainnya sangat membantu keluarga saya menjalani hidup yang lebih sehat dan bertanggung jawab terhadap lingkungan.",
      rating: 5,
      avatar: "/api/placeholder/50/50"
    },
    {
      name: "David Chen",
      role: "Zero Waste Enthusiast",
      content: "Kualitas produk sangat baik, pengiriman cepat, dan packaging juga ramah lingkungan. BumiLestari konsisten dengan nilai-nilai sustainability. Set peralatan bambu saya dari sini sudah setahun lebih awet banget!",
      rating: 4,
      avatar: "/api/placeholder/50/50"
    },
    {
      name: "Anita Putri",
      role: "Teacher",
      content: "Saya sering bercerita kepada murid-murid tentang pentingnya menjaga lingkungan. BumiLestari membantu saya mempraktikkan apa yang saya ajarkan. Produknya beragam dan harganya juga terjangkau.",
      rating: 5,
      avatar: "/api/placeholder/50/50"
    },
    {
      name: "Rio Santoso",
      role: "Office Worker",
      content: "Tumbler dari BumiLestari sudah jadi teman setia di kantor. Insulasinya bagus banget, kopi tetap panas sampai sore. Investasi yang tepat untuk mengurangi penggunaan gelas plastik sekali pakai.",
      rating: 4,
      avatar: "/api/placeholder/50/50"
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <TestimonialsGrid testimonials={testimonials} />

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-green-50 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Bergabunglah dengan Ribuan Pelanggan Puas!
            </h3>
            <p className="text-gray-600 mb-6">
              Mulai perjalanan hidup berkelanjutan Anda bersama produk-produk ramah lingkungan terbaik
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              Mulai Berbelanja Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TestimonialSection = withAnalytics(
  withScrollAnimation(TestimonialSectionBase),
  'testimonial_section_view'
);