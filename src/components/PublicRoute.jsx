// components/PublicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (isLoggedIn) {
    // Redirect to home or the page they were trying to access
    const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
    localStorage.removeItem('redirectAfterLogin');
    return <Navigate to={redirectUrl} replace />;
  }
  
  return children;
};

export default PublicRoute;

// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PublicRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
//   if (isLoggedIn) {
//     return <Navigate to="/" replace />;
//   }
  
//   return children;
// };

// export default PublicRoute;