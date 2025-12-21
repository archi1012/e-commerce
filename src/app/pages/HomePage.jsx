import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Zap, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const banners = [
  {
    id: 1,
    title: 'Mega Electronics Sale',
    subtitle: 'Up to 60% OFF on Laptops & Smartphones',
    image: 'https://images.unsplash.com/photo-1763162410742-1d0097cea556',
    cta: 'Shop Now',
    gradient: 'from-blue-600 to-purple-600',
  },
  {
    id: 2,
    title: 'Fashion Fiesta',
    subtitle: 'Trending Styles at Unbeatable Prices',
    image: 'https://images.unsplash.com/photo-1599012307530-d163bd04ecab',
    cta: 'Explore Fashion',
    gradient: 'from-pink-600 to-orange-600',
  },
  {
    id: 3,
    title: 'Fresh & Organic',
    subtitle: 'Farm-fresh groceries delivered daily',
    image: 'https://images.unsplash.com/photo-1610636996379-4d184e2ef20a',
    cta: 'Order Now',
    gradient: 'from-green-600 to-teal-600',
  },
];

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />

      {/* Hero Banner Carousel */}
      <section className="relative h-[500px] overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full h-full relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-90`} />
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">{banner.title}</h1>
                    <p className="text-xl md:text-2xl mb-8">{banner.subtitle}</p>
                    <button className="bg-[#F9C74F] text-[#2E2E2E] px-8 py-4 rounded-lg font-semibold hover:bg-white transition transform hover:scale-105">
                      {banner.cta}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentBanner ? 'bg-[#F9C74F] w-8' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group bg-white rounded-xl p-6 text-center hover:shadow-lg transition transform hover:scale-105"
              >
                <div className="text-5xl mb-3">{category.icon}</div>
                <h3 className="font-semibold mb-1 group-hover:text-[#1F3C88] transition">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.count}+ items</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Deals of the Day */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-[#F9C74F]" fill="currentColor" />
              <h2 className="text-3xl font-bold">Deals of the Day</h2>
            </div>
            <Link
              to="/deals"
              className="text-[#1F3C88] hover:underline font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Trending Products */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-[#1F3C88]" />
              <h2 className="text-3xl font-bold">Trending Now</h2>
            </div>
            <Link
              to="/trending"
              className="text-[#1F3C88] hover:underline font-medium"
            >
              Explore All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(4, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-[#1F3C88]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚚</span>
            </div>
            <h3 className="font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">On orders above ₹499</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-[#1F3C88]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">↩️</span>
            </div>
            <h3 className="font-semibold mb-2">Easy Returns</h3>
            <p className="text-gray-600 text-sm">7-day return policy</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-[#1F3C88]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600 text-sm">100% safe & secure</p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}