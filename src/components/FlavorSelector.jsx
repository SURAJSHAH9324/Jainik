import React, { useState } from 'react';
import { Star, Plus, Minus, Check, Info, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function FlavorSelector({ product, onAddToCart, onOpenNutrition }) {
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  const handleAdd = () => {
    onAddToCart(quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <section id="details" className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black">
            <Sparkles className="w-4 h-4 text-jain-orange" /> Handcrafted Sattvic Recipe • ₹80 / Bar
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Inside The <span className="text-gradient-jain">Jainik Chocolate Chunk Nut</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            A delicious blend of traditional Indian millets, roasted whole nuts, and real dark chocolate chunks. Pure clean energy with zero compromise.
          </p>
        </div>

        {/* Deep-Dive Grid */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-lg">
          
          {/* Left: Real Broken Bar Texture Photo */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
              <img 
                src="/jainik-bar-hero.jpg" 
                alt="Jainik Multigrain Bar Broken Texture" 
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-slate-950/80 text-white text-xs font-black px-3 py-1.5 rounded-full backdrop-blur-sm">
                Authentic Chewy & Crunchy Texture
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-sm text-xs text-slate-700">
                <span className="font-black text-slate-900 block mb-1">Look closely at the cross-section:</span>
                Rolled super millets, whole crunchy California almonds, creamy cashew pieces, and melted dark chocolate chunks.
              </div>
            </div>
          </div>

          {/* Right: The 3 Core Wrapper Claims & Buy Controls */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Wrapper Core Badges */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-jain-orange flex items-center justify-center font-black text-sm flex-shrink-0">
                  🌾
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-base">Rich in Dietary Fibre (8g)</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Naturally sourced from super millets (Ragi, Foxtail) and whole Medjool dates to promote smooth digestion and steady energy.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-jain-blue flex items-center justify-center font-black text-sm flex-shrink-0">
                  💪
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-base">High Plant Protein (16g)</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Fermented pea isolate, golden flax seeds, and dry-roasted nuts provide all essential amino acids for lean muscle recovery.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm flex-shrink-0">
                  🩺
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-base">Zero Cholesterol & 0g Added Sugar</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    No palm oil, no trans fat, and no corn syrup. Sweetened exclusively with natural dry dates for heart-healthy stamina.
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity Selector & WhatsApp Button */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Single Bar Unit Price</span>
                  <span className="text-3xl font-black text-slate-900">₹{(product.price * quantity).toFixed(0)}</span>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center border border-slate-300 bg-slate-50 rounded-xl">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-black text-slate-900 text-sm">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Order via WhatsApp */}
              <button 
                onClick={handleAdd}
                className="w-full py-4 px-6 rounded-xl font-black text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-whatsapp-600 to-whatsapp-500 hover:from-whatsapp-500 hover:to-whatsapp-600 text-white shadow-lg shadow-whatsapp-500/25 transition-all"
              >
                {addedToast ? (
                  <>
                    <Check className="w-5 h-5 text-white" /> Added to WhatsApp Order!
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 fill-white" /> Order {quantity} Bar{quantity > 1 ? 's' : ''} on WhatsApp — ₹{(product.price * quantity).toFixed(0)}
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500 font-bold pt-1">
                <span>Free Express Shipping across India</span>
                <button onClick={onOpenNutrition} className="text-jain-blue underline">
                  Nutrition Facts Label
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
