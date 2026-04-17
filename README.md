# 🛍️ Exclusive - Modern E-commerce Web Application

A fully functional, production-ready e-commerce web application built with React.js, featuring user authentication, product management, shopping cart, wishlist, complete checkout flow, Google OAuth integration, and account deletion.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Authentication](#authentication)
- [Features Breakdown](#features-breakdown)
- [API Integration](#api-integration)
- [Folder Structure](#folder-structure)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

**Exclusive** is a modern, responsive e-commerce platform that provides a seamless shopping experience. Users can browse products, add items to cart, manage wishlists, complete purchases, and manage their accounts. The application features protected routes, persistent data storage, Google OAuth integration, password reset functionality, and a beautiful UI matching modern design standards.

## ✨ Features

### 🏠 Public Pages (Read-Only Access)
- **Home Page** - Hero slider, flash sales, categories, best selling products
- **Product Listing** - Filter by category, price, and search
- **Product Details** - Detailed product view with images, specs, and reviews
- **Contact Page** - Contact form and information
- **About Page** - Company information and team
- **Forgot Password** - Password reset with email verification

### 🔐 Authenticated Pages
- **Shopping Cart** - Add/remove items, update quantities, apply coupons
- **Checkout Page** - Billing details, payment methods, order summary
- **Wishlist Page** - Save favorite products, move to cart
- **Account Dashboard** - Profile management, address book, payment methods
- **Order Management** - View orders, track status, cancel orders
- **Reviews Management** - Write, edit, and delete product reviews
- **Cancellations Page** - Track cancelled orders and refund status

### 🛒 Core Functionality
- ✅ User Registration & Login (with localStorage persistence)
- ✅ Google OAuth Integration (Sign up & Login)
- ✅ Password Reset with Email Verification (6-digit code)
- ✅ Account Deletion with Confirmation
- ✅ Protected Routes & Authentication
- ✅ Product Search & Filtering
- ✅ Add to Cart / Remove from Cart
- ✅ Update Cart Quantities
- ✅ Wishlist Management
- ✅ Coupon Code System (SAVE10, SAVE20)
- ✅ Order Placement & History
- ✅ User Profile Management
- ✅ Address Book Management
- ✅ Payment Method Management
- ✅ Product Reviews & Ratings
- ✅ Read-Only Mode for Non-Authenticated Users

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend Framework** | React 18 |
| **Routing** | React Router DOM v6 |
| **Styling** | Tailwind CSS |
| **Icons** | React Icons |
| **State Management** | React Context API (Cart, Wishlist) |
| **HTTP Client** | Fetch API |
| **Storage** | localStorage |
| **Authentication** | Mock Google OAuth (Ready for Production) |
| **Build Tool** | Create React App |

## 📁 Project Structure
src/
├── assets/ # Static assets (images, fonts)
├── components/ # Reusable UI components
│ ├── navbar/ # Navbar components
│ ├── productDetails/ # Product details components
│ ├── account/ # Account page components
│ ├── Button.jsx # Reusable button
│ ├── ProductCard.jsx # Product card component
│ ├── ProtectedRoute.jsx # Auth protection
│ ├── PublicRoute.jsx # Public route wrapper
│ ├── GoogleAuth.jsx # Google OAuth component
│ └── ReadOnlyGuard.jsx # Read-only mode guard
├── context/ # React Context providers
│ ├── CartContext.jsx # Shopping cart state
│ └── WishlistContext.jsx # Wishlist state
├── hooks/ # Custom React hooks
│ └── useReadOnly.js # Read-only mode hook
├── layouts/ # Layout components
│ └── MainLayout.jsx # Main layout with navbar/footer
├── pages/ # Page components
│ ├── HomePage.jsx
│ ├── LoginPage.jsx
│ ├── RegisterPage.jsx
│ ├── ForgotPasswordPage.jsx
│ ├── ProductListingPage.jsx
│ ├── ProductDetailsPage.jsx
│ ├── CartPage.jsx
│ ├── CheckoutPage.jsx
│ ├── WishlistPage.jsx
│ ├── AccountPage.jsx
│ ├── MyOrdersPage.jsx
│ ├── MyCancellationsPage.jsx
│ ├── MyReviewsPage.jsx
│ ├── ContactPage.jsx
│ ├── AboutPage.jsx
│ └── NotFoundPage.jsx
├── utils/ # Utility functions
│ ├── mockData.js # Mock product data
│ ├── toast.js # Toast notifications
│ └── productDetailsHelpers.js
├── App.jsx # Main app component
├── App.css # Global styles
└── index.js # Entry point

text

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Step 1: Clone the Repository

```bash
git clone https://github.com/ahmedeid101/E-Commerce
cd E-Commerce
Step 2: Install Dependencies
bash
npm install
Or with yarn:

bash
yarn install
Step 3: Install Required Packages
bash
npm install react-router-dom tailwindcss react-icons
Step 4: Setup Tailwind CSS
bash
npx tailwindcss init
Update tailwind.config.js:

javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
Add Tailwind directives to src/index.css:

css
@import "tailwindcss";

🏃 Running the Application
Development Mode
bash
npm start
The application will open at http://localhost:3000

Build for Production
bash
npm run build
Preview Production Build
bash
npm install -g serve
serve -s build
🔐 Authentication
The application uses localStorage for authentication. Here's how it works:

Email Registration
Navigate to /register

Enter name, email, and password

Account is created

Redirected to login page

User data is stored in localStorage under users key

Google OAuth Registration & Login
Click "Sign up with Google" or "Login with Google" button

Mock Google authentication (ready for production OAuth)

User is automatically created or logged in

Profile picture and user info are stored

Redirected to home page after login

Email Login
Navigate to /login

Enter registered email and password

Upon successful login, user is redirected to home page

Password Reset
Click "Forget Password?" on login page

Enter registered email address

Receive 6-digit verification code (displayed in console)

Enter verification code

Create new password

Redirected to login page

Account Deletion
Navigate to Account Dashboard

Click "Delete Account" button

Type "DELETE" to confirm

Enter password for verification

Account and all associated data are permanently deleted

Logout
Click the account icon in the navbar

Select "Logout" from the dropdown menu

Protected Routes
The following routes require authentication:

/cart - Shopping cart

/checkout - Checkout page

/wishlist - Wishlist

/account - Account dashboard

/orders - Order history

/cancellations - Cancelled orders

/reviews - Product reviews

Read-Only Mode
Non-authenticated users can:

Browse all products

View product details

Browse categories

Read reviews

But cannot:

Add items to cart

Add items to wishlist

Proceed to checkout

Access account pages

📱 Features Breakdown
🏠 Home Page
Hero slider with promotional content

Flash sales countdown timer

Product categories grid

Best selling products

Music experience banner

New arrivals section

🛍️ Product Listing
Search by product name

Filter by category

Filter by price range

Sort by price (low-high, high-low) and rating

Responsive grid layout

📦 Product Details
Product image gallery with product-specific images

Color and size selection

Quantity selector

Add to cart / Buy now

Wishlist toggle

Product specifications

Customer reviews

Related products

🛒 Shopping Cart
View cart items

Update quantities

Remove items

Apply coupon codes (SAVE10, SAVE20)

View order summary

Proceed to checkout

💳 Checkout
Billing information form

Order summary

Payment method selection

Coupon application

Order placement

Order confirmation with order number

👤 Account Management
Profile information (edit with real-time save)

Address book (add/edit/delete/set default)

Payment methods (add/edit/delete/set default)

Order history with status tracking

Cancellation requests

Product reviews (write/edit/delete)

Account deletion with confirmation

❤️ Wishlist
Save favorite products

Move items to cart

Remove from wishlist

Persistent storage

🔐 Password Reset
Email verification

6-digit code verification (10-minute expiry)

Resend code functionality (60-second cooldown)

Password strength validation

Automatic redirect to login

🗑️ Account Deletion
Two-step verification

Type "DELETE" to confirm

Password verification

Permanent deletion of all user data

Automatic logout and redirect

🔌 API Integration
The application currently uses mock data and localStorage. To integrate with a real backend:

Update fetchProducts() in HomePage.jsx

Update authentication in LoginPage.jsx and RegisterPage.jsx

Update Google OAuth in GoogleAuth.jsx with real Google Client ID

Update cart operations in CartContext.jsx

Update order placement in CheckoutPage.jsx

Update password reset with actual email service

Example API Integration:
javascript
// In services/api.js
const API_BASE_URL = 'https://your-api.com';

export const api = {
  getProducts: () => fetch(`${API_BASE_URL}/products`).then(res => res.json()),
  login: (credentials) => fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }).then(res => res.json()),
  googleAuth: (token) => fetch(`${API_BASE_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  }).then(res => res.json()),
  resetPassword: (email) => fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  }).then(res => res.json()),
  deleteAccount: (userId, password) => fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  }).then(res => res.json()),
  // ... more endpoints
};
Production Google OAuth Setup:
Go to Google Cloud Console

