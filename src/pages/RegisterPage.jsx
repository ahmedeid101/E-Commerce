import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((u) => u.email === formData.email);

    if (existingUser) {
      setErrors({ email: "User already exists with this email" });
      setIsLoading(false);
      return;
    }

    // Create new user with complete profile
    const nameParts = formData.name.trim().split(" ");
    const newUser = {
      id: Date.now(),
      name: formData.name,
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      email: formData.email,
      password: formData.password,
      phone: "",
      dateOfBirth: "",
      gender: "",
      bio: "",
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Initialize user-specific data
    localStorage.setItem(
      `userProfile_${newUser.id}`,
      JSON.stringify({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: "",
        dateOfBirth: "",
        gender: "",
        bio: "",
      }),
    );

    localStorage.setItem(`userAddresses_${newUser.id}`, JSON.stringify([]));
    localStorage.setItem(`userPayments_${newUser.id}`, JSON.stringify([]));

    // Auto login after registration
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    navigate("/login");
    setIsLoading(false);
  };

  const handleGoogleSignUp = () => {
    // In production, i will implement Google OAuth
    alert("Google Sign Up - Would integrate with Google OAuth in production");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#CBE4E8] items-center justify-center p-12">
        <div className="relative w-full max-w-lg">
          <img
            src="images/register.png"
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
            <h2 className="text-4xl font-semibold mb-6">Create an account</h2>
            <p className="text-base">Enter your details below</p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full px-0 py-2 border-b ${errors.name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-gray-500 transition-colors bg-transparent text-base`}
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
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full px-0 py-2 border-b ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-gray-500 transition-colors bg-transparent text-base`}
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
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full px-0 py-2 border-b ${errors.password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-gray-500 transition-colors bg-transparent text-base`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="space-y-4 pt-2">
              <Button
                type="submit"
                variant="primary"
                className="w-full py-4"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full border border-gray-300 py-4 rounded-md flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors text-base"
              >
                <FcGoogle size={20} />
                <span>Sign up with Google</span>
              </button>
            </div>

            <p className="text-center text-gray-600 text-base">
              Already have account?{" "}
              <Link to="/login" className="font-medium hover:underline ml-3">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
