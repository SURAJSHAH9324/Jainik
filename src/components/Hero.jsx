import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle2, ShieldCheck, ShoppingBag, Eye, Check, Sparkles, Truck } from 'lucide-react';
import { openWhatsAppDirectChat, openWhatsAppOrder } from '../utils/whatsapp';

export default function Hero({ product, onAddToCart, onOpenNutrition, onOpenImage }) {
  const [selectedPack, setSelectedPack] = useState({ size: 1, name: 'Single Bar', price: 80, badge: 'Standard' });
  const [quantity, setQuantity] = useState(1);
  const [activeMedia, setActiveMedia] = useState('/jainik-bar-hero.jpg');
  const [justAdded, setJustAdded] = useState(false);

  const packOptions = [
    { size: 1, name: '1 Bar', price: 80, perBar: 80, label: 'Single Bar' },
    { size: 3, name: '3-Pack', price: 240, perBar: 80, label: 'Trial Pack' },
    { size: 6, name: '6-Pack', price: 460, perBar: 76.6, savings: 20, label: 'Save ₹20' },
    { size: 12, name: '12-Pack', price: 890, perBar: 74, savings: 70, popular: true, label: 'Bestseller' },
    { size: 24, name: '24-Pack', price: 1720, perBar: 71.6, savings: 200, label: 'Save ₹200' },
  ];

  const handlePackSelect = (pack) => {
    setSelectedPack(pack);
    setQuantity(1);
  };

  const totalPrice = selectedPack.price * quantity;

  const handleBuy = () => {
    if (selectedPack.size === 1) {
      onAddToCart(quantity);
    } else {
      const bundleItem = {
        id: `pack-${selectedPack.size}`,
        name: `Jainik Energy Bar (${selectedPack.size}-Pack Box)`,
        price: selectedPack.price,
        isBundle: true,
        packSize: selectedPack.size,
        badge: `${selectedPack.size}-Pack Box`,
        quantity: quantity,
        accentColor: '#5C361D'
      };
      // Direct WhatsApp Order
      openWhatsAppOrder({
        customerName: 'Quick Buyer',
        customerPhone: '',
        items: [{ name: bundleItem.name, quantity: quantity, price: selectedPack.price }],
        total: totalPrice,
        notes: `Order for Jainik Energy Bar (${selectedPack.name})`,
        isReturningCustomer: false,
        discountAmount: (selectedPack.savings || 0) * quantity
      });
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  return (
    <section id="product" className="relative min-h-[90vh] lg:h-[calc(100vh-68px)] lg:max-h-[820px] flex items-center justify-center bg-[#FAF6F0] text-warm-900 overflow-hidden pt-20 lg:pt-4 pb-10 lg:pb-4 border-b border-warm-200">
      
      {/* Warm Ambient Backdrop Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-warm-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-warm-300/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* Left Column: Barefruit-Style Clean Editorial & Quick Buy Controls */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
          
          {/* Top Rating & Certification Badges */}
          <div className="inline-flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-warm-300 text-warm-900 text-xs font-bold shadow-xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              4.9 (2,850+ Reviews)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              FSSAI Lic. 21526066000742
            </span>
            <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-warm-150 border border-warm-300 text-warm-800 text-xs font-bold">
              100% Sattvic & Natural
            </span>
          </div>

          {/* Clean Editorial Title */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-warm-900 leading-[1.08]">
              Jainik <span className="text-warm-600">Energy Bar</span>
            </h1>
            <p className="text-sm sm:text-base font-extrabold text-warm-700 tracking-wide">
              {product.motto}
            </p>
          </div>

          {/* Reduced, Punchy Value Proposition */}
          <p className="text-warm-700 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
            Authentic Indian nutrition with <strong>California Almonds, Whole Cashews, Pistachios, Dates, Seeds & 72% Dark Chocolate</strong>. Zero chemical preservatives, zero added white sugar.
          </p>

          {/* 3 Scannable Micro Feature Tags */}
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <span className="px-3 py-1 rounded-lg bg-white border border-warm-200 text-warm-800 flex items-center gap-1.5">
              🌿 10 Real Superfoods
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-warm-200 text-warm-800 flex items-center gap-1.5">
              ⚡ 18.62g Protein / 100g
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-warm-200 text-warm-800 flex items-center gap-1.5">
              🚫 Zero White Sugar
            </span>
          </div>

          {/* Barefruit-Style Pack Selector & Buy Box */}
          <div className="bg-white rounded-2xl border border-warm-300 p-4 sm:p-5 shadow-warm-sm space-y-3.5 max-w-xl">
            
            {/* Price Header */}
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-warm-900">
                  ₹{totalPrice}
                </span>
                {selectedPack.savings ? (
                  <span className="ml-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Save ₹{selectedPack.savings * quantity}
                  </span>
                ) : (
                  <span className="ml-2 text-xs text-warm-500 font-bold">
                    (₹80 / 40g Bar)
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-warm-600">
                Fresh Dispatch in 24h
              </span>
            </div>

            {/* Pack Size Pills */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-warm-600 block">
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
                          : 'border-warm-200 bg-warm-50/70 hover:bg-warm-100 text-warm-800'
                      }`}
                    >
                      {pack.popular && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-warm-950 font-black text-[8px] px-1.5 py-0.2 rounded-full uppercase tracking-wider whitespace-nowrap shadow-xs">
                          POPULAR
                        </span>
                      )}
                      <div className="text-xs font-black leading-tight">{pack.name}</div>
                      <div className={`text-[10px] font-bold mt-0.5 ${isCurrent ? 'text-warm-200' : 'text-warm-600'}`}>
                        ₹{pack.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Direct CTAs */}
            <div className="pt-2 border-t border-warm-200 flex flex-col sm:flex-row items-center gap-2.5">
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-xs font-bold text-warm-700">Quantity:</span>
                <div className="flex items-center bg-warm-50 border border-warm-300 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-warm-700 hover:text-warm-950 hover:bg-warm-200 font-black text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 font-black text-sm text-warm-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-warm-700 hover:text-warm-950 hover:bg-warm-200 font-black text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary WhatsApp Order CTA */}
              <button
                onClick={handleBuy}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl btn-whatsapp-pill text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Opening WhatsApp Order...</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Order on WhatsApp — ₹{totalPrice}</span>
                  </>
                )}
              </button>

              {/* Add to Cart Drawer Button */}
              <button
                onClick={() => {
                  onAddToCart(selectedPack.size * quantity);
                  setJustAdded(true);
                  setTimeout(() => setJustAdded(false), 2000);
                }}
                className="w-full sm:w-auto py-3 px-4 rounded-xl btn-warm-secondary text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap"
                title="Add to Drawer Cart"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>+ Cart</span>
              </button>
            </div>

          </div>

          {/* Quick Trust Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-warm-600">
            <span className="flex items-center gap-1 text-emerald-700">
              <Truck className="w-3.5 h-3.5 text-emerald-600" /> Free Courier Across India
            </span>
            <span>•</span>
            <button 
              onClick={onOpenNutrition}
              className="text-warm-800 hover:text-warm-600 underline font-extrabold"
            >
              Nutrition Facts & Lab Specs
            </button>
          </div>

        </div>

        {/* Right Column: Hero Image Showcase (Prominently featuring jainik-bar-hero.jpg) */}
        <div className="lg:col-span-5 relative flex flex-col items-center">
          
          <div className="w-full max-w-md relative group">
            
            {/* Ambient Backdrop Warm Shadow */}
            <div className="absolute -inset-2 bg-warm-300/30 rounded-3xl blur-xl group-hover:bg-warm-400/40 transition-all pointer-events-none" />

            {/* Main Hero Card */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-warm-300 shadow-warm-lg p-3 sm:p-4">
              
              {/* Image Frame with Aspect & Texture Details */}
              <div 
                onClick={() => onOpenImage(activeMedia, 'Jainik Energy Bar (40g)', 'Real Whole Foods • California Almonds, Cashews, Pistachios & Dark Chocolate')}
                className="relative rounded-2xl overflow-hidden bg-warm-100 cursor-pointer aspect-[4/3] flex items-center justify-center"
              >
                <img 
                  src={activeMedia} 
                  alt="Jainik Energy Bar Real Broken Bar Texture" 
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-warm-300 text-warm-900 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xs">
                  ✨ Real Whole Food Texture
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenImage(activeMedia, 'Jainik Energy Bar (40g)', 'High Resolution Visual Preview');
                  }}
                  className="absolute bottom-3 right-3 bg-warm-900/85 hover:bg-warm-900 text-white p-2 rounded-xl backdrop-blur-sm shadow-sm transition-all"
                  title="Zoom Image"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Barefruit-Style Thumbnail Switcher */}
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
                    <span className="block text-[11px] font-black text-warm-900 leading-tight">Broken Bar</span>
                    <span className="block text-[9px] font-bold text-warm-500">Whole Nuts</span>
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
                    <span className="block text-[11px] font-black text-warm-900 leading-tight">Box Pack</span>
                    <span className="block text-[9px] font-bold text-warm-500">Official Box</span>
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
                    <span className="block text-[11px] font-black text-warm-900 leading-tight">Wrapper</span>
                    <span className="block text-[9px] font-bold text-warm-500">40g Foil</span>
                  </div>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
