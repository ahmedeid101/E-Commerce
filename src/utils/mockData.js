export const heroSlides = [
  {
    id: 1,
    title: 'iPhone 17 Pro Max',
    subtitle: 'Up to 10% off Voucher',
    description: 'The future of mobile technology is here. A17 Bionic chip, 48MP camera, and all-day battery life.',
    discount: '10%',
    image: 'images/iphone14.jpg',
    color: 'bg-black',
    badge: 'New Arrival',
    link: '/products?category=Electronics&search=iPhone'
  },
  {
    id: 2,
    title: 'iPhone 17 Pro',
    subtitle: 'Limited Time Offer',
    description: 'Experience the ultimate performance with titanium design and enhanced camera system.',
    discount: '15%',
    image: 'images/products/iPhone/m1.webp',
    color: 'bg-black',
    badge: 'Best Seller',
    link: '/products?category=Electronics&search=iPhone'
  },
  {
    id: 3,
    title: 'iPhone 17 Plus',
    subtitle: 'Big Screen. Big Battery.',
    description: '6.9-inch Super Retina XDR display with ProMotion and always-on technology.',
    discount: '12%',
    image: 'images/products/iPhone/m2.webp',
    color: 'bg-black',
    badge: 'Hot Deal',
    link: '/products?category=Electronics&search=iPhone'
  },
  {
    id: 4,
    title: 'iPhone 17 Air',
    subtitle: 'Ultra-Thin. Ultra-Powerful.',
    description: 'The thinnest iPhone ever with breakthrough battery technology.',
    discount: '8%',
    image: 'images/products/iPhone/m3.webp',
    color: 'bg-black',
    badge: 'Coming Soon',
    link: '/products?category=Electronics&search=iPhone'
  },
  {
    id: 5,
    title: 'iPhone 17 Series',
    subtitle: 'Complete Ecosystem',
    description: 'Get the full iPhone 17 experience with AirPods and Apple Watch.',
    discount: '20%',
    image: 'images/products/iPhone/m4.jpg',
    color: 'bg-black',
    badge: 'Bundle Deal',
    link: '/products?category=Electronics&search=iPhone'
  }
];

export const categoryList = [
  "Woman's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
  "Swimwear",
];

export const categories = [
  { name: 'Phones', icon: '📱', color: 'bg-blue-100' },
  { name: 'Computers', icon: '💻', color: 'bg-green-100' },
  { name: 'SmartWatch', icon: '⌚', color: 'bg-yellow-100' },
  { name: 'Camera', icon: '📷', color: 'bg-purple-100' },
  { name: 'Headphones', icon: '🎧', color: 'bg-red-100' },
  { name: 'Gaming', icon: '🎮', color: 'bg-indigo-100' },
];

