import React from 'react';
import { DELIVERY_FEES } from '../data/products';

export default function CheckoutOptions({
  paymentMethod,
  setPaymentMethod,
  deliveryMode,
  setDeliveryMode,
  couponCode,
  setCouponCode,
  onApplyCoupon,
  couponStatus,
  summary,
}) {
  return (
    <div className="space-y-3">
      <div>
        <span className="block text-xs font-black uppercase tracking-wider text-warm-800 mb-1.5">
          Payment
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setPaymentMethod('prepaid')}
            className={`p-2.5 rounded-xl text-left text-xs border ${
              paymentMethod === 'prepaid'
                ? 'border-[#241611] bg-[#241611] text-[#FFFBED]'
                : 'border-warm-300 bg-white text-warm-800'
            }`}
          >
            <span className="font-black block">Prepaid / UPI</span>
            <span className="text-[10px] opacity-80">Special offer applies</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('cod')}
            className={`p-2.5 rounded-xl text-left text-xs border ${
              paymentMethod === 'cod'
                ? 'border-[#241611] bg-[#241611] text-[#FFFBED]'
                : 'border-warm-300 bg-white text-warm-800'
            }`}
          >
            <span className="font-black block">Cash on delivery</span>
            <span className="text-[10px] opacity-80">No special offer</span>
          </button>
        </div>
      </div>

      <div>
        <span className="block text-xs font-black uppercase tracking-wider text-warm-800 mb-1.5">
          Delivery
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setDeliveryMode('standard')}
            className={`p-2.5 rounded-xl text-left text-xs border ${
              deliveryMode === 'standard'
                ? 'border-[#5C7548] bg-[#5C7548] text-white'
                : 'border-warm-300 bg-white text-warm-800'
            }`}
          >
            <span className="font-black block">Standard ₹{DELIVERY_FEES.standard}</span>
            <span className="text-[10px] opacity-80">Added to the pack price</span>
          </button>
          <button
            type="button"
            onClick={() => setDeliveryMode('express')}
            className={`p-2.5 rounded-xl text-left text-xs border ${
              deliveryMode === 'express'
                ? 'border-[#5C7548] bg-[#5C7548] text-white'
                : 'border-warm-300 bg-white text-warm-800'
            }`}
          >
            <span className="font-black block">Express ₹{DELIVERY_FEES.express}</span>
            <span className="text-[10px] opacity-80">Extra charge for faster dispatch</span>
          </button>
        </div>
      </div>

      <div>
        <span className="block text-xs font-black uppercase tracking-wider text-warm-800 mb-1.5">
          Coupon
        </span>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="FIRST10"
            className="flex-1 bg-warm-50 border border-warm-300 rounded-xl px-3 py-2 text-xs font-bold tracking-wide"
          />
          <button
            type="button"
            onClick={onApplyCoupon}
            className="px-3 rounded-xl bg-[#F3E8DD] border border-[#D8C08A] text-xs font-black text-[#241611]"
          >
            Apply
          </button>
        </div>
        {couponStatus?.text && (
          <p className={`text-[11px] mt-1 font-medium ${couponStatus.ok ? 'text-[#5C7548]' : 'text-rose-700'}`}>
            {couponStatus.text}
          </p>
        )}
      </div>

      <div className="p-3.5 rounded-2xl bg-warm-100 border border-warm-300 text-xs space-y-1.5">
        <div className="flex justify-between text-warm-700">
          <span>Pack price</span>
          <span>₹{summary.regularSubtotal}</span>
        </div>
        {summary.specialSavings > 0 && (
          <div className="flex justify-between text-[#5C7548] font-bold">
            <span>Prepaid special offer</span>
            <span>-₹{summary.specialSavings}</span>
          </div>
        )}
        {paymentMethod === 'cod' && (
          <p className="text-[11px] text-warm-600">Cash on delivery uses the regular price. Special offers stay on prepaid orders.</p>
        )}
        {summary.couponDiscount > 0 && (
          <div className="flex justify-between text-[#5C7548] font-bold">
            <span>Coupon</span>
            <span>-₹{summary.couponDiscount}</span>
          </div>
        )}
        <div className="flex justify-between text-warm-700">
          <span>{deliveryMode === 'express' ? 'Express delivery' : 'Standard delivery'}</span>
          <span>₹{summary.deliveryFee}</span>
        </div>
        <div className="flex justify-between text-base font-black text-warm-950 pt-1 border-t border-warm-200">
          <span>Total</span>
          <span>₹{summary.total}</span>
        </div>
      </div>
    </div>
  );
}
