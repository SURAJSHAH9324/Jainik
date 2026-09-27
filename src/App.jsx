import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FlavorSelector from './components/FlavorSelector';
import WhyJainik from './components/WhyJainik';
import IngredientSpotlight from './components/IngredientSpotlight';
import NutritionModal from './components/NutritionModal';
import ImageModal from './components/ImageModal';
import BundleBuilder from './components/BundleBuilder';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import QuickActionDock from './components/QuickActionDock';
import { JAINIK_PRODUCT } from './data/products';
import { Check, MessageSquare } from 'lucide-react';
import { openWhatsAppDirectChat } from './utils/whatsapp';

export default function App() {
  const [cart, setCart] = useState([
    {
      id: 'jainik-pack-12',
      name: 'Jainik Energy Bar (12-Pack Box)',
      price: 890,
      quantity: 1,
      badge: 'Most Popular',
      accentColor: '#5C361D'
    }
  ]);

  const [cartOpen, setCartOpen] = useState(false);
  const [nutritionOpen, setNutritionOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
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
            name: 'Jainik Energy Bar (40g Single Bar)',
            price: 80,
            quantity: quantity,
            badge: 'Single Bar (₹80)'
          }
        ];
      }
    });

    showToast(`Added ${quantity} × Jainik Energy Bar to WhatsApp Order`);
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

  const handleOpenImage = (src, title, subtitle) => {
    setLightboxImage({ src, title, subtitle });
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-warm-100 text-warm-900 selection:bg-warm-300 selection:text-warm-900 font-sans">
      
      {/* Floating Quick Action Dock */}
      <QuickActionDock 
        onOpenCart={() => setCartOpen(true)}
        onOpenNutrition={() => setNutritionOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 left-6 z-50 bg-warm-900 border border-warm-700 text-white font-bold text-xs px-5 py-3.5 rounded-2xl shadow-warm-lg flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" /> {toastMessage}
        </div>
      )}

      {/* Floating WhatsApp Quick Order Button (Desktop Left) */}
      <button 
        onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to order Jainik Energy Bars (₹80/bar)!')}
        className="hidden md:flex fixed bottom-6 left-6 z-40 bg-white hover:bg-warm-50 text-warm-900 font-bold text-xs px-4 py-3 rounded-full shadow-warm-lg items-center gap-2.5 transition-all hover:scale-105 border border-warm-300"
        title="Direct WhatsApp: 9325578244"
      >
        <MessageSquare className="w-4 h-4 text-whatsapp-600 fill-whatsapp-600" />
        <span>WhatsApp: 9325578244 (₹80/Bar)</span>
      </button>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-xl border-t border-warm-300 px-4 py-3 flex items-center justify-between shadow-warm-lg">
        <div>
          <span className="text-[10px] text-warm-600 font-black block tracking-wider uppercase">JAINIK ENERGY BAR</span>
          <span className="text-warm-900 font-black text-sm">₹80 <span className="text-xs text-warm-500 font-normal">/ Bar</span></span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleAddToCart(1)}
            className="btn-warm-primary text-xs py-2.5 px-4"
          >
            Order on WA
          </button>
        </div>
      </div>

      {/* Navigation Header */}
      <Navbar 
        cartCount={totalCartCount} 
        onOpenCart={() => setCartOpen(true)} 
        onOpenNutrition={() => setNutritionOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero 
          product={JAINIK_PRODUCT}
          onAddToCart={handleAddToCart}
          onOpenNutrition={() => setNutritionOpen(true)}
          onOpenImage={handleOpenImage}
        />

        {/* 2. Texture & Craftsmanship */}
        <FlavorSelector 
          product={JAINIK_PRODUCT}
          onAddToCart={handleAddToCart}
          onOpenNutrition={() => setNutritionOpen(true)}
          onOpenImage={handleOpenImage}
        />

        {/* 3. Ancestral Wisdom & Quality Specifications */}
        <WhyJainik />

        {/* 4. 10 Ingredients & Everyday Benefits */}
        <IngredientSpotlight />

        {/* 5. 3, 6, 12, 24 Packs Selector */}
        <BundleBuilder 
          product={JAINIK_PRODUCT}
          onAddBundleToCart={handleAddBundleToCart}
        />

        {/* 6. Customer Reviews */}
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

      {/* Packaging Lightbox Modal */}
      {lightboxImage && (
        <ImageModal
          imageSrc={lightboxImage.src}
          title={lightboxImage.title}
          subtitle={lightboxImage.subtitle}
          onClose={() => setLightboxImage(null)}
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
