import React from 'react';
import { INGREDIENTS, JAINIK_PRODUCT } from '../data/products';
import { Sparkles, CheckCircle2, Heart, Zap, Shield, Activity } from 'lucide-react';

export default function IngredientSpotlight() {
  return (
    <section id="ingredients" className="py-24 bg-slate-900 text-slate-100 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-black">
            <Sparkles className="w-4 h-4 text-amber-400" /> सर्व नैसर्गिक, पारंपरिक आणि पौष्टिक घटक
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            10 Pure Traditional <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Superfood Ingredients</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            No preservatives. No artificial colours. No added white sugar. Only wholesome dry fruits, seeds, roasted chana, dates, and pure jaggery.
          </p>
        </div>

        {/* 10 Ingredients Grid directly from Jainik Poster */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          {INGREDIENTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all text-center flex flex-col justify-between group hover:-translate-y-1 shadow-md"
            >
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black text-lg mx-auto group-hover:scale-110 transition-transform">
                  {idx + 1}
                </div>
                <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs font-bold text-slate-400">
                  {item.english}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-amber-300/90 font-medium">
                {item.benefit}
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: 10 Amazing Benefits with User's Official English Poster */}
        <div id="benefits" className="pt-10 border-t border-slate-800">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-500/40">
              Natural Energy for a Better You!
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              10 Amazing <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Health Benefits</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              A perfect blend of natural ingredients to boost your energy, strength & wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: User's Official 10 Benefits Poster */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 group bg-slate-950">
                <img 
                  src="/jainik-10-benefits.png" 
                  alt="Jainik 10 Amazing Benefits Official Poster" 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right: The 10 Benefits Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {JAINIK_PRODUCT.tenBenefits.map((b) => (
                <div key={b.num} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 hover:border-emerald-500/40 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-xs flex-shrink-0">
                    {b.num}
                  </div>
                  <div>
                    <h4 className="font-black text-white text-sm">{b.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{b.desc}</p>
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
