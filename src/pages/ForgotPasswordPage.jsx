import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { showToast } from '../utils/toast';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: email, 2: verification, 3: reset password
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Generate a random 6-digit verification code
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Send verification code to email
  const handleSendCode = async (e) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find(u => u.email === formData.email);
    
    if (!userExists) {
      setErrors({ email: 'No account found with this email address' });
      setIsLoading(false);
      return;
    }
    
    // Generate and store verification code
    const verificationCode = generateVerificationCode();
    localStorage.setItem(`resetCode_${formData.email}`, verificationCode);
    localStorage.setItem(`resetCodeExpiry_${formData.email}`, Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    
    // In production, i will send actual email instaead of console log _^_
    console.log(`Verification code for ${formData.email}: ${verificationCode}`);
    
    // Show success message
    showToast(`Verification code sent to ${formData.email}`, 'success');
    
    // Start resend timer
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setStep(2);
    setIsLoading(false);
    setErrors({});
  };

  // Verify the code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    if (!formData.verificationCode) {
      setErrors({ verificationCode: 'Verification code is required' });
      return;
    }
    
    if (formData.verificationCode.length !== 6) {
      setErrors({ verificationCode: 'Please enter a valid 6-digit code' });
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const storedCode = localStorage.getItem(`resetCode_${formData.email}`);
    const storedExpiry = localStorage.getItem(`resetCodeExpiry_${formData.email}`);
    
    if (!storedCode || !storedExpiry) {
      setErrors({ verificationCode: 'Invalid or expired code. Please request a new one.' });
      setIsLoading(false);
      return;
    }
    
    if (Date.now() > parseInt(storedExpiry)) {
      setErrors({ verificationCode: 'Code has expired. Please request a new one.' });
      localStorage.removeItem(`resetCode_${formData.email}`);
      localStorage.removeItem(`resetCodeExpiry_${formData.email}`);
      setIsLoading(false);
      return;
    }
    
    if (formData.verificationCode !== storedCode) {
      setErrors({ verificationCode: 'Invalid verification code' });
      setIsLoading(false);
      return;
    }
    
    setStep(3);
    setIsLoading(false);
    setErrors({});
  };

  // Resend verification code
  const handleResendCode = async () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const verificationCode = generateVerificationCode();
    localStorage.setItem(`resetCode_${formData.email}`, verificationCode);
    localStorage.setItem(`resetCodeExpiry_${formData.email}`, Date.now() + 10 * 60 * 1000);
    
    console.log(`New verification code: ${verificationCode}`);
    showToast('New verification code sent!', 'success');
    
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setIsLoading(false);
  };

  // Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user password
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === formData.email);
    
    if (userIndex !== -1) {
      users[userIndex].password = formData.newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      
      // Clear reset data
      localStorage.removeItem(`resetCode_${formData.email}`);
      localStorage.removeItem(`resetCodeExpiry_${formData.email}`);
      
      showToast('Password reset successfully! Please login.', 'success');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
    
    setIsLoading(false);
  };

  // Render email step
  const renderEmailStep = () => (
    <form onSubmit={handleSendCode} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Enter your registered email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
      >
        {isLoading ? 'Sending...' : 'Send Reset Code'}
      </button>
    </form>
  );

  // Render verification step
  const renderVerificationStep = () => (
    <form onSubmit={handleVerifyCode} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Verification Code
        </label>
        <input
          type="text"
          placeholder="Enter 6-digit code"
          maxLength="6"
          value={formData.verificationCode}
          onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value.replace(/\D/g, '') })}
          className={`w-full px-4 py-3 border ${errors.verificationCode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-center text-2xl tracking-wider`}
        />
        {errors.verificationCode && (
          <p className="text-red-500 text-xs mt-1">{errors.verificationCode}</p>
        )}
      </div>
      
      <div className="text-center">
        <button
          type="button"
          onClick={handleResendCode}
          disabled={resendTimer > 0}
          className="text-red-500 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Code'}
        </button>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
      >
        {isLoading ? 'Verifying...' : 'Verify Code'}
      </button>
    </form>
  );

  // Render reset password step
  const renderResetPasswordStep = () => (
    <form onSubmit={handleResetPassword} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            className={`w-full px-4 py-3 border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
        )}
        <p className="text-gray-400 text-xs mt-1">Password must be at least 6 characters</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
      >
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  );

  // Get step title and description
  const getStepContent = () => {
    switch(step) {
      case 1:
        return {
          title: 'Forgot Password?',
          description: 'Enter your email address and we\'ll send you a verification code to reset your password.',
          icon: '🔐'
        };
      case 2:
        return {
          title: 'Verify Your Identity',
          description: `We've sent a 6-digit verification code to ${formData.email}. Please enter it below.`,
          icon: '📧'
        };
      case 3:
        return {
          title: 'Create New Password',
          description: 'Enter your new password below to reset your account password.',
          icon: '🔑'
        };
      default:
        return {};
    }
  };

  const stepContent = getStepContent();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full">
        {/* Back to Login Link */}
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors mb-6"
        >
          <FaArrowLeft className="text-sm" />
          Back to Login
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-red-500 to-red-600 px-6 py-8 text-center">
            <div className="text-5xl mb-3">{stepContent.icon}</div>
            <h1 className="text-2xl font-bold text-white">{stepContent.title}</h1>
            <p className="text-white/80 text-sm mt-2">{stepContent.description}</p>
          </div>
          
          {/* Form Body */}
          <div className="p-6">
            {step === 1 && renderEmailStep()}
            {step === 2 && renderVerificationStep()}
            {step === 3 && renderResetPasswordStep()}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Remember your password?{' '}
            <Link to="/login" className="text-red-500 hover:underline font-medium">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;