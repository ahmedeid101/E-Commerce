import React from 'react';

/**
 * SearchBar - Reusable search form component
 */
const SearchBar = ({ value, onChange, onSubmit, fullWidth = false }) => (
  <form onSubmit={onSubmit} className={`relative ${fullWidth ? 'w-full' : ''}`}>
    <input
      type="text"
      placeholder="What are you looking for?"
      value={value}
      onChange={onChange}
      className={`px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
        fullWidth ? 'w-full' : 'w-48 lg:w-64 xl:w-80'
      }`}
    />
    <button
      type="submit"
      className="absolute right-3 top-2.5 hover:text-red-500 transition-colors"
      aria-label="Search"
    >
      🔍
    </button>
  </form>
);

export default SearchBar;
