import React, { useState } from 'react';
import Button from '../components/Button';
import { INITIAL_FORM, CONTACT_INFO } from '../utils/contactData';

// ---------------- HELPERS ----------------
const validateForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Invalid email';
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Phone is required';
  } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
    errors.phone = 'Invalid phone number';
  }

  if (!formData.message.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.length < 10) {
    errors.message = 'Minimum 10 characters required';
  }

  return errors;
};

// ---------------- COMPONENTS ----------------
const InputField = ({ label, name, value, onChange, error, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const TextAreaField = ({ value, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium mb-2">
      Your Message <span className="text-red-500">*</span>
    </label>
    <textarea
      name="message"
      value={value}
      onChange={onChange}
      rows="6"
      className={`w-full px-4 py-3 border rounded-lg resize-none focus:ring-2 focus:ring-red-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const ContactCard = ({ icon, title, details, bgColor }) => (
  <div className={`${bgColor} rounded-lg p-6 shadow-sm`}>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    {details.map((d, i) => (
      <p key={i} className="text-gray-600 text-sm">{d}</p>
    ))}
  </div>
);

// ---------------- MAIN ----------------
const ContactPage = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length) return;

    setLoading(true);

    await new Promise((res) => setTimeout(res, 1500));

    setLoading(false);
    setSuccess(true);
    setFormData(INITIAL_FORM);

    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* SUCCESS */}
      {success && (
        <div className="fixed top-20 right-4 bg-green-500 text-white p-4 rounded">
          Message sent successfully!
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="space-y-6">
          {CONTACT_INFO.map((item, i) => (
            <ContactCard key={i} {...item} />
          ))}
        </div>

        {/* FORM */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />

              <InputField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>

            <InputField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />

            <TextAreaField
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
            />

            <div className="flex justify-end">
              <Button disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;