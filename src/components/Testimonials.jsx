import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, CheckCircle, Quote, Sparkles } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-warm-50 text-warm-900 relative border-t border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="badge-toasted">
            <Sparkles className="w-3.5 h-3.5 text-warm-600" />
            <span>Customer & Practitioner Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-warm-900 tracking-tight">
            Loved By <span className="text-warm-600">Daily Health Seekers</span>
          </h2>
          <p className="text-warm-700 text-base sm:text-lg">
            Over 2,850+ athletes, marathoners, fitness coaches, and wellness families rely on Jainik for clean daily fuel.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div 
              key={idx}
              className="card-artisanal p-7 flex flex-col justify-between relative bg-white"
            >
              <Quote className="absolute top-6 right-6 w-7 h-7 text-warm-200" />

              <div className="space-y-3.5">
                {/* Rating Stars */}
                <div className="flex text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="text-warm-700 text-sm leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-warm-100 flex items-center gap-3.5">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-11 h-11 rounded-full object-cover border-2 border-warm-300"
                />
                <div>
                  <h4 className="font-bold text-warm-900 text-sm flex items-center gap-1.5">
                    {item.name}
                    <CheckCircle className="w-3.5 h-3.5 text-sage-500" />
                  </h4>
                  <p className="text-xs text-warm-500">{item.role}</p>
                  <span className="text-[10px] text-warm-600 font-bold block mt-0.5">
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
