import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, CheckCircle, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-700 bg-brand-50 px-3.5 py-1 rounded-full border border-brand-200">
            Athlete & Practitioner Approved
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Trusted By High Performers
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Over 4,000+ athletes, marathoners, doctors, and busy professionals rely on Jainik for clean daily energy.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div 
              key={idx}
              className="glass-panel-light rounded-3xl p-8 border border-slate-200 flex flex-col justify-between relative group hover:border-brand-300 transition-all duration-300 bg-white shadow-sm"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-200 transition-colors" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-4">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-500"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    {item.name}
                    <CheckCircle className="w-3.5 h-3.5 text-brand-600" />
                  </h4>
                  <p className="text-xs text-slate-500">{item.role}</p>
                  <span className="text-[10px] text-brand-700 font-semibold block mt-0.5">
                    Favorite: {item.flavor}
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
