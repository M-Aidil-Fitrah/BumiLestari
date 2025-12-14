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
    image: "/images/product1.svg",
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
    image: "/images/product2.svg",
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
    image: "/images/product3.svg",
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
    image: "/images/product4.svg",
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
    image: "/images/product5.svg",
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
    image: "/images/product6.svg",
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
  },
  {
    id: "12",
    name: "Tas Belanja Jaring Organik",
    price: 28000,
    category: "Tas Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 156,
    description: "Tas jaring katun organik yang dapat digunakan untuk belanja sayur dan buah. Dapat dicuci dan tahan lama.",
    stock: 78,
    seller: "EcoFashion Indonesia",
    tags: ["tas jaring", "katun organik", "reusable", "belanja"]
  },
  {
    id: "13",
    name: "Tumbler Kaca Double Wall 450ml",
    price: 95000,
    category: "Botol Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 201,
    description: "Tumbler kaca double wall dengan tutup bambu. Tahan panas dan dingin, bebas BPA dan plastik.",
    stock: 45,
    seller: "GlassWare Co",
    tags: ["tumbler", "kaca", "double wall", "bambu"]
  },
  {
    id: "14",
    name: "Sabun Cuci Tangan Organik Refill 1L",
    price: 38000,
    category: "Pembersih Organik",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 189,
    description: "Sabun cuci tangan organik dengan aroma lavender. Dalam kemasan refill untuk mengurangi sampah plastik.",
    stock: 92,
    seller: "Natural Clean",
    tags: ["sabun tangan", "organik", "lavender", "refill"]
  },
  {
    id: "15",
    name: "Set Sendok Garpu Bambu Portable",
    price: 22000,
    category: "Peralatan Makan Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 143,
    description: "Set cutlery bambu portable dengan pouch kain. Ideal untuk makan di luar dan mengurangi penggunaan alat makan sekali pakai.",
    stock: 67,
    seller: "Bamboo Craft",
    tags: ["sendok", "garpu", "bambu", "portable"]
  },
  {
    id: "16",
    name: "Kantong Belanja Lipat Mini",
    price: 19000,
    category: "Tas Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 167,
    description: "Kantong belanja lipat yang super ringkas dan kuat. Dapat menahan beban hingga 15kg.",
    stock: 123,
    seller: "FoldBag",
    tags: ["tas lipat", "reusable", "portable", "kuat"]
  },
  {
    id: "17",
    name: "Kondisioner Bar Organik 100gr",
    price: 35000,
    category: "Perawatan Pribadi Organik",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 134,
    description: "Kondisioner padat dengan shea butter dan coconut oil. Membuat rambut lembut dan bebas kusut tanpa silikon.",
    stock: 56,
    seller: "Solid Beauty",
    tags: ["kondisioner", "organik", "shea butter", "zero waste"]
  },
  {
    id: "18",
    name: "Botol Spray Kaca 500ml",
    price: 45000,
    category: "Botol Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 98,
    description: "Botol spray kaca untuk pembersih DIY atau essential oil spray. Tutup spray dapat digunakan berulang kali.",
    stock: 89,
    seller: "GlassWare Co",
    tags: ["spray bottle", "kaca", "reusable", "refillable"]
  },
  {
    id: "19",
    name: "Deterjen Pewangi Pakaian Organik 500ml",
    price: 32000,
    category: "Pembersih Organik",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 145,
    description: "Pewangi pakaian organik dengan aroma fresh linen. Aman untuk bayi dan penderita alergi.",
    stock: 71,
    seller: "EcoWash",
    tags: ["pewangi", "organik", "hypoallergenic", "bayi"]
  },
  {
    id: "20",
    name: "Food Container Set Stainless 4pcs",
    price: 189000,
    category: "Peralatan Makan Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 178,
    description: "Set 4 container stainless dengan ukuran berbeda. Tahan bocor dan ideal untuk meal prep.",
    stock: 34,
    seller: "SteelBox Co",
    tags: ["container", "stainless steel", "meal prep", "leak proof"]
  },
  {
    id: "21",
    name: "Deodorant Cream Organik 50gr",
    price: 42000,
    category: "Perawatan Pribadi Organik",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 156,
    description: "Deodorant cream alami dengan coconut oil dan baking soda. Efektif 24 jam tanpa aluminium.",
    stock: 67,
    seller: "Natural Body",
    tags: ["deodorant", "organik", "aluminium free", "natural"]
  },
  {
    id: "22",
    name: "Tas Ransel Kanvas Vintage",
    price: 175000,
    category: "Tas Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 203,
    description: "Ransel kanvas premium dengan desain vintage. Tahan lama dan memiliki banyak kompartemen.",
    stock: 28,
    seller: "EcoFashion Indonesia",
    tags: ["ransel", "kanvas", "vintage", "premium"]
  },
  {
    id: "23",
    name: "Botol Infuser Air 1000ml",
    price: 68000,
    category: "Botol Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 189,
    description: "Botol infuser untuk infused water dengan filter buah. Terbuat dari Tritan bebas BPA.",
    stock: 54,
    seller: "GreenDrink Co",
    tags: ["infuser", "tritan", "BPA free", "infused water"]
  },
  {
    id: "24",
    name: "Pembersih Lantai Organik 1L",
    price: 48000,
    category: "Pembersih Organik",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 134,
    description: "Pembersih lantai organik dengan eucalyptus oil. Membunuh kuman 99.9% tanpa bahan kimia berbahaya.",
    stock: 76,
    seller: "Clean Green",
    tags: ["pembersih lantai", "organik", "eucalyptus", "antibakteri"]
  },
  {
    id: "25",
    name: "Set Piring Bambu 6pcs",
    price: 145000,
    category: "Peralatan Makan Ramah Lingkungan",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 98,
    description: "Set 6 piring bambu dengan berbagai ukuran. Ringan, tahan lama, dan biodegradable.",
    stock: 41,
    seller: "Bamboo Craft",
    tags: ["piring", "bambu", "biodegradable", "set"]
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