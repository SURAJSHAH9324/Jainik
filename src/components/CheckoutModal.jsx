import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, Sparkles, Truck } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, checkoutData, onCompleteOrder }) {
  const [formData, setFormData] = useState({
    name: 'Alex Vance',
    email: 'alex.vance@example.com',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    zip: '94107',
    cardNumber: '4242 •••• •••• 4242'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen || !checkoutData) return null;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      setOrderId('JNK-' + Math.floor(100000 + Math.random() * 900000));
    }, 1500);
  };

  const handleFinish = () => {
    setOrderComplete(false);
    onCompleteOrder();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderComplete ? (
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Lock className="w-4 h-4" /> 256-Bit Encrypted Secure Checkout
            </div>

            <h3 className="text-2xl font-extrabold text-slate-100">
              Complete Your Jainik Order
            </h3>

            {/* Order Summary Summary Pill */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-400 block">Total Items</span>
                <span className="font-bold text-slate-200">
                  {checkoutData.cartItems?.reduce((a, b) => a + b.quantity, 0)} Items
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block">Amount Payable</span>
                <span className="text-lg font-black text-amber-400">
                  ${(checkoutData.grandTotal || 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Contact & Shipping Info */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-400">Shipping Address</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
                />
                <input 
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <input 
                type="text"
                required
                placeholder="Street Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="text"
                  required
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
                />
                <input 
                  type="text"
                  required
                  placeholder="ZIP / Postal Code"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-400">Payment Information</h4>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  required
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  Processing Order...
                </>
              ) : (
                <>
                  Pay ${(checkoutData.grandTotal || 0).toFixed(2)} & Complete Order
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 30-Day Money Back Energy Guarantee
            </div>

          </form>
        ) : (
          /* Order Confirmation Screen */
          <div className="text-center space-y-6 py-4">
            
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Order Confirmed</span>
              <h3 className="text-2xl font-black text-slate-100 mt-1">Thank You For Fueling With Jainik!</h3>
              <p className="text-xs text-slate-400 mt-1">Order #{orderId} • Confirmation email sent to {formData.email}</p>
            </div>

            {/* Order Receipt Box */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-left space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-300 font-bold border-b border-slate-800 pb-2">
                <span>Shipping To</span>
                <span className="text-amber-400">{formData.name}</span>
              </div>
              <p className="text-slate-400">{formData.address}, {formData.city} {formData.zip}</p>

              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-slate-200">
                <span>Estimated Delivery</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> 2-3 Business Days
                </span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20"
            >
              Back to Home
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
