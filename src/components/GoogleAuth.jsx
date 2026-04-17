import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/toast';

const GoogleAuth = ({ type = 'signup', onSuccess, buttonText }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Simulate Google OAuth authentication
  const handleGoogleAuth = async () => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate mock Google user data
    const googleUser = {
      id: `google_${Date.now()}`,
      name: getRandomName(),
      email: getRandomEmail(),
      googleId: `google_${Math.random().toString(36).slice(2, 10)}`,
      picture: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
      createdAt: new Date().toISOString()
    };

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.email === googleUser.email);

    if (type === 'signup') {
      if (existingUser) {
        showToast('Account already exists with this email. Please login instead.', 'error');
        setIsLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: googleUser.id,
        name: googleUser.name,
        firstName: googleUser.name.split(' ')[0],
        lastName: googleUser.name.split(' ').slice(1).join(' '),
        email: googleUser.email,
        password: `google_oauth_${Date.now()}`,
        googleId: googleUser.googleId,
        picture: googleUser.picture,
        phone: '',
        dateOfBirth: '',
        gender: '',
        bio: '',
        authProvider: 'google',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Initialize user-specific data
      localStorage.setItem(`userProfile_${newUser.id}`, JSON.stringify({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: '',
        dateOfBirth: '',
        gender: '',
        bio: '',
        picture: newUser.picture
      }));

      localStorage.setItem(`userAddresses_${newUser.id}`, JSON.stringify([]));
      localStorage.setItem(`userPayments_${newUser.id}`, JSON.stringify([]));

      // Auto login
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      showToast(`Welcome ${newUser.name}! Account created successfully.`, 'success');
      
      if (onSuccess) {
        onSuccess(newUser);
      } else {
        setTimeout(() => {
          navigate('/login');
        },1500);
      }
    } else {
      // Login with Google
      if (!existingUser) {
        showToast('No account found with this email. Please sign up first.', 'error');
        setIsLoading(false);
        return;
      }

      // Update existing user with Google info if needed
      const updatedUser = {
        ...existingUser,
        googleId: existingUser.googleId || googleUser.googleId,
        picture: existingUser.picture || googleUser.picture
      };

      const userIndex = users.findIndex(u => u.id === existingUser.id);
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));

      // Login
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      showToast(`Welcome back ${updatedUser.name}!`, 'success');

      if (onSuccess) {
        onSuccess(updatedUser);
      } else {
        navigate('/');
      }
    }
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions for mock data
  const getRandomName = () => {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'James', 'Lisa', 'Robert', 'Maria'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  };

  const getRandomEmail = () => {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    return `user_${Math.random().toString(36).slice(2, 8)}@${domains[Math.floor(Math.random() * domains.length)]}`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      disabled={isLoading}
      className="w-full border border-gray-300 py-4 rounded-md flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
      ) : (
        <FcGoogle size={22} />
      )}
      <span>{buttonText || (type === 'signup' ? 'Sign up with Google' : 'Login with Google')}</span>
    </button>
  );
};

export default GoogleAuth;