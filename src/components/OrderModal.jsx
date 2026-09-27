import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, Truck, ShieldCheck, ShoppingBag, ArrowRight, User, Phone, MapPin, FileText, Check } from 'lucide-react';
import { openWhatsAppOrder } from '../utils/whatsapp';

export default function OrderModal({ isOpen, onClose, selectedProduct, isReturning = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    requirements: ''
  });
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen || !selectedProduct) return null;

  const unitPrice = selectedProduct.price || 80;
  const totalPrice = unitPrice * quantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    const generatedId = 'JNK-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);

    // Prepare items list for WhatsApp
    const orderItems = [
      {
        name: selectedProduct.name || 'Jainik Energy Bar (40g Bar)',
        quantity: quantity,
        price: unitPrice
      }
    ];

    // Combine address and customer requirement into the WhatsApp message
    const formattedNotes = `Delivery Address: ${formData.address.trim()}${
      formData.requirements.trim() ? `\nSpecial Requirement / Note: ${formData.requirements.trim()}` : ''
    }`;

    // Open WhatsApp with all required message data
    openWhatsAppOrder({
      customerName: formData.name.trim(),
      customerPhone: formData.phone.trim(),
      items: orderItems,
      total: totalPrice,
      notes: formattedNotes,
      isReturningCustomer: isReturning,
      discountAmount: 0
    });

    // Show the Order Successful Confirmation View!
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setFormData({ name: '', phone: '', address: '', requirements: '' });
    setQuantity(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-warm-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-warm-300 shadow-warm-xl overflow-hidden text-warm-900 my-8">
        
        {/* Modal Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-warm-100 hover:bg-warm-200 text-warm-600 hover:text-warm-950 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          /* STEP 1: ORDER INPUT FORM */
          <div className="p-6 sm:p-8 space-y-5">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Direct Kitchen Dispatch • Official WhatsApp 9325578244</span>
              </div>
              <h2 className="text-2xl font-black text-warm-950">
                Place Your Order
              </h2>
              <p className="text-xs text-warm-600">
                Enter your details below. Your order will be sent to our WhatsApp and confirmed instantly!
              </p>
            </div>

            {/* Selected Product Summary Card */}
            <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedProduct.image || '/jainik-bar-hero.jpg'} 
                  alt={selectedProduct.name} 
                  className="w-14 h-14 object-cover rounded-xl border border-warm-300"
                />
                <div>
                  <h3 className="text-sm font-black text-warm-900">
                    {selectedProduct.name}
                  </h3>
                  <span className="text-xs font-bold text-warm-600 block">
                    ₹{unitPrice} each
                  </span>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center bg-white border border-warm-300 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-warm-700 hover:bg-warm-100 font-bold text-sm"
                >
                  -
                </button>
                <span className="px-3 font-black text-sm text-warm-950">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-warm-700 hover:bg-warm-100 font-bold text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-warm-800 mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-warm-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-warm-50/70 border border-warm-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-warm-900 focus:outline-none focus:border-warm-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-warm-800 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-warm-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-warm-50/70 border border-warm-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-warm-900 focus:outline-none focus:border-warm-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-warm-800 mb-1">
                  Delivery Address & Pincode *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-warm-400 absolute left-3 top-3" />
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Flat No., Street, City, State & PIN Code"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-warm-50/70 border border-warm-300 rounded-xl pl-9 pr-3 py-2 text-xs text-warm-900 focus:outline-none focus:border-warm-900 font-medium resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-warm-800 mb-1">
                  Special Requirements / Message (Optional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-warm-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    placeholder="Any specific delivery instructions, gift message, or questions..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full bg-warm-50/70 border border-warm-300 rounded-xl pl-9 pr-3 py-2 text-xs text-warm-900 focus:outline-none focus:border-warm-900 font-medium resize-none"
                  />
                </div>
              </div>

              {/* Order Pricing Total Bar */}
              <div className="p-3.5 rounded-2xl bg-warm-100 border border-warm-300 flex items-center justify-between text-xs font-bold">
                <div>
                  <span className="text-warm-600 block text-[11px]">Total Payable</span>
                  <span className="text-xl font-black text-warm-950">₹{totalPrice}</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-700 font-black block">FREE Express Delivery</span>
                  <span className="text-[10px] text-warm-500">All India Coverage</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl btn-whatsapp-pill text-sm font-bold flex items-center justify-center gap-2 shadow-warm-md hover:scale-[1.01] transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Confirm & Send Order via WhatsApp (₹{totalPrice})</span>
              </button>

              <p className="text-[11px] text-center text-warm-500">
                🔒 Your order will open in WhatsApp to confirm payment via UPI/QR code with our team.
              </p>
            </form>

          </div>
        ) : (
          /* STEP 2: ORDER SUCCESSFUL CONFIRMATION VIEW */
          <div className="p-6 sm:p-8 text-center space-y-6 animate-fadeIn">
            
            {/* Green Success Badge */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-warm-sm">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Order Placed Successfully! 🎉
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-warm-950 pt-2">
                Thank You, {formData.name || 'Valued Customer'}!
              </h2>
              <p className="text-xs sm:text-sm text-warm-700 max-w-sm mx-auto">
                We have received your order details and sent your confirmation directly to WhatsApp!
              </p>
            </div>

            {/* Order Confirmation Card */}
            <div className="p-4 rounded-2xl bg-warm-50 border border-warm-300 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-warm-200">
                <span className="font-bold text-warm-600">Order Reference:</span>
                <span className="font-black text-warm-900 bg-white px-2 py-0.5 rounded border border-warm-300">{orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-warm-600">Items Ordered:</span>
                <span className="font-bold text-warm-900">{quantity} × {selectedProduct.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-warm-600">Total Amount:</span>
                <span className="font-black text-warm-900 text-sm">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between items-start pt-1">
                <span className="text-warm-600 flex-shrink-0">Deliver To:</span>
                <span className="font-medium text-warm-900 text-right line-clamp-2 pl-4">{formData.address}</span>
              </div>
              {formData.requirements && (
                <div className="flex justify-between items-start pt-1">
                  <span className="text-warm-600 flex-shrink-0">Note / Requirement:</span>
                  <span className="font-medium text-warm-800 text-right line-clamp-2 pl-4 italic">"{formData.requirements}"</span>
                </div>
              )}
            </div>

            {/* Kitchen Fresh Dispatch Notice */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs text-left flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Dispatched Within 24 Hours</span>
                <span className="text-[11px] text-amber-800">
                  Our certified kitchen in Karanja (Lad), Maharashtra is preparing your fresh Jainik Energy Bars.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  const formattedNotes = `Delivery Address: ${formData.address.trim()}${
                    formData.requirements.trim() ? `\nSpecial Requirement / Note: ${formData.requirements.trim()}` : ''
                  }`;
                  openWhatsAppOrder({
                    customerName: formData.name.trim(),
                    customerPhone: formData.phone.trim(),
                    items: [{ name: selectedProduct.name, quantity, price: unitPrice }],
                    total: totalPrice,
                    notes: formattedNotes,
                    isReturningCustomer: isReturning,
                    discountAmount: 0
                  });
                }}
                className="w-full py-3 rounded-xl btn-whatsapp-pill text-xs font-bold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat with Kitchen Team on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-2.5 rounded-xl btn-warm-secondary text-xs font-bold"
              >
                Done / Continue Browsing
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
