import React from 'react';
import { ShieldCheck, Heart, Zap, Sparkles, CheckCircle2, MessageSquare, Award } from 'lucide-react';
import { openWhatsAppDirectChat } from '../utils/whatsapp';

export default function WhyJainik() {
  const pillars = [
    {
      icon: Heart,
      title: 'Ancestral Sattvic Purity',
      desc: 'Formulated with pure Ahimsa principles. 100% vegetarian whole foods without preservatives or artificial additives.'
    },
    {
      icon: Zap,
      title: 'Whole Grains & Nuts',
      desc: 'California almonds, cashews, pistachios, seeds, and oats providing 18.62g protein per 100g and prebiotic fibre.'
    },
    {
      icon: Sparkles,
      title: 'Zero Added White Sugar',
      desc: 'Naturally sweetened solely with whole sun-dried dates and unrefined traditional jaggery for steady, crash-free energy.'
    },
    {
      icon: Award,
      title: 'FSSAI Certified Kitchen',
      desc: 'Lic. 21526066000742. Handcrafted in small fresh batches in Karanja (Lad), Maharashtra. Dispatched in 24h.'
    }
  ];

  return (
    <section id="why-jainik" className="py-20 bg-white text-warm-900 relative border-b border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-warm-100 border border-warm-300 text-warm-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>शक्ती जी आहे नैसर्गिक व परंपरेची!</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-warm-900 tracking-tight">
            Why Choose <span className="text-warm-600">Jainik?</span>
          </h2>
          <p className="text-warm-700 text-xs sm:text-sm">
            The power of nature and tradition, handcrafted for modern active lifestyles.
          </p>
        </div>

        {/* 4 Clean Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF6F0] border border-warm-200 hover:border-warm-400 hover:shadow-warm-sm transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-warm-300 text-warm-900 flex items-center justify-center shadow-2xs">
                  <Icon className="w-5 h-5 text-warm-800" />
                </div>
                <h3 className="text-base font-black text-warm-900">
                  {pillar.title}
                </h3>
                <p className="text-xs text-warm-600 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp Assistance Strip */}
        <div className="mt-10 p-4 rounded-2xl bg-warm-50 border border-warm-300 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <span className="text-xs font-black text-warm-900 block">Need Bulk Orders or Corporate Gifting?</span>
            <span className="text-[11px] text-warm-600">Chat with the founder directly on WhatsApp</span>
          </div>
          <button 
            onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to inquire about bulk ordering and custom packs!')}
            className="px-4 py-2 rounded-xl btn-whatsapp-pill text-xs font-bold flex items-center gap-1.5 whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white" />
            <span>Chat: 9325578244</span>
          </button>
        </div>

      </div>
    </section>
  );
}
