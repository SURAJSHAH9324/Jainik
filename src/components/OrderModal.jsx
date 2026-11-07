import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, Truck, User, Phone, MapPin, FileText, Check } from 'lucide-react';
import { openWhatsAppOrder, openWhatsAppOrderUpdate, DISPLAY_PHONE_NUMBER } from '../utils/whatsapp';
import { checkPhoneOrdered, saveOrderToBackend } from '../utils/api';
import { buildOrderNotes, resolveCoupon, summarizeCart, toChargedItems } from '../utils/pricing';
import { saveLocalOrder } from '../utils/orderStore';
import CheckoutOptions from './CheckoutOptions';

export default function OrderModal({ isOpen, onClose, selectedProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    requirements: '',
  });
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('prepaid');
  const [deliveryMode, setDeliveryMode] = useState('standard');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponStatus, setCouponStatus] = useState({ ok: false, text: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !selectedProduct) return null;

  const draftItems = [{
    name: selectedProduct.name || 'Jainik Energy Bar',
    quantity,
    price: selectedProduct.regularPrice ?? selectedProduct.price,
    regularPrice: selectedProduct.regularPrice ?? selectedProduct.price,
    specialPrice: selectedProduct.specialPrice ?? null,
  }];
  const summary = summarizeCart(draftItems, {
    paymentMethod,
    deliveryMode,
    couponPercent: appliedCoupon?.percent || 0,
  });

  const handleApplyCoupon = async () => {
    const result = await resolveCoupon(couponCode, formData.phone, checkPhoneOrdered);
    setCouponStatus({ ok: result.ok, text: result.message });
    setAppliedCoupon(result.ok ? result : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setError('Please fill in your name, phone number, and delivery address.');
      return;
    }

    setSubmitting(true);
    setError('');
    const charged = toChargedItems(draftItems, paymentMethod);
    const notes = buildOrderNotes({
      address: formData.address.trim(),
      requirements: formData.requirements,
      paymentMethod,
      deliveryMode,
      couponCode: appliedCoupon?.code,
      specialSavings: summary.specialSavings,
    });

    const saved = await saveOrderToBackend({
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      items: charged,
      totalAmount: summary.total,
      discountApplied: summary.specialSavings + summary.couponDiscount,
      isFirstCustomer: appliedCoupon?.code === 'FIRST10',
      notes,
    });

    setSubmitting(false);
    if (!saved.success) {
      setError(saved.error || 'Order was not saved. The success screen stays closed until the server accepts the order.');
      return;
    }

    const orderRef = saved.data.order_ref;
    saveLocalOrder({
      orderRef,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      items: charged,
      total: summary.total,
      paymentMethod,
      deliveryMode,
      createdAt: new Date().toISOString(),
    });

    openWhatsAppOrder({
      customerName: formData.name.trim(),
      customerPhone: formData.phone.trim(),
      items: charged,
      total: summary.total,
      notes,
      discountAmount: summary.specialSavings + summary.couponDiscount,
      orderRef,
      paymentMethod,
      deliveryFee: summary.deliveryFee,
    });

    setOrderId(orderRef);
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setError('');
    setFormData({ name: '', phone: '', address: '', requirements: '' });
    setQuantity(1);
    setAppliedCoupon(null);
    setCouponStatus({ ok: false, text: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-warm-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-warm-300 shadow-warm-xl overflow-hidden text-warm-900 my-8">
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-warm-100 hover:bg-warm-200 text-warm-600"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div className="p-6 sm:p-8 space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Saved only after the order API succeeds • {DISPLAY_PHONE_NUMBER}</span>
              </div>
              <h2 className="text-2xl font-black text-warm-950">Place Your Order</h2>
              <p className="text-xs text-warm-600">
                Payment and delivery updates are shared on WhatsApp after the order is saved.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedProduct.image || '/Package.png'}
                  alt={selectedProduct.name}
                  className="w-14 h-14 object-cover rounded-xl border border-warm-300"
                />
                <div>
                  <h3 className="text-sm font-black text-warm-900">{selectedProduct.name}</h3>
                  <span className="text-xs font-bold text-warm-600 block">Pack price depends on payment</span>
                </div>
              </div>
              <div className="flex items-center bg-white border border-warm-300 rounded-xl overflow-hidden">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2.5 py-1 font-bold">-</button>
                <span className="px-3 font-black text-sm">{quantity}</span>
                <button type="button" onClick={() => setQuantity(quantity + 1)} className="px-2.5 py-1 font-bold">+</button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <label className="block text-xs font-black uppercase tracking-wider text-warm-800">
                Your Full Name *
                <span className="relative block mt-1 font-normal normal-case tracking-normal">
                  <User className="w-4 h-4 text-warm-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-warm-50/70 border border-warm-300 rounded-xl pl-9 pr-3 py-2.5 text-xs"
                  />
                </span>
              </label>

              <label className="block text-xs font-black uppercase tracking-wider text-warm-800">
                WhatsApp / Phone Number *
                <span className="relative block mt-1 font-normal normal-case tracking-normal">
                  <Phone className="w-4 h-4 text-warm-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-warm-50/70 border border-warm-300 rounded-xl pl-9 pr-3 py-2.5 text-xs"
                  />
                </span>
              </label>

              <label className="block text-xs font-black uppercase tracking-wider text-warm-800">
                Delivery Address & Pincode *
                <span className="relative block mt-1 font-normal normal-case tracking-normal">
                  <MapPin className="w-4 h-4 text-warm-400 absolute left-3 top-3" />
                  <textarea
                    required
                    rows={2}
                    placeholder="House, street, city, state, PIN"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-warm-50/70 border border-warm-300 rounded-xl pl-9 pr-3 py-2 text-xs resize-none"
                  />
                </span>
              </label>

              <label className="block text-xs font-black uppercase tracking-wider text-warm-800">
                Note (optional)
                <span className="relative block mt-1 font-normal normal-case tracking-normal">
                  <FileText className="w-4 h-4 text-warm-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    placeholder="Landmark or delivery note"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full bg-warm-50/70 border border-warm-300 rounded-xl pl-9 pr-3 py-2 text-xs resize-none"
                  />
                </span>
              </label>

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

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl btn-whatsapp-pill text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>{submitting ? 'Saving order...' : `Confirm order ₹${summary.total}`}</span>
              </button>
              <p className="text-[11px] text-center text-warm-500">
                The green success message appears only when the order API accepts this order.
              </p>
            </form>
          </div>
        ) : (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <div className="space-y-1.5">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Order saved
              </span>
              <h2 className="text-2xl font-black text-warm-950 pt-2">Thank you, {formData.name}</h2>
              <p className="text-xs text-warm-700 max-w-sm mx-auto">
                Order {orderId} is on the server. For payment and further updates, message us on WhatsApp.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-warm-50 border border-warm-300 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span>Order reference</span>
                <span className="font-black">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-black">₹{summary.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment</span>
                <span className="font-bold">{paymentMethod === 'cod' ? 'Cash on delivery' : 'Prepaid / UPI'}</span>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left flex items-start gap-2.5">
              <Truck className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>We will send payment confirmation and dispatch updates on WhatsApp {DISPLAY_PHONE_NUMBER}.</span>
            </div>
            <button
              type="button"
              onClick={() => openWhatsAppOrderUpdate(orderId)}
              className="w-full py-3 rounded-xl btn-whatsapp-pill text-xs font-bold flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              Payment or order update on WhatsApp
            </button>
            <button type="button" onClick={handleResetAndClose} className="w-full py-2.5 rounded-xl btn-warm-secondary text-xs font-bold">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
