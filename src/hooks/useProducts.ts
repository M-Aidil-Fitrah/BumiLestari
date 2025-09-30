import { useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'totebag' | 'bottle' | 'soap' | 'other';
  ecoFeatures: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Mock data - in real app this would be an API call
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'Eco Tote Bag Canvas',
            description: 'Tas belanja ramah lingkungan dari bahan canvas organik',
            price: 85000,
            originalPrice: 120000,
            image: '/api/placeholder/300/300',
            category: 'totebag',
            ecoFeatures: ['100% Canvas Organik', 'Biodegradable', 'Tahan Lama'],
            rating: 4.8,
            reviews: 124,
            inStock: true
          },
          {
            id: '2',
            name: 'Stainless Steel Water Bottle',
            description: 'Botol minum stainless steel dengan insulasi ganda',
            price: 150000,
            originalPrice: 200000,
            image: '/api/placeholder/300/300',
            category: 'bottle',
            ecoFeatures: ['BPA Free', 'Insulasi 12 Jam', 'Dapat Didaur Ulang'],
            rating: 4.9,
            reviews: 89,
            inStock: true
          },
          {
            id: '3',
            name: 'Sabun Organik Lavender',
            description: 'Sabun organik dengan aroma lavender yang menenangkan',
            price: 35000,
            image: '/api/placeholder/300/300',
            category: 'soap',
            ecoFeatures: ['100% Natural', 'Tanpa Bahan Kimia', 'Cruelty Free'],
            rating: 4.7,
            reviews: 156,
            inStock: true
          },
          {
            id: '4',
            name: 'Bamboo Cutlery Set',
            description: 'Set peralatan makan dari bambu dengan tas penyimpanan',
            price: 65000,
            originalPrice: 85000,
            image: '/api/placeholder/300/300',
            category: 'other',
            ecoFeatures: ['Bambu Berkelanjutan', 'Portable', 'Anti Bakteri'],
            rating: 4.6,
            reviews: 73,
            inStock: true
          }
        ];

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductsByCategory = (category: Product['category']) => {
    return products.filter(product => product.category === category);
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.rating >= 4.7);
  };

  return {
    products,
    loading,
    error,
    getProductsByCategory,
    getFeaturedProducts
  };
};