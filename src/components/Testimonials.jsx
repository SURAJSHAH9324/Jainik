import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, CheckCircle, Quote, Sparkles } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="reviews" className="py-28 bg-[#090E1A] text-slate-100 relative border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-black shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Customer & Athlete Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Loved By <span className="text-gold-gradient">High Performers</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Over 2,850+ athletes, marathoners, fitness coaches, and wellness seekers rely on Jainik for clean daily fuel.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-3xl p-8 border border-white/5 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1 shadow-2xl"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-amber-500/20 group-hover:text-amber-500/40 transition-colors" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center gap-4">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/50 shadow-md"
                />
                <div>
                  <h4 className="font-black text-white text-sm flex items-center gap-1.5">
                    {item.name}
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </h4>
                  <p className="text-xs text-slate-400">{item.role}</p>
                  <span className="text-[10px] text-amber-400 font-bold block mt-0.5">
                    Verified WhatsApp Buyer
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
