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
        { label: 'शारीरिक शक्ती', val: 'Physical Power', icon: Zap, color: 'text-warm-700' },
        { label: 'दिर्घकाळ शक्ती', val: 'Enduring Stamina', icon: Activity, color: 'text-sage-700' },
        { label: 'सहनशक्ती', val: 'High Resilience', icon: Flame, color: 'text-warm-600' },
        { label: 'मानसिक स्थिरता', val: 'Mental Focus', icon: Compass, color: 'text-warm-800' }
      ]
    },
    {
      id: 'purity',
      title: '100% Natural • Built on Purity',
      subtitle: 'Zero Compromise on Quality',
      desc: 'Formulated with no chemical preservatives, no synthetic colorings, and no refined syrups. Only whole food energy that your body instinctively recognizes and utilizes efficiently.',
      metrics: [
        { label: 'Zero Chemicals', val: '100% Toxin-Free', icon: ShieldCheck, color: 'text-sage-700' },
        { label: 'Zero Refined Sugar', val: 'Low GI Fruit Sweetness', icon: Sparkles, color: 'text-warm-600' },
        { label: 'FSSAI Certified', val: 'Lic. 21526066000742', icon: Award, color: 'text-warm-800' },
        { label: 'Pure Vegetarian', val: 'Ahimsa Sattvic Standard', icon: Heart, color: 'text-warm-700' }
      ]
    },
    {
      id: 'recovery',
      title: 'व्यायाम करणाऱ्यांसाठी आदर्श',
      subtitle: 'Engineered for Daily Activity',
      desc: 'Packed with 18.62g protein per 100g and rich prebiotic dietary fibre. Keeps glycogen stores replenished, accelerates lean muscle recovery, and prevents afternoon energy dips.',
      metrics: [
        { label: 'High Plant Protein', val: '18.62g per 100g', icon: Zap, color: 'text-warm-700' },
        { label: 'Prebiotic Fibre', val: '10g Dietary Fiber', icon: Activity, color: 'text-sage-700' },
        { label: 'Zero Trans Fat', val: '0mg Cholesterol', icon: Heart, color: 'text-warm-800' },
        { label: 'Sustained Energy', val: '4-6h Continuous Burn', icon: Flame, color: 'text-warm-600' }
      ]
    }
  ];

  const current = pillars.find(p => p.id === activeTab) || pillars[0];

  return (
    <section id="craft" className="py-24 bg-warm-100 text-warm-900 relative border-t border-warm-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="badge-sattvic">
            <Sparkles className="w-3.5 h-3.5 text-sage-500" />
            <span>शक्ती जी आहे नैसर्गिक व परंपरेची!</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-warm-900 tracking-tight">
            Ancestral Wisdom, <span className="text-warm-600">Modern Formulation</span>
          </h2>
          <p className="text-warm-700 text-base sm:text-lg">
            Every bar is crafted with the pure, time-honored superfoods our ancestors relied on for sustained endurance and daily vitality.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Purity Specifications Cockpit */}
          <div className="lg:col-span-6">
            <div className="card-artisanal p-6 sm:p-8 space-y-6 bg-white shadow-warm-md">
              
              <div className="flex items-center justify-between border-b border-warm-200 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-warm-500 block">JAINIK FOODS STANDARDS</span>
                  <h3 className="text-xl font-black text-warm-900">Built On Purity Specifications</h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-50 border border-sage-100 text-sage-700 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-sage-500 inline-block" />
                  <span>100% Certified</span>
                </div>
              </div>

              {/* 4 Metric Tiles */}
              <div className="grid grid-cols-2 gap-3.5">
                {current.metrics.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <div key={idx} className="card-parchment p-4 space-y-1.5 hover:border-warm-400 transition-all">
                      <div className="flex items-center justify-between">
                        <Icon className={`w-5 h-5 ${m.color}`} />
                        <span className="text-[10px] font-bold text-warm-400 uppercase">Metric</span>
                      </div>
                      <h4 className="text-base font-bold text-warm-900">{m.label}</h4>
                      <p className="text-xs font-extrabold text-warm-600">{m.val}</p>
                    </div>
                  );
                })}
              </div>

              {/* Verified Quality Specs */}
              <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 space-y-2 text-xs">
                <div className="flex items-center justify-between font-medium text-warm-700">
                  <span>Manufacturing Facility:</span>
                  <span className="font-bold text-warm-900">Chunapura, Karanja (Lad), Maharashtra</span>
                </div>
                <div className="flex items-center justify-between font-medium text-warm-700">
                  <span>FSSAI License:</span>
                  <span className="font-bold text-sage-700">21526066000742</span>
                </div>
                <div className="flex items-center justify-between font-medium text-warm-700">
                  <span>Chemicals & Preservatives:</span>
                  <span className="font-bold text-warm-900">0% (Strictly None)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Heritage Tabs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Interactive Tab Selectors */}
            <div className="flex rounded-2xl bg-warm-200/60 p-1.5 border border-warm-300 text-xs font-bold">
              {pillars.map(p => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`flex-1 py-3 px-3 rounded-xl transition-all text-center ${
                    activeTab === p.id
                      ? 'bg-warm-900 text-white shadow-sm font-black'
                      : 'text-warm-700 hover:text-warm-950'
                  }`}
                >
                  {p.id === 'heritage' && 'Ancestral Power'}
                  {p.id === 'purity' && '100% Purity'}
                  {p.id === 'recovery' && 'Active Recovery'}
                </button>
              ))}
            </div>

            {/* Active Tab Narrative Card */}
            <div className="card-artisanal p-6 sm:p-8 space-y-5 bg-white">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-warm-500 block mb-1">
                  {current.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-warm-900">
                  {current.title}
                </h3>
              </div>

              <p className="text-warm-700 text-sm sm:text-base leading-relaxed">
                {current.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-warm-50 border border-warm-200">
                  <CheckCircle2 className="w-4 h-4 text-sage-500 flex-shrink-0" />
                  <span className="text-xs font-bold text-warm-800">Slow-Roasted Whole Nuts</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-warm-50 border border-warm-200">
                  <CheckCircle2 className="w-4 h-4 text-sage-500 flex-shrink-0" />
                  <span className="text-xs font-bold text-warm-800">Zero Added Refined Sugar</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-warm-50 border border-warm-200">
                  <CheckCircle2 className="w-4 h-4 text-sage-500 flex-shrink-0" />
                  <span className="text-xs font-bold text-warm-800">Whole Medjool Dates</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-warm-50 border border-warm-200">
                  <CheckCircle2 className="w-4 h-4 text-sage-500 flex-shrink-0" />
                  <span className="text-xs font-bold text-warm-800">Natural Super Seeds</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Consultation Strip */}
            <div className="p-4 rounded-2xl bg-white border border-warm-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs font-black text-warm-900 block">Questions about Bulk Orders or Sourcing?</span>
                <span className="text-xs text-warm-500">Connect directly with our team on WhatsApp</span>
              </div>
              <button 
                onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to learn more about your ingredients and place an order!')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl btn-warm-secondary text-xs font-bold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-whatsapp-600 fill-whatsapp-600" />
                <span>Chat: 9325578244</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
