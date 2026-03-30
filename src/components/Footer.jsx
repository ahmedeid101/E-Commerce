import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Exclusive */}
          <div>
            <h3 className="font-bold text-xl mb-4">Exclusive</h3>
            <h4 className="font-semibold mb-3">Subscribe</h4>
            <p className="text-gray-400 text-sm mb-3">Get 10% off your first order</p>
            <div className="flex border border-gray-600 rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-transparent text-sm focus:outline-none"
              />
              <button className="px-3 py-2">→</button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <address className="not-italic text-gray-400 text-sm space-y-2">
              <p>11 Qurba Street, Nasr City,<br />DH 1515, Cairo.</p>
              <p>haidy.sobhy@gmail.com</p>
              <p>+2012345678</p>
            </address>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/account" className="hover:text-white">My Account</Link></li>
              <li><Link to="/login" className="hover:text-white">Login / Register</Link></li>
              <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
              <li><Link to="/products" className="hover:text-white">Shop</Link></li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h4 className="font-semibold mb-4">Quick Link</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/about" className="hover:text-white">Terms Of Use</Link></li>
              <li><Link to="/about" className="hover:text-white">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h4 className="font-semibold mb-4">Download App</h4>
            <p className="text-gray-400 text-sm mb-3">Save $3 with App New User Only</p>
            <div className="flex space-x-2">
              <div className="border border-gray-600 rounded p-2 text-center">
                <div className="text-xs">GET IT ON</div>
                <div className="font-bold">Google Play</div>
              </div>
              <div className="border border-gray-600 rounded p-2 text-center">
                <div className="text-xs">Download on the</div>
                <div className="font-bold">App Store</div>
              </div>
            </div>
            <div className="flex space-x-4 mt-4 text-gray-400">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaFacebook/></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaInstagram/></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaTwitter/></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaLinkedin/></a>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm pt-8 mt-8 border-t border-gray-800">
          © Copyright Rimel 2026. All right reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;