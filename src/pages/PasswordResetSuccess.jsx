import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '../components/Button';

const PasswordResetSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-green-500 text-6xl mb-4">
            <FaCheckCircle className="mx-auto" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Password Reset Successful!</h1>
          <p className="text-gray-500 mb-6">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
          <Link to="/login">
            <Button variant="primary" className="w-full">
              Go to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;