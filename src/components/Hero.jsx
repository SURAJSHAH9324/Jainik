import React, { useState } from 'react';
import { Sparkles, Star, MessageSquare, CheckCircle2, ShieldCheck, Flame, ArrowRight, Eye, Check } from 'lucide-react';
import { openWhatsAppDirectChat } from '../utils/whatsapp';

export default function Hero({ product, onAddToCart, onOpenNutrition, onOpenImage }) {
  const [selectedQty, setSelectedQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickBuy = () => {
    onAddToCart(selectedQty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  return (
    <section id="product" className="relative min-h-[96vh] pt-28 sm:pt-32 pb-24 flex items-center justify-center overflow-hidden bg-[#070B14] text-slate-100">
      
      {/* Background radial luxury lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-600/15 via-yellow-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #FFF 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        
        {/* Left Column: Selling Copy & Purchase Block */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          {/* Trust Badges Bar */}
          <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-black shadow-lg shadow-emerald-950/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
              100% Pure Natural
            </span>
            <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-black shadow-lg shadow-amber-950/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Built On Purity
            </span>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 text-xs font-black">
              40g Net Weight • ₹80 / Bar
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.06]">
              Jainik <span className="text-gold-gradient">Energy Bar</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-amber-400 tracking-wide font-sans">
              {product.motto}
            </p>
          </div>

          {/* Short Benefit-Driven Description */}
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
            The authentic power of Indian heritage in every bite. Handcrafted with <strong>Almonds, Cashews, Pistachios, Pumpkin & Watermelon Seeds, Oats, Roasted Chana, Dates, Pure Jaggery & Chocolate</strong>. Zero chemical preservatives, zero added white sugar.
          </p>

          {/* High-Impact Macro Grid */}
          <div className="grid grid-cols-3 gap-3.5 max-w-lg mx-auto lg:mx-0">
            <div className="glass-card p-4 rounded-2xl text-center group hover:border-amber-500/40 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">Whole</div>
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mt-1">Grains & Fibre</div>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center group hover:border-emerald-500/40 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">Rich</div>
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mt-1">In Real Nuts</div>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center group hover:border-blue-500/40 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-blue-400">Zero</div>
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mt-1">Preservatives</div>
            </div>
          </div>

          {/* Direct Pack Selector Box */}
          <div className="glass-gold p-5 rounded-3xl space-y-3.5 max-w-xl mx-auto lg:mx-0">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                Select Pack Options
              </span>
              <span className="text-slate-400">Base Unit: ₹80 / Bar</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs font-black">
              <a href="#packs" className="p-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 transition-all group">
                <span className="block text-slate-300 group-hover:text-white">3-Pack</span>
                <span className="text-[11px] text-slate-400">₹240</span>
              </a>
              <a href="#packs" className="p-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 transition-all group">
                <span className="block text-slate-300 group-hover:text-white">6-Pack</span>
                <span className="text-[11px] text-amber-400">₹460</span>
              </a>
              <a href="#packs" className="p-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/60 shadow-lg relative group">
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  HOT SELLER
                </span>
                <span className="block text-amber-300 group-hover:text-white">12-Pack</span>
                <span className="text-[11px] text-amber-400">₹890</span>
              </a>
              <a href="#packs" className="p-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 transition-all group">
                <span className="block text-slate-300 group-hover:text-white">24-Pack</span>
                <span className="text-[11px] text-amber-400">₹1,720</span>
              </a>
            </div>

            {/* Quick Single Bar Add-to-Cart Row */}
            <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300 font-bold">Qty (Bars):</span>
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                    className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 font-black text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 font-black text-sm text-white">{selectedQty}</span>
                  <button 
                    onClick={() => setSelectedQty(selectedQty + 1)}
                    className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 font-black text-sm"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm font-black text-amber-400 pl-1">
                  ₹{selectedQty * 80}
                </span>
              </div>

              <button
                onClick={handleQuickBuy}
                className="w-full sm:w-auto btn-gold-shimmer text-slate-950 font-black text-xs sm:text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-transform"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>Added {selectedQty} Bar{selectedQty > 1 ? 's' : ''}!</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 fill-slate-950" />
                    <span>Order {selectedQty} Bar{selectedQty > 1 ? 's' : ''} on WhatsApp</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Proof & Guarantees */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-slate-400 pt-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> FSSAI Certified: 21526066000742
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.95 Rating (2,850+ Orders)
            </span>
            <span>•</span>
            <button 
              onClick={onOpenNutrition}
              className="text-slate-300 hover:text-amber-400 underline font-extrabold"
            >
              View Nutrition Facts Label
            </button>
          </div>

        </div>

        {/* Right Column: 3D Floating Product Showcase */}
        <div className="lg:col-span-5 relative flex justify-center">
          
          <div className="w-full max-w-sm sm:max-w-md relative">
            
            {/* Glowing Backdrop Ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-[36px] blur-2xl pointer-events-none" />

            <div className="glass-gold rounded-3xl p-5 sm:p-6 relative overflow-hidden group shadow-2xl border border-amber-500/30">
              
              {/* Top Banner inside card */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  AUTHENTIC PACKAGING • 40G
                </span>
                <button
                  onClick={() => onOpenImage('/jainik-wrapper-mockup.png', 'Jainik Energy Bar Wrapper', 'Built on Purity • 40g Net Weight')}
                  className="p-1.5 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700/80 text-xs flex items-center gap-1 hover:border-amber-500 transition-all"
                  title="Click to view full packaging"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">Zoom</span>
                </button>
              </div>

              {/* Product Wrapper Image with 3D Float */}
              <div 
                onClick={() => onOpenImage('/jainik-wrapper-mockup.png', 'Jainik Energy Bar Wrapper', 'Built on Purity • 40g Net Weight')}
                className="relative rounded-2xl overflow-hidden bg-black/40 border border-slate-800 p-3 flex items-center justify-center cursor-pointer group/img"
              >
                <img 
                  src="/jainik-wrapper-mockup.png" 
                  alt="Jainik Energy Bar Official Wrapper - Built on Purity" 
                  className="w-full h-auto max-h-[380px] object-contain rounded-xl group-hover/img:scale-105 transition-transform duration-500 animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <span className="text-white text-xs font-black bg-slate-900/90 px-3 py-1.5 rounded-full border border-amber-500/40 shadow-xl">
                    🔍 Tap to view high-res wrapper
                  </span>
                </div>
              </div>

              {/* Instant WhatsApp Order Block Below Packaging */}
              <div className="mt-4 space-y-2 relative z-10">
                <button 
                  onClick={() => onAddToCart(1)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-whatsapp-600 to-whatsapp-500 hover:from-whatsapp-500 hover:to-whatsapp-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-whatsapp-500/30 hover:scale-[1.02] transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Order 1 Bar on WhatsApp — ₹80</span>
                </button>
                <p className="text-center text-[11px] font-bold text-slate-400">
                  ⚡ Dispatched directly from our certified facility in Maharashtra
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
