import React from 'react';
import { Link } from 'react-router-dom';

/**
 * TopBanner - Promotional banner at the top
 */
const TopBanner = () => {
  return (
    <div className="bg-black text-white text-sm py-3">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div />

        <div className="flex items-center gap-4 text-center">
          <span className="font-semibold">Summer Sale For All Swim Suits</span>
          <span className="text-yellow-400 font-bold">- OFF 50%!</span>
          <Link to="/products" className="underline hover:text-yellow-400 transition-colors">
            Shop Now
          </Link>
        </div>

        <button className="hover:text-yellow-400 transition-colors">English ▼</button>
      </div>
    </div>
  );
};

export default TopBanner;
