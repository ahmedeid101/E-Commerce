// pages/NotFoundPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  // Suggested links for users
  const suggestedLinks = [
    { name: 'Home Page', path: '/', icon: '🏠' },
    { name: 'Shop Now', path: '/products', icon: '🛍️' },
    { name: 'Best Sellers', path: '/products?sort=best', icon: '⭐' },
    { name: 'New Arrivals', path: '/products?sort=new', icon: '🎁' },
    { name: 'Flash Sales', path: '/products?category=flash-sales', icon: '⚡' },
    { name: 'Contact Support', path: '/contact', icon: '📞' }
  ];

  // Funny error messages
  const errorMessages = [
    "Oops! This page went on vacation.",
    "We looked everywhere, but this page is hiding.",
    "404: Page not found. It's probably playing hide and seek.",
    "The page you're looking for has left the building.",
    "This is not the page you're looking for. (Jedi wave)",
    "Houston, we have a problem. This page is missing.",
    "Our bad! This page seems to have vanished into thin air.",
    "404: The page that got away.",
    "Don't panic! The page is just taking a coffee break.",
    "This page is as real as unicorns."
  ];

  const randomErrorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];

  return (
    <div className="min-h-[calc(100vh-400px)] flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-red-100 rounded-full animate-pulse opacity-50"></div>
          </div>
          <div className="relative z-10">
            <div className="text-[150px] md:text-[200px] font-bold leading-none animate-bounce">
              404
            </div>
            <div className="text-6xl md:text-8xl mt-4 animate-pulse">
              🔍
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {randomErrorMessage}
          </p>
          <p className="text-gray-500">
            The page you visited does not exist or may have been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/">
            <Button variant="primary" className="px-8 py-3 text-lg">
              🏠 Back to Home Page
            </Button>
          </Link>
          <Button variant="outline" onClick={goBack} className="px-8 py-3 text-lg">
            ⬅️ Go Back
          </Button>
        </div>

        {/* Suggested Links */}
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            You might be looking for:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {suggestedLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="group flex items-center justify-center space-x-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-red-50 transition-all duration-300 hover:scale-105"
              >
                <span className="text-xl group-hover:animate-bounce">{link.icon}</span>
                <span className="text-gray-700 group-hover:text-red-500 font-medium">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Search Help */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Still can't find what you're looking for?
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search our store..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  window.location.href = `/products?search=${encodeURIComponent(e.target.value)}`;
                }
              }}
            />
            <Button 
              variant="primary"
              onClick={() => {
                const searchInput = document.querySelector('input[placeholder="Search our store..."]');
                if (searchInput && searchInput.value.trim()) {
                  window.location.href = `/products?search=${encodeURIComponent(searchInput.value)}`;
                }
              }}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="mt-12 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <span className="text-2xl">💡</span>
            <span className="text-sm font-semibold text-gray-600">DID YOU KNOW?</span>
          </div>
          <p className="text-gray-700 text-sm">
            Our website has over 10,000 products! Try using the search bar above to find exactly what you need.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 opacity-10 pointer-events-none">
          <div className="w-64 h-64 bg-red-500 rounded-full filter blur-3xl"></div>
        </div>
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <div className="w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;