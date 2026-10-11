export const WHATSAPP_PHONE_NUMBER = '919588417743';
export const DISPLAY_PHONE_NUMBER = '+91 95884 17743';

/**
 * Formats order data with a clean, professional table-like text layout
 * Sends to WhatsApp +91 95884 17743 without broken emojis or weird code blocks
 */
export function openWhatsAppOrder({ 
  customerName, 
  customerPhone, 
  items, 
  total, 
  notes, 
  isReturningCustomer = false, 
  discountAmount = 0 
}) {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const orderCode = 'JNK-' + Math.floor(1000 + Math.random() * 9000);

  // Clean, structured line items
  const formattedItems = items && items.length > 0
    ? items.map((item, index) => {
        const itemTotal = (item.price * item.quantity).toFixed(0);
        return `• ${item.name} | Qty: ${item.quantity} | Total: Rs. ${itemTotal}`;
      }).join('\n')
    : '• 1x Jainik Energy Bar (Rs. 70)';

  const customerTag = isReturningCustomer ? 'Returning VIP Customer (10% Loyalty)' : 'Valued Customer';
  const subtotal = (total + (discountAmount || 0)).toFixed(0);

  const fullMessage = 
`*JAINIK ENERGY BAR - ORDER INVOICE*
*Built on Purity • 100% Natural • 40g*
━━━━━━━━━━━━━━━━━━━━━━━━━━
*ORDER DETAILS*
• Order Ref   : #${orderCode}
• Date        : ${dateStr}
• Base Rate   : Rs. 70 / Bar

*CUSTOMER INFORMATION*
• Name        : ${customerName || 'Direct Website Customer'}
• Phone       : ${customerPhone || 'Direct Inquiry'}
• Type        : ${customerTag}
${notes ? `• Address / Note:\n  ${notes}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━
*ORDER ITEMS*
${formattedItems}
━━━━━━━━━━━━━━━━━━━━━━━━━━
• Subtotal    : Rs. ${subtotal}
${discountAmount > 0 ? `• Loyalty Disc: -Rs. ${discountAmount.toFixed(0)}\n` : ''}• Shipping    : FREE (Direct Dispatch)
*FINAL TOTAL  : Rs. ${total.toFixed(0)}*
━━━━━━━━━━━━━━━━━━━━━━━━━━

*Message to Team Jainik:*
"Please confirm my order and share your UPI / QR code for instant payment. Looking forward to fresh energy bars!"

*Direct Kitchen Helpline:* +91 95884 17743`;

  const encodedUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
  window.open(encodedUrl, '_blank');
}

/**
 * Direct WhatsApp chat launcher with clean prefilled message
 */
export function openWhatsAppDirectChat(customText = 'Hi Jainik Team, I would like to inquire about Jainik Energy Bars (Rs. 70/bar)!') {
  const encodedUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(customText)}`;
  window.open(encodedUrl, '_blank');
}
