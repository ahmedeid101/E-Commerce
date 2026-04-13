import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedCard = ({ image, title, description, link }) => (
  <div className="relative bg-black rounded-2xl overflow-hidden group cursor-pointer">
    <img 
      src={image} 
      alt={title} 
      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
    />
    <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black via-black/50 to-transparent">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <Link to={link}>
        <button className="text-white border-b-2 border-white pb-1 hover:text-green-500 hover:border-green-500 transition-colors">
          Shop Now →
        </button>
      </Link>
    </div>
  </div>
);

const FeaturedSection = () => {
  const featuredItems = {
    main: {
      image: "images/feature1.png",
      title: "PlayStation 5",
      description: "Black and White version of the PS5 coming out on sale.",
      link: "/products"
    },
    women: {
      image: "images/feature2.jpg",
      title: "Women's Collections",
      description: "Featured women collections that give you another vibe.",
      link: "/products"
    },
    perfume: {
      image: "images/feature4.png",
      title: "Perfume",
      description: "Coming Now",
      link: "/products"
    },
    speakers: {
      image: "images/feature3.png",
      title: "Speakers",
      description: "Coming Now",
      link: "/products"
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-4 h-10 bg-red-500 rounded"></div>
          <span className="text-red-500 font-semibold">Featured</span>
        </div>
        <h2 className="text-3xl font-bold mb-8">New Arrival</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Featured Item */}
        <FeaturedCard {...featuredItems.main} />
        
        {/* Right Column */}
        <div className="grid grid-cols-1 gap-6">
          <FeaturedCard {...featuredItems.women} />
          
          {/* Bottom Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FeaturedCard {...featuredItems.perfume} />
            <FeaturedCard {...featuredItems.speakers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;