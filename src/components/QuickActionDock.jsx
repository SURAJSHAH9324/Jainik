import React, { useEffect, useState } from 'react';
import { MessageSquare, ArrowUp, ChevronRight, Package, ShieldCheck } from 'lucide-react';
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
      className={`fixed right-5 z-40 transition-all duration-300 ease-out flex flex-col gap-2 items-end ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      } ${isDockRaised ? 'bottom-28' : 'bottom-6'}`}
    >
      {/* Primary Action: Order via WhatsApp */}
      <button
        onClick={() => onOpenCart()}
        className="card-artisanal px-4 py-3 flex items-center gap-3 text-xs font-bold text-warm-900 hover:text-warm-700 border-warm-300 shadow-warm-md hover:scale-105 active:scale-95 bg-white"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs animate-ping" />
        <span>Order on WhatsApp (₹80)</span>
        <ChevronRight className="w-4 h-4 text-warm-500" />
      </button>

      {/* Dock Tools Bar */}
      <div className="card-artisanal p-1.5 flex items-center gap-1.5 border-warm-300 shadow-warm-md bg-white">
        <a
          href="#packs"
          title="Box Packs (3/6/12/24)"
          className="p-2 rounded-xl hover:bg-warm-100 text-warm-700 hover:text-warm-950 transition-colors"
        >
          <Package className="w-4 h-4" />
        </a>

        <button
          onClick={onOpenNutrition}
          title="FSSAI Nutrition Label"
          className="p-2 rounded-xl hover:bg-warm-100 text-warm-700 hover:text-sage-700 transition-colors"
        >
          <ShieldCheck className="w-4 h-4" />
        </button>

        <button
          onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to order Jainik Energy Bars!')}
          title="Direct WhatsApp Chat"
          className="p-2 rounded-xl hover:bg-warm-100 text-warm-700 hover:text-whatsapp-600 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-warm-200 mx-1" />

        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          className="p-2 rounded-xl hover:bg-warm-100 text-warm-500 hover:text-warm-900 transition-colors"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
