import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageSquare, Tag, Check, User, Phone, FileText, Crown } from 'lucide-react';
import { openWhatsAppOrder } from '../utils/whatsapp';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isReturningCustomer, setIsReturningCustomer] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Calculate discounts (Returning customer 10% or promo code 15%)
  const effectiveDiscountPercent = Math.max(discountPercent, isReturningCustomer ? 0.10 : 0);
  const discountAmount = Math.round(subtotal * effectiveDiscountPercent);
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'ENERGY15' || code === 'JAINIK15' || code === 'AHIMSA15') {
      setDiscountPercent(0.15);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try AHIMSA15 for 15% OFF!');
    }
  };

  const handleSendWhatsAppOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    openWhatsAppOrder({
      customerName,
      customerPhone,
      items: cartItems,
      total: grandTotal,
      notes,
      isReturningCustomer,
      discountAmount
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between text-slate-900">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-jain-blue flex items-center justify-center border border-blue-200">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">WhatsApp Order Cart</h2>
                <span className="text-xs font-bold text-slate-500">
                  {cartItems.reduce((a, b) => a + b.quantity, 0)} items • ₹80 / Bar
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* WhatsApp Direct Notice with Business Number */}
          <div className="bg-emerald-50 px-6 py-2.5 border-b border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-whatsapp-600 fill-whatsapp-600 flex-shrink-0" />
            <span>Sends directly to Official WhatsApp: <strong>9325578244</strong></span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Your Cart is Empty</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Choose from our signature flavors (₹80/bar) or custom 3, 6, 12, 24 packs.
                </p>
                <button 
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-jain-blue text-white font-bold text-xs shadow-md"
                >
                  Browse Flavors
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 space-y-0.5">
                        <span className="text-[10px] font-black uppercase text-jain-orange block">
                          {item.badge || 'Single Bar'}
                        </span>
                        <h4 className="font-extrabold text-slate-900 text-sm line-clamp-1">{item.name}</h4>
                        <span className="text-xs text-jain-blue font-black block">
                          ₹{(item.price * item.quantity).toFixed(0)}
                        </span>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-slate-300 bg-white rounded-lg">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-slate-500 hover:text-slate-900"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 font-black text-slate-900 text-xs">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-slate-500 hover:text-slate-900"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Returning Customer Privilege Toggle */}
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-jain-orange" />
                    <div>
                      <span className="text-xs font-black text-slate-900 block">Returning Customer?</span>
                      <span className="text-[10px] text-slate-600">Get 10% repeat order loyalty discount</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsReturningCustomer(!isReturningCustomer)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                      isReturningCustomer 
                        ? 'bg-jain-orange text-white' 
                        : 'bg-white border border-slate-300 text-slate-700'
                    }`}
                  >
                    {isReturningCustomer ? '✓ 10% Applied' : '+ Claim'}
                  </button>
                </div>

                {/* Contact Information for WhatsApp */}
                <form onSubmit={handleSendWhatsAppOrder} className="pt-3 border-t border-slate-200 space-y-2.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">
                    Your Contact Details (Sent to 9325578244)
                  </h4>
                  
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      required
                      placeholder="Your Full Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-jain-blue font-medium"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="tel" 
                      required
                      placeholder="Your WhatsApp / Mobile Number *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-jain-blue font-medium"
                    />
                  </div>

                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <textarea 
                      placeholder="Delivery address / special requirement note..."
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-jain-blue font-medium"
                    />
                  </div>

                </form>
              </>
            )}
          </div>

          {/* Cart Footer & WhatsApp Submission */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3.5">
              
              {/* Promo Code Input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Coupon code (AHIMSA15)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-jain-blue uppercase font-bold"
                  />
                </div>
                <button 
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-xs rounded-xl"
                >
                  Apply
                </button>
              </div>

              {promoApplied && (
                <div className="text-xs text-jain-green font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> 15% Ahimsa Discount Applied! (-₹{discountAmount})
                </div>
              )}
              {promoError && (
                <div className="text-xs text-rose-600 font-bold">{promoError}</div>
              )}

              {/* Subtotal breakdown */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-jain-orange font-bold">
                    <span>{isReturningCustomer ? 'Returning VIP Discount' : 'Coupon Discount'}</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-jain-green font-bold">FREE Express Delivery</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-jain-blue text-xl">₹{grandTotal.toFixed(0)}</span>
                </div>
              </div>

              {/* Submit via WhatsApp CTA */}
              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-whatsapp-600 to-whatsapp-500 hover:from-whatsapp-500 hover:to-whatsapp-600 text-white font-extrabold text-sm shadow-lg shadow-whatsapp-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-5 h-5 fill-white" /> Send WhatsApp Order to 9325578244
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
