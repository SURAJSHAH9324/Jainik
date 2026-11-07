import React from 'react';
import { ShieldCheck, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { openWhatsAppDirectChat, DISPLAY_PHONE_NUMBER } from '../utils/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-[#1A0F0B] text-[#D8C08A] pt-16 pb-12 border-t border-[#D8C08A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Direct WhatsApp Callout Banner */}
        <div className="bg-[#241611] text-[#FFFBED] rounded-3xl p-8 sm:p-10 border border-[#D8C08A]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          
          <div className="lg:col-span-7 space-y-2.5">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#C9A46C]">
              Direct Manufacturer Helpline
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#FFFBED]">
              Connect Directly with Team Jainik
            </h3>
            <p className="text-[#F3E8DD]/80 text-sm leading-relaxed">
              Order packs of 5, 10, 30, 50, 70, or 100 bars. Payment and order updates stay on WhatsApp at <strong>{DISPLAY_PHONE_NUMBER}</strong> / <strong>+91 99223 22906</strong>.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I need a payment or order update.')}
              className="w-full px-6 py-4 rounded-xl bg-[#C9A46C] hover:bg-[#D8BA8A] text-[#1A0F0B] font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageSquare className="w-5 h-5 fill-[#1A0F0B]" /> WhatsApp: {DISPLAY_PHONE_NUMBER}
            </button>
          </div>

        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info - Clean logo without background box */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="inline-block">
              <img 
                src="/jainik-logo-transparent.png" 
                alt="Jainik Logo - Built on Purity" 
                className="h-10 object-contain"
              />
            </a>
            <p className="text-xs leading-relaxed max-w-sm text-[#F3E8DD]/70">
              Jainik Energy Bar is the official natural protein bar from Jainik Foods, Karanja (Lad), Maharashtra. Whole almonds, cashews, pistachios, seeds, oats, dates, jaggery and dark chocolate. FSSAI 21526066000742.
            </p>
            <div className="space-y-1.5 text-xs text-[#D8C08A]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C9A46C] flex-shrink-0" />
                <span>Chunapura, Karanja (Lad), Dist. Washim, Maharashtra</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A46C] flex-shrink-0" />
                <span>{DISPLAY_PHONE_NUMBER} / +91 99223 22906</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C9A46C] flex-shrink-0" />
                <span>jainikfoods@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Pack Options */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FFFBED] mb-4">Pack Options</h4>
            <ul className="space-y-2.5 text-xs text-[#F3E8DD]/70">
              <li><a href="#packs" className="hover:text-[#C9A46C] transition-colors">Pack of 5 (₹350 + delivery)</a></li>
              <li><a href="#packs" className="hover:text-[#C9A46C] transition-colors">Pack of 10 (₹670 + delivery)</a></li>
              <li><a href="#packs" className="hover:text-[#C9A46C] transition-colors">Pack of 30 (₹2,000 / prepaid ₹1,950)</a></li>
              <li><a href="#packs" className="hover:text-[#C9A46C] transition-colors">Pack of 50 (₹3,150 / prepaid ₹3,000)</a></li>
              <li><a href="#packs" className="hover:text-[#C9A46C] transition-colors">Pack of 70 (₹4,060 / prepaid ₹4,000)</a></li>
              <li><a href="#packs" className="hover:text-[#C9A46C] transition-colors">Pack of 100 (₹5,700 / prepaid ₹5,500)</a></li>
            </ul>
          </div>

          {/* 10 Ingredients */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FFFBED] mb-4">10 Ingredients</h4>
            <ul className="space-y-2 text-xs text-[#F3E8DD]/70">
              <li><a href="#ingredients" className="hover:text-[#C9A46C] transition-colors">बदाम (Almonds) & काजू</a></li>
              <li><a href="#ingredients" className="hover:text-[#C9A46C] transition-colors">पिस्ता & भोपळ्याच्या बिया</a></li>
              <li><a href="#ingredients" className="hover:text-[#C9A46C] transition-colors">ओट्स & फुटाणे (Chana)</a></li>
              <li><a href="#ingredients" className="hover:text-[#C9A46C] transition-colors">टरबुजाच्या बिया & खजूर</a></li>
              <li><a href="#ingredients" className="hover:text-[#C9A46C] transition-colors">नैसर्गिक गूळ & डार्क चॉकलेट</a></li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FFFBED] mb-4">Certifications</h4>
            <ul className="space-y-2.5 text-xs text-[#F3E8DD]/70">
              <li><a href="#brand-values" className="text-[#5C7548] font-black hover:text-[#C9A46C]">FSSAI Lic. 21526066000742</a></li>
              <li><a href="#brand-values" className="hover:text-[#C9A46C] transition-colors">Shelf-life certification</a></li>
              <li><a href="#brand-values" className="hover:text-[#C9A46C] transition-colors">100% Pure Vegetarian</a></li>
              <li>No Preservatives / Chemicals</li>
              <li>No Refined White Sugar</li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-[#D8C08A]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F3E8DD]/60 gap-4">
          <p>© {new Date().getFullYear()} JAINIK FOODS. Built on Purity. All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-[#D8C08A]">
            <ShieldCheck className="w-4 h-4 text-[#5C7548]" />
            <span>FSSAI Certified • WhatsApp Support: {DISPLAY_PHONE_NUMBER}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
