import React, { useState } from 'react';
import { INGREDIENTS, JAINIK_PRODUCT } from '../data/products';
import { 
  Zap, 
  Dumbbell, 
  Heart, 
  Brain, 
  Activity, 
  ShieldCheck, 
  Bone, 
  Scale, 
  Sparkles, 
  Users, 
  Leaf, 
  ChevronRight 
} from 'lucide-react';

const benefitIcons = [
  Zap,          // 1. Natural Energy Boost
  Dumbbell,     // 2. Supports Muscle Strength
  Heart,        // 3. Improves Heart Health
  Brain,        // 4. Enhances Brain Function
  Activity,     // 5. Aids Digestion
  Bone,         // 6. Strengthens Bones
  ShieldCheck,  // 7. Boosts Immunity
  Scale,        // 8. Helps in Weight Management
  Sparkles,     // 9. Rich in Vitamins & Minerals
  Users         // 10. Perfect for All Ages
];

export default function IngredientSpotlight() {
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
        
        {/* Section 1 Header: 10 Pure Ingredients */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-black shadow-lg">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>सर्व नैसर्गिक, पारंपरिक आणि पौष्टिक घटक</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            10 Authentic <span className="text-gold-gradient">Superfood Ingredients</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Zero chemical preservatives. Zero synthetic food colorings. Zero added white sugar. Only wholesome whole foods.
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-28">
          {filteredIngredients.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-5 rounded-3xl border border-white/5 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 shadow-xl hover:shadow-amber-500/10"
            >
              <div className="space-y-2.5">
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

        {/* Section 2: 10 Amazing Benefits (PURE NATIVE UI - NO POSTER) */}
        <div id="benefits" className="pt-8 border-t border-slate-800/80">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-500/40 inline-block shadow-md">
              Natural Energy for a Better You!
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              10 Amazing <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">Health Benefits</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              A scientifically balanced combination of ancient superfoods formulated to enhance endurance, strength, and vitality.
            </p>
          </div>

          {/* Clean 10-Grid of Modern Interactive Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {JAINIK_PRODUCT.tenBenefits.map((b, idx) => {
              const Icon = benefitIcons[idx] || Sparkles;
              return (
                <div 
                  key={b.num} 
                  className="glass-card p-5 rounded-3xl border border-white/5 hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-sm group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black text-slate-500">0{b.num}</span>
                    </div>

                    <h4 className="font-black text-white text-base group-hover:text-emerald-300 transition-colors leading-snug">
                      {b.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-bold text-emerald-400/90">
                    <span>100% Proven</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
