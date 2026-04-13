import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { TARGET_VALUES, TEAM_MEMBERS, FEATURES, MILESTONES } from '../utils/aboutData';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

// --- Reusable Components ---
const CounterCard = ({ count, label, prefix = '', suffix = '+' }) => (
  <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="text-4xl font-bold text-red-500 mb-2">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
    <p className="text-gray-600 font-medium">{label}</p>
  </div>
);

// --- Main Component ---
const AboutPage = () => {
  const [counters, setCounters] = useState({
    sellers: 0,
    sales: 0,
    customers: 0,
    grossSale: 0,
  });

  // --- Animated Counters ---
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = {
      sellers: TARGET_VALUES.sellers / steps,
      sales: TARGET_VALUES.sales / steps,
      customers: TARGET_VALUES.customers / steps,
      grossSale: TARGET_VALUES.grossSale / steps,
    };

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps) {
        setCounters({
          sellers: Math.min(Math.floor(increment.sellers * currentStep), TARGET_VALUES.sellers),
          sales: Math.min(Math.floor(increment.sales * currentStep), TARGET_VALUES.sales),
          customers: Math.min(Math.floor(increment.customers * currentStep), TARGET_VALUES.customers),
          grossSale: Math.min(Math.floor(increment.grossSale * currentStep), TARGET_VALUES.grossSale),
        });
        currentStep++;
      } else {
        setCounters(TARGET_VALUES);
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-500">
        Home / <span className="text-black">About</span>
      </div>

      {/* Our Story */}
      <section className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            Launched in 2015, Exclusive is South Asia's premier online shopping marketplace...
          </p>
          <p className="text-gray-600 leading-relaxed">
            Exclusive has more than 1 Million products to offer...
          </p>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-red-100 rounded-full opacity-50"></div>
          <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-blue-100 rounded-full opacity-50"></div>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
            alt="Our Story"
            className="relative rounded-lg shadow-2xl w-full object-cover h-96"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        <CounterCard count={counters.sellers} label="Sellers active on our site" />
        <CounterCard count={counters.sales} label="Monthly Product Sales" />
        <CounterCard count={counters.customers} label="Customer active on our site" />
        <CounterCard count={counters.grossSale} prefix="$" label="Annual gross sale on our site" />
      </section>

      {/* Team */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Leadership Team</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Dedicated professionals committed to delivering the best shopping experience
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map(member => (
            <div key={member.id} className="group text-center">
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-80">
                  <div className="flex space-x-3">
                    <a href={member.social.linkedin} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                      <FaLinkedin/>
                    </a>
                    <a href={member.social.twitter} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors">
                      <FaTwitter/>
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-1">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 group">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition-colors duration-300">
              <span className="text-4xl group-hover:text-white transition-colors duration-300">{feature.icon}</span>
            </div>
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            To provide a seamless, secure, and enjoyable online shopping experience...
          </p>
        </div>
        <div className="bg-linear-to-br from-red-50 to-orange-50 rounded-2xl p-8 shadow-lg">
          <div className="text-5xl mb-4">👁️</div>
          <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            To become the leading e-commerce platform in South Asia...
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linear-to-r from-red-500 to-red-600 rounded-2xl p-12 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Growing Family</h2>
        <p className="text-lg mb-6 opacity-90">Be part of something amazing. Shop with us or become a seller today!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-500">Start Shopping</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-500">Contact Us</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;