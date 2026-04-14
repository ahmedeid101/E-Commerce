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
    <div className="flex items-center justify-between w-full">
      {/* Logo */}
      <Link to="/" className="text-lg sm:text-xl lg:text-2xl font-bold hover:text-red-500 transition-colors shrink-0">
        Exclusive
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/about">About</NavLink>
        {!isLoggedIn && <NavLink to="/register">Sign Up</NavLink>}
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center space-x-3 lg:space-x-4 shrink-0">
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

      {/* Mobile Actions - Show on small screens, hide on md and up */}
      <div className="flex md:hidden items-center space-x-2 shrink-0">
        {/* Wishlist - Always visible but redirects to login if not logged in */}
        <IconWithBadge to={isLoggedIn ? "/wishlist" : "/login"} icon={<FaHeart />} count={wishlistCount} />
        
        {/* Cart - Always visible but redirects to login if not logged in */}
        <IconWithBadge to={isLoggedIn ? "/cart" : "/login"} icon={<FaShoppingCart />} count={cartCount} />
      </div>
    </div>
  );
};

export default NavbarContent;