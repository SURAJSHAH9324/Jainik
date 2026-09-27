export const JAINIK_PRODUCT = {
  id: 'jainik-energy-bar',
  name: 'Jainik Energy Bar',
  tagline: 'Built On Purity • Whole Grains & Rich in Nuts',
  motto: 'शक्ती जी आहे नैसर्गिक व परंपरेची! (Power of Nature & Tradition)',
  price: 80,
  weight: '40g',
  rating: 4.95,
  reviews: 2850,
  logoImage: '/jainik-logo.jpg',
  wrapperImage: '/jainik-wrapper-mockup.png',
  heroImage: '/jainik-bar-hero.jpg',
  packageImage: '/Package.png',
  nutritionLabelImage: '/jainik-nutrition-label.jpg',
  fssaiLic: '21526066000742',
  manufacturer: 'JAINIK FOODS, Chunapura, Karanja (Lad), Dist. Washim',
  primaryPhone: '9325578244',
  alternatePhone: '9922322906',
  email: 'jainikfoods@gmail.com',
  pillars: [
    { title: '100% Natural', desc: 'No preservatives, zero chemicals, zero artificial colours', icon: 'Leaf' },
    { title: 'High Protein & Fibre', desc: 'Loaded with roasted nuts, seeds, oats & roasted chana', icon: 'Zap' },
    { title: 'Rich in Dry Fruits', desc: 'Almonds, Cashews, Pistachios, Dates & Pure Jaggery', icon: 'Heart' },
    { title: 'Traditional Indian Fuel', desc: 'Our ancestors’ strength crafted for modern active living', icon: 'Sparkles' }
  ],
  description: 'Jainik Energy Bar is handcrafted with pure traditional superfoods: Almonds, Cashews, Pistachios, Pumpkin Seeds, Watermelon Seeds, Oats, Roasted Chana, Dates, Jaggery, and Chocolate. 100% natural, pure vegetarian, zero preservatives, and zero chemicals. Built on Purity.',
  
  // The 10 Official Ingredients provided in user's poster
  ingredients: [
    { name: 'बदाम (Almonds)', english: 'California Almonds', role: 'Vitamin E & Brain Focus', benefit: 'Healthy brain function & vitality' },
    { name: 'काजू (Cashews)', english: 'Whole Cashews', role: 'Magnesium & Energy', benefit: 'Cardiovascular wellness & stamina' },
    { name: 'पिस्ता (Pistachios)', english: 'Persian Pistachios', role: 'Antioxidants & Lutein', benefit: 'Eye health & cell restoration' },
    { name: 'भोपळ्याच्या बिया (Pumpkin Seeds)', english: 'Pumpkin Seeds', role: 'Zinc & Immune Strength', benefit: 'Immunity defense & stamina' },
    { name: 'ओट्स (Oats)', english: 'Rolled Oats', role: 'Dietary Beta-Glucan Fibre', benefit: 'Smooth gut digestion & satiety' },
    { name: 'फुटाणे (Roasted Chana)', english: 'Roasted Gram', role: 'High Natural Plant Protein', benefit: 'Lean muscle recovery & strength' },
    { name: 'टरबुजाच्या बिया (Watermelon Seeds)', english: 'Watermelon Seeds', role: 'Iron & Micronutrients', benefit: 'Vascular circulation & stamina' },
    { name: 'खजूर (Dates)', english: 'Whole Dates', role: 'Low-GI Natural Energy', benefit: 'Instant & lasting pure power' },
    { name: 'गूळ (Natural Jaggery)', english: 'Organic Jaggery', role: 'Natural Mineral Sweetener', benefit: 'Rich in iron, cleanses respiratory tract' },
    { name: 'डार्क चॉकलेट (Cocoa / Chocolate)', english: 'Pure Dark Chocolate', role: 'Flavanoids & Mood Booster', benefit: 'Endorphin release & decadent taste' }
  ],

  // 10 Official Benefits from user's English poster
  tenBenefits: [
    { num: 1, title: 'Natural Energy Boost', desc: 'Provides instant and long-lasting energy to keep you active all day.' },
    { num: 2, title: 'Supports Muscle Strength', desc: 'Rich in protein, healthy fats, and essential minerals for strength.' },
    { num: 3, title: 'Improves Heart Health', desc: 'Contains heart-friendly nutrients that support cardiovascular health.' },
    { num: 4, title: 'Enhances Brain Function', desc: 'Nutrients like almonds and seeds support sharp memory and mental focus.' },
    { num: 5, title: 'Aids Digestion', desc: 'High in dietary fiber which helps in smooth and regular digestion.' },
    { num: 6, title: 'Strengthens Bones', desc: 'Good source of natural calcium, magnesium, and phosphorus.' },
    { num: 7, title: 'Boosts Immunity', desc: 'Packed with natural antioxidants and vitamins that strengthen immunity.' },
    { num: 8, title: 'Helps in Weight Management', desc: 'Keeps you full for longer and controls unhealthy junk cravings.' },
    { num: 9, title: 'Rich in Vitamins & Minerals', desc: 'A wholesome combination of essential vitamins, iron, and minerals.' },
    { num: 10, title: 'Perfect for All Ages', desc: 'A healthy, wholesome snack for kids, athletes, adults, and the entire family.' }
  ],

  // Official Label Info (Per 100g)
  nutritionPer100g: {
    energy: '478.26 kcal',
    protein: '18.62 g',
    carbohydrate: '54.19 g',
    totalSugar: '32.00 g (Natural from Dates & Jaggery)',
    dietaryFibre: '10.00 g',
    totalFat: '20.78 g'
  }
};

