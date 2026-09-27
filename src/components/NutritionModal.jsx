import React from 'react';
import { X, ShieldCheck, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

export default function NutritionModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-950/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      
      <div className="relative w-full max-w-2xl bg-white border border-warm-300 rounded-3xl p-6 sm:p-8 shadow-warm-xl overflow-hidden text-warm-900 my-8">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-warm-100 text-warm-500 hover:text-warm-900 hover:bg-warm-200 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <span className="text-[11px] font-black uppercase tracking-wider text-warm-600 block mb-0.5">
            Official Product Information Label
          </span>
          <h3 className="text-2xl font-black text-warm-900">Jainik Energy Bar — Built on Purity</h3>
          <p className="text-xs text-warm-600 mt-0.5">FSSAI Lic. No. 21526066000742 • 100% Pure Vegetarian</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          
          {/* Left: Actual Photo of the Official Printed Label */}
          <div className="rounded-2xl overflow-hidden border border-warm-300 bg-warm-50 shadow-sm p-1">
            <img 
              src="/jainik-nutrition-label.jpg" 
              alt="Official Jainik Energy Bar Product Information Label" 
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>

          {/* Right: Clean Nutritional Breakdown */}
          <div className="space-y-4 text-xs">
            
            {/* Nutritional Info Table */}
            <div className="bg-warm-50 p-4 rounded-2xl border border-warm-200 space-y-2">
              <h4 className="font-bold text-warm-900 text-sm border-b border-warm-200 pb-1.5">
                Nutritional Profile (Approx. per 100g)
              </h4>
              <div className="space-y-1.5 text-warm-800">
                <div className="flex justify-between">
                  <span>Energy</span>
                  <span className="font-bold text-warm-900">478.26 kcal</span>
                </div>
                <div className="flex justify-between">
                  <span>Protein</span>
                  <span className="font-extrabold text-sage-700">18.62 g</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbohydrates</span>
                  <span className="font-bold">54.19 g</span>
                </div>
                <div className="flex justify-between text-warm-600 pl-2">
                  <span>Total Sugar (from Dates & Jaggery)</span>
                  <span>32.00 g</span>
                </div>
                <div className="flex justify-between">
                  <span>Dietary Fibre</span>
                  <span className="font-bold text-warm-800">10.00 g</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Fat</span>
                  <span className="font-bold">20.78 g</span>
                </div>
              </div>
            </div>

            {/* Ingredients & Allergens */}
            <div className="bg-warm-50 p-4 rounded-2xl border border-warm-200 space-y-1.5">
              <h4 className="font-bold text-warm-900">INGREDIENTS</h4>
              <p className="text-warm-700 leading-relaxed text-[11px]">
                Dates, Seeds (Pumpkin & Watermelon), Oats, Almonds, Cashews, Pistachios, Whole grains, Roasted Chana, Jaggery, Cocoa butter, Natural cocoa flavors.
              </p>
              <p className="text-warm-500 text-[10px] pt-1 border-t border-warm-200">
                Contains: Nuts, Oats, Dark Chocolate. 100% vegetarian, pure & safe.
              </p>
            </div>

            {/* Manufacturer Details */}
            <div className="bg-warm-50 p-4 rounded-2xl border border-warm-200 space-y-1.5">
              <h4 className="font-bold text-warm-900">MANUFACTURED BY</h4>
              <p className="text-warm-900 font-extrabold text-xs">JAINIK FOODS</p>
              <div className="space-y-1 text-warm-600 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-warm-500 flex-shrink-0" />
                  <span>Chunapura, Karanja (Lad), Maharashtra</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-warm-500 flex-shrink-0" />
                  <span>+91 9325578244 / 9922322906</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Tag */}
        <div className="mt-6 pt-4 border-t border-warm-200 flex items-center justify-between text-xs font-bold text-warm-600">
          <span className="flex items-center gap-1 text-sage-700">
            <CheckCircle2 className="w-4 h-4 text-sage-500" /> Certified FSSAI Lic. 21526066000742
          </span>
          <span className="text-warm-800">Motto: Jainik-Built on Purity</span>
        </div>

      </div>
    </div>
  );
}
