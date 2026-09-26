import React, { useEffect, useState } from 'react';
import { MessageSquare, ArrowUp, ChevronRight, Package, ShieldCheck, Flame } from 'lucide-react';
import { openWhatsAppDirectChat } from '../utils/whatsapp';

export default function QuickActionDock({ onOpenCart, onOpenNutrition }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDockRaised, setIsDockRaised] = useState(false);

  useEffect(() => {
    // 1. Reveal dock after scrolling 200px
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    // 2. Prevent overlapping with footer
    const footer = document.querySelector('footer');
    let observer = null;

    if (footer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsDockRaised(entry.isIntersecting);
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(footer);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Quick Actions Dock"
      className={`fixed right-5 z-40 transition-all duration-300 ease-out flex flex-col gap-2.5 items-end ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      } ${isDockRaised ? 'bottom-28' : 'bottom-6'}`}
    >
      {/* Primary Action: Order via WhatsApp */}
      <button
        onClick={() => onOpenCart()}
        className="glass-gold group px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-black text-white hover:text-amber-300 border-amber-500/40 hover:border-amber-400 shadow-2xl transition-all hover:scale-105 active:scale-95"
        data-cursor-interactive="true"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/80 animate-ping" />
        <span>Order on WhatsApp (₹80)</span>
        <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Dock Tools Bar */}
      <div className="glass-card p-1.5 rounded-2xl flex items-center gap-1.5 border-white/10 shadow-2xl backdrop-blur-xl">
        <a
          href="#packs"
          title="Box Packs (3/6/12/24)"
          className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
          data-cursor-interactive="true"
        >
          <Package className="w-4 h-4" />
        </a>

        <button
          onClick={onOpenNutrition}
          title="FSSAI Nutrition Label"
          className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-emerald-400 transition-colors"
          data-cursor-interactive="true"
        >
          <ShieldCheck className="w-4 h-4" />
        </button>

        <button
          onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to order Jainik Energy Bars!')}
          title="Direct WhatsApp Chat"
          className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-whatsapp-500 transition-colors"
          data-cursor-interactive="true"
        >
          <MessageSquare className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-slate-700/80 mx-1" />

        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          aria-label="Back to Top"
          data-cursor-interactive="true"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