export const INGREDIENTS = JAINIK_PRODUCT.ingredients;

export const PACKS = [
  { 
    size: 3, 
    price: 240, 
    regularPrice: 240, 
    savings: 0, 
    label: '3-Pack Box', 
    sub: 'Starter Trial (₹80 / Bar)', 
    badge: 'Trial Pack',
    image: '/jainik-wrapper-mockup.png'
  },
  { 
    size: 6, 
    price: 460, 
    regularPrice: 480, 
    savings: 20, 
    label: '6-Pack Box', 
    sub: 'Save ₹20 (₹76.6 / Bar)', 
    badge: 'Weekly Fuel',
    image: '/Package.png'
  },
  { 
    size: 12, 
    price: 890, 
    regularPrice: 960, 
    savings: 70, 
    label: '12-Pack Box', 
    sub: 'Save ₹70 (₹74 / Bar)', 
    badge: '🔥 Most Popular', 
    popular: true,
    image: '/Package.png'
  },
  { 
    size: 24, 
    price: 1720, 
    regularPrice: 1920, 
    savings: 200, 
    label: '24-Pack Box', 
    sub: 'Save ₹200 (₹71.6 / Bar)', 
    badge: '👑 Mega Value',
    image: '/Package.png'
  }
];

export const SHOWCASE_SLIDES = [
  {
    id: 1,
    image: '/jainik-1.png',
    title: 'Natural Energy & Sattvic Heritage',
    subtitle: 'Inspired by ancient Indian culinary power. Zero chemicals, 100% pure nutrition.'
  },
  {
    id: 2,
    image: '/jainik-2.png',
    title: '10 Authentic Superfood Ingredients',
    subtitle: 'Whole California almonds, cashews, pistachios, dates, jaggery, seeds & dark chocolate.'
  },
  {
    id: 3,
    image: '/jainik-3.png',
    title: '18.62g Plant Protein & Prebiotic Fibre',
    subtitle: 'Clean fuel for fitness, gym workouts, endurance runners, and busy professionals.'
  },
  {
    id: 4,
    image: '/jainik-4.png',
    title: 'Zero White Sugar • Real Fruit Sweetness',
    subtitle: 'Sweetened solely with whole dates and unrefined jaggery for sustained energy without dips.'
  },
  {
    id: 5,
    image: '/jainik-5.png',
    title: 'Freshly Handcrafted in Maharashtra',
    subtitle: 'FSSAI Certified kitchen in Karanja (Lad). Dispatched fresh in 24 hours across India.'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Bhavin Shah',
    role: 'Marathon Runner & Tech Founder',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    content: 'The Jainik Energy Bar is pure perfection. Whole nuts, real jaggery, and zero preservatives. Gives me sustained stamina throughout my runs!',
    rating: 5
  },
  {
    name: 'Dr. Priya Mehta',
    role: 'Ayurvedic Wellness Consultant',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    content: 'Finding a truly pure, sattvic energy bar made with traditional ingredients like dates, roasted chana, and almonds at ₹80 is amazing. Highly recommended!',
    rating: 5
  },
  {
    name: 'Siddharth Jain',
    role: 'Fitness Coach & Athlete',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    content: 'Ordered directly on WhatsApp (9325578244). Delivery was quick and the bar tastes delicious — rich chocolate, crunchy almonds, and natural jaggery sweetness.',
    rating: 5
  }
];

export const FAQS = [
  {
    question: 'What are the core ingredients in Jainik Energy Bar?',
    answer: 'Jainik Energy Bar is made with 10 traditional natural ingredients: Almonds (बदाम), Cashews (काजू), Pistachios (पिस्ता), Pumpkin Seeds (भोपळ्याच्या बिया), Oats (ओट्स), Roasted Chana (फुटाणे), Watermelon Seeds (टरबुजाच्या बिया), Dates (खजूर), Jaggery (गूळ), and Dark Chocolate (चॉकलेट).'
  },
  {
    question: 'How do I place an order directly on WhatsApp?',
    answer: 'Select your desired quantity or pack (Single Bar ₹80, 3-Pack ₹240, 6-Pack ₹460, 12-Pack ₹890, or 24-Pack ₹1,720) and click "Order via WhatsApp". Your complete order requirement will open directly on our official WhatsApp: +91 9325578244.'
  },
  {
    question: 'Is Jainik Energy Bar 100% natural with no preservatives?',
    answer: 'Yes! Jainik is Built on Purity. It contains 100% natural ingredients, zero preservatives, zero artificial colours, zero chemical additives, and is handmade with care.'
  },
  {
    question: 'What is the FSSAI License Number?',
    answer: 'Jainik Foods is officially certified by FSSAI under License No. 21526066000742.'
  },
  {
    question: 'How can returning customers claim discounts?',
    answer: 'Returning customers can toggle the "Returning VIP Customer" option in the cart to get an extra 10% loyalty discount applied directly to their WhatsApp invoice!'
  }
];
