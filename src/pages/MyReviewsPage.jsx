// pages/MyReviewsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaEdit, FaTrash, FaImage } from 'react-icons/fa';
import Button from '../components/Button';

const MyReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');

  // Load reviews from localStorage
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    setLoading(true);
    // Get reviews from localStorage or create sample data
    let savedReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
    
    if (savedReviews.length === 0) {
      // Sample reviews for demonstration
      savedReviews = [
        {
          id: 1,
          productId: 1,
          productName: 'HAVIT HV-G92 Gamepad',
          productImage: 'https://picsum.photos/id/1/100/100',
          rating: 5,
          title: 'Excellent Gamepad!',
          review: 'This gamepad is amazing! Great build quality and responsive buttons. Highly recommend!',
          date: '2024-01-15',
          helpful: 24,
          images: []
        },
        {
          id: 2,
          productId: 2,
          productName: 'AK-900 Wired Keyboard',
          productImage: 'https://picsum.photos/id/2/100/100',
          rating: 4,
          title: 'Good keyboard for the price',
          review: 'Solid mechanical keyboard with nice RGB lighting. Keys feel great for typing and gaming.',
          date: '2024-01-10',
          helpful: 12,
          images: []
        }
      ];
      localStorage.setItem('userReviews', JSON.stringify(savedReviews));
    }
    
    setReviews(savedReviews.reverse());
    setLoading(false);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setRating(review.rating);
    setReviewTitle(review.title);
    setReviewText(review.review);
    setShowEditModal(true);
  };

  const handleUpdateReview = () => {
    const updatedReviews = reviews.map(review => 
      review.id === editingReview.id 
        ? { 
            ...review, 
            rating, 
            title: reviewTitle, 
            review: reviewText,
            date: new Date().toISOString().split('T')[0]
          }
        : review
    );
    setReviews(updatedReviews);
    localStorage.setItem('userReviews', JSON.stringify(updatedReviews));
    setShowEditModal(false);
    setEditingReview(null);
    setRating(5);
    setReviewTitle('');
    setReviewText('');
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const updatedReviews = reviews.filter(review => review.id !== reviewId);
      setReviews(updatedReviews);
      localStorage.setItem('userReviews', JSON.stringify(updatedReviews));
    }
  };

  const renderRatingStars = (rating, interactive = false, onRatingClick = null, onHover = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => interactive && onRatingClick && onRatingClick(i)}
          onMouseEnter={() => interactive && onHover && onHover(i)}
          onMouseLeave={() => interactive && onHover && onHover(0)}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
        >
          {i <= (interactive ? (hoverRating || rating) : rating) ? (
            <FaStar className="text-yellow-400 text-xl" />
          ) : i - 0.5 <= (interactive ? (hoverRating || rating) : rating) ? (
            <FaStarHalfAlt className="text-yellow-400 text-xl" />
          ) : (
            <FaRegStar className="text-yellow-400 text-xl" />
          )}
        </button>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        Account / <span className="text-black">My Reviews</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Reviews</h1>
          <p className="text-gray-500 mt-1">Manage and edit your product reviews</p>
        </div>
        <Link to="/products">
          <Button variant="primary">Write a New Review</Button>
        </Link>
      </div>

      {/* Reviews Stats */}
      {reviews.length > 0 && (
        <div className="bg-linear-to-r from-red-50 to-orange-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">
                {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
              </div>
              <div className="flex gap-0.5 mt-1">
                {renderRatingStars(Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length))}
              </div>
              <div className="text-sm text-gray-500 mt-1">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">{reviews.length}</div>
              <div className="text-sm text-gray-500 mt-2">Total Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">
                {reviews.reduce((sum, r) => sum + (r.helpful || 0), 0)}
              </div>
              <div className="text-sm text-gray-500 mt-2">Helpful Votes</div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
          <p className="text-gray-500 mb-6">You haven't written any product reviews yet.</p>
          <Link to="/products">
            <Button variant="primary">Shop and Review</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                {/* Product Image */}
                <img 
                  src={review.productImage} 
                  alt={review.productName}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                {/* Review Content */}
                <div className="flex-1">
                  <Link to={`/product/${review.productId}`}>
                    <h3 className="font-semibold text-lg hover:text-red-500 transition-colors">
                      {review.productName}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5">
                      {renderRatingStars(review.rating)}
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  
                  <h4 className="font-medium mt-2">{review.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{review.review}</p>
                  
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      <FaImage className="text-gray-400" />
                      <span className="text-xs text-gray-400">{review.images.length} photo(s)</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                    <span className="text-xs text-gray-400">
                      {review.helpful || 0} people found this helpful
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Review Modal */}
      {showEditModal && editingReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit Review</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="p-6">
              <div className="flex gap-4 mb-4">
                <img 
                  src={editingReview.productImage} 
                  alt={editingReview.productName}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{editingReview.productName}</h3>
                  <div className="flex gap-0.5 mt-1">
                    {renderRatingStars(rating, true, setRating, setHoverRating)}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Review Title</label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Summarize your experience"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Your Review</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Share your experience with this product..."
                />
              </div>
              
              <div className="flex gap-3">
                <Button variant="primary" onClick={handleUpdateReview}>
                  Update Review
                </Button>
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviewsPage;