import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
 
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
 
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email or Phone Number is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === formData.email && u.password === formData.password);
    
    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/');
    } else {
      setErrors({ general: 'Invalid email or password' });
    }
    
    setIsLoading(false);
  };
 
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#CBE4E8] items-center justify-center p-12">
        <div className="relative w-full max-w-lg">
          <img 
            src="images/login.png" 
            alt="Shopping cart with phone and bags"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
 
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-semibold mb-6">Log in to Exclusive</h2>
            <p className="text-base">Enter your details below</p>
          </div>
 
          {/* General Error */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}
 
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <input
                type="text"
                placeholder="Email or Phone Number"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-0 py-2 border-b ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gray-500 transition-colors bg-transparent text-base`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full px-0 py-2 border-b ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gray-500 transition-colors bg-transparent text-base`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
 
            <div className="flex justify-between items-center pt-2">
              <Button type="submit" variant="primary" className="px-12 py-4" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
              <Link to="/forgot-password" className="text-[#DB4444] hover:underline text-base">
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default LoginPage;