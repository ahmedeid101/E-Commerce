import React from 'react';
import { Link } from 'react-router-dom';
import { categoryList } from '../../utils/mockData';

/**
 * CategoriesDropdown - Hover dropdown menu for categories
 */
const CategoriesDropdown = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className="hidden md:block border-t py-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
          ☰ Browse Categories
        </button>

        {isOpen && (
          <div className="absolute w-64 bg-white shadow-lg rounded mt-2 z-50">
            {categoryList.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="block px-4 py-3 hover:bg-red-50 hover:text-red-500 transition-colors border-b last:border-b-0"
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesDropdown;
