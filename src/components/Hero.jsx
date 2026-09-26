import React from 'react';
import { Zap, Sparkles, Star, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';
import { openWhatsAppDirectChat } from '../utils/whatsapp';

export default function Hero({ product, onAddToCart, onOpenNutrition }) {
  return (
    <section id="product" className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      
      {/* Golden & Amber luxury lighting effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Product Information */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          {/* Top Pill Badges */}
          <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-black">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              100% Natural • No Chemicals
            </span>
            <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-black">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Built On Purity
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-xs font-black">
              Net Wt: 40g • ₹80 / Bar
            </span>
          </div>

          {/* Product Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              Jainik <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Energy Bar</span>
            </h1>
            <p className="text-lg sm:text-xl font-bold text-amber-400/90 tracking-wide">
              {product.motto}
            </p>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Crafted with traditional wholesome ingredients: <strong>Almonds, Cashews, Pistachios, Pumpkin Seeds, Watermelon Seeds, Oats, Roasted Chana, Dates, Jaggery & Chocolate</strong>. Free from preservatives, artificial colours, and chemicals.
          </p>

          {/* Quick Specifications from Product Wrapper */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0">
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-center">
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Whole Grains</div>
              <div className="text-base font-black text-white mt-0.5">Rich in Fibre</div>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-center">
              <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Dry Fruits</div>
              <div className="text-base font-black text-white mt-0.5">Rich in Nuts</div>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-center">
              <div className="text-xs text-rose-400 font-bold uppercase tracking-wider">Zero Chemicals</div>
              <div className="text-base font-black text-white mt-0.5">100% Pure</div>
            </div>
          </div>

          {/* Pack Options Quick Selector (3, 6, 12, 24 Bars) */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2 max-w-xl mx-auto lg:mx-0">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="text-amber-400 font-black">📦 Choose Pack Size</span>
              <span className="text-slate-400">Single Bar: ₹80</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <a href="#packs" className="p-2 rounded-xl bg-slate-950 hover:bg-amber-950/40 border border-slate-800 hover:border-amber-500/50 transition-all">
                <span className="block font-black text-slate-200">3-Pack</span>
                <span className="text-[11px] text-slate-400">₹240</span>
              </a>
              <a href="#packs" className="p-2 rounded-xl bg-slate-950 hover:bg-amber-950/40 border border-slate-800 hover:border-amber-500/50 transition-all">
                <span className="block font-black text-slate-200">6-Pack</span>
                <span className="text-[11px] text-amber-400 font-bold">₹460</span>
              </a>
              <a href="#packs" className="p-2 rounded-xl bg-amber-950/50 border border-amber-500/60 relative">
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[8px] font-black px-1.5 py-0.2 rounded-full">POPULAR</span>
                <span className="block font-black text-amber-300">12-Pack</span>
                <span className="text-[11px] text-amber-400 font-bold">₹890</span>
              </a>
              <a href="#packs" className="p-2 rounded-xl bg-slate-950 hover:bg-amber-950/40 border border-slate-800 hover:border-amber-500/50 transition-all">
                <span className="block font-black text-slate-200">24-Pack</span>
                <span className="text-[11px] text-amber-400 font-bold">₹1,720</span>
              </a>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            
            {/* WhatsApp Direct Order Button */}
            <button 
              onClick={() => onAddToCart(1)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-whatsapp-600 to-whatsapp-500 hover:from-whatsapp-500 hover:to-whatsapp-600 text-white font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-whatsapp-500/25 hover:scale-[1.02] transition-all"
            >
              <MessageSquare className="w-5 h-5 fill-white" /> Order via WhatsApp (₹80)
            </button>

            {/* Direct WhatsApp chat to 9325578244 */}
            <button 
              onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to order Jainik Energy Bars!')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              💬 WhatsApp: 9325578244
            </button>
          </div>

          {/* FSSAI & Quality Tag */}
          <div className="flex items-center justify-center lg:justify-start gap-3 text-xs font-bold text-slate-400 pt-1">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> FSSAI Lic. 21526066000742
            </span>
            <span>•</span>
            <span>Handmade with Care</span>
            <span>•</span>
            <button onClick={onOpenNutrition} className="text-amber-400 underline font-bold">
              View Nutrition Label
            </button>
          </div>

        </div>

        {/* Right Column: The Real Jainik Product Packaging Wrapper Image */}
        <div className="lg:col-span-5 relative flex justify-center">
          
          <div className="w-full max-w-md bg-slate-900/90 rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-800 relative group overflow-hidden">
            
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Top Ribbon */}
            <div className="flex items-center justify-between mb-4 z-10 relative">
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
                OFFICIAL PACKAGING • 40g
              </span>
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.95 Rating
              </span>
            </div>

            {/* Real User Product Wrapper Photo */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-black/50 p-2 flex items-center justify-center">
              <img 
                src="/jainik-wrapper-mockup.png" 
                alt="Jainik Energy Bar Official Wrapper - Built on Purity" 
                className="w-full h-auto max-h-[420px] object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Direct Order Button Below Image */}
            <div className="mt-5 space-y-2 z-10 relative">
              <button 
                onClick={() => onAddToCart(1)}
                className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
              >
                <MessageSquare className="w-4 h-4" /> Order 1 Bar on WhatsApp — ₹80
              </button>
              <p className="text-center text-[11px] font-bold text-slate-400">
                Whole Grains • Rich in Nuts • 40g Net Weight
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
