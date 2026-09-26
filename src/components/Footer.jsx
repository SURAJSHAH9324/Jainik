import React, { useState } from 'react';
import { Send, Check, ShieldCheck, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { openWhatsAppDirectChat } from '../utils/whatsapp';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Direct WhatsApp Banner */}
        <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-amber-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">
              Direct Manufacturer WhatsApp Support
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Connect Directly with Jainik Foods
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Order your fresh 3, 6, 12, or 24-pack box, ask bulk order queries, or get returning customer discounts directly at <strong>+91 9325578244</strong> / <strong>9922322906</strong>.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to order Jainik Energy Bars (₹80/bar)!')}
              className="w-full px-6 py-4 bg-whatsapp-500 hover:bg-whatsapp-600 text-white font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <MessageSquare className="w-5 h-5 fill-white" /> WhatsApp: 9325578244
            </button>
          </div>

        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Official Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <img 
                src="/jainik-logo.jpg" 
                alt="Jainik Logo - Built on Purity" 
                className="h-10 object-contain rounded-lg"
              />
            </a>
            <p className="text-xs leading-relaxed max-w-sm text-slate-400">
              Jainik Foods is dedicated to crafting pure traditional energy bars made with ancient millets, dry fruits, roasted chana, dates, and pure jaggery. Built on Purity.
            </p>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Chunapura, Karanja (Lad), Dist. Washim</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+91 9325578244 / 9922322906</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>jainikfoods@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Packs */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-4">Pack Options</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#packs" className="hover:text-amber-400 transition-colors">3-Pack Box (₹240)</a></li>
              <li><a href="#packs" className="hover:text-amber-400 transition-colors">6-Pack Box (₹460)</a></li>
              <li><a href="#packs" className="hover:text-amber-400 transition-colors">12-Pack Box (₹890)</a></li>
              <li><a href="#packs" className="hover:text-amber-400 transition-colors">24-Pack Box (₹1,720)</a></li>
              <li><a href="#product" className="hover:text-amber-400 transition-colors">Single Bar (₹80)</a></li>
            </ul>
          </div>

          {/* 10 Ingredients */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-4">10 Ingredients</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#ingredients" className="hover:text-amber-400 transition-colors">बदाम (Almonds) & काजू</a></li>
              <li><a href="#ingredients" className="hover:text-amber-400 transition-colors">पिस्ता & भोपळ्याच्या बिया</a></li>
              <li><a href="#ingredients" className="hover:text-amber-400 transition-colors">ओट्स & फुटाणे (Chana)</a></li>
              <li><a href="#ingredients" className="hover:text-amber-400 transition-colors">टरबुजाच्या बिया & खजूर</a></li>
              <li><a href="#ingredients" className="hover:text-amber-400 transition-colors">नैसर्गिक गूळ & डार्क चॉकलेट</a></li>
            </ul>
          </div>

          {/* Quality & Certification */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-4">Certifications</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="text-emerald-400 font-bold">FSSAI Lic. 21526066000742</li>
              <li>100% Pure Vegetarian</li>
              <li>No Preservatives / Chemicals</li>
              <li>No Added Sugar / Low GI</li>
              <li>Handmade with Care</li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} JAINIK FOODS. Built on Purity. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>FSSAI Certified • WhatsApp Support: +91 9325578244</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
