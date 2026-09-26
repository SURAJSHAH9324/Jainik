export const WHATSAPP_PHONE_NUMBER = '919325578244';

/**
 * Formats order data with a CSS-styled monospace receipt block and sends to WhatsApp 9325578244
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

  // Format line items in CSS receipt format
  const formattedItems = items && items.length > 0
    ? items.map((item, index) => {
        const itemTotal = (item.price * item.quantity).toFixed(0);
        return `[${index + 1}] ${item.name}\n    Qty: ${item.quantity} x ₹${item.price} = ₹${itemTotal}`;
      }).join('\n')
    : '[1] 1x Jainik Energy Bar Inquiry';

  const customerTag = isReturningCustomer ? '👑 RETURNING VIP CUSTOMER (10% Loyalty)' : '🌱 NEW VALUED CUSTOMER';

  // CSS styled block using WhatsApp triple-backtick monospace format
  const cssReceipt = 
`\`\`\`css
/* === JAINIK ORDER INVOICE === */
Order Ref : #${orderCode}
Date      : ${dateStr}
Base Unit : ₹80 / Bar

-- ITEMS ORDERED --
${formattedItems}

---------------------------------
Total Items : ${items ? items.reduce((acc, i) => acc + i.quantity, 0) : 1} Bars
Subtotal    : ₹${(total + (discountAmount || 0)).toFixed(0)}
${discountAmount > 0 ? `Loyalty Disc: -₹${discountAmount.toFixed(0)}\n` : ''}Shipping    : FREE (Direct Dispatch)
FINAL TOTAL : ₹${total.toFixed(0)}
\`\`\``;

  const fullMessage = 
`🔴🟡⚪🟢🔵 *JAINIK SATTVIC ENERGY BAR*
*Ahimsa • 100% Pure • Zero Added Sugar*
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${customerName || 'Direct WhatsApp Client'}
📱 *Client Phone:* ${customerPhone || 'Direct Inquiry'}
🏷️ *Client Type:* ${customerTag}
━━━━━━━━━━━━━━━━━━━━━━━━━━
${cssReceipt}
━━━━━━━━━━━━━━━━━━━━━━━━━━
${notes ? `📝 *Requirement / Address:* \n"${notes}"\n\n` : ''}` +
`🙏 *Message to Team Jainik:*
_"Please confirm my order and share your UPI / QR code for instant payment. Looking forward to fresh energy bars!"_

📞 *Direct Support:* +91 9325578244`;

  const encodedUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
  window.open(encodedUrl, '_blank');
}

/**
 * Direct WhatsApp chat launcher with optional prefilled message
 */
export function openWhatsAppDirectChat(customText = 'Hi Jainik Team, I would like to inquire about Jainik Sattvic Energy Bars (₹80/bar)!') {
  const encodedUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(customText)}`;
  window.open(encodedUrl, '_blank');
}
