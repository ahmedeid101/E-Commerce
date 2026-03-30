import React from 'react';

const Button = ({ children, variant = 'primary', className = '', onClick, disabled = false, type = 'button' }) => {
  const baseStyles = 'px-6 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    secondary: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-800',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 focus:ring-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;