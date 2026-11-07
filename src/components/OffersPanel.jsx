import React from 'react';
import { Tag } from 'lucide-react';
import { DELIVERY_FEES, PACKS } from '../data/products';

export default function OffersPanel() {
  const specials = PACKS.filter((pack) => pack.specialPrice);

  return (
    <section id="offers" className="max-w-3xl mx-auto mb-10 rounded-2xl border border-[#D8C08A] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-4 h-4 text-[#C9A46C]" />
        <h3 className="text-sm font-black text-[#241611] uppercase tracking-wide">Offers</h3>
      </div>
      <ul className="space-y-2 text-xs text-[#3D2211]">
        <li className="rounded-xl bg-[#F3E8DD] px-3 py-2">
          <span className="font-black block">FIRST10 — first purchase</span>
          10% off when this phone number has never ordered. Applied at checkout after the server confirms it.
        </li>
        {specials.map((pack) => (
          <li key={pack.size} className="rounded-xl bg-[#FAF6F0] px-3 py-2 border border-[#D8C08A]/40">
            <span className="font-black block">
              {pack.label}: ₹{pack.regularPrice} → prepaid ₹{pack.specialPrice}
            </span>
            Cash on delivery stays at ₹{pack.regularPrice}. Special offer does not apply on COD.
          </li>
        ))}
        <li className="rounded-xl bg-[#FAF6F0] px-3 py-2 border border-[#D8C08A]/40">
          <span className="font-black block">Delivery is extra</span>
          Standard ₹{DELIVERY_FEES.standard}. Express ₹{DELIVERY_FEES.express}.
        </li>
        <li className="rounded-xl bg-[#FAF6F0] px-3 py-2 border border-[#D8C08A]/40">
          <span className="font-black block">AHIMSA15</span>
          15% off the pack price. One coupon per order. It does not replace the COD rule.
        </li>
      </ul>
    </section>
  );
}
