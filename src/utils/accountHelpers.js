export const getOrderStatusColor = (status) => {
  const statuses = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Processing: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-purple-100 text-purple-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
  };

  return statuses[status] || 'bg-gray-100 text-gray-800';
};

export const initialProfileData = {
  firstName: 'Ahmed',
  lastName: 'Eid',
  email: 'ahmed.eid@gmail.com',
  phone: '+20 109 288 7320',
  dateOfBirth: '2000-07-26',
  gender: 'male',
  bio: 'Passionate software Engineer and tech enthusiast.',
};

export const initialNewAddress = {
  type: 'Home',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'Egypt',
};
