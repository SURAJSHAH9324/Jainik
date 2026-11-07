export const WHATSAPP_PHONE_NUMBER = '919588417743';
export const DISPLAY_PHONE_NUMBER = '+91 95884 17743';

export function openWhatsAppOrder({
  customerName,
  customerPhone,
  items,
  total,
  notes,
  discountAmount = 0,
  orderRef,
  paymentMethod = 'prepaid',
  deliveryFee = 0,
}) {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const ref = orderRef || 'PENDING';
  const formattedItems = items && items.length > 0
    ? items.map((item) => {
        const qty = item.quantity || item.qty || 1;
        const itemTotal = Math.round(item.price * qty);
        return `• ${item.name} | Qty: ${qty} | Total: Rs. ${itemTotal}`;
      }).join('\n')
    : '• Jainik Energy Bar pack';

  const paymentLabel = paymentMethod === 'cod'
    ? 'Cash on delivery (no pack special offer)'
    : 'Prepaid / UPI';

  const fullMessage =
`*JAINIK ENERGY BAR - ORDER*
*Built on Purity • 40g*
━━━━━━━━━━━━━━━━━━━━━━━━━━
*ORDER*
• Order Ref   : #${ref}
• Date        : ${dateStr}
• Payment     : ${paymentLabel}

*CUSTOMER*
• Name        : ${customerName || 'Website customer'}
• Phone       : ${customerPhone || '—'}
${notes ? `• Details:\n${notes}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━
*ITEMS*
${formattedItems}
━━━━━━━━━━━━━━━━━━━━━━━━━━
${discountAmount > 0 ? `• Discount    : -Rs. ${Math.round(discountAmount)}\n` : ''}• Delivery    : Rs. ${Math.round(deliveryFee)}
*FINAL TOTAL  : Rs. ${Math.round(total)}*
━━━━━━━━━━━━━━━━━━━━━━━━━━

Please confirm this order on WhatsApp.
Payment updates and order status updates will stay on this chat.

*Helpline:* +91 95884 17743`;

  const encodedUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
  window.open(encodedUrl, '_blank');
}

export function openWhatsAppOrderUpdate(orderRef = '') {
  const refLine = orderRef ? ` My order reference is ${orderRef}.` : '';
  openWhatsAppDirectChat(
    `Hi Jainik Team, I need a payment or order update.${refLine}`
  );
}

export function openWhatsAppDirectChat(customText = 'Hi Jainik Team, I would like to enquire about Jainik Energy Bars.') {
  const encodedUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(customText)}`;
  window.open(encodedUrl, '_blank');
}
