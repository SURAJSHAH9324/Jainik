import React, { useState } from 'react';
import { Star, ShoppingBag, MessageSquare, Truck, Check, Crown, Flame, Sparkles } from 'lucide-react';
import { PACKS } from '../data/products';
import { openWhatsAppOrder } from '../utils/whatsapp';

export default function BundleBuilder({ product, onAddBundleToCart }) {
  const [isReturningCustomer, setIsReturningCustomer] = useState(false);
  const [activePackId, setActivePackId] = useState(12);

  const handleDirectWhatsApp = (pack) => {
    const returningDiscount = isReturningCustomer ? Math.round(pack.price * 0.10) : 0;
    const finalPrice = pack.price - returningDiscount;
    const totalSavings = pack.savings + returningDiscount;

    openWhatsAppOrder({
      customerName: 'Direct Pack Buyer',
      customerPhone: '',
      items: [{ name: `Jainik Energy Bar (${pack.size}-Pack Box)`, quantity: 1, price: finalPrice }],
      total: finalPrice,
      notes: `Order for Jainik Energy Bar (${pack.size}-Pack Box, 40g each)`,
      isReturningCustomer,
      discountAmount: totalSavings
    });
  };

  const handleAddToCart = (pack) => {
    const returningDiscount = isReturningCustomer ? Math.round(pack.price * 0.10) : 0;
    const finalPrice = pack.price - returningDiscount;

    const bundleItem = {
      id: `pack-${pack.size}-${isReturningCustomer ? 'vip' : 'standard'}`,
      name: `Jainik Energy Bar (${pack.size}-Pack Box)`,
      price: finalPrice,
      isBundle: true,
      packSize: pack.size,
      badge: `${pack.size}-Pack Box`,
      accentColor: '#5C361D'
    };

    onAddBundleToCart(bundleItem);
  };

  return (
    <section id="packs" className="py-20 bg-white text-warm-900 relative border-b border-warm-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Barefruit-Style Collection Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-warm-100 border border-warm-300 text-warm-800 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Direct Manufacturer Pricing • ₹80 Base Unit</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-warm-900 tracking-tight">
            Shop <span className="text-warm-600">Pack Boxes</span>
          </h2>
          <p className="text-warm-700 text-xs sm:text-sm">
            Freshly prepared in Karanja (Lad), Maharashtra. Save more with multi-pack boxes with free delivery.
          </p>
        </div>

        {/* VIP Returning Customer Banner */}
        <div className="max-w-3xl mx-auto mb-10 bg-warm-50 border border-warm-300 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-warm-200 text-warm-800 flex items-center justify-center flex-shrink-0">
              <Crown className="w-5 h-5 text-warm-800" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-warm-900 block">
                Returning Customer? Get an extra 10% Loyalty Discount
              </span>
              <span className="text-[11px] text-warm-600 font-medium">
                Automatically calculated on your direct WhatsApp invoice.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsReturningCustomer(!isReturningCustomer)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              isReturningCustomer 
                ? 'bg-warm-900 text-white shadow-xs' 
                : 'bg-white border border-warm-300 text-warm-800 hover:bg-warm-100'
            }`}
          >
            {isReturningCustomer ? '✓ VIP 10% Active' : '+ Apply 10% VIP'}
          </button>
        </div>

        {/* Barefruit-Style 4 Product Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACKS.map((pack) => {
            const returningDiscount = isReturningCustomer ? Math.round(pack.price * 0.10) : 0;
            const finalPrice = pack.price - returningDiscount;
            const effectivePerBar = (finalPrice / pack.size).toFixed(0);

            return (
              <div
                key={pack.size}
                className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-white group ${
                  pack.popular
                    ? 'border-warm-900 shadow-warm-md ring-1 ring-warm-900'
                    : 'border-warm-200 hover:border-warm-400 hover:shadow-warm-sm'
                }`}
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/3] bg-warm-50 p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={pack.image}
                    alt={pack.label}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {pack.popular && (
                      <span className="bg-warm-900 text-white font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        BESTSELLER
                      </span>
                    )}
                    {pack.savings > 0 && (
                      <span className="bg-emerald-600 text-white font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        SAVE ₹{pack.savings}
                      </span>
                    )}
                  </div>

                  <span className="absolute bottom-2 right-2 text-[10px] font-extrabold text-warm-600 bg-white/90 px-2 py-0.5 rounded-md border border-warm-200">
                    40g × {pack.size} Bars
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>4.9 (Official Rating)</span>
                    </div>

                    <h3 className="text-lg font-black text-warm-900 leading-snug">
                      {pack.size}-Pack Box
                    </h3>

                    <p className="text-xs text-warm-600">
                      {pack.sub}
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="pt-2 border-t border-warm-100 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-warm-900">
                          ₹{finalPrice}
                        </span>
                        {pack.regularPrice > pack.price && (
                          <span className="text-xs font-semibold text-warm-400 line-through">
                            ₹{pack.regularPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-extrabold text-emerald-700 block">
                        ₹{effectivePerBar} / Bar
                      </span>
                    </div>

                    {isReturningCustomer && (
                      <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                        -10% VIP
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleDirectWhatsApp(pack)}
                      className="w-full py-2.5 rounded-xl btn-whatsapp-pill text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-white" />
                      <span>Order on WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(pack)}
                      className="w-full py-2 rounded-xl btn-warm-secondary text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>+ Add to Cart</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Free Shipping Footer Bar */}
        <div className="mt-10 text-center flex items-center justify-center gap-2 text-xs font-bold text-warm-600">
          <Truck className="w-4 h-4 text-emerald-600" />
          <span>All multi-pack orders include Free Express Courier Delivery Across India</span>
        </div>

      </div>
    </section>
  );
}