Create a new project or select existing

Enable Google+ API

Create OAuth 2.0 Client ID

Add authorized JavaScript origins

Install @react-oauth/google:

bash
npm install @react-oauth/google
Wrap app with GoogleOAuthProvider

Replace mock implementation with real Google Login

🚢 Deployment
Deploy to Vercel
bash
npm install -g vercel
vercel
Deploy to Netlify
bash
npm run build
# Drag and drop the 'build' folder to Netlify
Deploy to GitHub Pages
bash
npm install --save-dev gh-pages
Add to package.json:

json
"homepage": "https://yourusername.github.io/exclusive-ecommerce",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
bash
npm run deploy
📸 Screenshots
Home Page
Hero slider with iPhone 17 promotion

Flash sales with countdown timer

Product categories grid

Best selling products

Product Details
Product image gallery

Color and size selection

Add to cart functionality

Customer reviews

Shopping Cart
Item list with quantities

Price calculations

Coupon code input

Checkout button

User Account
Profile management

Address book

Order history

Payment methods

Delete account option

Authentication
Login with email/password

Login with Google

Registration form

Password reset flow

🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Development Guidelines
Follow the existing code style

Write meaningful commit messages

Update documentation as needed

Test your changes thoroughly

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Design inspiration from Exclusive e-commerce template

