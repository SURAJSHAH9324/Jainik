import React, { useState } from 'react';
import { Star, Plus, Minus, Check, Sparkles, MessageSquare, ShieldCheck, Flame, Heart, CheckCircle2 } from 'lucide-react';

export default function FlavorSelector({ product, onAddToCart, onOpenNutrition, onOpenImage }) {
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  const handleAdd = () => {
    onAddToCart(quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const textureFeatures = [
    { title: 'Chewy Sun-Dried Dates & Natural Jaggery', desc: '100% whole fruit sweetness and unrefined sugarcane minerals. Clean, slow-burning energy.' },
    { title: 'Crunchy California Almonds & Cashews', desc: 'Whole dry-roasted nuts providing wholesome texture, plant protein, magnesium, and healthy fats.' },
    { title: 'Velvety 72% Dark Chocolate Chunks', desc: 'Real antioxidant-rich dark chocolate chunks for a rich, satisfying finish without excess sugar.' },
    { title: 'Crisp Roasted Chana & Super Seeds', desc: 'Traditional roasted gram, pumpkin seeds, and watermelon seeds for essential iron and dietary fiber.' }
  ];

  return (
    <section id="craft" className="py-24 bg-warm-50 text-warm-900 relative border-t border-warm-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="badge-toasted">
            <Sparkles className="w-3.5 h-3.5 text-warm-600" />
            <span>Handcrafted In Small Batches • ₹80 / Bar</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-warm-900 tracking-tight">
            Sensory Taste & <span className="text-warm-600">Pure Texture</span>
          </h2>
          <p className="text-warm-700 text-base sm:text-lg">
            Look closely at the genuine cross-section of the <strong>Jainik Energy Bar</strong>. Not a processed paste — real whole nuts, visible seeds, and generous dark chocolate chunks.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Real Broken Bar Texture Photo */}
          <div className="lg:col-span-6">
            <div className="card-artisanal p-4 sm:p-5 overflow-hidden shadow-warm-md bg-white">
              <div 
                onClick={() => onOpenImage('/jainik-bar-hero.jpg', 'Authentic Chewy & Crunchy Texture', 'Whole Almonds, Cashews, Millets, and Dark Chocolate Chunks')}
                className="media-container-zoom rounded-2xl overflow-hidden bg-warm-100 cursor-pointer"
              >
                <img 
                  src="/jainik-bar-hero.jpg" 
                  alt="Jainik Energy Bar Cross Section" 
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                />
                <div className="absolute top-4 left-4 bg-white/90 text-warm-900 border border-warm-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                  Genuine Whole Food Texture
                </div>
              </div>

              <div className="mt-4 px-2 flex items-center justify-between text-xs text-warm-600">
                <span className="font-bold text-warm-800">Net Wt: 40g (₹80)</span>
                <span className="font-bold text-warm-700">18.62g Protein / 100g</span>
              </div>
            </div>
          </div>

          {/* Right: Texture Highlights & Direct Order Unit */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              {textureFeatures.map((t, idx) => (
                <div key={idx} className="card-artisanal p-4 flex items-start gap-3.5 hover:border-warm-400 transition-all bg-white">
                  <div className="w-7 h-7 rounded-xl bg-warm-100 text-warm-700 border border-warm-200 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-warm-900 text-base">{t.title}</h4>
                    <p className="text-xs text-warm-600 mt-0.5 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Order Calculator */}
            <div className="card-artisanal p-6 space-y-4 bg-white border-2 border-warm-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-warm-500 block">Single Bar Unit Pricing</span>
                  <span className="text-3xl font-black text-warm-900">₹{80 * quantity}</span>
                  <span className="text-xs text-warm-500 pl-2">({quantity} × ₹80)</span>
                </div>

                <div className="flex items-center bg-warm-50 border border-warm-300 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-warm-700 hover:text-warm-950 hover:bg-warm-200 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-black text-warm-900 text-base">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-warm-700 hover:text-warm-950 hover:bg-warm-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAdd}
                className="w-full py-3.5 btn-warm-primary text-sm flex items-center justify-center gap-2"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added {quantity} Bar{quantity > 1 ? 's' : ''} to WhatsApp Order!</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Order {quantity} Bar{quantity > 1 ? 's' : ''} on WhatsApp — ₹{80 * quantity}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-warm-500 pt-1">
                <span>Free Express Courier Across India</span>
                <button onClick={onOpenNutrition} className="text-warm-800 hover:text-warm-600 underline font-bold">
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
