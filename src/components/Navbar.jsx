import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Summer Sale Banner */}
      <div className="bg-black text-white py-1 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between text-sm py-3">

          {/* LEFT (empty for balance) */}
          <div className="hidden sm:block w-1/5"></div>

          {/* CENTER CONTENT */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-sm">
            <div className="flex items-center gap-2">
                <span className="font-semibold">Summer Sale For All Swim Suits And Free Express Delivery</span>
                <span className="text-yellow-400 font-bold ml-1">- OFF 50%!</span>
            </div>

            <Link
              to="/products"
              className="text-white font-semibold underline hover:text-yellow-400 transition-colors"
            >
              ShopNow
            </Link>
          </div>

          {/* RIGHT (Language Selector) */}
          <div className="w-1/3 flex justify-end">
            <div className="relative">
              <button className="flex items-center space-x-2 text-white hover:text-yellow-400">
                <span>English</span>
                <span>▼</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
        {/* <div className="bg-black text-white py-3 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 animate-pulse">🏖️</span>
                <span className="font-semibold">Summer Sale For All Swim Suits And Free Express Delivery</span>
                <span className="text-yellow-400 font-bold ml-1">- OFF 50%!</span>
              </div>
              <Link to="/" 
                className="text-white font-semibold underline hover:text-yellow-400 transition-colors ml-0 sm:ml-2"
              >
                ShopNow
              </Link>

              <div className="relative">
                <button className="flex items-left space-x-2 text-gray-700">
                  <span>English</span>
                  <span>▼</span>
                </button>
              </div>
            </div>
            
          </div>
        </div> */}

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-black">
              Exclusive
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
              <Link to="/register" className="text-gray-700 hover:text-gray-900">Sign Up</Link>
            </div>

            {/* Search Bar and Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button type="submit" className="absolute right-3 top-2.5">
                  🔍
                </button>
              </form>
              
              {/* Wishlist ❤️*/}
              <Link to="/wishlist" className="relative">
                <span className="text-2xl"><FaHeart className="icon" /></span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart 🛒 */}
              <Link to="/cart" className="relative">
                <span className="text-2xl"><FaShoppingCart className="icon" /></span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Account 👤*/}
              <Link to="/account" className="text-2xl"><FaUser className="icon" /></Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="hidden md:block py-2 border-t border-gray-100">
            <div className="relative">
              <button
                onMouseEnter={() => setIsCategoryOpen(true)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <span>☰</span>
                <span>Browse Categories</span>
              </button>
              
              {isCategoryOpen && (
                <div
                  onMouseLeave={() => setIsCategoryOpen(false)}
                  className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-md py-2 z-50"
                >
                  {['Woman\'s Fashion', 'Men\'s Fashion', 'Electronics', 'Home & Lifestyle', 'Medicine', 'Sports & Outdoor', 'Baby\'s & Toys', 'Groceries & Pets', 'Health & Beauty', 'Swimwear'].map(category => (
                    <Link
                      key={category}
                      to={`/products?category=${category}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <form onSubmit={handleSearch} className="relative mb-2">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button type="submit" className="absolute right-3 top-2.5">
                    🔍
                  </button>
                </form>
                <Link to="/" className="text-gray-700 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/contact" className="text-gray-700 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                <Link to="/about" className="text-gray-700 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link to="/register" className="text-gray-700 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                <Link to="/wishlist" className="text-gray-700 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Wishlist ({wishlistCount})</Link>
                <Link to="/cart" className="text-gray-700 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Cart ({cartCount})</Link>
                <Link to="/account" className="text-gray-700 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Account</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;