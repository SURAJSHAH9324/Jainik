import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { openWhatsAppDirectChat } from '../utils/whatsapp';

export default function Navbar({ cartCount, onOpenCart, onOpenNutrition }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#FAF6F0]/95 backdrop-blur-md border-b border-warm-200 shadow-warm-sm py-3' 
        : 'bg-[#FAF6F0]/80 backdrop-blur-sm border-b border-warm-200/60 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with Clean Artisanal Typography */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="bg-warm-900 rounded-xl p-1 shadow-sm">
            <img 
              src="/jainik-logo.jpg" 
              alt="Jainik Energy Bar - Built on Purity" 
              className="h-9 sm:h-10 object-contain rounded-lg group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="hidden sm:block border-l border-warm-300 pl-3">
            <span className="text-[10px] text-warm-700 tracking-widest font-black uppercase block">
              BUILT ON PURITY
            </span>
            <span className="text-warm-800 text-xs font-semibold block -mt-0.5">
              100% Natural • ₹80 / Bar
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-warm-800">
          <a href="#product" className="hover:text-warm-600 transition-colors">The Bar</a>
          <a href="#craft" className="hover:text-warm-600 transition-colors">Craftsmanship</a>
          <a href="#ingredients" className="hover:text-warm-600 transition-colors">10 Ingredients</a>
          <a href="#benefits" className="hover:text-warm-600 transition-colors">Benefits</a>
          <a href="#packs" className="hover:text-warm-600 transition-colors">Box Packs</a>
          <button 
            onClick={onOpenNutrition}
            className="hover:text-warm-600 transition-colors font-bold flex items-center gap-1.5 text-left"
          >
            <ShieldCheck className="w-4 h-4 text-sage-500" />
            <span>Nutrition & FSSAI</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Direct WhatsApp Callout */}
          <button 
            onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to order Jainik Energy Bars (₹80/bar)!')}
            className="hidden sm:flex items-center gap-2 text-xs font-extrabold text-warm-800 hover:text-warm-950 px-3.5 py-2.5 rounded-xl bg-warm-200/70 hover:bg-warm-200 border border-warm-300/80 transition-all"
            title="Direct WhatsApp: 9325578244"
          >
            <MessageSquare className="w-4 h-4 text-whatsapp-600 fill-whatsapp-600" />
            <span>9325578244</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button 
            onClick={onOpenCart} 
            className="relative p-2.5 rounded-xl bg-white border border-warm-300 text-warm-900 hover:border-warm-500 shadow-warm-sm transition-all"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-warm-700 text-white font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Order CTA */}
          <button 
            onClick={onOpenCart}
            className="btn-warm-primary text-xs sm:text-sm py-2.5 px-4 sm:px-5"
          >
            <span>Order (₹80)</span>
          </button>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white border border-warm-300 text-warm-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6F0] border-b border-warm-300 px-6 py-5 space-y-3.5 shadow-warm-md text-warm-900">
          <a 
            href="#product" 
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold py-1 hover:text-warm-600 text-base"
          >
            The Bar (₹80)
          </a>
          <a 
            href="#craft" 
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold py-1 hover:text-warm-600 text-base"
          >
            Sattvic Craftsmanship
          </a>
          <a 
            href="#ingredients" 
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold py-1 hover:text-warm-600 text-base"
          >
            10 Natural Ingredients
          </a>
          <a 
            href="#benefits" 
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold py-1 hover:text-warm-600 text-base"
          >
            10 Health Benefits
          </a>
          <a 
            href="#packs" 
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold py-1 hover:text-warm-600 text-base"
          >
            Packs (3, 6, 12, 24 Bars)
          </a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenNutrition(); }}
            className="block font-bold py-1 hover:text-warm-600 text-left text-base"
          >
            Nutrition & FSSAI Details
          </button>
          <div className="pt-3 border-t border-warm-200">
            <button 
              onClick={() => { setMobileMenuOpen(false); openWhatsAppDirectChat(); }} 
              className="w-full flex items-center justify-center gap-2 btn-whatsapp-pill py-3 text-sm font-bold"
            >
              <MessageSquare className="w-4 h-4 fill-white" /> WhatsApp Direct: 9325578244
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
