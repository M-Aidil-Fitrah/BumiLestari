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
    image: "https://down-id.img.susercontent.com/file/2cbd251a86a5c2910b3f3dc1444bda6f",
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
    image: "https://static.republika.co.id/uploads/member/images/news/4qn4ecqfs8.jpg",
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
    image: "https://down-id.img.susercontent.com/file/id-11134207-7rbke-m8wxaqozdc7l39",
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
    category: "Alat Makan Ramah Lingkungan",
    image: "https://down-id.img.susercontent.com/file/sg-11134201-22110-rizvpfd6qrjv0e",
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
    image: "https://asghedom.com/wp-content/uploads/2019/11/3Pcsset-Zero-Waste-Bee-Wrap-BPA-Free-Beeswax-Food-Wrap-Fresh-Keeping-Reusable-Sandwich-Bag-Bee-Wax-Paper-Seal-Storage-Co-1.jpg",
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
    image: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/8/10/9ec70708-040c-469a-b1bb-121d87bea072.jpg",
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
    image: "https://organium.id/wp-content/uploads/2024/10/Detergent-Liquid-Laundry_11zon.jpg",
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
    category: "Alat Makan Ramah Lingkungan",
    image: "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/1/21/562d7763-ea67-4b8c-8387-549e2393a8ff.jpg",
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
    image: "https://tse3.mm.bing.net/th/id/OIP.F5uChtDyemg2oGto8nTIaQHaD4?pid=Api&P=0&h=180",
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
    image: "https://tse2.mm.bing.net/th/id/OIP.ZqbCoZ_2uDjnuJvTNzs1ZQHaHa?pid=Api&P=0&h=180",
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
    image: "https://cdn.ecommercedns.uk/files/6/223396/9/8518579/caddy-2.jpg",
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
    image: "https://down-id.img.susercontent.com/file/255c03439d779c2f0ded809f8773ebbc",
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
    image: "https://tse4.mm.bing.net/th/id/OIP.EWFpQh732oWEYj3rwbcd6gHaHa?pid=Api&P=0&h=180",
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
    image: "https://tse2.mm.bing.net/th/id/OIP._0dfbKo_iOw3f_uepdNvWAHaHa?pid=Api&P=0&h=180",
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
    category: "Alat Makan Ramah Lingkungan",
    image: "https://down-id.img.susercontent.com/file/id-11134207-7r98r-m08pxj47uccs80",
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
    image: "https://down-id.img.susercontent.com/file/id-11134207-7r98s-ltaohwrzn3uuee",
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
    image: "https://tse2.mm.bing.net/th/id/OIP.2Ai8GahALQv2YdR3A0OB9gHaGq?pid=Api&P=0&h=180",
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
    image: "https://tse1.mm.bing.net/th/id/OIP.RZ6r7uY-RS_SJDMuC-a8yQHaHa?pid=Api&P=0&h=180",
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
    image: "https://down-id.img.susercontent.com/file/b8dc19151a18521bc66a2568166e36ec",
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
    category: "Alat Makan Ramah Lingkungan",
    image: "https://m.media-amazon.com/images/I/71NxrbMjWNL._AC_SL1500_.jpg",
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
    image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/1b1ce3af-ed33-48e1-8c14-52010ec9054e.__CR0,0,970,600_PT0_SX970_V1___.png",
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
    image: "https://down-id.img.susercontent.com/file/c1a1e39bcf2967a951d8c80119984346",
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
    image: "https://down-id.img.susercontent.com/file/id-11134201-7r98t-lv60l4hostw0ac",
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
    image: "https://down-id.img.susercontent.com/file/id-11134207-7r98u-m0127tgoo0tcb9",
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
    category: "Alat Makan Ramah Lingkungan",
    image: "https://i.pinimg.com/736x/00/64/72/0064723ef2f8f2add7f3e68ab5835ead.jpg",
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
  "Alat Makan Ramah Lingkungan",
  "Kemasan Ramah Lingkungan",
  "Personal Care Ramah Lingkungan",
  "Teknologi Ramah Lingkungan"
];