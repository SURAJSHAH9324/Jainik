import React, { useState } from 'react';
import { Sparkles, Check, RotateCcw, X, MessageSquare } from 'lucide-react';
import { openWhatsAppOrder } from '../utils/whatsapp';

export default function EnergyQuiz({ isOpen, onClose, products, onAddToCart }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: '',
    flavor: '',
    diet: ''
  });
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleSelect = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    if (step < 3) {
      setStep(step + 1);
    } else {
      let recommended = products[0];
      if (updated.flavor === 'saffron' || updated.goal === 'vitality') {
        recommended = products.find(p => p.id === 'saffron-cashew') || products[1];
      } else if (updated.flavor === 'berry' || updated.goal === 'endurance') {
        recommended = products.find(p => p.id === 'wild-berry') || products[2];
      } else if (updated.flavor === 'peanut' || updated.diet === 'max-protein') {
        recommended = products.find(p => p.id === 'peanut-flax') || products[3];
      } else {
        recommended = products.find(p => p.id === 'dark-cocoa') || products[0];
      }
      setResult(recommended);
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ goal: '', flavor: '', diet: '' });
    setResult(null);
  };

  const handleDirectWhatsAppOrder = () => {
    openWhatsAppOrder({
      customerName: 'Quiz Matched Client',
      customerPhone: '',
      items: [{ name: result.name, quantity: 3, price: 80 }],
      total: 240,
      notes: `Matched via Energy Quiz for Goal: ${answers.goal || 'General Health'} (Starter 3-Pack)`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-900">
        
        {/* Pancha Varna Ribbon Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 pancha-varna-stripe" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-jain-blue text-xs font-black uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-jain-orange" /> Energy Match Quiz • Step {step > 3 ? 3 : step} of 3
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900">
              What is your primary daily fitness & health goal?
            </h3>
            <div className="space-y-3">
              {[
                { id: 'workout', title: '⚡ Pre-Workout Power & Stamina', desc: 'Sustained endurance before running, gym, or cycling.' },
                { id: 'vitality', title: '🧘 Mental Focus, Meditation & Office Work', desc: 'Stress resilience, calm cognitive sharpness with Kesar.' },
                { id: 'endurance', title: '🏃 Long Distance Sports & Hiking', desc: 'Electrolytes, healthy fats and zero-crash dates fuel.' },
                { id: 'snack', title: '🌱 Sattvic Pure Daily Snack', desc: 'Zero added sugar, 100% vegetarian afternoon boost.' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect('goal', opt.id)}
                  className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-jain-blue/40 text-left transition-all group"
                >
                  <h4 className="font-extrabold text-slate-900 group-hover:text-jain-blue text-base">{opt.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900">
              Which natural flavor profile do you crave most?
            </h3>
            <div className="space-y-3">
              {[
                { id: 'cocoa', title: '🍫 72% Dark Ghanaian Cocoa & Almonds', desc: 'Deep rich chocolate crunch with whole nuts.' },
                { id: 'saffron', title: '🍯 Royal Kashmiri Saffron & Roasted Cashew', desc: 'Aromatic elaichi, saffron essence, and cashew nuts.' },
                { id: 'berry', title: '🍓 Wild Cranberry & Beetroot Nitric Oxide', desc: 'Tart berry antioxidants and vascular pump.' },
                { id: 'peanut', title: '🥜 Slow-Roasted Peanut & Golden Flax', desc: 'Creamy high-protein nutty texture with pink salt.' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect('flavor', opt.id)}
                  className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-jain-blue/40 text-left transition-all group"
                >
                  <h4 className="font-extrabold text-slate-900 group-hover:text-jain-blue text-base">{opt.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900">
              What is your primary dietary preference?
            </h3>
            <div className="space-y-3">
              {[
                { id: 'max-protein', title: '💪 High Plant Protein (18g/bar)', desc: 'Fermented pea & sprouted rice protein for muscle repair.' },
                { id: 'sattvic', title: '✨ 100% Sattvic Ahimsa Purity', desc: 'Strict vegetarian, no non-veg enzymes, zero gelatin.' },
                { id: 'low-gi', title: '🍃 Low Glycemic Index & 0g Added Sugar', desc: 'Sweetened only with whole dates for smooth energy release.' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect('diet', opt.id)}
                  className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-jain-blue/40 text-left transition-all group"
                >
                  <h4 className="font-extrabold text-slate-900 group-hover:text-jain-blue text-base">{opt.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && result && (
          <div className="space-y-6 text-center">
            
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-black text-xs">
              <Check className="w-4 h-4 text-emerald-600" /> 99.4% Energy Match Found!
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900">
                Your Ideal Jainik Match:
              </h3>
              <p className="text-jain-blue font-black text-xl mt-1">
                {result.name}
              </p>
            </div>

            {/* Recommended Product Box with Photo */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left flex gap-4 items-center">
              <img 
                src={result.image} 
                alt={result.name} 
                className="w-24 h-24 rounded-xl object-cover border border-slate-200 flex-shrink-0"
              />
              <div className="space-y-1">
                <p className="text-xs text-slate-700 leading-relaxed line-clamp-2">
                  {result.description}
                </p>
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 pt-1 border-t border-slate-200">
                  <span>{result.protein} Protein • {result.calories} kcal</span>
                  <span className="text-jain-orange font-black">₹{result.price} / Bar</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleReset}
                className="p-3.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center gap-2 text-sm font-bold"
              >
                <RotateCcw className="w-4 h-4" /> Retake
              </button>
              <button
                onClick={handleDirectWhatsAppOrder}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-whatsapp-600 to-whatsapp-500 hover:from-whatsapp-500 hover:to-whatsapp-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-whatsapp-500/25"
              >
                <MessageSquare className="w-4 h-4 fill-white" /> Order via WhatsApp (9325578244)
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
