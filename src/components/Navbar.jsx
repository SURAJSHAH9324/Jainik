import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, MessageSquare, Phone } from 'lucide-react';
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
        ? 'bg-slate-950/95 backdrop-blur-md border-b border-amber-900/30 shadow-lg' 
        : 'bg-slate-950/90 backdrop-blur-sm border-b border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        
        {/* Official Jainik Gold Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="h-11 sm:h-12 flex items-center">
            <img 
              src="/jainik-logo.jpg" 
              alt="Jainik - Built on Purity" 
              className="h-10 sm:h-11 object-contain rounded-lg group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="hidden sm:block border-l border-slate-700 pl-3">
            <span className="text-amber-400 text-[10px] tracking-widest font-black uppercase block">
              Built on Purity
            </span>
            <span className="text-slate-300 text-xs font-bold block">
              100% Natural • ₹80 / Bar
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-300">
          <a href="#product" className="hover:text-amber-400 transition-colors">The Bar</a>
          <a href="#poster" className="hover:text-amber-400 transition-colors">Our Poster</a>
          <a href="#ingredients" className="hover:text-amber-400 transition-colors">10 Pure Ingredients</a>
          <a href="#benefits" className="hover:text-amber-400 transition-colors">10 Benefits</a>
          <a href="#packs" className="hover:text-amber-400 transition-colors">Packs (3/6/12/24)</a>
          <button 
            onClick={onOpenNutrition}
            className="hover:text-amber-400 transition-colors font-bold text-left"
          >
            Label & FSSAI
          </button>
        </nav>

        {/* Right WhatsApp & Cart Buttons */}
        <div className="flex items-center gap-3">
          
          {/* WhatsApp Direct Inquiry Button */}
          <button 
            onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I want to order Jainik Energy Bars!')}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 px-3.5 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 transition-all shadow-sm"
            title="Chat on WhatsApp 9325578244"
          >
            <MessageSquare className="w-4 h-4 text-whatsapp-500 fill-whatsapp-500" />
            <span>9325578244</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button 
            onClick={onOpenCart} 
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-amber-400 hover:border-amber-400/40 shadow-sm transition-all group"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Order Button */}
          <button 
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-gradient-to-r from-whatsapp-600 to-whatsapp-500 hover:from-whatsapp-500 hover:to-whatsapp-600 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-whatsapp-600/30 transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Order (₹80)</span>
          </button>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-6 py-5 space-y-3 shadow-2xl text-slate-200">
          <a 
            href="#product" 
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold py-1.5 hover:text-amber-400"
          >
            The Bar
          </a>
          <a 
            href="#poster" 
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold py-1.5 hover:text-amber-400"
          >
            Our Poster & Ghee Tradition
          </a>
          <a 
            href="#ingredients" 
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold py-1.5 hover:text-amber-400"
          >
            10 Natural Ingredients
          </a>
          <a 
            href="#benefits" 
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold py-1.5 hover:text-amber-400"
          >
            10 Amazing Benefits
          </a>
          <a 
            href="#packs" 
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold py-1.5 hover:text-amber-400"
          >
            Packs: 3, 6, 12, 24 Bars
          </a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenNutrition(); }}
            className="block font-bold py-1.5 hover:text-amber-400 text-left"
          >
            Nutrition Label & FSSAI
          </button>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button 
              onClick={() => { setMobileMenuOpen(false); openWhatsAppDirectChat(); }} 
              className="w-full flex items-center justify-center gap-2 bg-emerald-950 text-emerald-300 border border-emerald-700 py-2.5 rounded-xl font-bold text-xs"
            >
              <MessageSquare className="w-4 h-4 text-whatsapp-500 fill-whatsapp-500" /> WhatsApp Direct (9325578244)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
