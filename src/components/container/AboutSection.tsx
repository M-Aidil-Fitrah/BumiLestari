import { FeaturesGrid } from '../ui/Feature';
import { StatisticsGrid } from '../ui/Statistics';
import { withScrollAnimation } from '../../hoc/withScrollAnimation';
import { withAnalytics } from '../../hoc/withAnalytics';

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
}

const AboutSectionBase = ({
  title = "Tentang BumiLestari",
  subtitle = "Komitmen kami untuk masa depan yang berkelanjutan"
}: AboutSectionProps) => {
  const features = [
    {
      icon: "🌱",
      title: "100% Ramah Lingkungan",
      description: "Semua produk kami dipilih dengan standar ketat untuk memastikan dampak minimal terhadap lingkungan dan dapat didaur ulang atau biodegradable."
    },
    {
      icon: "✅",
      title: "Kualitas Terjamin",
      description: "Setiap produk melalui proses seleksi ketat dan bekerja sama dengan supplier terpercaya yang memiliki sertifikasi sustainability."
    },
    {
      icon: "🚚",
      title: "Pengiriman Eco-Friendly",
      description: "Kami menggunakan packaging ramah lingkungan dan bekerja sama dengan kurir yang mendukung program carbon offset."
    },
    {
      icon: "💰",
      title: "Harga Terjangkau",
      description: "Misi kami adalah membuat produk ramah lingkungan dapat diakses oleh semua kalangan dengan harga yang kompetitif."
    },
    {
      icon: "🤝",
      title: "Komunitas Peduli",
      description: "Bergabung dengan komunitas yang peduli lingkungan dan dapatkan tips, edukasi, serta inspirasi untuk hidup berkelanjutan."
    },
    {
      icon: "🏆",
      title: "Award Winning",
      description: "Telah meraih berbagai penghargaan sebagai platform e-commerce terbaik untuk produk berkelanjutan di Indonesia."
    }
  ];

  const statistics = [
    {
      value: "50K+",
      label: "Pelanggan Puas",
      icon: "👥",
      prefix: "",
      suffix: ""
    },
    {
      value: "1000+",
      label: "Produk Eco-Friendly",
      icon: "🛍️",
      prefix: "",
      suffix: ""
    },
    {
      value: "500+",
      label: "Ton Plastik Dikurangi",
      icon: "♻️",
      prefix: "",
      suffix: ""
    },
    {
      value: "99",
      label: "Kepuasan Pelanggan",
      icon: "⭐",
      prefix: "",
      suffix: "%"
    }
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            {subtitle}
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-5xl mb-4">🌍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Misi Kami</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              BumiLestari hadir untuk memudahkan setiap orang dalam mengadopsi gaya hidup berkelanjutan. 
              Kami menyediakan platform yang menghubungkan konsumen dengan produk-produk ramah lingkungan 
              berkualitas tinggi, sambil mengedukasi pentingnya menjaga kelestarian bumi untuk generasi mendatang.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Mengapa Memilih BumiLestari?
          </h3>
          <FeaturesGrid features={features} />
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Dampak Positif Kami
          </h3>
          <StatisticsGrid statistics={statistics} />
        </div>

        {/* Vision Statement */}
        <div className="mt-12 text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Visi Kami</h3>
            <p className="text-lg leading-relaxed">
              Menjadi platform marketplace terdepan di Indonesia yang menginspirasi dan memfasilitasi 
              jutaan orang untuk menjalani gaya hidup berkelanjutan, sehingga terciptanya masa depan 
              yang lebih hijau dan lestari untuk semua.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AboutSection = withAnalytics(
  withScrollAnimation(AboutSectionBase),
  'about_section_view'
);