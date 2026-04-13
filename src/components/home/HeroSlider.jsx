import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaApple } from 'react-icons/fa';
import Button from '../Button';
import { heroSlides } from '../../utils/mockData';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play slider
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Category Sidebar */}
        <div className="md:w-1/4 lg:w-1/5">
          <div className="space-y-3">
            {['Woman\'s Fashion', 'Men\'s Fashion', 'Electronics', 'Home & Lifestyle', 
              'Medicine', 'Sports & Outdoor', 'Baby\'s & Toys', 'Groceries & Pets', 'Health & Beauty']
              .map(cat => (
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
            <div className="relative h-100 md:h-112.5 overflow-hidden">
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
                  <div className={`bg-linear-to-r ${slide.color} h-full`}>
                    <div className="flex flex-col md:flex-row items-center justify-between h-full p-8 md:p-12">
                      <div className="text-white z-10 max-w-lg">
                        {slide.badge && (
                          <span className="inline-block bg-black-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 animate-pulse">
                            {slide.badge}
                          </span>
                        )}
                        <div className="flex items-center space-x-2 mb-4">
                          <FaApple size={40} color="white" />
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

            {/* Slider Indicators */}
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

            {/* Slide Counter */}
            <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-20">
              {currentSlide + 1} / {heroSlides.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;