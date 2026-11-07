import React, { useState } from 'react';
import { ClipboardList, MessageSquare } from 'lucide-react';
import { checkPhoneOrdered } from '../utils/api';
import { localOrdersForPhone } from '../utils/orderStore';
import { DISPLAY_PHONE_NUMBER, openWhatsAppOrderUpdate } from '../utils/whatsapp';

export default function OrderHistory() {
  const [phone, setPhone] = useState('');
  const [lookup, setLookup] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLookup = async (e) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Enter a 10-digit phone number.');
      return;
    }
    setLoading(true);
    setError('');
    const info = await checkPhoneOrdered(phone);
    setLookup(info);
    setOrders(localOrdersForPhone(phone));
    setLoading(false);
  };

  return (
    <section id="orders" className="py-20 bg-white text-[#281A14] border-t border-[#D8C08A]/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3E8DD] border border-[#D8C08A] text-xs font-black uppercase tracking-wider">
            <ClipboardList className="w-3.5 h-3.5" />
            Order history
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#241611]">Your orders</h2>
          <p className="text-sm text-[#3D2211]">
            Payment and order updates are shared on WhatsApp {DISPLAY_PHONE_NUMBER}. Full order lines saved on this phone or computer appear below after a successful order.
          </p>
        </div>

        <form onSubmit={handleLookup} className="flex gap-2 mb-6">
          <input
            type="tel"
            required
            placeholder="WhatsApp number used on the order"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 bg-[#FAF6F0] border border-[#D8C08A]/70 rounded-xl px-3 py-3 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 rounded-xl bg-[#241611] text-[#C9A46C] text-xs font-black"
          >
            {loading ? 'Checking...' : 'Look up'}
          </button>
        </form>

        {error && <p className="text-xs text-rose-700 mb-4">{error}</p>}

        {lookup && (
          <div className="rounded-2xl border border-[#D8C08A]/50 bg-[#FAF6F0] p-4 mb-4 text-sm">
            <p className="font-black text-[#241611]">
              {lookup.has_ordered
                ? `${lookup.order_count} order${lookup.order_count === 1 ? '' : 's'} on file for this number`
                : 'No past order found for this number'}
            </p>
            <p className="text-xs text-[#5C361D] mt-1">
              Customer type: {(lookup.customer_type || 'FIRST_TIME').replace(/_/g, ' ')}
              {lookup.eligible_for_first_order_discount ? ' • FIRST10 is available' : ' • FIRST10 already used'}
            </p>
          </div>
        )}

        {lookup && orders.length === 0 && (
          <p className="text-xs text-[#5C361D] mb-4">
            The server confirms how many orders exist. Item details show here when the order was placed successfully in this browser.
          </p>
        )}

        <div className="space-y-3">
          {orders.map((order) => (
            <article key={order.orderRef} className="rounded-2xl border border-[#D8C08A]/50 p-4 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black text-[#241611]">{order.orderRef}</h3>
                  <p className="text-[11px] text-[#5C361D]">
                    {new Date(order.createdAt).toLocaleString('en-IN')} • {order.paymentMethod === 'cod' ? 'Cash on delivery' : 'Prepaid'} • {order.deliveryMode === 'express' ? 'Express' : 'Standard'}
                  </p>
                </div>
                <span className="font-black text-[#241611]">₹{order.total}</span>
              </div>
              <ul className="mt-2 text-xs text-[#3D2211] space-y-1">
                {(order.items || []).map((item, index) => (
                  <li key={`${order.orderRef}-${index}`}>
                    {item.name} × {item.qty || item.quantity} — ₹{item.price}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => openWhatsAppOrderUpdate(order.orderRef)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-[#241611]"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Payment or order update on WhatsApp
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
