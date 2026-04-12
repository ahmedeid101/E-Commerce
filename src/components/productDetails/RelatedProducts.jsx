import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

const RelatedProducts = ({ products }) => (
  <div>
    <div className="flex items-center gap-4 mb-6">
      <div className="w-5 h-10 bg-red-500 rounded" />
      <h2 className="text-2xl font-bold">Related Item</h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((related) => (
        <Link to={`/product/${related.id}`} key={related.id} className="group">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="relative bg-gray-100 h-48 overflow-hidden">
              <img
                src={related.image}
                alt={related.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 hover:text-red-500 transition-colors mb-2 line-clamp-2">{related.name}</h3>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-red-500 font-bold">${related.price}</span>
                <span className="text-gray-400 line-through text-sm">${related.originalPrice}</span>
              </div>
              <div className="flex items-center gap-2">
                <RatingStars rating={related.rating} className="text-sm" />
                <span className="text-gray-500 text-sm">({related.reviews})</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default RelatedProducts;
