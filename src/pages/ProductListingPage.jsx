// pages/ProductListingPage.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam) setSearchQuery(searchParam);
    
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    const mockProducts = [
      { id: 1, name: 'HAVIT HV-G92 Gamepad', price: 120, originalPrice: 160, rating: 4.5, reviews: 88, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/1/300/300' },
      { id: 2, name: 'AK-900 Wired Keyboard', price: 960, originalPrice: 1160, rating: 4.8, reviews: 75, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/2/300/300' },
      { id: 3, name: 'IPS LCD Gaming Monitor', price: 370, originalPrice: 400, rating: 4.6, reviews: 99, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/3/300/300' },
      { id: 4, name: 'S-Series Comfort Chair', price: 375, originalPrice: 400, rating: 4.7, reviews: 99, category: 'Furniture', inStock: true, image: 'https://picsum.photos/id/4/300/300' },
      { id: 5, name: 'The North Coat', price: 260, originalPrice: 360, rating: 4.5, reviews: 85, category: 'Fashion', inStock: true, image: 'https://picsum.photos/id/5/300/300' },
      { id: 6, name: 'Gucci Duffle Bag', price: 960, originalPrice: 1160, rating: 4.6, reviews: 86, category: 'Fashion', inStock: true, image: 'https://picsum.photos/id/6/300/300' },
      { id: 7, name: 'RGB Liquid CPU Cooler', price: 160, originalPrice: 170, rating: 4.5, reviews: 85, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/7/300/300' },
      { id: 8, name: 'Small BookSelf', price: 360, originalPrice: 360, rating: 4.5, reviews: 85, category: 'Furniture', inStock: true, image: 'https://picsum.photos/id/8/300/300' },
      { id: 9, name: 'Breed Dry Dog Food', price: 100, rating: 4.2, reviews: 35, category: 'Pets', inStock: true, image: 'https://picsum.photos/id/9/300/300' },
      { id: 10, name: 'CANON EOS DSLR Camera', price: 380, rating: 4.8, reviews: 85, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/10/300/300' },
      { id: 11, name: 'ASUS FHD Gaming Laptop', price: 700, rating: 4.7, reviews: 85, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/11/300/300' },
      { id: 12, name: 'Curology Product Set', price: 500, rating: 4.4, reviews: 145, category: 'Beauty', inStock: true, image: 'https://picsum.photos/id/12/300/300' },
    ];
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    
    const uniqueCategories = [...new Set(mockProducts.map(p => p.category))];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by price
    filtered = filtered.filter(p => 
      p.price >= priceRange.min && p.price <= priceRange.max
    );
    
    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, priceRange, sortBy, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        Account / Gaming / <span className="text-black">Havic HV G-92 Gamepad</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="md:w-1/4 space-y-6">
          <div>
            <h3 className="font-bold mb-3">Categories</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === ''}
                  onChange={() => setSelectedCategory('')}
                  className="mr-2"
                />
                <span>All Products</span>
              </label>
              {categories.map(cat => (
                <label key={cat} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="mr-2"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3">Price Range</h3>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange.min}</span>
                <span>${priceRange.max}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:w-3/4">
          {/* Sort and Results */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{filteredProducts.length} products found</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;