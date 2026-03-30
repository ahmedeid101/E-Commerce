// pages/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('userEmail', formData.email);
      navigate('/');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Create an account</h2>
          <p className="text-gray-500">Enter your details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email or Phone Number"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Create Account
          </Button>
          <button className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50">
            <span>G</span>
            <span>Sign up with Google</span>
          </button>
          <p className="text-center text-gray-500">
            Already have account? <Link to="/login" className="text-black underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;