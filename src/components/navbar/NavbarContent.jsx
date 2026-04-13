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
        <NavLink to="/register">Sign Up</NavLink>
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center space-x-4">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        />

        <IconWithBadge to="/wishlist" icon={<FaHeart />} count={wishlistCount} />
        <IconWithBadge to="/cart" icon={<FaShoppingCart />} count={cartCount} />

        {/* Account Dropdown - Replaces the simple account link */}
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

// import React from 'react';
// import { FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import NavLink from './NavLink';
// import IconWithBadge from './IconWithBadge';
// import SearchBar from './SearchBar';

// /**
//  * NavbarContent - Main navbar content for desktop
//  */
// const NavbarContent = ({
//   searchQuery,
//   onSearchChange,
//   onSearchSubmit,
//   wishlistCount,
//   cartCount,
// }) => {
//   return (
//     <>
//       {/* Logo */}
//       <Link to="/" className="text-2xl font-bold hover:text-red-500 transition-colors">
//         Exclusive
//       </Link>

//       {/* Desktop Links */}
//       <div className="hidden md:flex items-center space-x-8">
//         <NavLink to="/">Home</NavLink>
//         <NavLink to="/contact">Contact</NavLink>
//         <NavLink to="/about">About</NavLink>
//         <NavLink to="/register">Sign Up</NavLink>
//       </div>

//       {/* Desktop Actions */}
//       <div className="hidden md:flex items-center space-x-4">
//         <SearchBar
//           value={searchQuery}
//           onChange={onSearchChange}
//           onSubmit={onSearchSubmit}
//         />

//         <IconWithBadge to="/wishlist" icon={<FaHeart />} count={wishlistCount} />
//         <IconWithBadge to="/cart" icon={<FaShoppingCart />} count={cartCount}  />

//         <Link to="/account" className="text-2xl hover:text-red-500 transition-colors">
//           <FaUser />
//         </Link>
//       </div>

//       {/* Mobile Menu Button */}
//       <button className="md:hidden p-2 hover:bg-gray-100 rounded transition-colors" aria-label="Toggle menu">
//         ☰
//       </button>
//     </>
//   );
// };

// export default NavbarContent;
