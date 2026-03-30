import React, { useState, useEffect, useRef } from 'react';
import { FaApple, FaHeart, FaRegHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Button from '../components/Button';
import ProductCard from './ProductCard';

const HomePage = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [flashSales, setFlashSales] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 23, minutes: 19, seconds: 56 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [flashScrollPosition, setFlashScrollPosition] = useState(0);
  const [flashProducts, setFlashProducts] = useState([]);
  const [addingToCart, setAddingToCart] = useState({});
  const flashSliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  // Music Experience Banner Timer
  const [musicTimer, setMusicTimer] = useState({ days: 5, hours: 23, minutes: 59, seconds: 35 });

  // Flash Sales Slider Navigation
  const scrollFlashLeft = () => {
    if (flashSliderRef.current) {
      const scrollAmount = flashSliderRef.current.clientWidth;
      flashSliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollFlashRight = () => {
    if (flashSliderRef.current) {
      const scrollAmount = flashSliderRef.current.clientWidth;
      flashSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Check scroll position to enable/disable arrows
  const checkScrollPosition = () => {
    if (flashSliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = flashSliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
      setFlashScrollPosition(scrollLeft);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = async (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    setAddingToCart(prev => ({ ...prev, [product.id]: true }));
    
    await new Promise(resolve => setTimeout(resolve, 500));
    addToCart(product);
    
    setAddingToCart(prev => ({ ...prev, [product.id]: false }));
    
    // Show toast notification
    showToast(`${product.name} added to cart!`, 'success');
  };

  // Handle Wishlist Toggle
  const handleWishlistToggle = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast(`${product.name} removed from wishlist`, 'info');
    } else {
      addToWishlist(product);
      showToast(`${product.name} added to wishlist`, 'success');
    }
  };

  // Toast notification
  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white ${
      type === 'success' ? 'bg-green-500' : 'bg-blue-500'
    } animate-slide-in`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  // Hero Slider Data
  const heroSlides = [
    {
      id: 1,
      title: 'iPhone 17 Pro Max',
      subtitle: 'Up to 10% off Voucher',
      description: 'The future of mobile technology is here. A17 Bionic chip, 48MP camera, and all-day battery life.',
      discount: '10%',
      image: 'images/iphone14.jpg',
      color: 'bg-black',
      badge: 'New Arrival',
      link: '/products?category=Electronics&search=iPhone'
    },
    {
      id: 2,
      title: 'iPhone 17 Pro',
      subtitle: 'Limited Time Offer',
      description: 'Experience the ultimate performance with titanium design and enhanced camera system.',
      discount: '15%',
      image: 'images/products/iPhone/m1.webp',
      color: 'bg-black',
      badge: 'Best Seller',
      link: '/products?category=Electronics&search=iPhone'
    },
    {
      id: 3,
      title: 'iPhone 17 Plus',
      subtitle: 'Big Screen. Big Battery.',
      description: '6.9-inch Super Retina XDR display with ProMotion and always-on technology.',
      discount: '12%',
      image: 'images/products/iPhone/m2.webp',
      color: 'bg-black',
      badge: 'Hot Deal',
      link: '/products?category=Electronics&search=iPhone'
    },
    {
      id: 4,
      title: 'iPhone 17 Air',
      subtitle: 'Ultra-Thin. Ultra-Powerful.',
      description: 'The thinnest iPhone ever with breakthrough battery technology.',
      discount: '8%',
      image: 'images/products/iPhone/m3.webp',
      color: 'bg-black',
      badge: 'Coming Soon',
      link: '/products?category=Electronics&search=iPhone'
    },
    {
      id: 5,
      title: 'iPhone 17 Series',
      subtitle: 'Complete Ecosystem',
      description: 'Get the full iPhone 17 experience with AirPods and Apple Watch.',
      discount: '20%',
      image: 'images/products/iPhone/m4.jpg',
      color: 'bg-black',
      badge: 'Bundle Deal',
      link: '/products?category=Electronics&search=iPhone'
    }
  ];

  // Auto-play slider
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Music Experience Banner Timer
  useEffect(() => {
    const musicTimerInterval = setInterval(() => {
      setMusicTimer(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(musicTimerInterval);
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const slider = flashSliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => slider.removeEventListener('scroll', checkScrollPosition);
    }
  }, [flashProducts]);

  const fetchProducts = async () => {
    const flashProductsData = [
      { id: 1, name: 'HAVIT HV-G92 Gamepad', price: 120, originalPrice: 160, rating: 4.5, reviews: 88, category: 'Electronics', discount: 40, image: 'images/Read_HAVIT_HV-G92_Gamepad.png', badge: '-40%', inStock: true },
      { id: 2, name: 'AK-900 Wired Keyboard', price: 960, originalPrice: 1160, rating: 4.8, reviews: 75, category: 'Electronics', discount: 35, image: 'images/AK-900 Wired Keyboard.png', badge: '-35%', inStock: true },
      { id: 3, name: 'IPS LCD Gaming Monitor', price: 370, originalPrice: 400, rating: 4.6, reviews: 99, category: 'Electronics', discount: 30, image: 'images/IPS LCD Gaming Monitor.png', badge: '-30%', inStock: true },
      { id: 4, name: 'S-Series Comfort Chair', price: 375, originalPrice: 400, rating: 4.7, reviews: 99, category: 'Furniture', discount: 25, image: 'images/chair1.png', badge: '-25%', inStock: true },
      { id: 5, name: 'The North Coat', price: 260, originalPrice: 360, rating: 4.5, reviews: 85, category: 'Fashion', discount: 28, image: 'images/chair2.png', badge: '-28%', inStock: true },
      { id: 6, name: 'Gucci Duffle Bag', price: 960, originalPrice: 1160, rating: 4.6, reviews: 86, category: 'Fashion', discount: 17, image: 'https://picsum.photos/id/6/300/300', badge: '-17%', inStock: true },
      { id: 7, name: 'RGB Liquid CPU Cooler', price: 160, originalPrice: 170, rating: 4.5, reviews: 85, category: 'Electronics', discount: 6, image: 'https://picsum.photos/id/7/300/300', badge: '-6%', inStock: false },
      { id: 8, name: 'Small BookSelf', price: 360, originalPrice: 360, rating: 4.5, reviews: 85, category: 'Furniture', discount: 0, image: 'https://picsum.photos/id/8/300/300', badge: 'New', inStock: true },
      { id: 9, name: 'Wireless Headphones Pro', price: 199, originalPrice: 299, rating: 4.9, reviews: 120, category: 'Electronics', discount: 33, image: 'https://picsum.photos/id/9/300/300', badge: '-33%', inStock: true },
      { id: 10, name: 'Smart Watch Ultra', price: 349, originalPrice: 499, rating: 4.7, reviews: 95, category: 'Electronics', discount: 30, image: 'https://picsum.photos/id/10/300/300', badge: '-30%', inStock: true },
      { id: 11, name: 'Gaming Mouse RGB', price: 59, originalPrice: 89, rating: 4.6, reviews: 200, category: 'Electronics', discount: 34, image: 'https://picsum.photos/id/11/300/300', badge: '-34%', inStock: true },
      { id: 12, name: 'Mechanical Keyboard', price: 129, originalPrice: 199, rating: 4.8, reviews: 150, category: 'Electronics', discount: 35, image: 'https://picsum.photos/id/12/300/300', badge: '-35%', inStock: true },
    ];

    const mockProducts = [
      { id: 1, name: 'HAVIT HV-G92 Gamepad', price: 120, originalPrice: 160, rating: 4.5, reviews: 88, category: 'Electronics', discount: 30, image: 'https://picsum.photos/id/8/300/300' },
      { id: 2, name: 'AK-900 Wired Keyboard', price: 960, originalPrice: 1160, rating: 4.8, reviews: 75, category: 'Electronics', discount: 35, image: 'https://picsum.photos/id/7/300/300' },
      { id: 3, name: 'IPS LCD Gaming Monitor', price: 370, originalPrice: 400, rating: 4.6, reviews: 99, category: 'Electronics', discount: 7.5,  image: 'https://picsum.photos/id/6/300/300'  },
      { id: 4, name: 'S-Series Comfort Chair', price: 375, originalPrice: 400, rating: 4.7, reviews: 99, category: 'Furniture', discount: 6.25, image: 'images/Small BookSelf.png' },
      { id: 5, name: 'The North Coat', price: 260, originalPrice: 360, rating: 4.5, reviews: 85, category: 'Fashion', discount: 28, image: 'images/The north coat.png '},
      { id: 6, name: 'Gucci Duffle Bag', price: 960, originalPrice: 1160, rating: 4.6, reviews: 86, category: 'Fashion', discount: 17, image: 'images/Gucci duffle bag.png'},
      { id: 7, name: 'RGB Liquid CPU Cooler', price: 160, originalPrice: 170, rating: 4.5, reviews: 85, category: 'Electronics', discount: 6,  image: 'images/RGB liquid CPU Cooler.png'},
      { id: 8, name: 'Small BookSelf', price: 360, originalPrice: 360, rating: 4.5, reviews: 85, category: 'Furniture', discount: 0, image: 'images/Small BookSelf.png'},
    ];

    setProducts(mockProducts);
    setFlashProducts(flashProductsData);
    setFlashSales(flashProductsData.slice(0, 4));
    setBestSelling(mockProducts.slice(4, 8));
    setNewArrival(mockProducts.slice(0, 8));
  };

  const categories = [
    { name: 'Phones', icon: '📱', color: 'bg-blue-100' },
    { name: 'Computers', icon: '💻', color: 'bg-green-100' },
    { name: 'SmartWatch', icon: '⌚', color: 'bg-yellow-100' },
    { name: 'Camera', icon: '📷', color: 'bg-purple-100' },
    { name: 'Headphones', icon: '🎧', color: 'bg-red-100' },
    { name: 'Gaming', icon: '🎮', color: 'bg-indigo-100' },
  ];

  // Flash Sale Product Card Component
  const FlashSaleProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const inWishlist = isInWishlist(product.id);

    return (
      <div 
        className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
            -{product.discount}%
          </div>
        )}
        
        {/* New Badge */}
        {product.badge === 'New' && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
            New
          </div>
        )}
        
        {/* Out of Stock Badge */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => handleWishlistToggle(product, e)}
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all hover:scale-110"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {inWishlist ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-600 text-lg hover:text-red-500 transition-colors" />
          )}
        </button>

        {/* Product Image with Quick View on Hover */}
        <Link to={`/product-details`}>
          <div className="relative bg-gray-100 h-56 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Quick View Overlay */}
            <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <Link 
                to={`/product-details`}
                className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FaEye /> Quick View
              </Link>
            </div>
          </div>
        </Link>

        {/* Product Info */}
        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-800 hover:text-red-500 transition-colors mb-2 line-clamp-2 min-h-[48px]">
              {product.name}
            </h3>
          </Link>
          
          {/* Price */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-red-500 font-bold text-lg">${product.price}</span>
            <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(product.rating || 4))}
              {'☆'.repeat(5 - Math.floor(product.rating || 4))}
            </div>
            <span className="text-gray-500 text-sm">({product.reviews || 0})</span>
          </div>

          {/* Add to Cart Button */}
          {product.inStock && (
            <button
              onClick={(e) => handleAddToCart(product, e)}
              disabled={addingToCart[product.id]}
              className="w-full bg-black text-white py-2.5 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {addingToCart[product.id] ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <FaShoppingCart />
                  <span>Add To Cart</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Hero Section with Slider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Category Sidebar */}
          <div className="md:w-1/4 lg:w-1/5">
            <div className="space-y-3">
              {['Woman\'s Fashion', 'Men\'s Fashion', 'Electronics', 'Home & Lifestyle', 'Medicine', 'Sports & Outdoor', 'Baby\'s & Toys', 'Groceries & Pets', 'Health & Beauty'].map(cat => (
                <Link
                  key={cat}
                  to={`/products?category=${cat}`}
                  className="block text-gray-700 hover:text-red-500 transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Hero Slider */}
          <div className="md:w-3/4 lg:w-4/5">
            <div 
              className="relative rounded-lg overflow-hidden shadow-2xl"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative h-[400px] md:h-[450px] overflow-hidden">
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 transform ${
                      index === currentSlide
                        ? 'translate-x-0 opacity-100'
                        : index < currentSlide
                        ? '-translate-x-full opacity-0'
                        : 'translate-x-full opacity-0'
                    }`}
                  >
                    <div className={`bg-gradient-to-r ${slide.color} h-full`}>
                      <div className="flex flex-col md:flex-row items-center justify-between h-full p-8 md:p-12">
                        <div className="text-white z-10 max-w-lg">
                          {slide.badge && (
                            <span className="inline-block bg-black-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 animate-pulse">
                              {slide.badge}
                            </span>
                          )}
                          <div className="flex items-center space-x-2 mb-4">
                            <span className="apple-icon"><FaApple size={40} color="white" /></span>
                            <span className="text-lg">{slide.title}</span>
                          </div>
                          
                          <h6 className="text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
                            {slide.title}
                          </h6>
                          <p className="text-gray-200 mb-6 text-lg">
                            {slide.description}
                          </p>
                          <div className="flex items-center gap-4">
                            <Link to={slide.link}>
                              <Button className="bg-gray text-black hover:bg-gray-100">
                                Shop Now →
                              </Button>
                            </Link>
                            <div className="text-3xl font-bold text-yellow-400">
                              {slide.discount} OFF
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 md:mt-0 z-10">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-64 md:w-80 h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? 'w-8 h-2 bg-white'
                        : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>

              <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-20">
                {currentSlide + 1} / {heroSlides.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Sales Section with Slider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-4 h-10 bg-red-500 rounded"></div>
              <span className="text-red-500 font-semibold">Today's</span>
            </div>
            <h2 className="text-3xl font-bold">Flash Sales</h2>
          </div>
          
          {/* Timer */}
          <div className="flex space-x-4">
            <div className="text-center">
              <div className="text-sm text-gray-500">Days</div>
              <div className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
            </div>
            <div className="text-2xl font-bold text-red-500">:</div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Hours</div>
              <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
            </div>
            <div className="text-2xl font-bold text-red-500">:</div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Minutes</div>
              <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
            </div>
            <div className="text-2xl font-bold text-red-500">:</div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Seconds</div>
              <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
            </div>
          </div>
        </div>

        {/* Flash Sales Slider with Navigation Arrows */}
        <div className="relative group">
          {/* Left Navigation Arrow */}
          {canScrollLeft && (
            <button
              onClick={scrollFlashLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Previous products"
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Products Slider Container */}
          <div
            ref={flashSliderRef}
            className="flex overflow-x-auto gap-6 pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {flashProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-full sm:w-[280px] md:w-[300px]">
                <FlashSaleProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          {canScrollRight && (
            <button
              onClick={scrollFlashRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Next products"
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-6 gap-1">
          {Array.from({ length: Math.ceil(flashProducts.length / 4) }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                Math.floor(flashScrollPosition / 300) === idx * 4 ? 'w-6 bg-red-500' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/products">
            <Button variant="primary">View All Products</Button>
          </Link>
        </div>
      </div>

      {/* Divider */}
      <hr className="max-w-7xl mx-auto border-gray-200" />

      {/* Browse By Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-4 h-10 bg-red-500 rounded"></div>
            <span className="text-red-500 font-semibold">Categories</span>
          </div>
          <h2 className="text-3xl font-bold mb-8">Browse By Category</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map(category => (
            <Link
              key={category.name}
              to={`/products?category=${category.name}`}
              className="group"
            >
              <div className={`${category.color} rounded-lg p-6 text-center transition-transform group-hover:scale-105`}>
                <div className="text-4xl mb-2">{category.icon}</div>
                <div className="text-gray-700">{category.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="max-w-7xl mx-auto border-gray-200" />

      {/* Best Selling Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-4 h-10 bg-red-500 rounded"></div>
              <span className="text-red-500 font-semibold">This Month</span>
            </div>
            <h2 className="text-3xl font-bold">Best Selling Products</h2>
          </div>
          <Button variant="primary">View All</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {bestSelling.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Categories & Music Experience Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8">
          {/* Banner */}
          <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl overflow-hidden shadow-xl">
            {/* FLEX ROW */}
            <div className="flex flex-col lg:flex-row items-center justify-between">
              {/* LEFT: Content */}
              <div className="p-8 lg:w-1/2">
                <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">
                  Categories
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight">
                  Enhance Your<br />Music Experience
                </h2>
                {/* Timer */}
                <div className="flex gap-4 mt-8 flex-wrap">
                  {["days", "hours", "minutes", "seconds"].map((unit) => (
                    <div key={unit} className="bg-white rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-black">
                        {String(musicTimer[unit]).padStart(2, '0')}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">{unit}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-8 bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition-colors font-semibold">
                  Buy Now!
                </button>
              </div>
              {/* RIGHT: Image */}
              <div className="lg:w-1/2 flex items-center justify-center p-8">
                <img
                  src="images/banner-headphone.png"
                  alt="Music Experience"
                  className="w-full max-w-md h-auto object-contain transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Products / New Arrival */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-4 h-10 bg-red-500 rounded"></div>
            <span className="text-red-500 font-semibold">Our Products</span>
          </div>
          <h2 className="text-3xl font-bold mb-8">Explore Our Products</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {newArrival.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="primary">View All Products</Button>
        </div>
      </div>

      {/* New Arrival Section - Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-4 h-10 bg-red-500 rounded"></div>
            <span className="text-red-500 font-semibold">Featured</span>
          </div>
          <h2 className="text-3xl font-bold mb-8">New Arrival</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PlayStation 5 - Large Card */}
          <div className="relative bg-black rounded-2xl overflow-hidden group cursor-pointer">
            <img 
              src="images/feature1.png" 
              alt="PlayStation 5" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/50 to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">PlayStation 5</h3>
              <p className="text-gray-300 mb-4">Black and White version of the PS5 coming out on sale.</p>
              <button className="text-white border-b-2 border-white pb-1 hover:text-green-500 hover:border-green-500 transition-colors">
                Shop Now →
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid grid-cols-1 gap-6">
            {/* Women's Collections */}
            <div className="relative bg-black rounded-2xl overflow-hidden h-64 group cursor-pointer">
              <img 
                src="images/feature2.jpg" 
                alt="Women's Collections" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/50 to-transparent">
                <h3 className="text-xl font-bold text-white mb-1">Women's Collections</h3>
                <p className="text-gray-300 text-sm mb-3">Featured women collections that give you another vibe.</p>
                <button className="text-white border-b-2 border-white pb-1 text-sm hover:text-green-500 hover:border-green-500 transition-colors">
                  Shop Now →
                </button>
              </div>
            </div>

            {/* Bottom Row - Two Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Perfume */}
              <div className="relative bg-black rounded-2xl overflow-hidden h-64 group cursor-pointer">
                <img 
                  src="images/feature4.png" 
                  alt="Perfume" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
                  <h3 className="text-lg font-bold text-white mb-1">Perfume</h3>
                  <p className="text-gray-300 text-xs mb-2">Coming Now</p>
                  <button className="text-white border-b-2 border-white pb-1 text-xs hover:text-green-500 hover:border-green-500 transition-colors">
                    Shop Now →
                  </button>
                </div>
              </div>

              {/* Speakers */}
              <div className="relative bg-black rounded-2xl overflow-hidden h-64 group cursor-pointer">
                <img 
                  src="images/feature3.png" 
                  alt="Speakers" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
                  <h3 className="text-lg font-bold text-white mb-1">Speakers</h3>
                  <p className="text-gray-300 text-xs mb-2">Coming Now</p>
                  <button className="text-white border-b-2 border-white pb-1 text-xs hover:text-green-500 hover:border-green-500 transition-colors">
                    Shop Now →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HomePage;