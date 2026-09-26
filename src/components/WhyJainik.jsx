import React from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, MessageSquare, Award } from 'lucide-react';
import { openWhatsAppDirectChat } from '../utils/whatsapp';

export default function WhyJainik() {
  const coreFeatures = [
    { title: '100% Natural', desc: 'No preservatives, no chemicals, no artificial colours', dot: 'bg-emerald-500' },
    { title: 'ऊर्जा आणि स्टॅमिना वाढवते', desc: 'Natural instant stamina that sustains your physical energy throughout the day', dot: 'bg-amber-500' },
    { title: 'प्रथिने, फायबर आणि खनिजांचा समृद्ध स्रोत', desc: 'Rich source of high protein, dietary fibre, and vital minerals', dot: 'bg-blue-500' },
    { title: 'भरपूर प्रथिने (High Protein)', desc: 'Roasted nuts, seeds, and roasted chana power muscle recovery', dot: 'bg-rose-500' }
  ];

  return (
    <section id="poster" className="py-24 bg-slate-950 text-slate-100 relative border-y border-slate-800">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-black">
            <Sparkles className="w-4 h-4 text-amber-400" /> शक्ती जी आहे नैसर्गिक व परंपरेची!
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Our Ancestral Strength, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">In Your Hands</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            पूर्वीच्या काळामध्ये लोक आपली नैसर्गिक ताकद या नैसर्गिक आणि पौष्टिक घटकांचा वापर करत. त्याच परंपरेचा आधुनिक आणि स्वादिष्ट अवतार म्हणजे <strong>जैनिक एनर्जी बार</strong>.
          </p>
        </div>

        {/* User-Provided Official Posters Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: User's Official Marathi Tradition Poster */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 group bg-slate-900">
              <img 
                src="/jainik-poster-marathi.png" 
                alt="Jainik Built on Purity Official Tradition Poster" 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300 font-bold">
                <span>Official Jainik Foods Poster</span>
                <span className="text-amber-400">100% Natural • Zero Chemicals</span>
              </div>
            </div>
          </div>

          {/* Right: Key Philosophy & Benefits Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-amber-400 block">
                The 4 Core Pillars of Ancient Power
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                शारीरिक शक्ती • दिर्घकाळ शक्ती • सहनशक्ती • मानसिक स्थिरता
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                आजच्या धकाधकीच्या जीवनासाठी एक परिपूर्ण साथी! Jainik brings you authentic nutrition crafted from pure dry fruits, seeds, roasted chana, dates, and pure jaggery.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-3">
              {coreFeatures.map((f, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-4">
                  <div className={`w-3.5 h-3.5 rounded-full ${f.dot} flex-shrink-0 mt-1 shadow-sm`} />
                  <div>
                    <h4 className="font-black text-white text-sm sm:text-base">{f.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct WhatsApp Callout Banner */}
            <div className="pt-2">
              <button 
                onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I would like to order Jainik Energy Bars!')}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-whatsapp-600 to-whatsapp-500 hover:from-whatsapp-500 hover:to-whatsapp-600 text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-whatsapp-500/25 transition-all"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>Chat Directly on WhatsApp: 9325578244 / 9922322906</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
