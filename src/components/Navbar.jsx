import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, MessageSquare, ShieldCheck, Sparkles, Phone } from 'lucide-react';
import { openWhatsAppDirectChat, DISPLAY_PHONE_NUMBER } from '../utils/whatsapp';

export default function Navbar({ cartCount, onOpenCart, onOpenNutrition, onOpenOrder }) {
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
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#241611] text-[#FFFBED] border-b border-[#D8C08A]/20 shadow-md">
      
      {/* Top Announcement Bar (Mockup Style) */}
      <div className="bg-[#1A0F0B] text-[#D8C08A] text-[11px] font-bold py-1.5 px-4 text-center tracking-wide border-b border-[#D8C08A]/15 flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-[#C9A46C]" />
        <span>Free Express Courier Across India • 100% Sattvic Superfoods • Direct Helpline: {DISPLAY_PHONE_NUMBER}</span>
      </div>

      {/* Main Navbar Bar */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#241611]/98 backdrop-blur-md py-2.5 shadow-lg' 
          : 'bg-[#241611] py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo - Transparent without background box! */}
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src="/jainik-logo-transparent.png" 
              alt="Jainik - Built on Purity" 
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block border-l border-[#D8C08A]/30 pl-3">
              <span className="text-[10px] text-[#C9A46C] tracking-widest font-black uppercase block">
                BUILT ON PURITY
              </span>
              <span className="text-[#FFFBED]/80 text-xs font-medium block -mt-0.5">
                100% Natural • ₹70 / Bar
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-[#FFFBED]/90">
            <a href="#product" className="hover:text-[#C9A46C] transition-colors">The Bar</a>
            <a href="#packs" className="hover:text-[#C9A46C] transition-colors">Pack Boxes (1, 5, 10, 30, 40)</a>
            <a href="#showcase" className="hover:text-[#C9A46C] transition-colors">Brand Visuals</a>
            <a href="#ingredients" className="hover:text-[#C9A46C] transition-colors">10 Ingredients</a>
            <a href="#why-jainik" className="hover:text-[#C9A46C] transition-colors">Why Jainik</a>
            <button 
              onClick={onOpenNutrition}
              className="hover:text-[#C9A46C] transition-colors font-bold flex items-center gap-1.5 text-left"
            >
              <ShieldCheck className="w-4 h-4 text-[#5C7548]" />
              <span>Nutrition Facts</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            
            {/* Direct WhatsApp Callout with Updated Number */}
            <button 
              onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to order Jainik Energy Bars (₹70/bar)!')}
              className="hidden lg:flex items-center gap-2 text-xs font-bold text-[#FFFBED] hover:text-[#241611] hover:bg-[#C9A46C] px-3.5 py-2 rounded-xl bg-[#2E1D17] border border-[#D8C08A]/30 transition-all"
              title={`Direct WhatsApp: ${DISPLAY_PHONE_NUMBER}`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
              <span>{DISPLAY_PHONE_NUMBER}</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button 
              onClick={onOpenCart} 
              className="relative p-2.5 rounded-xl bg-[#2E1D17] border border-[#D8C08A]/30 text-[#FFFBED] hover:border-[#C9A46C] transition-all"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A46C] text-[#241611] font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Order CTA in Soft Premium Gold */}
            <button 
              onClick={() => onOpenOrder ? onOpenOrder({ name: 'Jainik Energy Bar (40g Single Bar)', price: 70, image: '/jainik-bar-hero.jpg' }) : onOpenCart()}
              className="bg-[#C9A46C] hover:bg-[#D8BA8A] text-[#241611] font-extrabold text-xs py-2 px-3.5 sm:px-4 rounded-xl transition-all shadow-md hover:scale-[1.02]"
            >
              <span>Order (₹70)</span>
            </button>

            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#2E1D17] border border-[#D8C08A]/30 text-[#FFFBED]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1A0F0B] border-t border-[#D8C08A]/20 px-4 py-4 space-y-3">
            <div className="flex flex-col space-y-2 text-sm font-bold text-[#FFFBED]">
              <a 
                href="#product" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-[#2E1D17]"
              >
                The Bar (₹70)
              </a>
              <a 
                href="#packs" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-[#2E1D17]"
              >
                Pack Boxes (1, 5, 10, 30, 40)
              </a>
              <a 
                href="#showcase" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-[#2E1D17]"
              >
                Brand Visuals
              </a>
              <a 
                href="#ingredients" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-[#2E1D17]"
              >
                10 Superfoods
              </a>
              <a 
                href="#why-jainik" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-[#2E1D17]"
              >
                Why Jainik
              </a>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNutrition();
                }}
                className="py-2 px-3 text-left rounded-lg hover:bg-[#2E1D17] text-[#C9A46C] flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#5C7548]" />
                <span>Nutrition Facts & Lab Specs</span>
              </button>
            </div>
            <div className="pt-2 border-t border-[#D8C08A]/20">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsAppDirectChat('Hi Jainik Team, I would like to order Jainik Energy Bars (₹70/bar)!');
                }}
                className="w-full py-2.5 rounded-xl bg-[#25D366] text-[#1A0F0B] text-xs font-black flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-[#1A0F0B]" />
                <span>Chat on WhatsApp ({DISPLAY_PHONE_NUMBER})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
