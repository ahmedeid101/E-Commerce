import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useProductActions } from '../hooks/useProductActions';
import HeroSlider from '../components/home/HeroSlider';
import FlashSales from '../components/home/FlashSales';
import CategoryList from '../components/home/CategoryList';
import ProductSection from '../components/home/ProductSection';
import Banner from '../components/home/Banner';
import FeaturedSection from '../components/home/FeaturedSection';
import { fetchMockData } from '../utils/mockData';

const HomePage = () => {
  const { isInWishlist } = useWishlist();
  const { handleAddToCart, handleWishlistToggle } = useProductActions();
  
  const data = fetchMockData();
  const flashProducts = data.flashProducts;
  const bestSelling = data.bestSelling;
  const newArrival = data.newArrival;

  return (
    <div>
      <HeroSlider />
      <FlashSales 
        products={flashProducts}
        onAddToCart={handleAddToCart}
        onWishlistToggle={handleWishlistToggle}
        isInWishlist={isInWishlist}
      />
      <CategoryList />
      <ProductSection 
        title="Best Selling Products"
        subtitle="This Month"
        products={bestSelling}
        showViewAll={true}
        onAddToCart={handleAddToCart}
        onWishlistToggle={handleWishlistToggle}
        isInWishlist={isInWishlist}
      />
      <Banner />
      <ProductSection 
        title="Explore Our Products"
        subtitle="Our Products"
        products={newArrival}
        showViewAll={true}
        onAddToCart={handleAddToCart}
        onWishlistToggle={handleWishlistToggle}
        isInWishlist={isInWishlist}
      />
      <FeaturedSection />
      
      <FeaturesHighlight />
    </div>
  );
};

const FeaturesHighlight = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <FeatureItem icon="🚚" title="FREE AND FAST DELIVERY" description="Free delivery for all orders over $140" />
      <FeatureItem icon="🎧" title="24/7 CUSTOMER SERVICE" description="Friendly 24/7 customer support" />
      <FeatureItem icon="✅" title="MONEY BACK GUARANTEE" description="We return money within 30 days" />
    </div>
  </div>
);

const FeatureItem = ({ icon, title, description }) => (
  <div>
    <div className="text-4xl mb-3">{icon}</div>
    <h4 className="font-bold mb-2">{title}</h4>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);

export default HomePage;