import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BundleBuilder from './components/BundleBuilder';
import VisualShowcase from './components/VisualShowcase';
import IngredientSpotlight from './components/IngredientSpotlight';
import WhyJainik from './components/WhyJainik';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CartDrawer from './components/CartDrawer';
import OrderModal from './components/OrderModal';
import Footer from './components/Footer';
import QuickActionDock from './components/QuickActionDock';
import NutritionModal from './components/NutritionModal';
import ImageModal from './components/ImageModal';
import { JAINIK_PRODUCT } from './data/products';
import { Check, MessageSquare } from 'lucide-react';
import { openWhatsAppDirectChat, DISPLAY_PHONE_NUMBER } from './utils/whatsapp';

export default function App() {
  const [cart, setCart] = useState([
    {
      id: 'jainik-pack-10',
      name: 'Jainik Energy Bar (Pack of 10)',
      price: 650,
      quantity: 1,
      badge: 'Weekly Box',
      accentColor: '#241611'
    }
  ]);

  const [cartOpen, setCartOpen] = useState(false);
  const [nutritionOpen, setNutritionOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderModalItem, setOrderModalItem] = useState(null);

  // Open Direct Order Modal with full address, requirement note & success screen
  const handleOpenOrder = (productItem) => {
    setOrderModalItem(productItem || {
      name: 'Jainik Energy Bar (40g Single Bar)',
      price: 70,
      image: '/jainik-bar-hero.jpg'
    });
    setOrderModalOpen(true);
  };

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
            price: 70,
            quantity: quantity,
            badge: 'Single Bar (₹70)'
          }
        ];
      }
    });

    showToast(`Added ${quantity} × Jainik Energy Bar to Order Cart`);
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

    showToast(`Added ${bundleItem.name} to Order Cart!`);
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
    <div className="min-h-screen bg-[#FAF6F0] text-warm-900 selection:bg-warm-300 selection:text-warm-900 font-sans">
      
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
        onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to order Jainik Energy Bars (₹70/bar)!')}
        className="hidden md:flex fixed bottom-6 left-6 z-40 bg-[#241611] hover:bg-[#1A0F0B] text-[#D8C08A] font-bold text-xs px-4 py-3 rounded-full shadow-2xl items-center gap-2.5 transition-all hover:scale-105 border border-[#D8C08A]/40"
        title={`Direct WhatsApp: ${DISPLAY_PHONE_NUMBER}`}
      >
        <MessageSquare className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
        <span>WhatsApp: {DISPLAY_PHONE_NUMBER} (₹70/Bar)</span>
      </button>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1A0F0B]/95 backdrop-blur-xl border-t border-[#D8C08A]/30 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-[#C9A46C] font-black block tracking-wider uppercase">JAINIK ENERGY BAR</span>
          <span className="text-[#FFFBED] font-black text-sm">₹70 <span className="text-xs text-[#D8C08A] font-normal">/ Bar</span></span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleOpenOrder({ name: 'Jainik Energy Bar (40g Single Bar)', price: 70, image: '/jainik-bar-hero.jpg' })}
            className="bg-[#C9A46C] text-[#1A0F0B] font-black text-xs py-2.5 px-4 rounded-xl shadow-md"
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
        onOpenOrder={handleOpenOrder}
      />

      {/* Main Page Content */}
      <main>
        {/* 1. Hero Section: High contrast, readable, featuring jainik-bar-hero.jpg */}
        <Hero 
          product={JAINIK_PRODUCT}
          onAddToCart={handleAddToCart}
          onOpenNutrition={() => setNutritionOpen(true)}
          onOpenImage={handleOpenImage}
          onOpenOrder={handleOpenOrder}
        />

        {/* 2. Barefruit-Style Product Collection Grid: 3, 6, 12, 24 Packs with Package.png */}
        <BundleBuilder 
          product={JAINIK_PRODUCT}
          onAddBundleToCart={handleAddBundleToCart}
          onOpenOrder={handleOpenOrder}
        />

        {/* 3. Visual Brand Gallery: Interactive showcase for jainik-1.png to jainik-5.png */}
        <VisualShowcase 
          onOpenImage={handleOpenImage}
        />

        {/* 4. 10 Superfoods & Key Nutrition Chips (Streamlined) */}
        <IngredientSpotlight />

        {/* 5. Why Jainik: 4 Clean Heritage & Quality Pillars */}
        <WhyJainik />

        {/* 6. Customer Testimonials */}
        <Testimonials />

        {/* 7. Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Order Modal with Customer Requirements, Address & Order Successful Screen */}
      <OrderModal 
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        selectedProduct={orderModalItem}
      />

      {/* Nutrition Facts Modal */}
      {nutritionOpen && (
        <NutritionModal 
          product={JAINIK_PRODUCT}
          onClose={() => setNutritionOpen(false)}
        />
      )}

      {/* Packaging & Visual Lightbox Modal */}
      {lightboxImage && (
        <ImageModal
          imageSrc={lightboxImage.src}
          title={lightboxImage.title}
          subtitle={lightboxImage.subtitle}
          onClose={() => setLightboxImage(null)}
        />
      )}

      {/* WhatsApp Cart Drawer with Order Successful Screen */}
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
