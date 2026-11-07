import React, { useState } from 'react';
import { FlaskConical, MessageSquare } from 'lucide-react';
import { UPCOMING_PRODUCTS } from '../data/products';
import { submitMessage } from '../utils/api';
import { openWhatsAppDirectChat, DISPLAY_PHONE_NUMBER } from '../utils/whatsapp';

export default function UpcomingProducts() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    productId: UPCOMING_PRODUCTS[0]?.id || '',
    note: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const selected = UPCOMING_PRODUCTS.find((item) => item.id === form.productId) || UPCOMING_PRODUCTS[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const message = [
      'PRE-ORDER SAMPLE / RESEARCH',
      `Product: ${selected?.name || form.productId}`,
      `City: ${form.city.trim() || 'Not shared'}`,
      form.note.trim() ? `Note: ${form.note.trim()}` : '',
      'This person wants a sample to help Jainik research the upcoming bar.',
    ].filter(Boolean).join('\n');

    const saved = await submitMessage({
      name: form.name.trim(),
      phone: form.phone.trim(),
      message,
    });

    setSubmitting(false);
    if (saved.success) {
      setResult({
        ok: true,
        text: 'Sample request saved. We will reach you on WhatsApp about the research sample.',
      });
      setForm((prev) => ({ ...prev, note: '' }));
      return;
    }
    setResult({
      ok: false,
      text: saved.error || 'The request was not saved. Message us on WhatsApp and we will note the sample by hand.',
    });
  };

  return (
    <section id="upcoming" className="py-16 bg-[#FDFBF7] text-[#281A14]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3E8DD] border border-[#D8C08A] text-xs font-black uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5 text-[#C9A46C]" />
            Upcoming
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#241611]">
            Bars still in research
          </h1>
          <p className="text-sm text-[#3D2211]">
            These are not on sale yet. Request a pre-order sample so we can learn what to change before a full batch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {UPCOMING_PRODUCTS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, productId: item.id }))}
              className={`text-left p-5 rounded-2xl border bg-white ${
                form.productId === item.id
                  ? 'border-[#C9A46C] ring-2 ring-[#C9A46C]/40'
                  : 'border-[#D8C08A]/50'
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C9A46C]">Research sample</span>
              <h2 className="text-lg font-black text-[#241611] mt-1">{item.name}</h2>
              <p className="text-xs text-[#5C361D] mt-2">{item.note}</p>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white border border-[#D8C08A]/50 rounded-3xl p-6 space-y-3">
          <h2 className="text-lg font-black text-[#241611]">Request a pre-order sample</h2>
          <p className="text-xs text-[#5C361D]">
            We save this only when the server accepts it. Updates about the sample come on WhatsApp {DISPLAY_PHONE_NUMBER}.
          </p>
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-[#FAF6F0] border border-[#D8C08A]/60 rounded-xl px-3 py-2.5 text-xs"
          />
          <input
            required
            type="tel"
            placeholder="WhatsApp number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-[#FAF6F0] border border-[#D8C08A]/60 rounded-xl px-3 py-2.5 text-xs"
          />
          <input
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full bg-[#FAF6F0] border border-[#D8C08A]/60 rounded-xl px-3 py-2.5 text-xs"
          />
          <textarea
            rows={3}
            placeholder="What should we learn from your sample? Taste, sweetness, crunch..."
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="w-full bg-[#FAF6F0] border border-[#D8C08A]/60 rounded-xl px-3 py-2.5 text-xs resize-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-[#241611] text-[#C9A46C] text-xs font-black disabled:opacity-60"
          >
            {submitting ? 'Saving request...' : `Request sample: ${selected?.name || 'Upcoming bar'}`}
          </button>
          {result && (
            <p className={`text-xs font-medium ${result.ok ? 'text-[#5C7548]' : 'text-rose-700'}`}>{result.text}</p>
          )}
          <button
            type="button"
            onClick={() => openWhatsAppDirectChat(`Hi Jainik Team, I want a research sample of ${selected?.name || 'an upcoming bar'}.`)}
            className="w-full py-2.5 rounded-xl border border-[#D8C08A] text-xs font-bold flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Ask about samples on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
