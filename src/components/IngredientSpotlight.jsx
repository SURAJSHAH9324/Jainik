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
    <section id="ingredients" className="py-24 bg-warm-50 text-warm-900 relative border-t border-warm-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section 1: 10 Pure Ingredients Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="badge-sattvic">
            <Leaf className="w-3.5 h-3.5 text-sage-500" />
            <span>सर्व नैसर्गिक, पारंपरिक आणि पौष्टिक घटक</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-warm-900 tracking-tight">
            10 Authentic <span className="text-warm-600">Superfood Ingredients</span>
          </h2>
          <p className="text-warm-700 text-base sm:text-lg">
            Zero chemical preservatives. Zero synthetic colorings. Zero added white sugar. Only wholesome whole foods.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-warm-900 text-white shadow-sm scale-105'
                    : 'bg-white border border-warm-300 text-warm-700 hover:text-warm-950 hover:border-warm-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Ingredients Artisanal Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-24">
          {filteredIngredients.map((item, idx) => (
            <div
              key={idx}
              className="card-artisanal p-5 flex flex-col justify-between hover:border-warm-400 transition-all duration-300 bg-white"
            >
              <div className="space-y-2.5">
                <div className="w-8 h-8 rounded-xl bg-warm-100 border border-warm-200 text-warm-800 flex items-center justify-center font-extrabold text-xs shadow-xs">
                  {idx + 1}
                </div>

                <div>
                  <h3 className="text-base font-bold text-warm-900 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs font-semibold text-warm-500 mt-0.5">
                    {item.english}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-warm-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-warm-600 block mb-0.5">
                  {item.role}
                </span>
                <p className="text-xs text-warm-700 leading-snug">
                  {item.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: 10 Amazing Benefits */}
        <div id="benefits" className="pt-12 border-t border-warm-200">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="badge-sattvic">
              Natural Energy for a Better You!
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-warm-900 tracking-tight">
              10 Everyday <span className="text-warm-600">Health Benefits</span>
            </h2>
            <p className="text-warm-700 text-base sm:text-lg">
              A balanced blend of traditional Indian dry fruits, ancient seeds, and unrefined sweeteners.
            </p>
          </div>

          {/* Clean 10-Grid of Modern Benefit Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {JAINIK_PRODUCT.tenBenefits.map((b, idx) => {
              const Icon = benefitIcons[idx] || Sparkles;
              return (
                <div 
                  key={b.num} 
                  className="card-artisanal p-5 flex flex-col justify-between hover:border-warm-400 transition-all duration-300 bg-white"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-warm-100 text-warm-800 border border-warm-200 flex items-center justify-center font-bold text-xs">
                        <Icon className="w-4 h-4 text-warm-700" />
                      </div>
                      <span className="text-xs font-extrabold text-warm-400">0{b.num}</span>
                    </div>

                    <h4 className="font-bold text-warm-900 text-base leading-snug">
                      {b.title}
                    </h4>

                    <p className="text-xs text-warm-600 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-warm-100 flex items-center gap-1 text-[11px] font-bold text-warm-700">
                    <span>Clean Whole Food</span>
                    <ChevronRight className="w-3.5 h-3.5 text-warm-400" />
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
