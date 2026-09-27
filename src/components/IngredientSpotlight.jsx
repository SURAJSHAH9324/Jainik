import React from 'react';
import { INGREDIENTS } from '../data/products';
import { Leaf, Sparkles, Zap, Heart, ShieldCheck, Dumbbell } from 'lucide-react';

export default function IngredientSpotlight() {
  return (
    <section id="ingredients" className="py-20 bg-[#FAF6F0] text-warm-900 relative border-b border-warm-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-warm-300 text-warm-800 text-xs font-bold shadow-xs">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Real Whole Foods</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-warm-900 tracking-tight">
            10 Authentic <span className="text-warm-600">Superfoods</span>
          </h2>
          <p className="text-warm-700 text-xs sm:text-sm">
            Zero chemical preservatives • Zero artificial colors • Zero added white sugar.
          </p>
        </div>

        {/* 10 Ingredients Grid - Clean, Modern, Scannable */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-12">
          {INGREDIENTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-warm-200 p-4 hover:border-warm-400 hover:shadow-warm-sm transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-black text-warm-500 bg-warm-100 px-2 py-0.5 rounded-md inline-block mb-2">
                  #{idx + 1}
                </span>

                <h3 className="text-sm sm:text-base font-black text-warm-900 leading-snug">
                  {item.name}
                </h3>
                <span className="text-xs font-semibold text-warm-500 block">
                  {item.english}
                </span>
              </div>

              <div className="mt-3 pt-2.5 border-t border-warm-100">
                <span className="text-[11px] font-extrabold text-warm-700 block">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Clean Value Pills (No dense walls of text) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-warm-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-warm-500 block">Plant Protein</span>
              <span className="text-sm font-black text-warm-900">18.62g / 100g</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-warm-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-warm-500 block">Dietary Fibre</span>
              <span className="text-sm font-black text-warm-900">10g / 100g</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-warm-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-warm-500 block">Trans Fat & Cholesterol</span>
              <span className="text-sm font-black text-warm-900">0% Trans Fat</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-warm-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-warm-500 block">FSSAI Certified</span>
              <span className="text-sm font-black text-warm-900">21526066000742</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
