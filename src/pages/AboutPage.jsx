// pages/AboutPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const AboutPage = () => {
  const [counters, setCounters] = useState({
    sellers: 0,
    sales: 0,
    customers: 0,
    grossSale: 0
  });

  const targetValues = {
    sellers: 10500,
    sales: 33000,
    customers: 45500,
    grossSale: 25000
  };

  // Animated counter effect
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = {
      sellers: targetValues.sellers / steps,
      sales: targetValues.sales / steps,
      customers: targetValues.customers / steps,
      grossSale: targetValues.grossSale / steps
    };
    
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps) {
        setCounters({
          sellers: Math.min(Math.floor(increment.sellers * currentStep), targetValues.sellers),
          sales: Math.min(Math.floor(increment.sales * currentStep), targetValues.sales),
          customers: Math.min(Math.floor(increment.customers * currentStep), targetValues.customers),
          grossSale: Math.min(Math.floor(increment.grossSale * currentStep), targetValues.grossSale)
        });
        currentStep++;
      } else {
        setCounters(targetValues);
        clearInterval(interval);
      }
    }, duration / steps);
    
    return () => clearInterval(interval);
  }, []);

  // Team members
  const teamMembers = [
    {
      id: 1,
      name: 'Tom Cruise',
      role: 'Founder & Chairman',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      id: 2,
      name: 'Emma Watson',
      role: 'Managing Director',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      id: 3,
      name: 'Will Smith',
      role: 'Product Designer',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      id: 4,
      name: 'Scarlett Johansson',
      role: 'Marketing Head',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      social: { linkedin: '#', twitter: '#' }
    }
  ];

  // Features
  const features = [
    {
      icon: '🚚',
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140'
    },
    {
      icon: '🎧',
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support'
    },
    {
      icon: '✅',
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days'
    }
  ];

  // Milestones
  const milestones = [
    { year: '2015', event: 'Company Launched in Bangladesh' },
    { year: '2017', event: 'Reached 1 Million Customers' },
    { year: '2019', event: 'Expanded to International Markets' },
    { year: '2021', event: 'Launched Mobile App' },
    { year: '2023', event: '10,000+ Sellers on Platform' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-500">
        Home / <span className="text-black">About</span>
      </div>

      {/* Our Story Section */}
      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            Launched in 2015, Exclusive is South Asia's premier online shopping marketplace 
            with an active presence in Bangladesh. Supported by wide range of tailored marketing, 
            data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 
            3 million customers across the region.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Exclusive has more than 1 Million products to offer, growing at a very fast pace. 
            Exclusive offers a diverse assortment in categories ranging from consumer electronics 
            to fashion, home & lifestyle, beauty, and much more.
          </p>
        </div>
        <div className="lg:w-1/2">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-red-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-blue-100 rounded-full opacity-50"></div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
              alt="Our Story"
              className="relative rounded-lg shadow-2xl w-full object-cover h-96"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="text-4xl font-bold text-red-500 mb-2">
            {counters.sellers.toLocaleString()}+
          </div>
          <p className="text-gray-600 font-medium">Sellers active on our site</p>
        </div>
        <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="text-4xl font-bold text-red-500 mb-2">
            {counters.sales.toLocaleString()}+
          </div>
          <p className="text-gray-600 font-medium">Monthly Product Sales</p>
        </div>
        <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="text-4xl font-bold text-red-500 mb-2">
            {counters.customers.toLocaleString()}+
          </div>
          <p className="text-gray-600 font-medium">Customer active on our site</p>
        </div>
        <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="text-4xl font-bold text-red-500 mb-2">
            ${counters.grossSale.toLocaleString()}+
          </div>
          <p className="text-gray-600 font-medium">Annual gross sale on our site</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Leadership Team</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Dedicated professionals committed to delivering the best shopping experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map(member => (
            <div key={member.id} className="group text-center">
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-3">
                    <a href={member.social.linkedin} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                      in
                    </a>
                    <a href={member.social.twitter} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors">
                      🐦
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-1">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {features.map((feature, index) => (
          <div key={index} className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 group">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition-colors duration-300">
              <span className="text-4xl group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Mission & Vision Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            To provide a seamless, secure, and enjoyable online shopping experience 
            for millions of customers across South Asia, while empowering local 
            businesses and sellers to reach a wider audience.
          </p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 shadow-lg">
          <div className="text-5xl mb-4">👁️</div>
          <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            To become the leading e-commerce platform in South Asia, revolutionizing 
            the way people shop and do business, while fostering a sustainable and 
            inclusive digital economy.
          </p>
        </div>
      </div>

      {/* Timeline / Milestones */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-red-200 hidden md:block"></div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/2"></div>
                <div className="relative md:w-1/2 flex justify-center md:block">
                  <div className="bg-white border-2 border-red-200 rounded-lg p-6 shadow-lg w-full max-w-md mx-auto md:mx-0 hover:shadow-xl transition-shadow">
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-1/2 md:left-auto w-4 h-4 bg-red-500 rounded-full hidden md:block" 
                         style={{ [index % 2 === 0 ? 'right' : 'left']: '-2.5rem', top: '50%' }}></div>
                    <span className="text-red-500 font-bold text-xl">{milestone.year}</span>
                    <h3 className="font-semibold text-lg mt-2">{milestone.event}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6">
            <div className="text-4xl mb-3">💎</div>
            <h4 className="font-bold mb-2">Integrity</h4>
            <p className="text-gray-500 text-sm">We operate with honesty and transparency</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-3">🚀</div>
            <h4 className="font-bold mb-2">Innovation</h4>
            <p className="text-gray-500 text-sm">Constantly evolving to serve you better</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-3">🤝</div>
            <h4 className="font-bold mb-2">Customer First</h4>
            <p className="text-gray-500 text-sm">Your satisfaction is our priority</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-3">🌱</div>
            <h4 className="font-bold mb-2">Sustainability</h4>
            <p className="text-gray-500 text-sm">Committed to environmental responsibility</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-12 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Growing Family</h2>
        <p className="text-lg mb-6 opacity-90">
          Be part of something amazing. Shop with us or become a seller today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button variant="secondary" className="bg-white text-red-500 hover:bg-gray-100">
              Start Shopping
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-500">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;