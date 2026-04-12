import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';

const EmptyWishlist = () => {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">❤️</div>
      <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
      <p className="text-gray-500 mb-8">Save your favorite items here to buy them later.</p>
      <Link to="/products">
        <Button variant="primary">Continue Shopping</Button>
      </Link>
    </div>
  );
};

export default EmptyWishlist;
