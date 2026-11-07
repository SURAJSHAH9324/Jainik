import React, { useEffect, useState } from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, CheckCircle, Quote, Sparkles, Send, Loader2 } from 'lucide-react';
import { getPublicReviews, submitReview } from '../utils/api';

function mapApiReview(r) {
  return {
    name: r.customer_name,
    role: 'Verified Buyer',
    content: r.comment,
    rating: r.rating,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(r.customer_name || 'J')}`,
    fromApi: true,
  };
}

export default function Testimonials() {
  const [reviews, setReviews] = useState(TESTIMONIALS);
  const [form, setForm] = useState({ name: '', phone: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const apiReviews = await getPublicReviews(12);
      if (cancelled || !Array.isArray(apiReviews) || apiReviews.length === 0) return;
      const mapped = apiReviews.map(mapApiReview);
      setReviews([...mapped, ...TESTIMONIALS].slice(0, 9));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormMessage('');
    try {
      const res = await submitReview(form);
      setFormMessage(res.message || 'Review submitted!');
      setForm({ name: '', phone: '', rating: 5, comment: '' });
    } catch (err) {
      setFormMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-24 bg-warm-50 text-warm-900 relative border-t border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="badge-toasted">
            <Sparkles className="w-3.5 h-3.5 text-warm-600" />
            <span>Customer & Practitioner Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-warm-900 tracking-tight">
            Loved By <span className="text-warm-600">Daily Health Seekers</span>
          </h2>
          <p className="text-warm-700 text-base sm:text-lg">
            Over 2,850+ athletes, marathoners, fitness coaches, and wellness families rely on Jainik for clean daily fuel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <div 
              key={`${item.name}-${idx}`}
              className="card-artisanal p-7 flex flex-col justify-between relative bg-white"
            >
              <Quote className="absolute top-6 right-6 w-7 h-7 text-warm-200" />

              <div className="space-y-3.5">
                <div className="flex text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="text-warm-700 text-sm leading-relaxed italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-warm-100 flex items-center gap-3.5">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-11 h-11 rounded-full object-cover border-2 border-warm-300"
                />
                <div>
                  <h4 className="font-bold text-warm-900 text-sm flex items-center gap-1.5">
                    {item.name}
                    <CheckCircle className="w-3.5 h-3.5 text-sage-500" />
                  </h4>
                  <p className="text-xs text-warm-500">{item.role}</p>
                  <span className="text-[10px] text-warm-600 font-bold block mt-0.5">
                    Verified WhatsApp Buyer
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="mt-16 max-w-xl mx-auto card-artisanal p-6 bg-white">
          <h3 className="text-lg font-black text-warm-900 mb-1">Share your experience</h3>
          <p className="text-xs text-warm-600 mb-4">
            Only customers who have ordered can submit a review. Approved reviews appear above.
          </p>
          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <input
              type="text"
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3 py-2.5 text-xs"
            />
            <input
              type="tel"
              required
              placeholder="WhatsApp number (10 digits)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3 py-2.5 text-xs"
            />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, rating: n })}
                  className="p-1"
                  aria-label={`${n} stars`}
                >
                  <Star className={`w-5 h-5 ${n <= form.rating ? 'fill-amber-500 text-amber-500' : 'text-warm-200'}`} />
                </button>
              ))}
            </div>
            <textarea
              required
              rows={3}
              placeholder="Your review"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3 py-2 text-xs resize-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl btn-warm-primary text-xs font-bold flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Submit review
            </button>
            {formMessage && (
              <p className="text-xs text-center text-warm-700 font-medium">{formMessage}</p>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
