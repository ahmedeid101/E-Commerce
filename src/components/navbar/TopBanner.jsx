import React from 'react';
import { Link } from 'react-router-dom';

/**
 * TopBanner - Promotional banner at the top
 */
const TopBanner = () => {
  return (
    <div className="bg-black text-white text-sm py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center gap-4">
        <span className="font-semibold">Summer Sale For All Swim Suits</span>
        <span className="text-yellow-400 font-bold">- OFF 50%!</span>
        <Link to="/products" className="underline hover:text-yellow-400 transition-colors">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default TopBanner;
