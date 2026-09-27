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
    <section className="py-24 bg-warm-100 text-warm-900 relative border-t border-warm-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="badge-toasted">
            <HelpCircle className="w-3.5 h-3.5 text-warm-600" />
            <span>Customer Clarifications</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-warm-900 tracking-tight">
            Frequently Asked <span className="text-warm-600">Questions</span>
          </h2>
          <p className="text-warm-700 text-base sm:text-lg">
            Everything you need to know about Jainik Energy Bars, packaging, dispatch, and WhatsApp ordering.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="card-artisanal border border-warm-200 overflow-hidden transition-all bg-white"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-warm-900 text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-xl bg-warm-100 flex items-center justify-center text-warm-700 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-warm-200' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-warm-700 text-sm sm:text-base leading-relaxed border-t border-warm-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl card-parchment text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <h4 className="font-bold text-warm-900 text-lg">Have more custom inquiries or wholesale questions?</h4>
            <p className="text-xs text-warm-600">Chat directly with the founder and management on WhatsApp.</p>
          </div>
          <button 
            onClick={() => openWhatsAppDirectChat('Hi Jainik Team, I have a query about Jainik Energy Bar.')}
            className="w-full sm:w-auto px-6 py-3.5 btn-whatsapp-pill text-xs flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WhatsApp: 9325578244</span>
          </button>
        </div>

      </div>
    </section>
  );
}
