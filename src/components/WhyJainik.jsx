import React, { useState } from 'react';
import { Sparkles, CheckCircle2, MessageSquare, ZoomIn, ShieldCheck, Flame, Heart, Zap, Award } from 'lucide-react';
import { openWhatsAppDirectChat } from '../utils/whatsapp';

export default function WhyJainik({ onOpenImage }) {
  const [activeTab, setActiveTab] = useState('heritage');

  const pillars = [
    {
      id: 'heritage',
      title: 'नैसर्गिक व परंपरेची शक्ती',
      subtitle: 'The Timeless Wisdom of Our Ancestors',
      desc: 'पूर्वीच्या काळामध्ये लोक आपली नैसर्गिक ताकद या नैसर्गिक आणि पौष्टिक घटकांचा वापर करून टिकवत. त्याच परंपरेचा आधुनिक आणि स्वादिष्ट अवतार म्हणजे जैनिक एनर्जी बार.',
      highlights: [
        'शारीरिक शक्ती (Physical Power)',
        'दिर्घकाळ शक्ती (Enduring Stamina)',
        'सहनशक्ती (High Resilience)',
        'मानसिक स्थिरता (Mental Stability)'
      ]
    },
    {
      id: 'purity',
      title: '100% Natural • Built on Purity',
      subtitle: 'Zero Compromise on Quality',
      desc: 'Each bar is carefully formulated with no chemical preservatives, no synthetic colorings, and no corn syrups. Only whole food energy that your body instinctively recognizes and utilizes.',
      highlights: [
        'Zero Chemical Preservatives',
        'No Added Refined White Sugar',
        '100% Vegetarian Certified',
        'FSSAI Certified: 21526066000742'
      ]
    },
    {
      id: 'recovery',
      title: 'व्यायाम करणाऱ्यांसाठी आदर्श',
      subtitle: 'Ideal for Workouts, Sports & Busy Days',
      desc: 'Packed with 18.62g protein per 100g and rich prebiotic dietary fibre. Keeps glycogen stores replenished, promotes fast lean muscle repair, and protects cardiovascular health.',
      highlights: [
        'High Natural Plant Protein',
        'Heart-Healthy Monounsaturated Fats',
        'Rich in Natural Iron & Zinc',
        'Zero Trans Fat & Zero Cholesterol'
      ]
    }
  ];

  const current = pillars.find(p => p.id === activeTab) || pillars[0];

  return (
    <section id="tradition" className="py-28 bg-[#090E1A] text-slate-100 relative overflow-hidden border-y border-amber-500/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-black shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>शक्ती जी आहे नैसर्गिक व परंपरेची!</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Standardized By Tradition, <br />
            <span className="text-gold-gradient">Perfected For Modern Life</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Discover the philosophy behind <strong>Jainik Foods</strong>. Every ingredient is ethically sourced, slow-roasted, and pressed to preserve active enzymes and authentic vitality.
          </p>
        </div>

        {/* Standardized 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Stylized Presentation of the Official Poster */}
          <div className="lg:col-span-6 relative">
            
            {/* Glowing Accent Frame */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-600/20 rounded-[32px] blur-xl opacity-75" />

            <div className="glass-gold rounded-3xl p-3 sm:p-5 relative overflow-hidden shadow-2xl border border-amber-500/30 group">
              
              {/* Header inside frame */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-3 text-xs">
                <span className="text-amber-400 font-black flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Official Brand Poster
                </span>
                <button
                  onClick={() => onOpenImage('/jainik-poster-marathi.png', 'Jainik Official Poster', 'शक्ती जी आहे नैसर्गिक व परंपरेची! • 100% Natural')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-amber-400 transition-all font-bold text-[11px]"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Click to Expand</span>
                </button>
              </div>

              {/* Poster Image Container */}
              <div 
                onClick={() => onOpenImage('/jainik-poster-marathi.png', 'Jainik Official Poster', 'शक्ती जी आहे नैसर्गिक व परंपरेची! • 100% Natural')}
                className="relative rounded-2xl overflow-hidden bg-black/60 cursor-pointer group/poster"
              >
                <img 
                  src="/jainik-poster-marathi.png" 
                  alt="Jainik Built on Purity Official Tradition Poster" 
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover/poster:scale-105"
                />
                
                {/* Floating Inspection Prompt */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/poster:opacity-100 transition-opacity flex items-end justify-center pb-5">
                  <span className="bg-slate-900/90 text-amber-300 text-xs font-black px-4 py-2 rounded-full border border-amber-500/50 shadow-2xl flex items-center gap-2">
                    <ZoomIn className="w-4 h-4" /> Tap to view high-res details
                  </span>
                </div>
              </div>

              {/* Footer info below poster */}
              <div className="mt-3 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-slate-300">100% Pure Vegetarian</span>
                <span className="text-amber-400 font-black">Handmade in Maharashtra</span>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Heritage Tabs & Value Pillars */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Interactive Tab Buttons */}
            <div className="flex rounded-2xl bg-slate-950/80 p-1.5 border border-slate-800 text-xs font-black">
              {pillars.map(p => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`flex-1 py-3 px-2 rounded-xl transition-all text-center ${
                    activeTab === p.id
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {p.id === 'heritage' && 'Ancestral Tradition'}
                  {p.id === 'purity' && '100% Purity'}
                  {p.id === 'recovery' && 'Active Recovery'}
                </button>
              ))}
            </div>

            {/* Active Tab Content Card */}
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

              {/* Bullet Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {current.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-200">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Manufacturer Order Strip */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs font-black text-amber-400 block">Questions about Bulk Orders or Ingredients?</span>
                <span className="text-xs text-slate-400">Connect with our founders directly on WhatsApp</span>
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
