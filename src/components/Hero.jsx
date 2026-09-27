import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle2, ShieldCheck, Flame, ArrowRight, Eye, Check } from 'lucide-react';
import { openWhatsAppDirectChat } from '../utils/whatsapp';

export default function Hero({ product, onAddToCart, onOpenNutrition, onOpenImage }) {
  const [selectedQty, setSelectedQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickBuy = () => {
    onAddToCart(selectedQty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  return (
    <section id="product" className="relative min-h-[92vh] pt-32 sm:pt-36 pb-20 flex items-center justify-center bg-warm-100 text-warm-900 overflow-hidden">
      
      {/* Subtle organic warmth glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-warm-200/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-warm-300/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
        {/* Left Column: Product Narrative & Ordering Controls */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          {/* Subtle Artisanal Badges */}
          <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <span className="badge-sattvic">
              <CheckCircle2 className="w-3.5 h-3.5 text-sage-500" />
              100% Pure Natural
            </span>
            <span className="badge-toasted">
              Built On Purity
            </span>
            <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-white border border-warm-300 text-warm-800 text-xs font-bold shadow-warm-sm">
              40g Net Weight • ₹80 / Bar
            </span>
          </div>

          {/* Editorial Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-warm-900 leading-[1.08]">
              Jainik <span className="text-warm-600">Energy Bar</span>
            </h1>
            <p className="text-lg sm:text-xl font-bold text-warm-700 font-sans tracking-wide">
              {product.motto}
            </p>
          </div>

          {/* Product Description */}
          <p className="text-warm-700 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
            The authentic power of Indian culinary heritage. Handcrafted with <strong>California Almonds, Whole Cashews, Pistachios, Pumpkin & Watermelon Seeds, Oats, Roasted Chana, Dates, Pure Jaggery & Dark Chocolate</strong>. Zero chemical preservatives, zero added white sugar.
          </p>

          {/* Macro Highlights Grid */}
          <div className="grid grid-cols-3 gap-3.5 max-w-lg mx-auto lg:mx-0">
            <div className="card-artisanal p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-warm-800">Whole</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-warm-500 mt-0.5">Grains & Fibre</div>
            </div>
            <div className="card-artisanal p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-warm-800">Rich</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-warm-500 mt-0.5">In Whole Nuts</div>
            </div>
            <div className="card-artisanal p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-warm-800">Zero</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-warm-500 mt-0.5">Chemicals</div>
            </div>
          </div>

          {/* Clean Pack Selector Box */}
          <div className="card-artisanal p-5 space-y-4 max-w-xl mx-auto lg:mx-0 bg-white">
            <div className="flex items-center justify-between text-xs font-bold text-warm-700">
              <span className="uppercase tracking-wider font-black text-warm-800">Select Pack Size</span>
              <span className="text-warm-500">Base Unit: ₹80 / Bar</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <a href="#packs" className="p-2.5 rounded-xl bg-warm-50 hover:bg-warm-100 border border-warm-200 transition-all font-bold">
                <span className="block text-warm-900 font-extrabold">3-Pack</span>
                <span className="text-[11px] text-warm-600">₹240</span>
              </a>
              <a href="#packs" className="p-2.5 rounded-xl bg-warm-50 hover:bg-warm-100 border border-warm-200 transition-all font-bold">
                <span className="block text-warm-900 font-extrabold">6-Pack</span>
                <span className="text-[11px] text-warm-700">₹460</span>
              </a>
              <a href="#packs" className="p-2.5 rounded-xl bg-warm-150 border-2 border-warm-600 relative font-bold shadow-warm-sm">
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-warm-800 text-white text-[8px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider">
                  POPULAR
                </span>
                <span className="block text-warm-900 font-black">12-Pack</span>
                <span className="text-[11px] text-warm-700 font-extrabold">₹890</span>
              </a>
              <a href="#packs" className="p-2.5 rounded-xl bg-warm-50 hover:bg-warm-100 border border-warm-200 transition-all font-bold">
                <span className="block text-warm-900 font-extrabold">24-Pack</span>
                <span className="text-[11px] text-warm-700">₹1,720</span>
              </a>
            </div>

            {/* Quantity Selector & WhatsApp Button */}
            <div className="pt-2 border-t border-warm-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-warm-700 font-bold">Qty (Bars):</span>
                <div className="flex items-center bg-warm-50 border border-warm-300 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                    className="px-3 py-1.5 text-warm-700 hover:text-warm-900 hover:bg-warm-200 font-black text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 font-black text-sm text-warm-900">{selectedQty}</span>
                  <button 
                    onClick={() => setSelectedQty(selectedQty + 1)}
                    className="px-3 py-1.5 text-warm-700 hover:text-warm-900 hover:bg-warm-200 font-black text-sm"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm font-black text-warm-900 pl-1">
                  ₹{selectedQty * 80}
                </span>
              </div>

              <button
                onClick={handleQuickBuy}
                className="w-full sm:w-auto btn-warm-primary text-xs sm:text-sm py-3 px-6"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Order!</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Order {selectedQty} Bar{selectedQty > 1 ? 's' : ''} on WhatsApp</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Proof & Guarantees */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-warm-600 pt-2">
            <span className="flex items-center gap-1.5 text-sage-700">
              <CheckCircle2 className="w-4 h-4 text-sage-500" /> FSSAI Certified: 21526066000742
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-warm-700">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4.95 Rating (2,850+ Orders)
            </span>
            <span>•</span>
            <button 
              onClick={onOpenNutrition}
              className="text-warm-800 hover:text-warm-600 underline font-extrabold"
            >
              View Nutrition Label
            </button>
          </div>

        </div>

        {/* Right Column: Clean Artisanal Product Pedestal */}
        <div className="lg:col-span-5 relative flex justify-center">
          
          <div className="w-full max-w-sm sm:max-w-md relative">
            
            {/* Subtle Pedestal Shadow */}
            <div className="absolute -inset-2 bg-warm-300/40 rounded-[2.2rem] blur-xl pointer-events-none" />

            <div className="card-artisanal p-6 sm:p-7 relative overflow-hidden bg-white shadow-warm-lg">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-wider text-warm-800 bg-warm-100 px-3 py-1 rounded-full border border-warm-300">
                  AUTHENTIC PACKAGING • 40G
                </span>
                <button
                  onClick={() => onOpenImage('/jainik-wrapper-mockup.png', 'Jainik Energy Bar Wrapper', 'Built on Purity • 40g Net Weight')}
                  className="p-1.5 rounded-lg bg-warm-50 text-warm-600 hover:text-warm-900 border border-warm-200 text-xs flex items-center gap-1"
                  title="View full packaging"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">Zoom</span>
                </button>
              </div>

              {/* Product Packaging Image with Clean Organic Float */}
              <div 
                onClick={() => onOpenImage('/jainik-wrapper-mockup.png', 'Jainik Energy Bar Wrapper', 'Built on Purity • 40g Net Weight')}
                className="relative rounded-2xl overflow-hidden bg-warm-50 border border-warm-200 p-4 flex items-center justify-center cursor-pointer group/img"
              >
                <img 
                  src="/jainik-wrapper-mockup.png" 
                  alt="Jainik Energy Bar Official Wrapper - Built on Purity" 
                  className="w-full h-auto max-h-[380px] object-contain rounded-xl group-hover/img:scale-105 transition-transform duration-500 animate-organic-float"
                />
              </div>

              {/* Direct Order Button Below Packaging */}
              <div className="mt-5 space-y-2 relative z-10">
                <button 
                  onClick={() => onAddToCart(1)}
                  className="w-full py-3.5 rounded-xl btn-whatsapp-pill text-sm flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Order 1 Bar on WhatsApp — ₹80</span>
                </button>
                <p className="text-center text-[11px] font-bold text-warm-500">
                  Direct dispatch from our certified kitchen in Maharashtra
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
