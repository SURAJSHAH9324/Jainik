import React, { useState } from 'react';
import { INGREDIENTS, JAINIK_PRODUCT } from '../data/products';
import { Sparkles, CheckCircle2, ZoomIn, ShieldCheck, Heart, Zap, Award, Flame, Leaf } from 'lucide-react';

export default function IngredientSpotlight({ onOpenImage }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All 10 Ingredients' },
    { id: 'nuts', label: 'Dry Fruits & Nuts' },
    { id: 'seeds', label: 'Super Seeds & Oats' },
    { id: 'energy', label: 'Natural Sweeteners & Cocoa' }
  ];

  const filteredIngredients = INGREDIENTS.filter(item => {
    if (activeCategory === 'nuts') return item.english.includes('Almonds') || item.english.includes('Cashews') || item.english.includes('Pistachios') || item.english.includes('Chana');
    if (activeCategory === 'seeds') return item.english.includes('Seeds') || item.english.includes('Oats');
    if (activeCategory === 'energy') return item.english.includes('Dates') || item.english.includes('Jaggery') || item.english.includes('Chocolate');
    return true;
  });

  return (
    <section id="ingredients" className="py-28 bg-[#070B14] text-slate-100 relative overflow-hidden">
      
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-black shadow-lg">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>सर्व नैसर्गिक, पारंपरिक आणि पौष्टिक घटक</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            10 Authentic <span className="text-gold-gradient">Superfood Ingredients</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Hand-selected, clean, traditional ingredients. Zero preservatives, zero artificial colours, zero chemical additives, and zero added white sugar.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Ingredients Luxury Glass Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-24">
          {filteredIngredients.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-5 rounded-3xl border border-white/5 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 shadow-xl hover:shadow-amber-500/10"
            >
              <div className="space-y-2.5">
                {/* Number Badge with glowing circle */}
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-yellow-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center font-black text-sm group-hover:scale-110 group-hover:border-amber-400 transition-all shadow-md">
                  {idx + 1}
                </div>

                <div>
                  <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 mt-0.5">
                    {item.english}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block mb-1">
                  {item.role}
                </span>
                <p className="text-xs text-slate-300 font-medium leading-snug">
                  {item.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 10 Amazing Benefits Section with Poster */}
        <div id="benefits" className="pt-8 border-t border-slate-800/80">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-500/40 inline-block shadow-md">
              Natural Energy for a Better You!
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              10 Amazing <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">Health Benefits</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              A perfect blend of natural ingredients to boost your daily energy, stamina, muscle strength & holistic wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Luxury Display of the 10 Benefits Poster */}
            <div className="lg:col-span-5 relative">
              
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-[32px] blur-xl opacity-70" />

              <div className="glass-gold rounded-3xl p-3 sm:p-5 relative overflow-hidden shadow-2xl border border-emerald-500/30 group">
                
                {/* Header inside frame */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-3 text-xs">
                  <span className="text-emerald-400 font-black flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> 10 Benefits Infographic
                  </span>
                  <button
                    onClick={() => onOpenImage('/jainik-10-benefits.png', '10 Amazing Health Benefits', 'Natural Energy for a Better You! • 100% Pure')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-400 transition-all font-bold text-[11px]"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Click to Zoom</span>
                  </button>
                </div>

                {/* Poster Image */}
                <div 
                  onClick={() => onOpenImage('/jainik-10-benefits.png', '10 Amazing Health Benefits', 'Natural Energy for a Better You! • 100% Pure')}
                  className="relative rounded-2xl overflow-hidden bg-black/60 cursor-pointer group/infographic"
                >
                  <img 
                    src="/jainik-10-benefits.png" 
                    alt="Jainik 10 Amazing Benefits Official Poster" 
                    className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover/infographic:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/infographic:opacity-100 transition-opacity flex items-end justify-center pb-5">
                    <span className="bg-slate-900/90 text-emerald-300 text-xs font-black px-4 py-2 rounded-full border border-emerald-500/50 shadow-2xl flex items-center gap-2">
                      <ZoomIn className="w-4 h-4" /> Tap to inspect infographic
                    </span>
                  </div>
                </div>

                <div className="mt-3 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-300">Pure Natural Power</span>
                  <span className="text-emerald-400 font-black">All Ages Approved</span>
                </div>

              </div>

            </div>

            {/* Right: The 10 Interactive Benefit Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {JAINIK_PRODUCT.tenBenefits.map((b) => (
                <div 
                  key={b.num} 
                  className="glass-card p-4 rounded-2xl border border-white/5 hover:border-emerald-500/40 transition-all group flex items-start gap-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-xs flex-shrink-0 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all shadow-sm">
                    {b.num}
                  </div>
                  <div>
                    <h4 className="font-black text-white text-sm group-hover:text-emerald-300 transition-colors">
                      {b.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
