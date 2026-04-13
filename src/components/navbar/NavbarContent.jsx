// components/navbar/NavbarContent.jsx
import React from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';
import IconWithBadge from './IconWithBadge';
import SearchBar from './SearchBar';
import AccountDropdown from './AccountDropdown';

/**
 * NavbarContent - Main navbar content for desktop
 */
const NavbarContent = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  wishlistCount,
  cartCount,
}) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <>
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold hover:text-red-500 transition-colors">
        Exclusive
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/about">About</NavLink>
        {!isLoggedIn && <NavLink to="/register">Sign Up</NavLink>}
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center space-x-4">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        />

        {/* Wishlist - Always visible but redirects to login if not logged in */}
        <IconWithBadge to={isLoggedIn ? "/wishlist" : "/login"} icon={<FaHeart />} count={wishlistCount} />
        
        {/* Cart - Always visible but redirects to login if not logged in */}
        <IconWithBadge to={isLoggedIn ? "/cart" : "/login"} icon={<FaShoppingCart />} count={cartCount} />

        {/* Account Dropdown */}
        <AccountDropdown />
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden p-2 hover:bg-gray-100 rounded transition-colors" aria-label="Toggle menu">
        ☰
      </button>
    </>
  );
};

export default NavbarContent;