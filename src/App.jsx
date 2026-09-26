import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FlavorSelector from './components/FlavorSelector';
import WhyJainik from './components/WhyJainik';
import IngredientSpotlight from './components/IngredientSpotlight';
import NutritionModal from './components/NutritionModal';
import BundleBuilder from './components/BundleBuilder';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { JAINIK_PRODUCT } from './data/products';
import { Check, MessageSquare } from 'lucide-react';
import { openWhatsAppDirectChat } from './utils/whatsapp';

export default function App() {
  const [cart, setCart] = useState([
    {
      id: 'jainik-pack-12',
      name: 'Jainik Multigrain Bar (12-Pack Box)',
      price: 890,
      quantity: 1,
      badge: 'Most Popular',
      accentColor: '#1E40AF'
    }
  ]);

  const [cartOpen, setCartOpen] = useState(false);
  const [nutritionOpen, setNutritionOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Cart Handlers
  const handleAddToCart = (quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === 'single-bar');
      if (existing) {
        return prevCart.map(item =>
          item.id === 'single-bar'
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: 'single-bar',
            name: 'Jainik Multigrain Bar (Chocolate Chunk Nut)',
            price: 80,
            quantity: quantity,
            badge: 'Single Bar (₹80)'
          }
        ];
      }
    });

    showToast(`Added ${quantity} × Jainik Bar to WhatsApp Order`);
    setCartOpen(true);
  };

  const handleAddBundleToCart = (bundleItem) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === bundleItem.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === bundleItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...bundleItem, quantity: 1 }];
      }
    });

    showToast(`Added ${bundleItem.name} to WhatsApp Order!`);
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCart(prevCart =>
        prevCart.map(item => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-jain-blue selection:text-white font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white font-black text-xs px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce border border-slate-700">
          <Check className="w-4 h-4 text-emerald-400" /> {toastMessage}
        </div>
      )}

      {/* Floating WhatsApp Quick Order Button */}
      <button 
        onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to order Jainik Multigrain Energy Bars (₹80/bar)!')}
        className="fixed bottom-6 left-6 z-40 bg-whatsapp-500 hover:bg-whatsapp-600 text-white font-black text-xs px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 border border-whatsapp-400"
        title="Direct WhatsApp: 9325578244"
      >
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">WhatsApp Order: 9325578244 (₹80/Bar)</span>
      </button>

      {/* Navigation Header */}
      <Navbar 
        cartCount={totalCartCount} 
        onOpenCart={() => setCartOpen(true)} 
        onOpenNutrition={() => setNutritionOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        {/* 1. Hero Section showcasing Jainik Chocolate Chunk Nut */}
        <Hero 
          product={JAINIK_PRODUCT}
          onAddToCart={handleAddToCart}
          onOpenNutrition={() => setNutritionOpen(true)}
        />

        {/* 2. Product Deep Dive & Broken Bar Texture */}
        <FlavorSelector 
          product={JAINIK_PRODUCT}
          onAddToCart={handleAddToCart}
          onOpenNutrition={() => setNutritionOpen(true)}
        />

        {/* 3. Pure Sattvic Millets & Nutrition Pillars */}
        <WhyJainik />

        {/* 4. Rich Real Ingredients Photo Showcase */}
        <IngredientSpotlight />

        {/* 5. 3, 6, 12, 24 Packs Section */}
        <BundleBuilder 
          product={JAINIK_PRODUCT}
          onAddBundleToCart={handleAddBundleToCart}
        />

        {/* 6. Athlete & Customer Reviews */}
        <Testimonials />

        {/* 7. FAQ */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Nutrition Facts Modal */}
      {nutritionOpen && (
        <NutritionModal 
          product={JAINIK_PRODUCT}
          onClose={() => setNutritionOpen(false)}
        />
      )}

      {/* WhatsApp Cart Drawer */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

    </div>
  );
}
