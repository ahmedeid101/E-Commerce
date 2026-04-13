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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Log in to Exclusive</h2>
          <p className="text-gray-500">Enter your details below</p>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Email or Phone Number"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-0 py-3 border-b ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-red-500 transition-colors bg-transparent`}
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
              className={`w-full px-0 py-3 border-b ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-red-500 transition-colors bg-transparent`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <Button type="submit" variant="primary" className="px-8" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
            <Link to="/forgot-password" className="text-red-500 hover:underline text-sm">
              Forget Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Button from '../components/Button';

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email or Phone Number is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email) && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email or phone number';
//     }
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       // Simple validation - in real app, connect to backend
//       localStorage.setItem('isLoggedIn', 'true');
//       localStorage.setItem('userEmail', formData.email);
//       navigate('/');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 py-12">
//       <div className="max-w-md w-full">
//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-3xl md:text-4xl font-bold mb-2">Log into Exclusive</h2>
//           <p className="text-gray-500">Enter your details below</p>
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <input
//               type="text"
//               placeholder="Email or Phone Number"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className={`w-full px-0 py-3 border-b ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-red-500 transition-colors bg-transparent`}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//             )}
//           </div>
          
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               className={`w-full px-0 py-3 border-b ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-red-500 transition-colors bg-transparent pr-10`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               {showPassword ? '👁️' : '👁️‍🗨️'}
//             </button>
//             {errors.password && (
//               <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//             )}
//           </div>

//           <div className="flex justify-between items-center">
//             <Button type="submit" variant="primary" className="px-8">
//               Log In
//             </Button>
//             <Link to="/forgot-password" className="text-red-500 hover:underline text-sm">
//               Forget Password?
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;