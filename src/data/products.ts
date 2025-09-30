export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  stock: number;
  seller: string;
  tags: string[];
}

export const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Tote Bag Kanvas Organik",
    price: 35000,
    category: "Tas Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 127,
    description: "Tote bag berbahan kanvas organik 100% yang tahan lama dan stylish. Cocok untuk berbelanja sehari-hari dan mengurangi penggunaan plastik.",
    stock: 45,
    seller: "EcoFashion Indonesia",
    tags: ["tote bag", "kanvas", "organik", "ramah lingkungan"]
  },
  {
    id: "2",
    name: "Botol Minum Stainless Steel 500ml",
    price: 89000,
    category: "Botol Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 234,
    description: "Botol minum stainless steel berkualitas tinggi yang bebas BPA. Tahan panas dan dingin hingga 12 jam. Mengurangi sampah botol plastik.",
    stock: 78,
    seller: "GreenDrink Co",
    tags: ["botol minum", "stainless steel", "bebas BPA", "tahan lama"]
  },
  {
    id: "3",
    name: "Sabun Cuci Piring Organik 500ml",
    price: 25000,
    category: "Pembersih Organik",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 156,
    description: "Sabun cuci piring organik dari ekstrak jeruk nipis dan lidah buaya. Aman untuk kulit dan lingkungan, biodegradable 100%.",
    stock: 120,
    seller: "Natural Clean",
    tags: ["sabun organik", "pembersih", "biodegradable", "natural"]
  },
  {
    id: "4",
    name: "Sedotan Bambu Set 6pcs",
    price: 18000,
    category: "Peralatan Makan Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 203,
    description: "Set sedotan bambu alami dengan sikat pembersih. Alternatif terbaik pengganti sedotan plastik. Dapat digunakan berulang kali.",
    stock: 89,
    seller: "Bamboo Craft",
    tags: ["sedotan bambu", "reusable", "zero waste", "natural"]
  },
  {
    id: "5",
    name: "Kemasan Beeswax Wraps Set 3pcs",
    price: 45000,
    category: "Kemasan Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 145,
    description: "Pembungkus makanan dari lilin lebah organik. Pengganti plastik wrap yang dapat dicuci dan digunakan berulang hingga 1 tahun.",
    stock: 56,
    seller: "BeesWrap Indonesia",
    tags: ["beeswax", "food wrap", "reusable", "organic"]
  },
  {
    id: "6",
    name: "Sikat Gigi Bambu Biodegradable",
    price: 15000,
    category: "Personal Care Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 167,
    description: "Sikat gigi dari bambu alami dengan bulu sikat yang lembut. 100% biodegradable dan mengurangi sampah plastik di kamar mandi.",
    stock: 234,
    seller: "Bamboo Care",
    tags: ["sikat gigi", "bambu", "biodegradable", "zero waste"]
  },
  {
    id: "7",
    name: "Deterjen Laundry Organik 1L",
    price: 42000,
    category: "Pembersih Organik",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 98,
    description: "Deterjen cair organik dari ekstrak kelapa dan essential oil. Aman untuk kulit sensitif dan ramah lingkungan.",
    stock: 67,
    seller: "EcoWash",
    tags: ["deterjen", "organik", "kelapa", "hypoallergenic"]
  },
  {
    id: "8",
    name: "Lunch Box Stainless Steel 3 Sekat",
    price: 125000,
    category: "Peralatan Makan Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 134,
    description: "Kotak makan stainless steel dengan 3 sekat terpisah. Bebas BPA, tahan bocor, dan ideal untuk mengurangi kemasan makanan sekali pakai.",
    stock: 43,
    seller: "SteelBox Co",
    tags: ["lunch box", "stainless steel", "compartment", "BPA free"]
  },
  {
    id: "9",
    name: "Shampoo Bar Organik 100gr",
    price: 32000,
    category: "Personal Care Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 178,
    description: "Shampoo padat organik dengan minyak argan dan tea tree. Bebas sulfat, paraben, dan kemasan plastik. Tahan hingga 80x cuci.",
    stock: 89,
    seller: "Solid Beauty",
    tags: ["shampoo bar", "organik", "sulfate free", "zero waste"]
  },
  {
    id: "10",
    name: "Solar Power Bank 20000mAh",
    price: 299000,
    category: "Teknologi Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 87,
    description: "Power bank tenaga surya dengan kapasitas 20000mAh. Dilengkapi panel solar dan LED emergency. Cocok untuk outdoor dan hemat energi.",
    stock: 23,
    seller: "SolarTech",
    tags: ["solar", "power bank", "renewable energy", "outdoor"]
  },
  {
    id: "11",
    name: "Eco Friendly Cleaning Kit",
    price: 85000,
    category: "Pembersih Organik",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 112,
    description: "Paket lengkap pembersih organik: all-purpose cleaner, glass cleaner, dan floor cleaner. Berbahan dasar cuka dan essential oil alami.",
    stock: 34,
    seller: "Clean Green",
    tags: ["cleaning kit", "organik", "all natural", "essential oil"]
  }
];

export const categories = [
  "Semua Kategori",
  "Tas Ramah Lingkungan",
  "Botol Ramah Lingkungan",
  "Pembersih Organik",
  "Peralatan Makan Ramah Lingkungan",
  "Kemasan Ramah Lingkungan",
  "Personal Care Ramah Lingkungan",
  "Teknologi Ramah Lingkungan"
];