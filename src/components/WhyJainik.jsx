import React, { useState } from 'react';
import { Sparkles, CheckCircle2, MessageSquare, ShieldCheck, Flame, Heart, Zap, Award, Activity, Compass } from 'lucide-react';
import { openWhatsAppDirectChat } from '../utils/whatsapp';

export default function WhyJainik() {
  const [activeTab, setActiveTab] = useState('heritage');

  const pillars = [
    {
      id: 'heritage',
      title: 'नैसर्गिक व परंपरेची ताकद',
      subtitle: 'The Timeless Wisdom of Our Ancestors',
      desc: 'पूर्वीच्या काळामध्ये लोक आपली नैसर्गिक ताकद या नैसर्गिक आणि पौष्टिक घटकांचा वापर करून टिकवत. त्याच परंपरेचा आधुनिक आणि स्वादिष्ट अवतार म्हणजे जैनिक एनर्जी बार.',
      metrics: [
        { label: 'शारीरिक शक्ती', val: 'Physical Power', icon: Zap, color: 'text-amber-400' },
        { label: 'दिर्घकाळ शक्ती', val: 'Enduring Stamina', icon: Activity, color: 'text-emerald-400' },
        { label: 'सहनशक्ती', val: 'High Resilience', icon: Flame, color: 'text-rose-400' },
        { label: 'मानसिक स्थिरता', val: 'Mental Focus', icon: Compass, color: 'text-cyan-400' }
      ]
    },
    {
      id: 'purity',
      title: '100% Natural • Built on Purity',
      subtitle: 'Zero Compromise on Sourcing',
      desc: 'Formulated with no chemical preservatives, no synthetic colorings, and no refined syrups. Only whole food energy that your body instinctively recognizes and utilizes efficiently.',
      metrics: [
        { label: 'Zero Chemicals', val: '100% Toxin-Free', icon: ShieldCheck, color: 'text-emerald-400' },
        { label: 'Zero Refined Sugar', val: 'Low GI Fruit Sweetness', icon: Sparkles, color: 'text-amber-400' },
        { label: 'FSSAI Certified', val: 'Lic. 21526066000742', icon: Award, color: 'text-blue-400' },
        { label: 'Pure Vegetarian', val: 'Ahimsa Sattvic Standard', icon: Heart, color: 'text-rose-400' }
      ]
    },
    {
      id: 'recovery',
      title: 'व्यायाम करणाऱ्यांसाठी आदर्श',
      subtitle: 'Engineered for Fitness & Busy Days',
      desc: 'Packed with 18.62g protein per 100g and rich prebiotic dietary fibre. Keeps glycogen stores replenished, accelerates lean muscle recovery, and prevents afternoon energy slumps.',
      metrics: [
        { label: 'High Plant Protein', val: '18.62g per 100g', icon: Zap, color: 'text-amber-400' },
        { label: 'Prebiotic Fibre', val: '10g Dietary Fiber', icon: Activity, color: 'text-emerald-400' },
        { label: 'Zero Trans Fat', val: '0mg Cholesterol', icon: Heart, color: 'text-cyan-400' },
        { label: 'Sustained Stamina', val: '4-6h Continuous Burn', icon: Flame, color: 'text-rose-400' }
      ]
    }
  ];

  const current = pillars.find(p => p.id === activeTab) || pillars[0];

  return (
    <section id="tradition" className="py-28 bg-[#090E1A] text-slate-100 relative overflow-hidden border-y border-white/5">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-black shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>शक्ती जी आहे नैसर्गिक व परंपरेची!</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Ancestral Power, <br />
            <span className="text-gold-gradient">Engineered For Modern Life</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Every bar is crafted with the pure, time-honored superfoods our ancestors relied on. Wholesome nuts, ancient seeds, dates, and pure jaggery.
          </p>
        </div>

        {/* Clean Modern 2-Column Grid (NO RAW POSTERS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Interactive Ancestral Purity Cockpit */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-600/20 rounded-[32px] blur-xl opacity-75" />

            <div className="glass-gold rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl border border-amber-500/30 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 block">JAINIK FOODS STANDARDS</span>
                  <h3 className="text-xl font-black text-white">Built On Purity Cockpit</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="env-radar-beacon" />
                  <span className="text-xs font-bold text-emerald-400">100% Certified</span>
                </div>
              </div>

              {/* 4 Dynamic Metric Tiles */}
              <div className="grid grid-cols-2 gap-4">
                {current.metrics.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <div key={idx} className="glass-card p-4 rounded-2xl border border-white/5 space-y-1.5 hover:border-amber-500/40 transition-all">
                      <div className="flex items-center justify-between">
                        <Icon className={`w-5 h-5 ${m.color}`} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Live Spec</span>
                      </div>
                      <h4 className="text-base font-black text-white">{m.label}</h4>
                      <p className="text-xs font-bold text-amber-400/90">{m.val}</p>
                    </div>
                  );
                })}
              </div>

              {/* Verified Quality Ribbon */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>Manufacturing Location:</span>
                  <span className="text-white">Chunapura, Karanja (Lad), MH</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>FSSAI License:</span>
                  <span className="text-emerald-400">21526066000742</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>Chemicals & Preservatives:</span>
                  <span className="text-rose-400">0% (Strictly None)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Heritage Tabs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Interactive Tab Selectors */}
            <div className="flex rounded-2xl bg-slate-950/90 p-1.5 border border-slate-800 text-xs font-black">
              {pillars.map(p => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`flex-1 py-3 px-3 rounded-xl transition-all text-center ${
                    activeTab === p.id
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {p.id === 'heritage' && 'Ancestral Power'}
                  {p.id === 'purity' && '100% Purity'}
                  {p.id === 'recovery' && 'Active Recovery'}
                </button>
              ))}
            </div>

            {/* Active Tab Narrative Card */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-5 border border-amber-500/20">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-400 block mb-1">
                  {current.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {current.title}
                </h3>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {current.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-200">Slow-Roasted Natural Nuts</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-200">Zero Added White Sugar</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-200">Organic Medjool Dates</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-200">Ancient Indian Superfoods</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs font-black text-amber-400 block">Questions about Bulk Orders or Sourcing?</span>
                <span className="text-xs text-slate-400">Connect directly with our team on WhatsApp</span>
              </div>
              <button 
                onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to learn more about your ingredients and place an order!')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>Chat: 9325578244</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
