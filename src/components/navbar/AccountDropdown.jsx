// components/navbar/AccountDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaCog, FaClipboardList, FaBan, FaStar, FaSignOutAlt } from 'react-icons/fa';

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    navigate('/login');
    setIsOpen(false);
  };

  const menuItems = [
    { 
      to: '/account', 
      icon: <FaUser className="w-4 h-4" />, 
      label: 'Manage My Account',
      description: 'Profile, addresses, payment options'
    },
    { 
      to: '/orders', 
      icon: <FaClipboardList className="w-4 h-4" />, 
      label: 'My Order',
      description: 'Track and manage your orders'
    },
    { 
      to: '/cancellations', 
      icon: <FaBan className="w-4 h-4" />, 
      label: 'My Cancellations',
      description: 'View cancelled orders'
    },
    { 
      to: '/reviews', 
      icon: <FaStar className="w-4 h-4" />, 
      label: 'My Reviews',
      description: 'Manage your product reviews'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Account Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl hover:text-red-500 transition-colors focus:outline-none"
        aria-label="Account menu"
        aria-expanded={isOpen}
      >
        <FaUser />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden animate-slide-down">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-3">
            <h3 className="text-white font-semibold">My Account</h3>
            <p className="text-white/80 text-xs">Manage your account settings</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
              >
                <div className="text-gray-400 group-hover:text-red-500 transition-colors">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800 group-hover:text-red-500 transition-colors">
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-400">{item.description}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100"></div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors group"
          >
            <div className="text-gray-400 group-hover:text-red-500 transition-colors">
              <FaSignOutAlt className="w-4 h-4" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-gray-800 group-hover:text-red-500 transition-colors">
                Logout
              </div>
              <div className="text-xs text-gray-400">Sign out of your account</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;