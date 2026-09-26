import React, { useState } from 'react';
import { PackageCheck, Sparkles, Check, Truck, MessageSquare, Crown } from 'lucide-react';
import { openWhatsAppOrder } from '../utils/whatsapp';
import { PACKS } from '../data/products';

export default function BundleBuilder({ product, onAddBundleToCart }) {
  const [packSize, setPackSize] = useState(12); // 3, 6, 12, 24
  const [isReturningCustomer, setIsReturningCustomer] = useState(false);

  const currentPack = PACKS.find(p => p.size === packSize) || PACKS[2];
  
  // Additional returning customer 10% loyalty discount
  const returningDiscount = isReturningCustomer ? Math.round(currentPack.price * 0.10) : 0;
  const finalPrice = currentPack.price - returningDiscount;
  const totalSavings = currentPack.savings + returningDiscount;
  const perBarFinal = (finalPrice / packSize).toFixed(0);

  const packTitle = `Jainik Multigrain Bar (${packSize}-Pack Box)`;

  const handleAddBundle = () => {
    const bundleItem = {
      id: `pack-${packSize}-${isReturningCustomer ? 'vip' : 'standard'}`,
      name: packTitle,
      price: finalPrice,
      isBundle: true,
      packSize: packSize,
      badge: `${packSize}-Pack Box`,
      accentColor: '#1E40AF'
    };

    onAddBundleToCart(bundleItem);
  };

  const handleDirectWhatsAppOrder = () => {
    openWhatsAppOrder({
      customerName: 'Direct Pack Buyer',
      customerPhone: '',
      items: [{ name: packTitle, quantity: 1, price: finalPrice }],
      total: finalPrice,
      notes: `Order for Jainik Multigrain Energy Bar (${packSize}-Pack Box, Chocolate Chunk Nut)`,
      isReturningCustomer,
      discountAmount: totalSavings
    });
  };

  return (
    <section id="packs" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-jain-blue bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Box Options for Daily Health & Training
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Order Your <span className="text-gradient-jain">Pack of 3, 6, 12 or 24 Bars</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Single bar rate is ₹80. Save more when ordering in multi-packs with free express delivery across India!
          </p>
        </div>

        {/* 4-Pack Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PACKS.map(pack => {
            const isSelected = packSize === pack.size;
            return (
              <div
                key={pack.size}
                onClick={() => setPackSize(pack.size)}
                className={`p-6 rounded-3xl border text-center transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-jain-blue shadow-xl scale-[1.03] ring-2 ring-jain-blue/20'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {pack.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-jain-blue text-white font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                    MOST POPULAR
                  </span>
                )}

                <div className="space-y-2">
                  <span className="text-xs font-black text-jain-orange uppercase tracking-wider block">
                    {pack.badge}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">{pack.size} Bars Box</h3>
                  <p className="text-xs text-slate-500">{pack.sub}</p>
                </div>

                <div className="my-6 py-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-3xl font-black text-jain-blue">₹{pack.price}</div>
                  {pack.savings > 0 && (
                    <div className="text-xs text-jain-green font-bold mt-1">
                      Save ₹{pack.savings} (MRP: ₹{pack.regularPrice})
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className={`w-full py-2.5 rounded-xl font-black text-xs transition-all ${
                    isSelected
                      ? 'bg-jain-blue text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isSelected ? '✓ Selected Box' : 'Select This Box'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Order Box with VIP Returning Customer Feature */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-lg">
          
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-jain-blue block mb-1">
                Selected: {currentPack.size}-Pack Box ({currentPack.label})
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Freshly Packed Jainik Chocolate Chunk Nut Bars
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Direct dispatch from our certified sattvic kitchen to your doorstep in nitrogen-sealed freshness foil.
              </p>
            </div>

            {/* Returning Customer Loyalty Discount Banner */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-jain-orange" />
                <div>
                  <h4 className="font-black text-slate-900 text-sm">Returning Customer?</h4>
                  <p className="text-xs text-slate-600">Toggle this to claim an extra 10% repeat loyalty bonus!</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReturningCustomer(!isReturningCustomer)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  isReturningCustomer 
                    ? 'bg-jain-orange text-white shadow-md' 
                    : 'bg-white border border-slate-300 text-slate-700'
                }`}
              >
                {isReturningCustomer ? '✓ VIP 10% Applied' : '+ Claim 10% Off'}
              </button>
            </div>

            {/* Free Shipping Note */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Free Express Delivery Across India • Dispatched in 24 Hours</span>
            </div>
          </div>

          {/* Pricing & WhatsApp Actions */}
          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-500 uppercase">Effective Price Per Bar</span>
              <span className="text-xl font-black text-jain-orange">₹{perBarFinal} / Bar</span>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-base font-black text-slate-900">Total Payable</span>
              <span className="text-3xl font-black text-jain-blue">₹{finalPrice}</span>
            </div>

            {totalSavings > 0 && (
              <p className="text-xs text-jain-green font-bold text-right -mt-2">
                🎉 Total Savings: ₹{totalSavings}!
              </p>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleDirectWhatsAppOrder}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-whatsapp-600 to-whatsapp-500 hover:from-whatsapp-500 hover:to-whatsapp-600 text-white font-black text-sm shadow-md shadow-whatsapp-600/25 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5 fill-white" /> Order {packSize}-Pack via WhatsApp (₹{finalPrice})
              </button>

              <button
                onClick={handleAddBundle}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs transition-all"
              >
                + Add {packSize}-Pack to Cart
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
