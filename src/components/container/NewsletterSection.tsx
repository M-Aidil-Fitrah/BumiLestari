import React from 'react';

interface NewsletterProps {
  onSubscribe?: (email: string) => void;
}

const Newsletter: React.FC<NewsletterProps> = ({ onSubscribe }) => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements.namedItem('newsletter-email') as HTMLInputElement;
    const email = input?.value || '';
    if (onSubscribe) onSubscribe(email);
    alert(`Terima kasih! Email ${email} telah didaftarkan (Demo)`);
    input.value = '';
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-white">
          <div className="text-5xl mb-6">📧</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dapatkan Update Terbaru
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Berlangganan newsletter kami untuk mendapatkan info produk terbaru, 
            tips hidup berkelanjutan, dan penawaran eksklusif
          </p>

          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                name="newsletter-email"
                type="email"
                placeholder="Masukkan email Anda"
                required
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white bg-white"
              />
              <button className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200">
                Berlangganan
              </button>
            </form>
            <p className="text-sm text-white opacity-75 mt-3">
              *Kami tidak akan mengirim spam. Unsubscribe kapan saja.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
