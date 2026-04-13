import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import CheckoutPage from './pages/CheckoutPage';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { WishlistProvider } from './context/WishlistContext';
import WishlistPage from './pages/WishlistPage';
import AccountPage from './pages/AccountPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import MyOrdersPage from './pages/MyOrdersPage';
import MyCancellationsPage from './pages/MyCancellationsPage';
import MyReviewsPage from './pages/MyReviewsPage';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <Routes>
            {/* Public Routes with Navbar - Login and Register pages */}
            <Route path="/login" element={
              <PublicRoute>
                <MainLayout>
                  <LoginPage />
                </MainLayout>
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <MainLayout>
                  <RegisterPage />
                </MainLayout>
              </PublicRoute>
            } />
            
            {/* Read-Only Routes - Accessible without login (view only) */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/products" element={<ProductListingPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>
            
            {/* Protected Routes - Require authentication for actions */}
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/orders" element={<MyOrdersPage />} />
              <Route path="/cancellations" element={<MyCancellationsPage />} />
              <Route path="/reviews" element={<MyReviewsPage />} />
            </Route>
            
            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </Router>
  )
}

export default App;