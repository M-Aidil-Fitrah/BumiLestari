export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

// Dummy reviews data - dalam aplikasi nyata ini akan diambil dari API
export const dummyReviews: Review[] = [
  {
    id: "1",
    productId: "1",
    userName: "Sari Wijaya",
    rating: 5,
    comment: "Tote bag nya bagus banget! Bahannya kuat dan ukurannya pas buat belanja. Sudah pakai 3 bulan masih kayak baru. Recommended!",
    date: "2024-09-15",
    helpful: 12,
    verified: true
  },
  {
    id: "2",
    productId: "1",
    userName: "Budi Santoso",
    rating: 4,
    comment: "Kualitas oke, tapi agak kecil untuk barang-barang besar. Overall puas sih dengan produknya.",
    date: "2024-09-10",
    helpful: 8,
    verified: true
  },
  {
    id: "3",
    productId: "1",
    userName: "Maya Indira",
    rating: 5,
    comment: "Love it! Ramah lingkungan dan stylish. Cocok banget buat daily use. Packagingnya juga bagus.",
    date: "2024-09-08",
    helpful: 15,
    verified: false
  },
  {
    id: "4",
    productId: "2",
    userName: "Andi Prasetya",
    rating: 5,
    comment: "Botol minumnya mantap! Air dingin bisa tahan lama, desainnya juga keren. Worth it banget!",
    date: "2024-09-12",
    helpful: 20,
    verified: true
  },
  {
    id: "5",
    productId: "2",
    userName: "Lisa Permata",
    rating: 4,
    comment: "Bagus sih, cuma agak berat aja kalo dibawa kemana-mana. Tapi kualitasnya memang premium.",
    date: "2024-09-05",
    helpful: 6,
    verified: true
  },
  {
    id: "6",
    productId: "3",
    userName: "Riko Hartanto",
    rating: 5,
    comment: "Sabunnya wangi banget dan bersih tanpa bikin kulit kering. Eco-friendly pula. Pasti beli lagi!",
    date: "2024-09-14",
    helpful: 11,
    verified: true
  }
];