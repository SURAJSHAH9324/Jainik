import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
import IngredientMatchGame from './components/IngredientMatchGame';
import NutritionModal from './components/NutritionModal';
import ImageModal from './components/ImageModal';
import UpcomingProducts from './components/UpcomingProducts';
import OrderHistory from './components/OrderHistory';
import BlogSection from './components/BlogSection';
import { JAINIK_PRODUCT, PACKS } from './data/products';
import { Check, MessageSquare } from 'lucide-react';
import { openWhatsAppDirectChat, DISPLAY_PHONE_NUMBER } from './utils/whatsapp';

export default function App() {
  const { pathname } = useLocation();
  const [cart, setCart] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);
  const [nutritionOpen, setNutritionOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderModalItem, setOrderModalItem] = useState(null);
  const [gameOpen, setGameOpen] = useState(false);

  // Open Direct Order Modal with full address, requirement note & success screen
  const handleOpenOrder = (productItem) => {
    const starter = PACKS[0];
    setOrderModalItem(productItem || {
      id: `pack-${starter.size}`,
      name: `Jainik Energy Bar (${starter.label})`,
      price: starter.regularPrice,
      regularPrice: starter.regularPrice,
      specialPrice: starter.specialPrice,
      image: starter.image,
      size: starter.size,
    });
    setOrderModalOpen(true);
  };

  useEffect(() => {
    if (pathname !== '/') return;
    const id = window.location.hash.replace('#', '');
    if (!id) return;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [pathname]);

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
    const addQty = bundleItem.quantity || 1;
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === bundleItem.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === bundleItem.id
            ? { ...item, quantity: item.quantity + addQty }
            : item
        );
      } else {
        return [...prevCart, { ...bundleItem, quantity: addQty }];
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
        onOpenGame={() => setGameOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 left-6 z-50 bg-warm-900 border border-warm-700 text-white font-bold text-xs px-5 py-3.5 rounded-2xl shadow-warm-lg flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" /> {toastMessage}
        </div>
      )}

      {/* Floating WhatsApp Quick Order Button (Desktop Left) */}
      <button 
        onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I need a payment or order update.')}
        className="hidden md:flex fixed bottom-6 left-6 z-40 bg-[#241611] hover:bg-[#1A0F0B] text-[#D8C08A] font-bold text-xs px-4 py-3 rounded-full shadow-2xl items-center gap-2.5 transition-all hover:scale-105 border border-[#D8C08A]/40"
        title={`Direct WhatsApp: ${DISPLAY_PHONE_NUMBER}`}
      >
        <MessageSquare className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
        <span>WhatsApp updates: {DISPLAY_PHONE_NUMBER}</span>
      </button>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1A0F0B]/95 backdrop-blur-xl border-t border-[#D8C08A]/30 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-[#C9A46C] font-black block tracking-wider uppercase">JAINIK ENERGY BAR</span>
          <span className="text-[#FFFBED] font-black text-sm">From ₹350 <span className="text-xs text-[#D8C08A] font-normal">+ delivery</span></span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleOpenOrder()}
            className="bg-[#C9A46C] text-[#1A0F0B] font-black text-xs py-2.5 px-4 rounded-xl shadow-md"
          >
            Order
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
        {pathname.startsWith('/upcoming') ? (
          <UpcomingProducts />
        ) : (
          <>
            <Hero 
              product={JAINIK_PRODUCT}
              onAddToCart={handleAddToCart}
              onAddBundleToCart={handleAddBundleToCart}
              onOpenNutrition={() => setNutritionOpen(true)}
              onOpenImage={handleOpenImage}
              onOpenOrder={handleOpenOrder}
            />

            <BundleBuilder 
              product={JAINIK_PRODUCT}
              onAddBundleToCart={handleAddBundleToCart}
              onOpenOrder={handleOpenOrder}
            />

            <WhyJainik />

            <VisualShowcase 
              onOpenImage={handleOpenImage}
            />

            <IngredientSpotlight />

            <BlogSection />

            <Testimonials />

            <OrderHistory />

            <FAQ />
          </>
        )}
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

      <IngredientMatchGame
        isOpen={gameOpen}
        onClose={() => setGameOpen(false)}
        onOpenCart={() => setCartOpen(true)}
      />

    </div>
  );
}
