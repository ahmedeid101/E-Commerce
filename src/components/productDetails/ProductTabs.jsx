import React from 'react';
import { FaCheck } from 'react-icons/fa';
import Button from '../../components/Button';
import RatingStars from './RatingStars';

const tabs = [
  { key: 'description', label: 'Description' },
  { key: 'features', label: 'Features' },
  { key: 'specifications', label: 'Specifications' },
  { key: 'reviews', label: 'Reviews' },
];

const ProductTabs = ({ activeTab, onTabChange, product }) => (
  <div className="mb-12">
    <div className="border-b border-gray-200 flex gap-8">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
          className={`pb-3 font-semibold transition-colors ${
            activeTab === tab.key
              ? 'border-b-2 border-red-500 text-red-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
          {tab.key === 'reviews' && ` (${product.reviews})`}
        </button>
      ))}
    </div>

    <div className="py-6">
      {activeTab === 'description' && (
        <div>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <p className="text-gray-600 leading-relaxed mt-4">
            This product is designed with the highest quality materials to ensure durability and long-lasting performance. Whether you're a professional or a casual user, this product will meet your needs and exceed your expectations.
          </p>
        </div>
      )}

      {activeTab === 'features' && (
        <ul className="space-y-2">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <FaCheck className="text-green-500 mt-1" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {activeTab === 'specifications' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="flex py-2 border-b border-gray-100">
              <span className="w-1/3 font-semibold text-gray-700">{key}</span>
              <span className="w-2/3 text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'reviews' && (
        <div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
              <div className="text-4xl font-bold">{product.rating}</div>
              <div>
                <RatingStars rating={product.rating} />
                <div className="text-sm text-gray-500">Based on {product.reviews} reviews</div>
              </div>
            </div>
            <Button variant="primary">Write a Review</Button>
          </div>

          <div className="space-y-4">
            {product.reviews_list.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{review.user}</p>
                    <div className="flex items-center gap-2">
                      <RatingStars rating={review.rating} />
                      <span className="text-sm text-gray-400">{review.date}</span>
                    </div>
                  </div>
                  <button className="text-sm text-gray-400 hover:text-red-500">Helpful ({review.helpful})</button>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default ProductTabs;
