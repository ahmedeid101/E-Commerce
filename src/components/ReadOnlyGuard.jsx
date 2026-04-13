import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ReadOnlyGuard - Allows users to view pages but restricts actions
 * Shows a modal or redirects to login when trying to perform actions
 */
const ReadOnlyGuard = ({ children, requireAuthForAction = false }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  // For actions that require login (add to cart, wishlist, checkout)
  if (requireAuthForAction && !isLoggedIn) {
    // Store the intended action in localStorage
    localStorage.setItem('intendedAction', 'true');
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ReadOnlyGuard;