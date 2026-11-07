import React, { useEffect, useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageSquare, Check, User, Phone, FileText, MapPin } from 'lucide-react';
import { openWhatsAppOrder, openWhatsAppOrderUpdate, DISPLAY_PHONE_NUMBER } from '../utils/whatsapp';
import { checkPhoneOrdered, saveOrderToBackend } from '../utils/api';
import { buildOrderNotes, resolveCoupon, summarizeCart, toChargedItems } from '../utils/pricing';
import { saveLocalOrder } from '../utils/orderStore';
import CheckoutOptions from './CheckoutOptions';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('prepaid');
  const [deliveryMode, setDeliveryMode] = useState('standard');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponStatus, setCouponStatus] = useState({ ok: false, text: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const summary = summarizeCart(cartItems, {
    paymentMethod,
    deliveryMode,
    couponPercent: appliedCoupon?.percent || 0,
  });

  const handleApplyCoupon = async () => {
    const result = await resolveCoupon(couponCode, customerPhone, checkPhoneOrdered);
    setCouponStatus({ ok: result.ok, text: result.message });
    setAppliedCoupon(result.ok ? result : null);
  };

  const handleSendOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setSubmitting(true);
    setError('');
    const charged = toChargedItems(cartItems, paymentMethod);
    const orderNotes = buildOrderNotes({
      address: address.trim(),
      requirements: notes,
      paymentMethod,
      deliveryMode,
      couponCode: appliedCoupon?.code,
      specialSavings: summary.specialSavings,
    });

    const saved = await saveOrderToBackend({
      customerName,
      phone: customerPhone,
      address: address.trim(),
      items: charged,
      totalAmount: summary.total,
      discountApplied: summary.specialSavings + summary.couponDiscount,
      isFirstCustomer: appliedCoupon?.code === 'FIRST10',
      notes: orderNotes,
    });

    setSubmitting(false);
    if (!saved.success) {
      setError(saved.error || 'Order was not saved.');
      return;
    }

    const orderRef = saved.data.order_ref;
    saveLocalOrder({
      orderRef,
      customerName,
      phone: customerPhone,
      address: address.trim(),
      items: charged,
      total: summary.total,
      paymentMethod,
      deliveryMode,
      createdAt: new Date().toISOString(),
    });

    openWhatsAppOrder({
      customerName,
      customerPhone,
      items: charged,
      total: summary.total,
      notes: orderNotes,
      discountAmount: summary.specialSavings + summary.couponDiscount,
      orderRef,
      paymentMethod,
      deliveryFee: summary.deliveryFee,
    });

    setOrderId(orderRef);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-warm-950/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-warm-200 shadow-warm-xl flex flex-col text-warm-900">
          <div className="p-6 border-b border-warm-200 flex items-center justify-between bg-warm-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warm-100 border border-warm-300 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black">Order cart</h2>
                <span className="text-xs font-bold text-warm-600">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} packs
                </span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl bg-warm-100 text-warm-500" aria-label="Close cart">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-sage-50 px-6 py-2.5 border-b border-sage-100 text-xs text-sage-900 font-bold flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-whatsapp-600 fill-whatsapp-600" />
            <span>Updates on WhatsApp {DISPLAY_PHONE_NUMBER}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isSuccess ? (
              <div className="text-center space-y-5 py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-xl font-black">Order {orderId} saved</h3>
                <p className="text-xs text-warm-600">
                  This confirmation is shown because the order API accepted it. Ask on WhatsApp for payment and status updates.
                </p>
                <button
                  type="button"
                  onClick={() => openWhatsAppOrderUpdate(orderId)}
                  className="w-full py-3 rounded-xl btn-whatsapp-pill text-xs font-bold"
                >
                  Payment or order update on WhatsApp
                </button>
                <button type="button" onClick={onClose} className="w-full py-3 rounded-xl btn-warm-primary text-xs font-bold">
                  Done
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center space-y-4 py-12">
                <ShoppingBag className="w-8 h-8 mx-auto text-warm-400" />
                <h3 className="text-lg font-bold">Your cart is empty</h3>
                <p className="text-xs text-warm-600">Choose a pack of 5, 10, 30, 50, 70, or 100 bars.</p>
                <button onClick={onClose} className="px-6 py-2.5 rounded-xl btn-warm-primary text-xs font-bold">Browse packs</button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-3.5 rounded-2xl bg-warm-50 border border-warm-200 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-black uppercase text-warm-600">{item.badge || 'Pack'}</span>
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <span className="text-xs font-black">
                          Prepaid ₹{item.specialPrice || item.regularPrice || item.price}
                          {item.specialPrice ? ` • COD ₹${item.regularPrice || item.price}` : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-warm-300 bg-white rounded-lg">
                          <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1.5"><Minus className="w-3.5 h-3.5" /></button>
                          <span className="px-2 text-xs font-black">{item.quantity}</span>
                          <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1.5"><Plus className="w-3.5 h-3.5" /></button>
                        </div>
                        <button type="button" onClick={() => onRemoveItem(item.id)} className="p-1.5 text-warm-400 hover:text-rose-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendOrder} className="space-y-2.5">
                  <div className="relative">
                    <User className="w-4 h-4 text-warm-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input required placeholder="Full name *" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full bg-warm-50 border border-warm-300 rounded-xl pl-9 pr-3 py-2.5 text-xs" />
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-warm-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input required type="tel" placeholder="WhatsApp number *" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full bg-warm-50 border border-warm-300 rounded-xl pl-9 pr-3 py-2.5 text-xs" />
                  </div>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-warm-400 absolute left-3 top-3" />
                    <textarea required rows={2} placeholder="Delivery address and PIN *" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-warm-50 border border-warm-300 rounded-xl pl-9 pr-3 py-2 text-xs resize-none" />
                  </div>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-warm-400 absolute left-3 top-3" />
                    <textarea rows={2} placeholder="Note (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-warm-50 border border-warm-300 rounded-xl pl-9 pr-3 py-2 text-xs resize-none" />
                  </div>

                  <CheckoutOptions
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    deliveryMode={deliveryMode}
                    setDeliveryMode={setDeliveryMode}
                    couponCode={couponCode}
                    setCouponCode={setCouponCode}
                    onApplyCoupon={handleApplyCoupon}
                    couponStatus={couponStatus}
                    summary={summary}
                  />

                  {error && <p className="text-xs text-rose-700 font-medium">{error}</p>}

                  <button type="submit" disabled={submitting} className="w-full py-3.5 btn-whatsapp-pill text-xs font-bold flex items-center justify-center gap-2 disabled:opacity-60">
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>{submitting ? 'Saving order...' : `Place order ₹${summary.total}`}</span>
                  </button>
                  <p className="text-[11px] text-center text-warm-500">
                    Success is shown only when the order API accepts the order.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
