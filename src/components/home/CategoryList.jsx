import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../utils/mockData';

const CategoryList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-4 h-10 bg-red-500 rounded"></div>
          <span className="text-red-500 font-semibold">Categories</span>
        </div>
        <h2 className="text-3xl font-bold mb-8">Browse By Category</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map(category => (
          <Link
            key={category.name}
            to={`/products?category=${category.name}`}
            className="group"
          >
            <div className={`${category.color} rounded-lg p-6 text-center transition-transform group-hover:scale-105`}>
              <div className="text-4xl mb-2">{category.icon}</div>
              <div className="text-gray-700">{category.name}</div>
            </div>
          </Link>
        ))}
      </div>
      
      <hr className="mt-12 border-gray-200" />
    </div>
  );
};

export default CategoryList;