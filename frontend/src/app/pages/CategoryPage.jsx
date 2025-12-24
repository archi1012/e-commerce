import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../services/api';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryName]);
  
  const fetchCategoryProducts = async () => {
    try {
      const data = await productsAPI.getProducts();
      const allProducts = Array.isArray(data) ? data : data.products || [];
      
      // Filter products by category
      const categoryProducts = allProducts.filter(product => {
        const productCategory = product.category?.toLowerCase();
        const urlCategory = categoryName?.toLowerCase();
        
        return productCategory === urlCategory ||
               productCategory === getCategoryMapping(urlCategory);
      });
      
      setProducts(categoryProducts);
    } catch (error) {
      console.error('Error fetching category products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  
  const getCategoryMapping = (urlCategory) => {
    const mappings = {
      'electronics': 'electronics',
      'fashion': 'fashion',
      'grocery': 'grocery', 
      'beauty': 'beauty',
      'home': 'home & furniture',
      'sports': 'sports'
    };
    return mappings[urlCategory] || urlCategory;
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 capitalize">{categoryName} Products</h1>
        
        {loading ? (
          <div className="text-center py-8">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No products found in {categoryName} category. Add products through the seller dashboard.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}