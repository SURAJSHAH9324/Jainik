import React, { useState } from 'react';
import { PackageCheck, Sparkles, Check, Truck, MessageSquare, Crown, Flame, ShieldCheck } from 'lucide-react';
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

  const packTitle = `Jainik Energy Bar (${packSize}-Pack Box)`;

  const handleAddBundle = () => {
    const bundleItem = {
      id: `pack-${packSize}-${isReturningCustomer ? 'vip' : 'standard'}`,
      name: packTitle,
      price: finalPrice,
      isBundle: true,
      packSize: packSize,
      badge: `${packSize}-Pack Box`,
      accentColor: '#F59E0B'
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
    <section id="packs" className="py-28 bg-[#070B14] text-slate-100 relative overflow-hidden border-t border-amber-500/10">
      
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-black shadow-lg">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Direct Manufacturer Pricing • 40g / Bar</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Choose Your <span className="text-gold-gradient">Pack Size</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Single bar rate is ₹80. Save significantly with multi-pack bundles plus free express doorstep shipping across India.
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
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'glass-gold border-amber-500 shadow-2xl scale-[1.03] ring-1 ring-amber-400/40'
                    : 'glass-card border-white/5 hover:border-white/20'
                }`}
              >
                {pack.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    🔥 MOST POPULAR
                  </span>
                )}

                <div className="space-y-2 text-center">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">
                    {pack.badge}
                  </span>
                  <h3 className="text-2xl font-black text-white">{pack.size} Bars Box</h3>
                  <p className="text-xs text-slate-400">{pack.sub}</p>
                </div>

                <div className="my-6 py-5 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
                  <div className="text-3xl font-black text-gold-gradient">₹{pack.price}</div>
                  {pack.savings > 0 ? (
                    <div className="text-xs text-emerald-400 font-bold mt-1">
                      Save ₹{pack.savings} (MRP: ₹{pack.regularPrice})
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 font-bold mt-1">
                      Standard MRP (₹80/Bar)
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className={`w-full py-3 rounded-xl font-black text-xs transition-all ${
                    isSelected
                      ? 'btn-gold-shimmer text-slate-950 shadow-lg'
                      : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {isSelected ? '✓ Selected Box' : 'Select This Box'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Box Checkout Details Banner */}
        <div className="glass-gold rounded-3xl p-6 sm:p-10 border border-amber-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-400 block mb-1">
                Selected: {currentPack.size}-Pack Box ({currentPack.label})
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Freshly Packed Jainik Energy Bars
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                Direct dispatch from our certified food laboratory in Karanja (Lad), Maharashtra. Sealed for optimal freshness and crunch.
              </p>
            </div>

            {/* VIP Returning Customer Toggle */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-black text-white text-sm">Returning Customer?</h4>
                  <p className="text-xs text-slate-400">Claim an extra 10% repeat loyalty bonus on your order!</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReturningCustomer(!isReturningCustomer)}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                  isReturningCustomer 
                    ? 'btn-gold-shimmer text-slate-950 shadow-lg' 
                    : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                {isReturningCustomer ? '✓ VIP 10% Applied' : '+ Claim 10% Off'}
              </button>
            </div>

            {/* Shipping Guarantee */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Truck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Free Express Courier Across India • Dispatched in 24 Hours</span>
            </div>
          </div>

          {/* Pricing & Order CTA */}
          <div className="lg:col-span-5 bg-slate-950/90 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-400 uppercase">Effective Price Per Bar</span>
              <span className="text-xl font-black text-amber-400">₹{perBarFinal} / Bar</span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-base font-black text-white">Total Payable</span>
              <span className="text-3xl sm:text-4xl font-black text-gold-gradient">₹{finalPrice}</span>
            </div>

            {totalSavings > 0 && (
              <p className="text-xs text-emerald-400 font-bold text-right -mt-2">
                🎉 Total Savings: ₹{totalSavings} (Save ₹{currentPack.savings} + VIP ₹{returningDiscount})!
              </p>
            )}

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleDirectWhatsAppOrder}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-whatsapp-600 to-whatsapp-500 hover:from-whatsapp-500 hover:to-whatsapp-600 text-white font-black text-sm shadow-xl shadow-whatsapp-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>Order {packSize}-Pack via WhatsApp (₹{finalPrice})</span>
              </button>

              <button
                onClick={handleAddBundle}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-all"
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
