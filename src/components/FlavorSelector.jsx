import React, { useState } from 'react';
import { Star, Plus, Minus, Check, Sparkles, MessageSquare, ShieldCheck, Flame, Heart } from 'lucide-react';

export default function FlavorSelector({ product, onAddToCart, onOpenNutrition, onOpenImage }) {
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  const handleAdd = () => {
    onAddToCart(quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const textureFeatures = [
    { title: 'Chewy Sun-Dried Dates & Jaggery', desc: '100% natural fruit and unrefined cane sweetness. No artificial sugar crash.' },
    { title: 'Crunchy California Almonds & Cashews', desc: 'Whole dry-roasted nuts providing wholesome bite, magnesium, and healthy fats.' },
    { title: 'Velvety 72% Dark Chocolate', desc: 'Real melted dark cocoa chunks delivering deep antioxidant-rich richness.' },
    { title: 'Crisp Roasted Chana & Ancient Seeds', desc: 'Adds wholesome texture while packing in essential amino acids and dietary fiber.' }
  ];

  return (
    <section id="texture" className="py-28 bg-[#090E1A] text-slate-100 relative overflow-hidden border-t border-amber-500/10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-black shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Handcrafted In Small Batches • ₹80 / Bar</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Sensory Taste & <span className="text-gold-gradient">Nutrient Density</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Look at the genuine cross-section of the <strong>Jainik Energy Bar</strong>. Not a processed paste — real whole nuts, visible seeds, and generous dark chocolate chunks.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Broken Bar Cross-Section Image */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/10 rounded-[32px] blur-xl opacity-75" />

            <div className="glass-gold rounded-3xl p-4 sm:p-5 relative overflow-hidden shadow-2xl border border-amber-500/30 group">
              <div 
                onClick={() => onOpenImage('/jainik-bar-hero.jpg', 'Authentic Chewy & Crunchy Texture', 'Whole Almonds, Cashews, Millets, and Dark Chocolate Chunks')}
                className="relative rounded-2xl overflow-hidden bg-black/60 cursor-pointer group/img"
              >
                <img 
                  src="/jainik-bar-hero.jpg" 
                  alt="Jainik Energy Bar Cross Section" 
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl group-hover/img:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-slate-950/80 text-amber-300 border border-amber-500/40 text-xs font-black px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg">
                  Real Whole Foods Texture
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <span className="text-white text-xs font-black bg-slate-900/90 px-3.5 py-2 rounded-full border border-amber-500/40 shadow-xl">
                    🔍 Click to inspect ingredients up close
                  </span>
                </div>
              </div>

              <div className="mt-3 px-2 py-2 flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-slate-300">Net Wt: 40g (₹80)</span>
                <span className="text-amber-400 font-bold">18.62g Protein / 100g</span>
              </div>
            </div>
          </div>

          {/* Right: Texture Highlights & Direct Order Unit */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              {textureFeatures.map((t, idx) => (
                <div key={idx} className="glass-card p-4 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-black text-white text-sm sm:text-base">{t.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Order Calculator */}
            <div className="glass-gold p-6 rounded-3xl border border-amber-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">Single Bar Unit Pricing</span>
                  <span className="text-3xl font-black text-gold-gradient">₹{80 * quantity}</span>
                  <span className="text-xs text-slate-400 pl-2">({quantity} × ₹80)</span>
                </div>

                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-inner">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-black text-white text-base">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAdd}
                className="w-full py-4 rounded-2xl btn-gold-shimmer text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                {addedToast ? (
                  <>
                    <Check className="w-5 h-5 text-slate-950" />
                    <span>Added {quantity} Bar{quantity > 1 ? 's' : ''} to WhatsApp Order!</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 fill-slate-950" />
                    <span>Order {quantity} Bar{quantity > 1 ? 's' : ''} on WhatsApp — ₹{80 * quantity}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Free Express Shipping across India</span>
                <button onClick={onOpenNutrition} className="text-amber-400 hover:underline font-bold">
                  View Nutrition Facts
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
