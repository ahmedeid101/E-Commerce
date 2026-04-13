import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { FcGoogle } from 'react-icons/fc';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.email === formData.email);
    
    if (existingUser) {
      setErrors({ email: 'User already exists with this email' });
      setIsLoading(false);
      return;
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login after registration
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    navigate('/login');
    setIsLoading(false);
  };

  const handleGoogleSignUp = () => {
    // In production, implement Google OAuth
    alert('Google Sign Up - Would integrate with Google OAuth in production');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Create an account</h2>
          <p className="text-gray-500">Enter your details below</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-0 py-3 border-b ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-red-500 transition-colors bg-transparent`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          
          <div>
            <input
              type="email"
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

          <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
          
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full border border-gray-300 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <FcGoogle size={22} />
            <span>Sign up with Google</span>
          </button>
          
          <p className="text-center text-gray-500">
            Already have account? <Link to="/login" className="text-black font-medium hover:text-red-500 transition-colors">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Button from '../components/Button';

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.name && formData.email && formData.password) {
//       localStorage.setItem('isLoggedIn', 'true');
//       localStorage.setItem('userName', formData.name);
//       localStorage.setItem('userEmail', formData.email);
//       navigate('/');
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//       <div className="max-w-md mx-auto">
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold mb-2">Create an account</h2>
//           <p className="text-gray-500">Enter your details below</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <input
//               type="text"
//               placeholder="Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-red-500"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="email"
//               placeholder="Email or Phone Number"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-red-500"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-red-500"
//               required
//             />
//           </div>
//           <Button type="submit" variant="primary" className="w-full">
//             Create Account
//           </Button>
//           <button className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50">
//             <span>G</span>
//             <span>Sign up with Google</span>
//           </button>
//           <p className="text-center text-gray-500">
//             Already have account? <Link to="/login" className="text-black underline">Log in</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;