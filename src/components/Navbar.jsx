import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';
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
    <>
      {/* Top Value Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 py-1.5 px-4 text-center text-xs font-black tracking-wide flex items-center justify-center gap-2 shadow-sm z-50 relative">
        <Sparkles className="w-3.5 h-3.5 fill-slate-950 animate-spin" style={{ animationDuration: '6s' }} />
        <span>DIRECT MANUFACTURER PRICING: ₹80 / BAR • 10% VIP REPEAT DISCOUNT • FREE COURIER DISPATCH</span>
        <span className="hidden md:inline">• WhatsApp: 9325578244</span>
      </div>

      <header className={`fixed top-7 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl py-2' 
          : 'bg-slate-950/70 backdrop-blur-md border-b border-white/5 py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Official Jainik Gold Logo with Luxury Glow */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 opacity-20 blur group-hover:opacity-40 transition-opacity" />
              <img 
                src="/jainik-logo.jpg" 
                alt="Jainik - Built on Purity" 
                className="h-10 sm:h-12 object-contain rounded-xl relative shadow-lg group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="hidden lg:block border-l border-slate-800 pl-3">
              <span className="text-amber-400 text-[10px] tracking-widest font-black uppercase block">
                BUILT ON PURITY
              </span>
              <span className="text-slate-400 text-xs font-semibold block -mt-0.5">
                Whole Grains & Rich in Nuts
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-extrabold text-slate-300">
            <a href="#product" className="hover:text-amber-400 transition-colors">The Bar</a>
            <a href="#tradition" className="hover:text-amber-400 transition-colors">Heritage</a>
            <a href="#ingredients" className="hover:text-amber-400 transition-colors">10 Pure Ingredients</a>
            <a href="#benefits" className="hover:text-amber-400 transition-colors">10 Benefits</a>
            <a href="#packs" className="hover:text-amber-400 transition-colors">Packs (3 / 6 / 12 / 24)</a>
            <button 
              onClick={onOpenNutrition}
              className="hover:text-amber-400 transition-colors font-extrabold flex items-center gap-1 text-left"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>FSSAI Label</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* WhatsApp Quick Link */}
            <button 
              onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to order Jainik Energy Bars (₹80/bar)!')}
              className="hidden sm:flex items-center gap-2 text-xs font-black text-emerald-300 hover:text-white px-3.5 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 transition-all shadow-lg"
              title="Chat on WhatsApp 9325578244"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>9325578244</span>
            </button>

            {/* Cart Trigger */}
            <button 
              onClick={onOpenCart} 
              className="relative p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-amber-400 hover:border-amber-500/40 shadow-lg transition-all group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Selling CTA Button */}
            <button 
              onClick={onOpenCart}
              className="btn-gold-shimmer text-slate-950 font-black text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <span>Order Now</span>
              <span className="opacity-75 text-xs font-bold">(₹80)</span>
            </button>

            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-amber-500/20 px-6 py-6 space-y-4 shadow-2xl text-slate-200">
            <a 
              href="#product" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold py-1 hover:text-amber-400 text-base"
            >
              The Bar (₹80)
            </a>
            <a 
              href="#tradition" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold py-1 hover:text-amber-400 text-base"
            >
              Ancestral Power & Tradition
            </a>
            <a 
              href="#ingredients" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold py-1 hover:text-amber-400 text-base"
            >
              10 Pure Ingredients
            </a>
            <a 
              href="#benefits" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold py-1 hover:text-amber-400 text-base"
            >
              10 Amazing Benefits
            </a>
            <a 
              href="#packs" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold py-1 hover:text-amber-400 text-base"
            >
              Packs: 3, 6, 12, 24 Bars
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenNutrition(); }}
              className="block font-bold py-1 hover:text-amber-400 text-left text-base"
            >
              FSSAI Nutritional Profile
            </button>
            <div className="pt-3 border-t border-slate-800">
              <button 
                onClick={() => { setMobileMenuOpen(false); openWhatsAppDirectChat(); }} 
                className="w-full flex items-center justify-center gap-2 bg-emerald-950 text-emerald-300 border border-emerald-700 py-3 rounded-xl font-bold text-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 fill-emerald-400" /> WhatsApp Direct: 9325578244
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
