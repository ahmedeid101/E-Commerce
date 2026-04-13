// components/navbar/MobileMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';
import SearchBar from './SearchBar';

/**
 * MobileMenu - Mobile navigation menu
 */
const MobileMenu = ({ isOpen, searchQuery, onSearchChange, onSearchSubmit, wishlistCount, cartCount, onClose }) => {
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
    onClose();
  };

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
        
        {/* Account Section with dropdown items */}
        <div className="pt-2">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Account</p>
          <div className="space-y-2 pl-2">
            <NavLink to="/account" onClick={onClose}>
              Manage My Account
            </NavLink>
            <NavLink to="/orders" onClick={onClose}>
              My Order
            </NavLink>
            <NavLink to="/cancellations" onClick={onClose}>
              My Cancellations
            </NavLink>
            <NavLink to="/reviews" onClick={onClose}>
              My Reviews
            </NavLink>
            <button
              onClick={handleLogout}
              className="block w-full text-left text-red-600 hover:text-red-700 transition-colors py-1"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

// import React from 'react';
// import NavLink from './NavLink';
// import SearchBar from './SearchBar';

// /**
//  * MobileMenu - Mobile navigation menu
//  */
// const MobileMenu = ({ isOpen, searchQuery, onSearchChange, onSearchSubmit, wishlistCount, cartCount, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="md:hidden border-t py-4 space-y-3 bg-white">
//       <div className="px-4">
//         <SearchBar
//           value={searchQuery}
//           onChange={onSearchChange}
//           onSubmit={onSearchSubmit}
//           fullWidth
//         />
//       </div>

//       <div className="px-4 space-y-2">
//         <NavLink to="/" onClick={onClose}>Home</NavLink>
//         <NavLink to="/contact" onClick={onClose}>Contact</NavLink>
//         <NavLink to="/about" onClick={onClose}>About</NavLink>
//         <NavLink to="/register" onClick={onClose}>Sign Up</NavLink>
//       </div>

//       <div className="border-t pt-3 px-4 space-y-2">
//         <NavLink to="/wishlist" onClick={onClose}>
//           Wishlist ({wishlistCount})
//         </NavLink>
//         <NavLink to="/cart" onClick={onClose}>
//           Cart ({cartCount})
//         </NavLink>
//         <NavLink to="/account" onClick={onClose}>
//           Account
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;
