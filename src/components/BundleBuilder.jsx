import React, { useState } from 'react';
import { PackageCheck, Sparkles, Check, Truck, MessageSquare, Crown, Flame, ShieldCheck } from 'lucide-react';
import { openWhatsAppOrder } from '../utils/whatsapp';
import { PACKS } from '../data/products';

export default function BundleBuilder({ product, onAddBundleToCart }) {
  const [packSize, setPackSize] = useState(12); // 3, 6, 12, 24
  const [isReturningCustomer, setIsReturningCustomer] = useState(false);

  const currentPack = PACKS.find(p => p.size === packSize) || PACKS[2];
  
  // Returning customer 10% loyalty discount
  const returningDiscount = isReturningCustomer ? Math.round(currentPack.price * 0.10) : 0;
  const finalPrice = currentPack.price - returningDiscount;
  const totalSavings = currentPack.savings + returningDiscount;
  const perBarFinal = (finalPrice / packSize).toFixed(0);

  const packTitle = `Jainik Energy Bar (${packSize}-Pack Box)`;

  const handleAddBundle = () => {
    const bundleItem = {
      id: `pack-${packSize}-${isReturningCustomer ? 'vip' : 'standard'}`,
      name: packTitle,
      price: finalPrice,
      isBundle: true,
      packSize: packSize,
      badge: `${packSize}-Pack Box`,
      accentColor: '#5C361D'
    };

    onAddBundleToCart(bundleItem);
  };

  const handleDirectWhatsAppOrder = () => {
    openWhatsAppOrder({
      customerName: 'Direct Pack Buyer',
      customerPhone: '',
      items: [{ name: packTitle, quantity: 1, price: finalPrice }],
      total: finalPrice,
      notes: `Order for Jainik Energy Bar (${packSize}-Pack Box, 40g each)`,
      isReturningCustomer,
      discountAmount: totalSavings
    });
  };

  return (
    <section id="packs" className="py-24 bg-warm-100 text-warm-900 relative border-t border-warm-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="badge-toasted">
            <Flame className="w-3.5 h-3.5 text-warm-600" />
            <span>Direct Manufacturer Pricing • 40g / Bar</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-warm-900 tracking-tight">
            Choose Your <span className="text-warm-600">Pack Size</span>
          </h2>
          <p className="text-warm-700 text-base sm:text-lg">
            Single bar rate is ₹80. Save with multi-pack boxes with free express courier delivery across India.
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
                className={`card-artisanal p-6 text-center transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-2 border-warm-700 shadow-warm-lg scale-[1.02] bg-white'
                    : 'bg-white/80 hover:bg-white hover:border-warm-300'
                }`}
              >
                {pack.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-warm-900 text-white font-black text-[10px] px-3.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    MOST POPULAR
                  </span>
                )}

                <div className="space-y-1.5">
                  <span className="text-[11px] font-black text-warm-600 uppercase tracking-wider block">
                    {pack.badge}
                  </span>
                  <h3 className="text-2xl font-black text-warm-900">{pack.size} Bars Box</h3>
                  <p className="text-xs text-warm-500">{pack.sub}</p>
                </div>

                <div className="my-6 py-4 bg-warm-50 rounded-2xl border border-warm-200">
                  <div className="text-3xl font-black text-warm-900">₹{pack.price}</div>
                  {pack.savings > 0 ? (
                    <div className="text-xs text-sage-700 font-bold mt-1">
                      Save ₹{pack.savings} (MRP: ₹{pack.regularPrice})
                    </div>
                  ) : (
                    <div className="text-xs text-warm-500 font-medium mt-1">
                      Standard MRP (₹80/Bar)
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                    isSelected
                      ? 'bg-warm-900 text-white shadow-sm'
                      : 'bg-warm-100 text-warm-800 hover:bg-warm-200'
                  }`}
                >
                  {isSelected ? '✓ Selected Box' : 'Select Box'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Box Details & Checkout */}
        <div className="card-artisanal p-6 sm:p-10 border-2 border-warm-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white shadow-warm-md">
          
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-warm-600 block mb-1">
                Selected: {currentPack.size}-Pack Box ({currentPack.label})
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-warm-900">
                Freshly Packed Jainik Energy Bars
              </h3>
              <p className="text-xs sm:text-sm text-warm-700 mt-1 leading-relaxed">
                Direct dispatch from our certified kitchen in Karanja (Lad), Maharashtra. Nitrogen-flushed foil for optimal freshness and crunch.
              </p>
            </div>

            {/* VIP Returning Customer Toggle */}
            <div className="bg-warm-50 p-4 rounded-2xl border border-warm-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-warm-200 text-warm-800 flex items-center justify-center flex-shrink-0">
                  <Crown className="w-5 h-5 text-warm-700" />
                </div>
                <div>
                  <h4 className="font-bold text-warm-900 text-sm">Returning Customer?</h4>
                  <p className="text-xs text-warm-600">Claim an extra 10% repeat loyalty bonus on your order!</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReturningCustomer(!isReturningCustomer)}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isReturningCustomer 
                    ? 'bg-warm-800 text-white shadow-sm' 
                    : 'bg-white border border-warm-300 text-warm-800 hover:bg-warm-100'
                }`}
              >
                {isReturningCustomer ? '✓ VIP 10% Applied' : '+ Claim 10% Off'}
              </button>
            </div>

            {/* Courier Guarantee */}
            <div className="flex items-center gap-2 text-xs font-bold text-warm-700">
              <Truck className="w-4 h-4 text-sage-500 flex-shrink-0" />
              <span>Free Express Courier Across India • Dispatched in 24 Hours</span>
            </div>
          </div>

          {/* Pricing Summary & Action */}
          <div className="lg:col-span-5 bg-warm-50 p-6 sm:p-7 rounded-2xl border border-warm-200 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-warm-500 uppercase">Effective Price Per Bar</span>
              <span className="text-lg font-black text-warm-800">₹{perBarFinal} / Bar</span>
            </div>

            <div className="pt-2 border-t border-warm-200 flex justify-between items-baseline">
              <span className="text-base font-bold text-warm-900">Total Amount</span>
              <span className="text-3xl font-black text-warm-900">₹{finalPrice}</span>
            </div>

            {totalSavings > 0 && (
              <p className="text-xs text-sage-700 font-bold text-right -mt-2">
                🎉 Total Savings: ₹{totalSavings} (Save ₹{currentPack.savings} + VIP ₹{returningDiscount})!
              </p>
            )}

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleDirectWhatsAppOrder}
                className="w-full py-3.5 btn-whatsapp-pill text-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Order {packSize}-Pack via WhatsApp (₹{finalPrice})</span>
              </button>

              <button
                onClick={handleAddBundle}
                className="w-full py-2.5 rounded-xl btn-warm-secondary text-xs font-bold"
              >
                + Add {packSize}-Pack Box to Cart Drawer
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
