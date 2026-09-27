import React, { useState } from 'react';
import { Send, Check, ShieldCheck, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { openWhatsAppDirectChat } from '../utils/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-warm-950 text-warm-300 pt-16 pb-12 border-t border-warm-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Direct WhatsApp Callout Banner */}
        <div className="bg-warm-900 text-white rounded-3xl p-8 sm:p-10 border border-warm-700 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-warm-lg">
          
          <div className="lg:col-span-7 space-y-2.5">
            <span className="text-[11px] font-black uppercase tracking-widest text-warm-400">
              Direct Manufacturer WhatsApp Support
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Connect Directly with Jainik Foods
            </h3>
            <p className="text-warm-300 text-sm leading-relaxed">
              Order your fresh 3, 6, 12, or 24-pack box, ask bulk order queries, or get returning customer discounts directly at <strong>+91 9325578244</strong> / <strong>9922322906</strong>.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to order Jainik Energy Bars (₹80/bar)!')}
              className="w-full px-6 py-4 btn-whatsapp-pill text-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5 fill-white" /> WhatsApp: 9325578244
            </button>
          </div>

        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="bg-white rounded-xl p-1 shadow-sm">
                <img 
                  src="/jainik-logo.jpg" 
                  alt="Jainik Logo - Built on Purity" 
                  className="h-9 object-contain rounded-lg"
                />
              </div>
            </a>
            <p className="text-xs leading-relaxed max-w-sm text-warm-400">
              Jainik Foods crafts pure traditional energy bars from ancient millets, dry fruits, roasted chana, dates, and pure jaggery. Handcrafted with purity in Maharashtra.
            </p>
            <div className="space-y-1.5 text-xs text-warm-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-warm-400 flex-shrink-0" />
                <span>Chunapura, Karanja (Lad), Dist. Washim, Maharashtra</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-warm-400 flex-shrink-0" />
                <span>+91 9325578244 / 9922322906</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-warm-400 flex-shrink-0" />
                <span>jainikfoods@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Pack Options */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-warm-200 mb-4">Pack Options</h4>
            <ul className="space-y-2.5 text-xs text-warm-400">
              <li><a href="#packs" className="hover:text-warm-100 transition-colors">3-Pack Box (₹240)</a></li>
              <li><a href="#packs" className="hover:text-warm-100 transition-colors">6-Pack Box (₹460)</a></li>
              <li><a href="#packs" className="hover:text-warm-100 transition-colors">12-Pack Box (₹890)</a></li>
              <li><a href="#packs" className="hover:text-warm-100 transition-colors">24-Pack Box (₹1,720)</a></li>
              <li><a href="#product" className="hover:text-warm-100 transition-colors">Single Bar (₹80)</a></li>
            </ul>
          </div>

          {/* 10 Ingredients */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-warm-200 mb-4">10 Ingredients</h4>
            <ul className="space-y-2 text-xs text-warm-400">
              <li><a href="#ingredients" className="hover:text-warm-100 transition-colors">बदाम (Almonds) & काजू</a></li>
              <li><a href="#ingredients" className="hover:text-warm-100 transition-colors">पिस्ता & भोपळ्याच्या बिया</a></li>
              <li><a href="#ingredients" className="hover:text-warm-100 transition-colors">ओट्स & फुटाणे (Chana)</a></li>
              <li><a href="#ingredients" className="hover:text-warm-100 transition-colors">टरबुजाच्या बिया & खजूर</a></li>
              <li><a href="#ingredients" className="hover:text-warm-100 transition-colors">नैसर्गिक गूळ & डार्क चॉकलेट</a></li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-warm-200 mb-4">Certifications</h4>
            <ul className="space-y-2.5 text-xs text-warm-400">
              <li className="text-sage-400 font-bold">FSSAI Lic. 21526066000742</li>
              <li>100% Pure Vegetarian</li>
              <li>No Preservatives / Chemicals</li>
              <li>No Refined White Sugar</li>
              <li>Handmade with Care</li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-warm-800 flex flex-col sm:flex-row items-center justify-between text-xs text-warm-500 gap-4">
          <p>© {new Date().getFullYear()} JAINIK FOODS. Built on Purity. All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-warm-400">
            <ShieldCheck className="w-4 h-4 text-sage-400" />
            <span>FSSAI Certified • WhatsApp Support: +91 9325578244</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
