import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribeStatus("success");
      setEmail("");
      setTimeout(() => setSubscribeStatus(null), 3000);
    } else {
      setSubscribeStatus("error");
      setTimeout(() => setSubscribeStatus(null), 3000);
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Exclusive - Column 1 */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Exclusive</h3>
            <div>
              <h4 className="font-semibold text-lg mb-3">Subscribe</h4>
              <p className="text-gray-400 text-sm mb-3">
                Get 10% off your first order
              </p>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-transparent border border-gray-600 rounded-md text-sm focus:outline-none focus:border-red-500 transition-colors pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Subscribe"
                >
                  →
                </button>
              </form>
              {subscribeStatus === "success" && (
                <p className="text-green-500 text-xs mt-2">
                  ✓ Subscribed successfully!
                </p>
              )}
              {subscribeStatus === "error" && (
                <p className="text-red-500 text-xs mt-2">
                  Please enter a valid email
                </p>
              )}
            </div>
          </div>

          {/* Support - Column 2 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Support</h4>
            <address className="not-italic text-gray-400 text-sm space-y-3">
              <p className="leading-relaxed">
                111 Kalifa Elmamoun, Narc City,
                <br />
                DH 1515, Egypt.
              </p>
              <p>
                <a
                  href="mailto:exclusive@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  exclusive@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+201092887320"
                  className="hover:text-white transition-colors"
                >
                  +20 109 288 7320
                </a>
              </p>
            </address>
          </div>

          {/* Account - Column 3 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Account</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link
                  to="/account"
                  className="hover:text-white transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-white transition-colors"
                >
                  Login / Register
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-white transition-colors"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-white transition-colors"
                >
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Link - Column 4 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Link</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-use"
                  className="hover:text-white transition-colors"
                >
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Download App - Column 5 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Download App</h4>
            <p className="text-gray-400 text-sm">
              Save $3 with App New User Only
            </p>

            {/* Barcode and App Store Badges Row */}
            <div className="flex items-center gap-3">
              {/* Barcode */}
              <div className="bg-white p-2 rounded-md">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Simple barcode pattern */}
                  <rect x="5" y="5" width="3" height="70" fill="black" />
                  <rect x="10" y="5" width="1" height="70" fill="black" />
                  <rect x="13" y="5" width="4" height="70" fill="black" />
                  <rect x="19" y="5" width="2" height="70" fill="black" />
                  <rect x="23" y="5" width="5" height="70" fill="black" />
                  <rect x="30" y="5" width="1" height="70" fill="black" />
                  <rect x="33" y="5" width="3" height="70" fill="black" />
                  <rect x="38" y="5" width="2" height="70" fill="black" />
                  <rect x="42" y="5" width="4" height="70" fill="black" />
                  <rect x="48" y="5" width="1" height="70" fill="black" />
                  <rect x="51" y="5" width="5" height="70" fill="black" />
                  <rect x="58" y="5" width="2" height="70" fill="black" />
                  <rect x="62" y="5" width="3" height="70" fill="black" />
                  <rect x="67" y="5" width="1" height="70" fill="black" />
                  <rect x="70" y="5" width="4" height="70" fill="black" />
                  <rect x="76" y="5" width="2" height="70" fill="black" />
                </svg>
              </div>

              {/* App Store Badges Column */}
              <div className="flex flex-col gap-2">
                <div className="border border-gray-600 rounded-md p-1.5 text-center hover:border-red-500 transition-colors cursor-pointer">
                  <div className="text-[8px] text-gray-400">GET IT ON</div>
                  <div className="font-bold text-xs">Google Play</div>
                </div>
                <div className="border border-gray-600 rounded-md p-1.5 text-center hover:border-red-500 transition-colors cursor-pointer">
                  <div className="text-[8px] text-gray-400">
                    Download on the
                  </div>
                  <div className="font-bold text-xs">App Store</div>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-5 pt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-400 hover:text-white transition-colors text-xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-400 hover:text-white transition-colors text-xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-400 hover:text-white transition-colors text-xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-400 hover:text-white transition-colors text-xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-lg pt-4 mt-4 border-t border-gray-800">
          © Copyright Rimel 2026. All right reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
