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
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

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

    const newId = 'JNK-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newId);

    openWhatsAppOrder({
      customerName,
      customerPhone,
      items: cartItems,
      total: grandTotal,
      notes,
      isReturningCustomer,
      discountAmount
    });

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-warm-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-warm-200 shadow-warm-xl flex flex-col justify-between text-warm-900">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-warm-200 flex items-center justify-between bg-warm-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warm-100 text-warm-800 flex items-center justify-center border border-warm-300">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-warm-900">WhatsApp Order Cart</h2>
                <span className="text-xs font-bold text-warm-600">
                  {cartItems.reduce((a, b) => a + b.quantity, 0)} items • ₹80 / Bar
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-warm-100 text-warm-500 hover:text-warm-900 hover:bg-warm-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* WhatsApp Direct Notice with Business Number */}
          <div className="bg-sage-50 px-6 py-2.5 border-b border-sage-100 text-xs text-sage-900 font-bold flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-whatsapp-600 fill-whatsapp-600 flex-shrink-0" />
            <span>Sends directly to Official WhatsApp: <strong>9325578244</strong></span>
          </div>

          {/* Cart Items List or Success Confirmation */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-5 py-8 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Order Placed Successfully! 🎉
                  </span>
                  <h3 className="text-xl font-black text-warm-950 pt-2">
                    Thank You, {customerName || 'Valued Customer'}!
                  </h3>
                  <p className="text-xs text-warm-600 max-w-xs mx-auto">
                    Your complete order and requirements have been sent directly to our official WhatsApp (+91 9325578244).
                  </p>
                </div>

                <div className="w-full bg-warm-50 p-4 rounded-2xl border border-warm-200 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-warm-500 font-bold">Order ID:</span>
                    <span className="font-black text-warm-900">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-500 font-bold">Total Amount:</span>
                    <span className="font-black text-warm-900 text-sm">₹{grandTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-500 font-bold">Dispatch Status:</span>
                    <span className="font-bold text-emerald-700">Fresh Batch in 24h</span>
                  </div>
                </div>

                <div className="w-full space-y-2 pt-2">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      onClose();
                    }}
                    className="w-full py-3 rounded-xl btn-warm-primary text-xs font-bold"
                  >
                    Done / Continue Browsing
                  </button>
                </div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center text-warm-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-warm-900">Your Cart is Empty</h3>
                <p className="text-xs text-warm-600 max-w-xs">
                  Choose from single bars (₹80/bar) or custom 3, 6, 12, 24 pack boxes.
                </p>
                <button 
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl btn-warm-primary text-xs font-bold"
                >
                  Browse Packs
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-warm-50 border border-warm-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 space-y-0.5">
                        <span className="text-[10px] font-black uppercase text-warm-600 block">
                          {item.badge || 'Single Bar'}
                        </span>
                        <h4 className="font-bold text-warm-900 text-sm line-clamp-1">{item.name}</h4>
                        <span className="text-xs text-warm-800 font-black block">
                          ₹{(item.price * item.quantity).toFixed(0)}
                        </span>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-warm-300 bg-white rounded-lg">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-warm-600 hover:text-warm-900"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 font-black text-warm-900 text-xs">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-warm-600 hover:text-warm-900"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-warm-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Returning Customer Privilege Toggle */}
                <div className="p-3.5 rounded-2xl bg-warm-100 border border-warm-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-warm-700" />
                    <div>
                      <span className="text-xs font-bold text-warm-900 block">Returning Customer?</span>
                      <span className="text-[10px] text-warm-600">Get 10% repeat order loyalty discount</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsReturningCustomer(!isReturningCustomer)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isReturningCustomer 
                        ? 'bg-warm-900 text-white' 
                        : 'bg-white border border-warm-300 text-warm-800'
                    }`}
                  >
                    {isReturningCustomer ? '✓ 10% Applied' : '+ Claim'}
                  </button>
                </div>

                {/* Contact Information for WhatsApp */}
                <form onSubmit={handleSendWhatsAppOrder} className="pt-3 border-t border-warm-200 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-warm-700">
                    Your Contact Details (Sent to 9325578244)
                  </h4>
                  
                  <div className="relative">
                    <User className="w-4 h-4 text-warm-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      required
                      placeholder="Your Full Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-warm-900 focus:outline-none focus:border-warm-600 font-medium"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="w-4 h-4 text-warm-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="tel" 
                      required
                      placeholder="Your WhatsApp / Mobile Number *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-warm-900 focus:outline-none focus:border-warm-600 font-medium"
                    />
                  </div>

                  <div className="relative">
                    <FileText className="w-4 h-4 text-warm-400 absolute left-3 top-3" />
                    <textarea 
                      placeholder="Delivery Address / Special Notes (optional)..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl pl-9 pr-3 py-2 text-xs text-warm-900 focus:outline-none focus:border-warm-600 font-medium resize-none"
                    />
                  </div>

                  {/* Order Financial Summary */}
                  <div className="pt-3 border-t border-warm-200 space-y-1.5 text-xs">
                    <div className="flex justify-between text-warm-600 font-medium">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sage-700 font-bold">
                        <span>Loyalty Discount ({effectiveDiscountPercent * 100}%)</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-warm-600 font-medium">
                      <span>Express Courier</span>
                      <span className="text-sage-700 font-bold">FREE</span>
                    </div>

                    <div className="pt-2 border-t border-warm-200 flex justify-between text-base font-black text-warm-900">
                      <span>Total Amount</span>
                      <span>₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* Send WhatsApp Order Button */}
                  <button
                    type="submit"
                    className="w-full mt-3 py-3.5 btn-whatsapp-pill text-xs font-bold flex items-center justify-center gap-2 shadow-warm-md"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Send Order to WhatsApp: 9325578244</span>
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
