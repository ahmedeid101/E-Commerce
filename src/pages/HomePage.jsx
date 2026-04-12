import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import HeroSlider from '../components/home/HeroSlider';
import FlashSales from '../components/home/FlashSales';
import CategoryList from '../components/home/CategoryList';
import ProductSection from '../components/home/ProductSection';
import Banner from '../components/home/Banner';
import FeaturedSection from '../components/home/FeaturedSection';
import { fetchMockData } from '../utils/mockData';

const HomePage = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [, setProducts] = useState([]);
  const [flashProducts, setFlashProducts] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [newArrival, setNewArrival] = useState([]);

  useEffect(() => {
    const data = fetchMockData();
    setProducts(data.products);
    setFlashProducts(data.flashProducts);
    setBestSelling(data.bestSelling);
    setNewArrival(data.newArrival);
  }, []);

  const handleAddToCart = async (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistToggle = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

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
      
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl mb-3">🚚</div>
            <h4 className="font-bold mb-2">FREE AND FAST DELIVERY</h4>
            <p className="text-gray-500 text-sm">Free delivery for all orders over $140</p>
          </div>
          <div>
            <div className="text-4xl mb-3">🎧</div>
            <h4 className="font-bold mb-2">24/7 CUSTOMER SERVICE</h4>
            <p className="text-gray-500 text-sm">Friendly 24/7 customer support</p>
          </div>
          <div>
            <div className="text-4xl mb-3">✅</div>
            <h4 className="font-bold mb-2">MONEY BACK GUARANTEE</h4>
            <p className="text-gray-500 text-sm">We return money within 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;