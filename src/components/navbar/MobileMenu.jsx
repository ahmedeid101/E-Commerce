import React from 'react';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';
import SearchBar from './SearchBar';
import { categoryList } from '../../utils/mockData';

/**
 * MobileMenu - Mobile navigation menu
 */
const MobileMenu = ({ isOpen, searchQuery, onSearchChange, onSearchSubmit, wishlistCount, cartCount, onClose }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t bg-white shadow-lg animate-slide-down relative z-50">
      <div className="px-4 py-4 space-y-4">
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
          fullWidth
        />

        {/* Navigation Links */}
        <div className="space-y-1">
          <NavLink to="/" onClick={onClose} className="block py-2">Home</NavLink>
          <NavLink to="/contact" onClick={onClose} className="block py-2">Contact</NavLink>
          <NavLink to="/about" onClick={onClose} className="block py-2">About</NavLink>
          {!isLoggedIn && <NavLink to="/register" onClick={onClose} className="block py-2">Sign Up</NavLink>}
        </div>

        {/* Categories Section */}
        {isLoggedIn && (
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-semibold">Categories</p>
            <div className="grid grid-cols-2 gap-2">
              {categoryList.slice(0, 6).map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${category}`}
                  onClick={onClose}
                  className="text-sm text-gray-700 hover:text-red-500 transition-colors py-2 px-3 rounded-md hover:bg-gray-50"
                >
                  {category}
                </Link>
              ))}
            </div>
            <Link
              to="/products"
              onClick={onClose}
              className="text-sm text-red-500 hover:text-red-600 transition-colors py-2 block mt-2 font-medium"
            >
              View All Categories →
            </Link>
          </div>
        )}

        {/* Quick Actions */}
        <div className="border-t pt-4 space-y-1">
          <NavLink to={isLoggedIn ? "/wishlist" : "/login"} onClick={onClose} className="flex justify-between items-center py-2">
            <span>Wishlist</span>
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">{wishlistCount}</span>
          </NavLink>
          <NavLink to={isLoggedIn ? "/cart" : "/login"} onClick={onClose} className="flex justify-between items-center py-2">
            <span>Cart</span>
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">{cartCount}</span>
          </NavLink>
        </div>
        
        {/* Account Section */}
        <div className="border-t pt-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-semibold">Account</p>
          <div className="space-y-1">
            {isLoggedIn ? (
              <>
                <NavLink to="/account" onClick={onClose} className="block py-2">
                  Manage My Account
                </NavLink>
                <NavLink to="/orders" onClick={onClose} className="block py-2">
                  My Order
                </NavLink>
                <NavLink to="/cancellations" onClick={onClose} className="block py-2">
                  My Cancellations
                </NavLink>
                <NavLink to="/reviews" onClick={onClose} className="block py-2">
                  My Reviews
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-red-600 hover:text-red-700 transition-colors py-2 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={onClose} className="block py-2">
                  Login
                </NavLink>
                <NavLink to="/register" onClick={onClose} className="block py-2">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;