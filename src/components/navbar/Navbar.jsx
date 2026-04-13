import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import {
  TopBanner,
  NavbarContent,
  CategoriesDropdown,
  MobileMenu,
} from "../navbar";

/**
 * Navbar - Main navigation component
 * Handles responsive navigation with mobile menu, search, and category dropdown
 */
const Navbar = () => {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Hooks
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Handlers
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    navigate(`/products?search=${searchQuery}`);
    setSearchQuery("");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Top Promotional Banner */}
      <TopBanner />

      {/* Main Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Navbar Header */}
          <div className="flex justify-between items-center h-16">
            <NavbarContent
              searchQuery={searchQuery}
              onSearchChange={(e) => setSearchQuery(e.target.value)}
              onSearchSubmit={handleSearch}
              wishlistCount={wishlistCount}
              cartCount={cartCount}
            />

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden ml-auto p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              ☰
            </button>
          </div>

          {/* Categories Dropdown - Only show for logged in users */}
          {isLoggedIn && (
            <CategoriesDropdown
              isOpen={isCategoryOpen}
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            />
          )}
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMenuOpen}
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onSearchSubmit={handleSearch}
          wishlistCount={wishlistCount}
          cartCount={cartCount}
          onClose={closeMenu}
        />
      </nav>
    </>
  );
};

export default Navbar;