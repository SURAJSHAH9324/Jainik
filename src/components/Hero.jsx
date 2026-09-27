import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle2, ShieldCheck, ShoppingBag, Eye, Check, Sparkles, Truck } from 'lucide-react';

export default function Hero({ product, onAddToCart, onOpenNutrition, onOpenImage, onOpenOrder }) {
  const [selectedPack, setSelectedPack] = useState({ size: 1, name: '1 Bar (40g)', price: 80, badge: 'Single Bar' });
  const [quantity, setQuantity] = useState(1);
  const [activeMedia, setActiveMedia] = useState('/jainik-bar-hero.jpg');
  const [justAdded, setJustAdded] = useState(false);

  const packOptions = [
    { size: 1, name: '1 Bar', price: 80, label: 'Single Bar', image: '/jainik-bar-hero.jpg' },
    { size: 3, name: '3-Pack', price: 240, label: 'Trial Pack', image: '/jainik-wrapper-mockup.png' },
    { size: 6, name: '6-Pack', price: 460, savings: 20, label: 'Save ₹20', image: '/Package.png' },
    { size: 12, name: '12-Pack', price: 890, savings: 70, popular: true, label: 'Bestseller', image: '/Package.png' },
    { size: 24, name: '24-Pack', price: 1720, savings: 200, label: 'Save ₹200', image: '/Package.png' },
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
    <section id="product" className="relative bg-[#FAF6F0] text-warm-900 border-b border-warm-200 py-8 sm:py-12 lg:py-14">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: High-Contrast, Clean & Readable Editorial Typography */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            
            {/* Top Rating & Certification Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-warm-300 text-warm-950 text-xs font-bold shadow-2xs">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                4.9 Rating (2,850+ Orders)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                FSSAI Certified: 21526066000742
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-warm-200/80 border border-warm-300 text-warm-900 text-xs font-bold">
                100% Sattvic & Vegetarian
              </span>
            </div>

            {/* Clear, High-Contrast Heading */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#221207] leading-[1.1]">
                Jainik <span className="text-[#8B4513]">Energy Bar</span>
              </h1>
              <p className="text-sm sm:text-base font-extrabold text-[#3D2211] tracking-wide">
                शक्ती जी आहे नैसर्गिक व परंपरेची! (Power of Nature & Tradition)
              </p>
            </div>

            {/* Concise Value Summary */}
            <p className="text-[#3D2211] text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
              Authentic Indian nutrition handcrafted with <strong>California Almonds, Whole Cashews, Pistachios, Dates, Seeds & 72% Dark Chocolate</strong>. Zero chemical preservatives, zero added white sugar.
            </p>

            {/* 3 Scannable Micro Feature Tags */}
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="px-3 py-1 rounded-lg bg-white border border-warm-300 text-warm-950 flex items-center gap-1.5 shadow-2xs">
                🌿 10 Real Superfoods
              </span>
              <span className="px-3 py-1 rounded-lg bg-white border border-warm-300 text-warm-950 flex items-center gap-1.5 shadow-2xs">
                ⚡ 18.62g Protein / 100g
              </span>
              <span className="px-3 py-1 rounded-lg bg-white border border-warm-300 text-warm-950 flex items-center gap-1.5 shadow-2xs">
                🚫 Zero White Sugar
              </span>
            </div>

            {/* Pack Selector & Instant Order Card */}
            <div className="bg-white rounded-2xl border-2 border-warm-200 p-4 sm:p-5 shadow-warm-sm space-y-4 max-w-xl">
              
              {/* Price Header */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-[#221207]">
                    ₹{totalPrice}
                  </span>
                  {selectedPack.savings ? (
                    <span className="ml-2 text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      Save ₹{selectedPack.savings * quantity}
                    </span>
                  ) : (
                    <span className="ml-2 text-xs text-warm-600 font-bold">
                      (₹80 / 40g Single Bar)
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-warm-700 bg-warm-100 px-2.5 py-1 rounded-lg">
                  Dispatched in 24h
                </span>
              </div>

              {/* Pack Size Pills */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-warm-800 block">
                  Select Option:
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
                            ? 'border-warm-900 bg-warm-900 text-white shadow-xs'
                            : 'border-warm-300 bg-warm-50/70 hover:bg-warm-100 text-warm-900'
                        }`}
                      >
                        {pack.popular && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-warm-950 font-black text-[8px] px-1.5 py-0.2 rounded-full uppercase tracking-wider whitespace-nowrap shadow-xs">
                            POPULAR
                          </span>
                        )}
                        <div className="text-xs font-black leading-tight">{pack.name}</div>
                        <div className={`text-[10px] font-bold mt-0.5 ${isCurrent ? 'text-warm-200' : 'text-warm-700'}`}>
                          ₹{pack.price}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons: Order with Details or Add to Cart */}
              <div className="pt-2 border-t border-warm-200 flex flex-col sm:flex-row items-center gap-2.5">
                
                {/* Primary Order CTA */}
                <button
                  type="button"
                  onClick={handleOrderClick}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl btn-whatsapp-pill text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Order on WhatsApp — ₹{totalPrice}</span>
                </button>

                {/* Add to Cart Drawer Button */}
                <button
                  type="button"
                  onClick={handleAddCartOnly}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl btn-warm-secondary text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap"
                  title="Add to Cart Drawer"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
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
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-warm-700">
              <span className="flex items-center gap-1 text-emerald-800">
                <Truck className="w-3.5 h-3.5 text-emerald-600" /> Free Express Courier Across India
              </span>
              <span>•</span>
              <button 
                onClick={onOpenNutrition}
                className="text-warm-900 hover:text-warm-700 underline font-black"
              >
                View Nutrition & FSSAI Specs
              </button>
            </div>

          </div>

          {/* Right Column: Hero Image Showcase (Prominently featuring jainik-bar-hero.jpg) */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            <div className="w-full max-w-md relative group">
              
              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-white border-2 border-warm-200 shadow-warm-lg p-3 sm:p-4">
                
                {/* Image Frame */}
                <div 
                  onClick={() => onOpenImage(activeMedia, 'Jainik Energy Bar', 'Handcrafted with California Almonds, Cashews, Pistachios & Dark Chocolate')}
                  className="relative rounded-2xl overflow-hidden bg-warm-100 cursor-pointer aspect-[4/3] flex items-center justify-center"
                >
                  <img 
                    src={activeMedia} 
                    alt="Jainik Energy Bar Real Broken Bar Texture" 
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-warm-300 text-warm-950 text-[11px] font-black px-3 py-1 rounded-full shadow-xs">
                    ✨ Real Whole Food Texture
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenImage(activeMedia, 'Jainik Energy Bar (40g)', 'High Resolution Visual Preview');
                    }}
                    className="absolute bottom-3 right-3 bg-warm-900/90 hover:bg-warm-900 text-white p-2 rounded-xl backdrop-blur-sm shadow-sm transition-all"
                    title="Zoom Image"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Thumbnails to switch visuals */}
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveMedia('/jainik-bar-hero.jpg')}
                    className={`p-1.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      activeMedia === '/jainik-bar-hero.jpg' 
                        ? 'border-warm-900 bg-warm-100 ring-2 ring-warm-900/10' 
                        : 'border-warm-200 bg-white hover:bg-warm-50'
                    }`}
                  >
                    <img src="/jainik-bar-hero.jpg" alt="Broken Bar" className="w-10 h-10 object-cover rounded-lg" />
                    <div>
                      <span className="block text-[11px] font-black text-warm-950 leading-tight">Broken Bar</span>
                      <span className="block text-[9px] font-bold text-warm-600">Whole Nuts</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveMedia('/Package.png')}
                    className={`p-1.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      activeMedia === '/Package.png' 
                        ? 'border-warm-900 bg-warm-100 ring-2 ring-warm-900/10' 
                        : 'border-warm-200 bg-white hover:bg-warm-50'
                    }`}
                  >
                    <img src="/Package.png" alt="Box Packaging" className="w-10 h-10 object-cover rounded-lg" />
                    <div>
                      <span className="block text-[11px] font-black text-warm-950 leading-tight">Box Pack</span>
                      <span className="block text-[9px] font-bold text-warm-600">Official Box</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveMedia('/jainik-wrapper-mockup.png')}
                    className={`p-1.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      activeMedia === '/jainik-wrapper-mockup.png' 
                        ? 'border-warm-900 bg-warm-100 ring-2 ring-warm-900/10' 
                        : 'border-warm-200 bg-white hover:bg-warm-50'
                    }`}
                  >
                    <img src="/jainik-wrapper-mockup.png" alt="Wrapper" className="w-10 h-10 object-contain rounded-lg" />
                    <div>
                      <span className="block text-[11px] font-black text-warm-950 leading-tight">Wrapper</span>
                      <span className="block text-[9px] font-bold text-warm-600">40g Foil</span>
                    </div>
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
