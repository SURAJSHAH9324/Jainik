import React from 'react';
import { X, ShieldCheck, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

export default function NutritionModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-100 my-8">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400">
            Official Product Information Label
          </span>
          <h3 className="text-2xl font-black text-white">Jainik Energy Bar — Built on Purity</h3>
          <p className="text-xs text-slate-400 mt-0.5">FSSAI Lic. No. 21526066000742 • 100% Vegetarian</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          
          {/* Left: Actual Photo of the Official Printed Label */}
          <div className="rounded-2xl overflow-hidden border border-slate-700 bg-black/40 shadow-md">
            <img 
              src="/jainik-nutrition-label.jpg" 
              alt="Official Jainik Energy Bar Product Information Label" 
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Right: Structured Clean Data */}
          <div className="space-y-4 text-xs">
            
            {/* Nutritional Info Table */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-black text-white text-sm border-b border-slate-800 pb-1.5">
                Nutritional Information (Approx. per 100g)
              </h4>
              <div className="space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span>Energy (kcal)</span>
                  <span className="font-black text-amber-400">478.26 kcal</span>
                </div>
                <div className="flex justify-between">
                  <span>Protein (g)</span>
                  <span className="font-black text-emerald-400">18.62 g</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbohydrate (g)</span>
                  <span className="font-bold">54.19 g</span>
                </div>
                <div className="flex justify-between text-slate-400 pl-2">
                  <span>Total Sugar (Natural Dates & Jaggery)</span>
                  <span>32.00 g</span>
                </div>
                <div className="flex justify-between">
                  <span>Dietary Fibre (g)</span>
                  <span className="font-black text-blue-400">10.00 g</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Fat (g)</span>
                  <span className="font-bold">20.78 g</span>
                </div>
              </div>
            </div>

            {/* Ingredients & Allergens */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-black text-white">INGREDIENTS</h4>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Dates, Seeds (Pumpkin & Watermelon), Oats, Almonds, Cashews, Pistachios, Whole grains, Roasted chana, Jaggery, Cocoa butter, Natural cocoa flavors.
              </p>
              <p className="text-slate-500 text-[10px] pt-1 border-t border-slate-800/80">
                Contains: Nuts, Oats, Chocolate. 100% vegetarian, pure & safe.
              </p>
            </div>

            {/* Manufacturer Details */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-black text-amber-400">MANUFACTURED BY</h4>
              <p className="text-white font-bold">JAINIK FOODS</p>
              <div className="space-y-1 text-slate-400 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  <span>Chunapura, Karanja (Lad), Dist. Washim</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  <span>Contact: +91 9325578244 / 9922322906</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  <span>Email: jainikfoods@gmail.com</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Tag */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> Certified FSSAI Lic. 21526066000742
          </span>
          <span className="text-amber-400">Motto: Jainik-Built on Purity</span>
        </div>

      </div>
    </div>
  );
}
