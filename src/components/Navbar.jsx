import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, MessageSquare, ShieldCheck, Truck, Sparkles } from 'lucide-react';
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
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#FAF6F0] shadow-warm-sm">
      {/* Barefruit-Style Top Announcement Bar */}
      <div className="bg-[#3D2211] text-[#FAF6F0] text-[11px] font-bold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span>Free Express Courier Across India • 100% Real Whole Foods • Direct WhatsApp: 9325578244</span>
      </div>

      {/* Main Navbar Bar */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF6F0]/98 backdrop-blur-md border-b border-warm-300 py-2.5' 
          : 'bg-[#FAF6F0] border-b border-warm-200 py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo with Clean Artisanal Typography */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="bg-warm-900 rounded-xl p-1 shadow-sm">
              <img 
                src="/jainik-logo.jpg" 
                alt="Jainik Energy Bar - Built on Purity" 
                className="h-8 sm:h-9 object-contain rounded-lg group-hover:scale-105 transition-transform"
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
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-warm-800">
            <a href="#product" className="hover:text-warm-600 transition-colors">The Bar</a>
            <a href="#packs" className="hover:text-warm-600 transition-colors">Pack Boxes</a>
            <a href="#showcase" className="hover:text-warm-600 transition-colors">Brand Visuals</a>
            <a href="#ingredients" className="hover:text-warm-600 transition-colors">10 Ingredients</a>
            <a href="#why-jainik" className="hover:text-warm-600 transition-colors">Why Jainik</a>
            <button 
              onClick={onOpenNutrition}
              className="hover:text-warm-600 transition-colors font-bold flex items-center gap-1.5 text-left"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Nutrition Facts</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            
            {/* Direct WhatsApp Callout */}
            <button 
              onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to order Jainik Energy Bars (₹80/bar)!')}
              className="hidden lg:flex items-center gap-2 text-xs font-extrabold text-warm-800 hover:text-warm-950 px-3 py-2 rounded-xl bg-warm-200/80 hover:bg-warm-200 border border-warm-300 transition-all"
              title="Direct WhatsApp: 9325578244"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#128C7E] fill-[#128C7E]" />
              <span>9325578244</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button 
              onClick={onOpenCart} 
              className="relative p-2 rounded-xl bg-white border border-warm-300 text-warm-900 hover:border-warm-500 shadow-xs transition-all"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-warm-900 text-white font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Order CTA */}
            <button 
              onClick={onOpenCart}
              className="btn-warm-primary text-xs py-2 px-3.5 sm:px-4"
            >
              <span>Order (₹80)</span>
            </button>

            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white border border-warm-300 text-warm-900"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF6F0] border-t border-warm-200 px-4 py-4 space-y-3">
            <div className="flex flex-col space-y-2 text-sm font-bold text-warm-800">
              <a 
                href="#product" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-warm-200/50"
              >
                The Bar (₹80)
              </a>
              <a 
                href="#packs" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-warm-200/50"
              >
                Pack Boxes (3, 6, 12, 24)
              </a>
              <a 
                href="#showcase" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-warm-200/50"
              >
                Brand Visuals
              </a>
              <a 
                href="#ingredients" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-warm-200/50"
              >
                10 Superfoods
              </a>
              <a 
                href="#why-jainik" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-warm-200/50"
              >
                Why Jainik
              </a>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNutrition();
                }}
                className="py-2 px-3 text-left rounded-lg hover:bg-warm-200/50 text-emerald-800 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Nutrition Facts & Lab Specs</span>
              </button>
            </div>
            <div className="pt-2 border-t border-warm-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsAppDirectChat('Hi Jainik Team, I would like to order Jainik Energy Bars (₹80/bar)!');
                }}
                className="w-full py-2.5 rounded-xl btn-whatsapp-pill text-xs font-bold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>Chat on WhatsApp (9325578244)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
