import React from 'react';
import { Star, ShoppingBag, MessageSquare, Truck, Sparkles } from 'lucide-react';
import { DELIVERY_FEES, PACKS } from '../data/products';
import OffersPanel from './OffersPanel';

function packToOrderItem(pack) {
  return {
    id: `pack-${pack.size}`,
    name: `Jainik Energy Bar (${pack.label})`,
    price: pack.regularPrice,
    regularPrice: pack.regularPrice,
    specialPrice: pack.specialPrice,
    image: pack.image,
    size: pack.size,
    isBundle: true,
    packSize: pack.size,
    badge: pack.badge,
    accentColor: '#241611',
  };
}

export default function BundleBuilder({ onAddBundleToCart, onOpenOrder }) {
  const handleOrderClick = (pack) => {
    const item = packToOrderItem(pack);
    if (onOpenOrder) onOpenOrder(item);
    else onAddBundleToCart(item);
  };

  const handleAddToCart = (pack) => {
    onAddBundleToCart(packToOrderItem(pack));
  };

  return (
    <section id="packs" className="py-20 bg-[#FDFBF7] text-[#281A14] relative border-b border-[#D8C08A]/30">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header from Reference Mockup */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3E8DD] border border-[#D8C08A] text-[#281A14] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A46C]" />
            <span>PACKS • DELIVERY EXTRA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#241611] tracking-tight">
            Pure Energy. <span className="italic font-normal text-[#C9A46C]">In Every Bite.</span>
          </h2>
          <p className="text-[#3D2211] text-xs sm:text-sm font-medium">
            Handcrafted in Karanja (Lad), Maharashtra. Pack price plus delivery. Express delivery is ₹{DELIVERY_FEES.express}.
          </p>
        </div>

        <OffersPanel />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PACKS.map((pack) => {
            const shownPrice = pack.specialPrice || pack.regularPrice;
            const effectivePerBar = Math.round(shownPrice / pack.size);

            return (
              <div
                key={pack.size}
                className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-white group ${
                  pack.popular
                    ? 'border-[#C9A46C] shadow-xl ring-2 ring-[#C9A46C]/50'
                    : 'border-[#D8C08A]/40 hover:border-[#C9A46C] hover:shadow-lg'
                }`}
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/3] bg-[#F3E8DD]/50 p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={pack.image}
                    alt={pack.label}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    {pack.popular && (
                      <span className="bg-[#241611] text-[#C9A46C] font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        BESTSELLER
                      </span>
                    )}
                    {pack.savings > 0 && (
                      <span className="bg-[#5C7548] text-white font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        SAVE ₹{pack.savings}
                      </span>
                    )}
                  </div>

                  <span className="absolute bottom-2 right-2 text-[10px] font-black text-[#281A14] bg-white/95 px-2 py-0.5 rounded-md border border-[#D8C08A]/40 shadow-xs">
                    40g × {pack.size} {pack.size === 1 ? 'Bar' : 'Bars'}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#C9A46C]">
                      <Star className="w-3 h-3 fill-[#C9A46C] text-[#C9A46C]" />
                      <span>4.9 (Official Rating)</span>
                    </div>

                    <h3 className="text-base font-black text-[#241611] leading-snug">
                      {pack.label}
                    </h3>

                    <p className="text-xs text-[#5C361D] font-medium">
                      {pack.sub}
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="pt-2 border-t border-[#D8C08A]/30 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-black text-[#241611]">
                          ₹{shownPrice}
                        </span>
                        {pack.specialPrice && (
                          <span className="text-xs font-semibold text-[#8B4513] line-through">
                            ₹{pack.regularPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-black text-[#5C7548] block">
                        ₹{effectivePerBar} / Bar + delivery
                      </span>
                      {pack.specialPrice && (
                        <span className="text-[10px] font-bold text-[#5C361D] block">
                          COD ₹{pack.regularPrice} • no special offer
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleOrderClick(pack)}
                      className="w-full py-2.5 rounded-xl bg-[#241611] hover:bg-[#1A0F0B] text-[#C9A46C] text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-[#C9A46C]" />
                      <span>Order on WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(pack)}
                      className="w-full py-2 rounded-xl bg-[#F3E8DD] hover:bg-[#E7D5C4] text-[#241611] border border-[#D8C08A] text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
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
        <div className="mt-10 text-center flex items-center justify-center gap-2 text-xs font-black text-[#241611]">
          <Truck className="w-4 h-4 text-[#5C7548]" />
          <span>Delivery extra — standard ₹{DELIVERY_FEES.standard}, express ₹{DELIVERY_FEES.express}</span>
        </div>

      </div>
    </section>
  );
}
