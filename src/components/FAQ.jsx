import React, { useState } from 'react';
import { FAQS } from '../data/products';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { openWhatsAppDirectChat } from '../utils/whatsapp';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold">
            <HelpCircle className="w-4 h-4 text-brand-600" /> Have Questions?
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked <span className="text-gradient-sage">Questions</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Everything you need to know about Jainik organic bars, ingredients, shipping, and WhatsApp ordering.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="glass-panel-light rounded-2xl border border-slate-200 overflow-hidden transition-all bg-white shadow-sm"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-slate-900 text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-brand-700 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-brand-100' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-slate-700 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-brand-50 border border-brand-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <h4 className="font-bold text-slate-900 text-base">Have more custom questions?</h4>
            <p className="text-xs text-slate-600">Chat live with our nutrition team directly on WhatsApp!</p>
          </div>
          <button 
            onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I have a question before placing my order.')}
            className="px-5 py-3 rounded-xl bg-whatsapp-500 hover:bg-whatsapp-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-white" /> WhatsApp: 9325578244
          </button>
        </div>

      </div>
    </section>
  );
}
