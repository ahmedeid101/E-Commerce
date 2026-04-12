import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const NotFoundState = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
    <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
    <p className="text-gray-500 mb-8">The product you're looking for doesn't exist.</p>
    <Link to="/products">
      <Button variant="primary">Continue Shopping</Button>
    </Link>
  </div>
);

export default NotFoundState;