Icons from React Icons

Images from Unsplash

Google OAuth integration reference

📞 Support
For support, email exclusive@gmail.com or visit our contact page.

🔧 Troubleshooting
Common Issues
Issue: Styles not loading correctly
Solution: Ensure Tailwind CSS is properly configured and @tailwind directives are in your CSS file.

Issue: Cart items disappear after page refresh
Solution: Cart data is stored in localStorage. Check browser console for any errors.

Issue: Login not working
Solution: Clear localStorage and try registering a new account first.

Issue: Google OAuth not working in production
Solution: Ensure you've added the correct authorized JavaScript origins in Google Cloud Console.

Issue: Password reset code not received
Solution: Check browser console for the verification code (in development mode).

Browser Support
Chrome (latest)

Firefox (latest)

Safari (latest)

Edge (latest)

📈 Future Enhancements
Payment gateway integration (Stripe/PayPal)

Email notifications for orders

Admin dashboard for product management

Real-time order tracking

Product recommendations

Multiple language support

Dark mode

PWA support

Social media login (Facebook, Apple)

Live chat support

Product comparison feature

Wishlist sharing

Order tracking with maps

Built with ❤️ using React.js

🆕 Recent Updates
Version 2.0.0 (2024)
✅ Added Google OAuth Sign up & Login

✅ Implemented Password Reset with Email Verification

✅ Added Account Deletion feature

✅ Implemented Read-Only mode for guests

✅ Added product-specific images

✅ Improved UI/UX with animations

✅ Added toast notifications for actions

✅ Enhanced form validation

✅ Added responsive design improvements

✅ Implemented persistent cart and wishlist


This updated README includes all the new features: Google OAuth, password reset, account deletion, 
read-only mode, and other enhancements!