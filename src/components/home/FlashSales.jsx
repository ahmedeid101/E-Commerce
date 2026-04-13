import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import Button from '../Button';
import { useTimer } from '../../hooks/useTimer';

const FlashSaleProductCard = ({ product, onAddToCart, onWishlistToggle, isInWishlist, addingToCart }) => {
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
        onClick={(e) => onWishlistToggle(product, e)}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all hover:scale-110"
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {inWishlist ? (
          <FaHeart className="text-red-500 text-lg" />
        ) : (
          <FaRegHeart className="text-gray-600 text-lg hover:text-red-500 transition-colors" />
        )}
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
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
              to={`/product/${product.id}`}
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
          <h3 className="font-semibold text-gray-800 hover:text-red-500 transition-colors mb-2 line-clamp-2 min-h-12">
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
            onClick={(e) => onAddToCart(product, e)}
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

const FlashSales = ({ products, onAddToCart, onWishlistToggle, isInWishlist }) => {
  const [addingToCart, setAddingToCart] = useState({});
  const [flashScrollPosition, setFlashScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const flashSliderRef = useRef(null);
  const timeLeft = useTimer({ days: 3, hours: 23, minutes: 19, seconds: 56 });

  const handleAddToCart = async (product, e) => {
    setAddingToCart(prev => ({ ...prev, [product.id]: true }));
    await new Promise(resolve => setTimeout(resolve, 500));
    onAddToCart(product, e);
    setAddingToCart(prev => ({ ...prev, [product.id]: false }));
  };

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

  const checkScrollPosition = () => {
    if (flashSliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = flashSliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
      setFlashScrollPosition(scrollLeft);
    }
  };

  useEffect(() => {
    const slider = flashSliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => slider.removeEventListener('scroll', checkScrollPosition);
    }
  }, [products]);

  return (
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

      {/* Flash Sales Slider */}
      <div className="relative group">
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

        <div
          ref={flashSliderRef}
          className="flex overflow-x-auto gap-6 pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="shrink-0 w-full sm:w-70 md:w-75">
              <FlashSaleProductCard 
                product={product}
                onAddToCart={handleAddToCart}
                onWishlistToggle={onWishlistToggle}
                isInWishlist={isInWishlist}
                addingToCart={addingToCart}
              />
            </div>
          ))}
        </div>

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
        {Array.from({ length: Math.ceil(products.length / 4) }).map((_, idx) => (
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
  );
};

export default FlashSales;