import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { productsAPI } from '../services/api';

export default function Recommendations({ title = "Recommended for You", category, limit = 8 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchRecommendations();
  }, [category]);

  const fetchRecommendations = async () => {
    try {
      const params = { limit };
      if (category) params.category = category;
      
      console.log('Fetching recommendations with params:', params);
      const data = await productsAPI.getRecommendations(params);
      console.log('Recommendations data:', data);
      setProducts(data || []);
      
      // Fallback: if no recommendations, get regular products
      if (!data || data.length === 0) {
        console.log('No recommendations found, using fallback');
        const fallbackData = await productsAPI.getProducts(params);
        const fallbackProducts = Array.isArray(fallbackData) ? fallbackData : fallbackData.products || [];
        console.log('Fallback products:', fallbackProducts.length);
        setProducts(fallbackProducts.slice(0, limit));
      }
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      // Fallback to regular products on error
      try {
        const fallbackData = await productsAPI.getProducts({ limit });
        const fallbackProducts = Array.isArray(fallbackData) ? fallbackData : fallbackData.products || [];
        setProducts(fallbackProducts.slice(0, limit));
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        setProducts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, products.length - 3)) % Math.max(1, products.length - 3));
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">{title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{title}</h2>
          {products.length > 4 && (
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out gap-6"
            style={{ transform: `translateX(-${currentIndex * 25}%)` }}
          >
            {products.map(product => (
              <div key={product._id} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}