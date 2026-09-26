import React, { useState } from 'react';
import { FAQS } from '../data/products';
import { ChevronDown, HelpCircle, MessageSquare, Sparkles } from 'lucide-react';
import { openWhatsAppDirectChat } from '../utils/whatsapp';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-28 bg-[#070B14] text-slate-100 relative border-t border-amber-500/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-black shadow-lg">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Customer Clarifications</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Frequently Asked <span className="text-gold-gradient">Questions</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Everything you need to know about Jainik Energy Bars, packaging, dispatch, and WhatsApp ordering.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="glass-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 shadow-xl"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-black text-white text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400 transition-transform duration-300 ${isOpen ? 'rotate-180 border-amber-400 bg-amber-500/10' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800/80 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl glass-gold border border-amber-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          <div className="text-left space-y-1">
            <h4 className="font-black text-white text-lg">Have more custom inquiries or wholesale questions?</h4>
            <p className="text-xs text-slate-400">Chat directly with the founder and management on WhatsApp.</p>
          </div>
          <button 
            onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I have a query about Jainik Energy Bar.')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-whatsapp-600 to-whatsapp-500 hover:from-whatsapp-500 hover:to-whatsapp-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-whatsapp-500/30 transition-all hover:scale-105"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WhatsApp: 9325578244</span>
          </button>
        </div>

      </div>
    </section>
  );
}