export const fetchMockData = () => {
  const flashProductsData = [
    { id: 1, name: 'HAVIT HV-G92 Gamepad', price: 120, originalPrice: 160, rating: 4.5, reviews: 88, category: 'Electronics', discount: 40, image: 'images/Read_HAVIT_HV-G92_Gamepad.png', badge: '-40%', inStock: true },
    { id: 2, name: 'AK-900 Wired Keyboard', price: 960, originalPrice: 1160, rating: 4.8, reviews: 75, category: 'Electronics', discount: 35, image: 'images/AK-900 Wired Keyboard.png', badge: '-35%', inStock: true },
    { id: 3, name: 'IPS LCD Gaming Monitor', price: 370, originalPrice: 400, rating: 4.6, reviews: 99, category: 'Electronics', discount: 30, image: 'images/IPS LCD Gaming Monitor.png', badge: '-30%', inStock: true },
    { id: 4, name: 'S-Series Comfort Chair', price: 375, originalPrice: 400, rating: 4.7, reviews: 99, category: 'Furniture', discount: 25, image: 'images/chair1.png', badge: '-25%', inStock: true },
    { id: 5, name: 'The North Coat', price: 260, originalPrice: 360, rating: 4.5, reviews: 85, category: 'Fashion', discount: 28, image: 'images/chair2.png', badge: '-28%', inStock: true },
    { id: 6, name: 'Gucci Duffle Bag', price: 960, originalPrice: 1160, rating: 4.6, reviews: 86, category: 'Fashion', discount: 17, image: 'https://picsum.photos/id/6/300/300', badge: '-17%', inStock: true },
    { id: 7, name: 'RGB Liquid CPU Cooler', price: 160, originalPrice: 170, rating: 4.5, reviews: 85, category: 'Electronics', discount: 6, image: 'https://picsum.photos/id/7/300/300', badge: '-6%', inStock: false },
    { id: 8, name: 'Small BookSelf', price: 360, originalPrice: 360, rating: 4.5, reviews: 85, category: 'Furniture', discount: 0, image: 'https://picsum.photos/id/8/300/300', badge: 'New', inStock: true },
    { id: 9, name: 'Wireless Headphones Pro', price: 199, originalPrice: 299, rating: 4.9, reviews: 120, category: 'Electronics', discount: 33, image: 'https://picsum.photos/id/9/300/300', badge: '-33%', inStock: true },
    { id: 10, name: 'Smart Watch Ultra', price: 349, originalPrice: 499, rating: 4.7, reviews: 95, category: 'Electronics', discount: 30, image: 'https://picsum.photos/id/10/300/300', badge: '-30%', inStock: true },
    { id: 11, name: 'Gaming Mouse RGB', price: 59, originalPrice: 89, rating: 4.6, reviews: 200, category: 'Electronics', discount: 34, image: 'https://picsum.photos/id/11/300/300', badge: '-34%', inStock: true },
    { id: 12, name: 'Mechanical Keyboard', price: 129, originalPrice: 199, rating: 4.8, reviews: 150, category: 'Electronics', discount: 35, image: 'https://picsum.photos/id/12/300/300', badge: '-35%', inStock: true },
  ];

  const mockProducts = [
    { id: 1, name: 'Breed Dry Food Dog', price: 120, originalPrice: 160, rating: 4.5, reviews: 88, category: 'Electronics', discount: 30, image: 'images/Breed Dry Food Dog.jpg' },
    { id: 2, name: 'Canon Eos Dslr Camera', price: 960, originalPrice: 1160, rating: 4.8, reviews: 75, category: 'Electronics', discount: 35, image: 'images/Canon Eos Dslr Camera.png' },
    { id: 3, name: 'Asus Fhd Gaming Labtop', price: 370, originalPrice: 400, rating: 4.6, reviews: 99, category: 'Electronics', discount: 7.5, image: 'images/Asus Fhd Gaming Labtop.png' },
    { id: 4, name: 'Curology Product Set', price: 375, originalPrice: 400, rating: 4.7, reviews: 99, category: 'Furniture', discount: 6.25, image: 'images/Curology Product Set.png' },
    { id: 5, name: 'Kids Electric Car', price: 260, originalPrice: 360, rating: 4.5, reviews: 85, category: 'Fashion', discount: 28, image: 'images/Kids Electric Car.png' },
    { id: 6, name: 'Jr.Zoom Soccer Cleats.', price: 960, originalPrice: 1160, rating: 4.6, reviews: 86, category: 'Fashion', discount: 17, image: 'images/Jr.Zoom Soccer Cleats.png' },
    { id: 7, name: 'GP11 Shotter USP Gamepad', price: 160, originalPrice: 170, rating: 4.5, reviews: 85, category: 'Electronics', discount: 6, image: 'images/GP11 Shotter USP Gamepad.png' },
    { id: 8, name: 'Quilted Stain Jacket', price: 360, originalPrice: 360, rating: 4.5, reviews: 85, category: 'Furniture', discount: 0, image: 'images/Quilted Stain Jacket.png' },
  ];

  return {
    products: mockProducts,
    flashProducts: flashProductsData,
    bestSelling: mockProducts.slice(4, 8),
    newArrival: mockProducts.slice(0, 8)
  };
};

export const RECOMMENDED_PRODUCTS = [
  { id: 101, name: 'ASUS FHD Gaming Laptop', price: 960, originalPrice: 1160, rating: 4.5, reviews: 85, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/11/300/300' },
  { id: 102, name: 'IPS LCD Gaming Monitor', price: 1160, rating: 4.6, reviews: 99, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/3/300/300' },
  { id: 103, name: 'HAVIT HV-G92 Gamepad', price: 560, rating: 4.5, reviews: 88, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/1/300/300' },
  { id: 104, name: 'AK-900 Wired Keyboard', price: 200, rating: 4.8, reviews: 75, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/2/300/300' },
];