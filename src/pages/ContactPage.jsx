import React, { useState } from 'react';
import Button from '../components/Button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In production, send to backend API
    console.log('Contact form submitted:', formData);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    
    // Auto hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  // Contact information items
  const contactInfo = [
    {
      icon: '📞',
      title: 'Call To Us',
      details: [
        'We are available 24/7, 7 days a week.',
        'Phone: +8801611112222'
      ],
      bgColor: 'bg-blue-50'
    },
    {
      icon: '✉️',
      title: 'Write To US',
      details: [
        'Fill out our form and we will contact you within 24 hours.',
        'Emails: customer@exclusive.com',
        'Emails: support@exclusive.com'
      ],
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-500">
        Home / <span className="text-black">Contact</span>
      </div>

      {/* Success Toast Message */}
      {isSubmitted && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <span className="text-xl">✓</span>
            <div>
              <p className="font-semibold">Message Sent!</p>
              <p className="text-sm">We'll get back to you within 24 hours.</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contact Information Cards */}
        <div className="lg:w-1/3 space-y-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className={`${info.bgColor} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold">{info.title}</h3>
              </div>
              <div className="space-y-2 text-gray-600">
                {info.details.map((detail, idx) => (
                  <p key={idx} className={idx === 0 ? 'font-medium' : 'text-sm'}>
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Office Hours Card */}
          <div className="bg-purple-50 rounded-lg p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
                🕒
              </div>
              <h3 className="text-xl font-bold">Office Hours</h3>
            </div>
            <div className="space-y-2 text-gray-600">
              <p className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-medium">9:00 AM - 6:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-medium">10:00 AM - 4:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-medium">Closed</span>
              </p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                f
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                in
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                🐦
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                📷
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
            <p className="text-gray-500 mb-6">
              Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll respond as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                  />
                  {errors.name && (
                    <p className="error-message text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                  />
                  {errors.email && (
                    <p className="error-message text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 234 567 8900"
                  className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                />
                {errors.phone && (
                  <p className="error-message text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="How can we help you? Please describe your inquiry in detail..."
                  className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none`}
                />
                {errors.message && (
                  <p className="error-message text-red-500 text-xs mt-1">{errors.message}</p>
                )}
                {!errors.message && formData.message && (
                  <p className="text-gray-400 text-xs mt-1">
                    {formData.message.length}/500 characters
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="px-8 py-3 text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </div>
            </form>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Response within 24 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>100% privacy guaranteed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>No spam, ever</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12">
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
          <div className="h-64 md:h-96 relative">
            <iframe
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0234210896024!2d90.39128051574707!3d23.75087309483568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8c08f3a6b0b%3A0x7f8c8c8c8c8c8c8c!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="filter grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
          <div className="p-4 bg-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold">Our Headquarters</p>
                  <p className="text-sm text-gray-500">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh</p>
                </div>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">How long does shipping take?</h3>
            <p className="text-gray-600">Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">What is your return policy?</h3>
            <p className="text-gray-600">We offer 30-day returns for unused items in original packaging.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Do you ship internationally?</h3>
            <p className="text-gray-600">Yes, we ship to over 50 countries worldwide.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">How can I track my order?</h3>
            <p className="text-gray-600">You'll receive a tracking link via email once your order ships.</p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;