import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle2, ShieldCheck, ShoppingBag, Eye, Check, Sparkles, Truck, Leaf, Heart, Zap, Award } from 'lucide-react';
import { DISPLAY_PHONE_NUMBER } from '../utils/whatsapp';

export default function Hero({ product, onAddToCart, onOpenNutrition, onOpenImage, onOpenOrder }) {
  const [selectedPack, setSelectedPack] = useState({ size: 1, name: 'Pack of 1 (40g)', price: 70, badge: 'Single Bar' });
  const [quantity, setQuantity] = useState(1);
  const [activeMedia, setActiveMedia] = useState('/jainik-bar-hero.jpg');
  const [justAdded, setJustAdded] = useState(false);

  // Exact pack options requested by user: 1, 5, 10, 30, and 40 (Base price: ₹70)
  const packOptions = [
    { size: 1, name: 'Pack of 1', price: 70, label: 'Single Bar', image: '/jainik-bar-hero.jpg' },
    { size: 5, name: 'Pack of 5', price: 350, label: 'Pocket Pack', image: '/Package.png' },
    { size: 10, name: 'Pack of 10', price: 680, savings: 20, label: 'Save ₹20', image: '/Package.png' },
    { size: 30, name: 'Pack of 30', price: 2010, savings: 90, popular: true, label: 'Bestseller', image: '/Package.png' },
    { size: 40, name: 'Pack of 40', price: 2640, savings: 160, label: 'Save ₹160', image: '/Package.png' },
  ];

  const handlePackSelect = (pack) => {
    setSelectedPack(pack);
    setQuantity(1);
    if (pack.image) {
      setActiveMedia(pack.image);
    }
  };

  const totalPrice = selectedPack.price * quantity;

  const handleOrderClick = () => {
    if (onOpenOrder) {
      onOpenOrder({
        name: `Jainik Energy Bar (${selectedPack.name})`,
        price: selectedPack.price,
        image: activeMedia,
        size: selectedPack.size
      });
    } else {
      onAddToCart(selectedPack.size * quantity);
    }
  };

  const handleAddCartOnly = () => {
    onAddToCart(selectedPack.size * quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  return (
    <>
      {/* 1. Main Hero Stage (Deep Cocoa Brown #241611 from Mockup) */}
      <section id="product" className="relative bg-[#241611] text-[#FFFBED] border-b border-[#D8C08A]/20 py-10 sm:py-14 lg:py-16 overflow-hidden">
        
        {/* Subtle Warm Amber Glows */}
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-[#C9A46C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/6 w-96 h-96 bg-[#4A241B]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Editorial Typography matching Reference Mockup */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              {/* Eyebrow in Soft Premium Gold */}
              <div className="inline-flex items-center gap-2">
                <span className="text-[#C9A46C] text-xs font-black tracking-[0.25em] uppercase">
                  PURE INGREDIENTS. REAL ENERGY.
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A46C]" />
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D8C08A] bg-[#2E1D17] px-2.5 py-0.5 rounded-full border border-[#D8C08A]/30">
                  <Star className="w-3 h-3 fill-[#C9A46C] text-[#C9A46C]" />
                  4.9 (2,850+ Orders)
                </span>
              </div>

              {/* Serif Headline (Playfair / Cormorant Style from Mockup) */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-[#FFFBED] leading-[1.08]">
                  Jainik <br />
                  <span className="italic font-normal text-[#D8C08A]">Built on Purity.</span>
                </h1>
                <p className="text-sm sm:text-base font-medium text-[#F3E8DD]/90 leading-relaxed max-w-xl">
                  Wholesome energy bars made with nature's finest ingredients. Handcrafted with California almonds, whole cashews, pistachios, dates, super seeds & dark chocolate. No added preservatives. Just pure goodness.
                </p>
              </div>

              {/* 3 Quick Benefit Chips */}
              <div className="flex flex-wrap gap-2 text-xs font-bold text-[#FFFBED]">
                <span className="px-3 py-1.5 rounded-full bg-[#2E1D17] border border-[#D8C08A]/30 text-[#D8C08A] flex items-center gap-1.5">
                  🌿 10 Real Superfoods
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#2E1D17] border border-[#D8C08A]/30 text-[#D8C08A] flex items-center gap-1.5">
                  ⚡ 18.62g Protein / 100g
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#2E1D17] border border-[#D8C08A]/30 text-[#D8C08A] flex items-center gap-1.5">
                  🚫 Zero White Sugar
                </span>
              </div>

              {/* Interactive Pack Selector & Buy Box */}
              <div className="bg-[#1A0F0B] rounded-2xl border border-[#D8C08A]/30 p-4 sm:p-5 shadow-2xl space-y-4 max-w-xl">
                
                {/* Price Header with ₹70 Base Unit */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-black text-[#FFFBED]">
                      ₹{totalPrice}
                    </span>
                    {selectedPack.savings ? (
                      <span className="ml-2 text-xs font-bold text-[#5C7548] bg-[#5C7548]/20 px-2.5 py-0.5 rounded-full border border-[#5C7548]/40">
                        Save ₹{selectedPack.savings * quantity}
                      </span>
                    ) : (
                      <span className="ml-2 text-xs text-[#D8C08A]/80 font-bold">
                        (Base Unit: ₹70 / 40g Bar)
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-[#D8C08A] bg-[#2E1D17] px-2.5 py-1 rounded-lg border border-[#D8C08A]/20">
                    Dispatched in 24h
                  </span>
                </div>

                {/* Pack Size Pills (1, 5, 10, 30, 40) */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#D8C08A] block">
                    Choose Pack Size:
                  </span>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {packOptions.map((pack) => {
                      const isCurrent = selectedPack.size === pack.size;
                      return (
                        <button
                          key={pack.size}
                          type="button"
                          onClick={() => handlePackSelect(pack)}
                          className={`p-2 rounded-xl text-center transition-all relative border ${
                            isCurrent
                              ? 'border-[#C9A46C] bg-[#C9A46C] text-[#1A0F0B] font-black shadow-md scale-[1.02]'
                              : 'border-[#D8C08A]/20 bg-[#2E1D17]/80 hover:bg-[#2E1D17] text-[#FFFBED]'
                          }`}
                        >
                          {pack.popular && (
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#C9A46C] text-[#1A0F0B] font-black text-[7px] px-1.5 py-0.2 rounded-full uppercase tracking-wider whitespace-nowrap shadow-xs">
                              POPULAR
                            </span>
                          )}
                          <div className="text-xs font-black leading-tight">{pack.name}</div>
                          <div className={`text-[10px] font-bold mt-0.5 ${isCurrent ? 'text-[#1A0F0B]' : 'text-[#D8C08A]'}`}>
                            ₹{pack.price}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div className="pt-2 border-t border-[#D8C08A]/20 flex flex-col sm:flex-row items-center gap-2.5">
                  
                  {/* Primary WhatsApp Order CTA in Soft Premium Gold */}
                  <button
                    type="button"
                    onClick={handleOrderClick}
                    className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-[#C9A46C] hover:bg-[#D8BA8A] text-[#1A0F0B] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01]"
                  >
                    <MessageSquare className="w-4 h-4 fill-[#1A0F0B]" />
                    <span>Order on WhatsApp — ₹{totalPrice}</span>
                  </button>

                  {/* Add to Cart Drawer Button */}
                  <button
                    type="button"
                    onClick={handleAddCartOnly}
                    className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-[#2E1D17] hover:bg-[#3D2211] text-[#FFFBED] border border-[#D8C08A]/30 text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap transition-all"
                    title="Add to Cart Drawer"
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#5C7548]" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>+ Cart</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Quick Trust Row */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#D8C08A]/90">
                <span className="flex items-center gap-1 text-[#5C7548]">
                  <Truck className="w-3.5 h-3.5" /> Free Express Courier Across India
                </span>
                <span>•</span>
                <button 
                  onClick={onOpenNutrition}
                  className="text-[#FFFBED] hover:text-[#C9A46C] underline font-bold"
                >
                  FSSAI Certified: 21526066000742
                </button>
              </div>

            </div>

            {/* Right Column: Hero Visual Frame with Gold Border */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              
              <div className="w-full max-w-md relative group">
                
                {/* Gold Glow Behind Image */}
                <div className="absolute -inset-2 bg-[#C9A46C]/20 rounded-3xl blur-2xl group-hover:bg-[#C9A46C]/30 transition-all pointer-events-none" />

                {/* Card Container */}
                <div className="relative rounded-3xl overflow-hidden bg-[#1A0F0B] border-2 border-[#D8C08A]/40 shadow-2xl p-3 sm:p-4">
                  
                  {/* Image Frame with Broken Bar Details */}
                  <div 
                    onClick={() => onOpenImage(activeMedia, 'Jainik Energy Bar (40g)', 'Real Whole Foods • California Almonds, Cashews, Pistachios & Dark Chocolate')}
                    className="relative rounded-2xl overflow-hidden bg-[#2E1D17] cursor-pointer aspect-[4/3] flex items-center justify-center"
                  >
                    <img 
                      src={activeMedia} 
                      alt="Jainik Energy Bar Texture" 
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-[#1A0F0B]/90 backdrop-blur-md border border-[#D8C08A]/50 text-[#FFFBED] text-[11px] font-black px-3 py-1 rounded-full shadow-md">
                      ✨ Real Whole Food Texture • ₹70
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenImage(activeMedia, 'Jainik Energy Bar (40g)', 'High Resolution Visual Preview');
                      }}
                      className="absolute bottom-3 right-3 bg-[#C9A46C] text-[#1A0F0B] p-2 rounded-xl shadow-md transition-all hover:scale-105"
                      title="Zoom Image"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Thumbnail Switcher */}
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveMedia('/jainik-bar-hero.jpg')}
                      className={`p-1.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        activeMedia === '/jainik-bar-hero.jpg' 
                          ? 'border-[#C9A46C] bg-[#2E1D17] ring-2 ring-[#C9A46C]/40' 
                          : 'border-[#D8C08A]/20 bg-[#1A0F0B] hover:bg-[#2E1D17]'
                      }`}
                    >
                      <img src="/jainik-bar-hero.jpg" alt="Broken Bar" className="w-10 h-10 object-cover rounded-lg" />
                      <div>
                        <span className="block text-[11px] font-black text-[#FFFBED] leading-tight">Broken Bar</span>
                        <span className="block text-[9px] font-bold text-[#D8C08A]">Whole Nuts</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveMedia('/Package.png')}
                      className={`p-1.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        activeMedia === '/Package.png' 
                          ? 'border-[#C9A46C] bg-[#2E1D17] ring-2 ring-[#C9A46C]/40' 
                          : 'border-[#D8C08A]/20 bg-[#1A0F0B] hover:bg-[#2E1D17]'
                      }`}
                    >
                      <img src="/Package.png" alt="Box Packaging" className="w-10 h-10 object-cover rounded-lg" />
                      <div>
                        <span className="block text-[11px] font-black text-[#FFFBED] leading-tight">Box Pack</span>
                        <span className="block text-[9px] font-bold text-[#D8C08A]">Official Box</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveMedia('/jainik-wrapper-mockup.png')}
                      className={`p-1.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        activeMedia === '/jainik-wrapper-mockup.png' 
                          ? 'border-[#C9A46C] bg-[#2E1D17] ring-2 ring-[#C9A46C]/40' 
                          : 'border-[#D8C08A]/20 bg-[#1A0F0B] hover:bg-[#2E1D17]'
                      }`}
                    >
                      <img src="/jainik-wrapper-mockup.png" alt="Wrapper" className="w-10 h-10 object-contain rounded-lg" />
                      <div>
                        <span className="block text-[11px] font-black text-[#FFFBED] leading-tight">Wrapper</span>
                        <span className="block text-[9px] font-bold text-[#D8C08A]">40g Foil</span>
                      </div>
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 2. Exact 5-Pillar Trust Ribbon From Mockup (Cashew Cream #F3E8DD Background) */}
      <section className="bg-[#F3E8DD] text-[#281A14] py-8 border-b border-[#D8C08A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-center text-center">
            
            <div className="space-y-2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-[#C9A46C] flex items-center justify-center bg-white/60 text-[#281A14] shadow-sm">
                <Leaf className="w-5 h-5 text-[#5C7548]" />
              </div>
              <h4 className="text-xs sm:text-sm font-black text-[#281A14]">
                100% Pure Ingredients
              </h4>
            </div>

            <div className="space-y-2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-[#C9A46C] flex items-center justify-center bg-white/60 text-[#281A14] shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#281A14]" />
              </div>
              <h4 className="text-xs sm:text-sm font-black text-[#281A14]">
                No Added Preservatives
              </h4>
            </div>

            <div className="space-y-2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-[#C9A46C] flex items-center justify-center bg-white/60 text-[#281A14] shadow-sm">
                <Zap className="w-5 h-5 text-[#C9A46C]" />
              </div>
              <h4 className="text-xs sm:text-sm font-black text-[#281A14]">
                High Plant Protein
              </h4>
            </div>

            <div className="space-y-2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-[#C9A46C] flex items-center justify-center bg-white/60 text-[#281A14] shadow-sm">
                <Sparkles className="w-5 h-5 text-[#281A14]" />
              </div>
              <h4 className="text-xs sm:text-sm font-black text-[#281A14]">
                Nuts, Seeds & Oats
              </h4>
            </div>

            <div className="col-span-2 md:col-span-1 space-y-2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-[#C9A46C] flex items-center justify-center bg-white/60 text-[#281A14] shadow-sm">
                <Heart className="w-5 h-5 text-[#4A241B]" />
              </div>
              <h4 className="text-xs sm:text-sm font-black text-[#281A14]">
                Jain Inspired Purity
              </h4>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
