import React from 'react';
import NavLink from './NavLink';
import SearchBar from './SearchBar';

/**
 * MobileMenu - Mobile navigation menu
 */
const MobileMenu = ({ isOpen, searchQuery, onSearchChange, onSearchSubmit, wishlistCount, cartCount, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t py-4 space-y-3 bg-white">
      <div className="px-4">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
          fullWidth
        />
      </div>

      <div className="px-4 space-y-2">
        <NavLink to="/" onClick={onClose}>Home</NavLink>
        <NavLink to="/contact" onClick={onClose}>Contact</NavLink>
        <NavLink to="/about" onClick={onClose}>About</NavLink>
        <NavLink to="/register" onClick={onClose}>Sign Up</NavLink>
      </div>

      <div className="border-t pt-3 px-4 space-y-2">
        <NavLink to="/wishlist" onClick={onClose}>
          Wishlist ({wishlistCount})
        </NavLink>
        <NavLink to="/cart" onClick={onClose}>
          Cart ({cartCount})
        </NavLink>
        <NavLink to="/account" onClick={onClose}>
          Account
        </NavLink>
      </div>
    </div>
  );
};

export default MobileMenu;
