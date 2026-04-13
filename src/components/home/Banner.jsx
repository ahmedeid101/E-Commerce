import React from 'react';
import { Link } from 'react-router-dom';
import { useTimer } from '../../hooks/useTimer';

const Banner = () => {
  const musicTimer = useTimer({ days: 5, hours: 23, minutes: 59, seconds: 35 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-linear-to-br from-black to-gray-900 rounded-2xl overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
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
            
            <Link to='/products'>
              <button className="mt-8 bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition-colors font-semibold">
                Buy Now!
              </button>
            </Link>
          </div>
          
          {/* Right Image */}
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
  );
};

export default Banner;