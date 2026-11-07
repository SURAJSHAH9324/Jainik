import { COUPONS, DELIVERY_FEES } from '../data/products';

export function unitPriceForPayment(item, paymentMethod) {
  const regular = Number(item.regularPrice ?? item.price ?? 0);
  const special = item.specialPrice;
  if (
    paymentMethod === 'prepaid' &&
    typeof special === 'number' &&
    special < regular
  ) {
    return special;
  }
  return regular;
}

export function summarizeCart(items, { paymentMethod = 'prepaid', deliveryMode = 'standard', couponPercent = 0 } = {}) {
  let regularSubtotal = 0;
  let productSubtotal = 0;

  items.forEach((item) => {
    const qty = item.quantity || item.qty || 1;
    const regular = Number(item.regularPrice ?? item.price ?? 0);
    regularSubtotal += regular * qty;
    productSubtotal += unitPriceForPayment(item, paymentMethod) * qty;
  });

  const specialSavings = Math.max(0, regularSubtotal - productSubtotal);
  const couponDiscount = Math.round(productSubtotal * (couponPercent || 0));
  const deliveryFee = deliveryMode === 'express' ? DELIVERY_FEES.express : DELIVERY_FEES.standard;
  const total = Math.max(0, productSubtotal - couponDiscount) + deliveryFee;

  return {
    regularSubtotal,
    productSubtotal,
    specialSavings,
    couponDiscount,
    deliveryFee,
    total,
  };
}

export function toChargedItems(items, paymentMethod) {
  return items.map((item) => ({
    name: item.name,
    quantity: item.quantity || item.qty || 1,
    price: unitPriceForPayment(item, paymentMethod),
  }));
}

export async function resolveCoupon(code, phone, checkPhoneOrdered) {
  const normalized = (code || '').trim().toUpperCase();
  const coupon = COUPONS[normalized];
  if (!coupon) {
    return { ok: false, message: 'Coupon not recognised. Use FIRST10 for a first purchase.' };
  }

  if (coupon.firstOrderOnly) {
    const digits = (phone || '').replace(/\D/g, '');
    if (digits.length < 10) {
      return { ok: false, message: 'Enter your 10-digit phone number before applying FIRST10.' };
    }
    const info = await checkPhoneOrdered(phone);
    if (!info?.eligible_for_first_order_discount) {
      return {
        ok: false,
        message: 'FIRST10 is only for a number that has not ordered before.',
      };
    }
  }

  return {
    ok: true,
    code: coupon.code,
    percent: coupon.percent,
    message: `${coupon.code} applied — ${Math.round(coupon.percent * 100)}% off the pack price.`,
  };
}

export function buildOrderNotes({
  address,
  requirements,
  paymentMethod,
  deliveryMode,
  couponCode,
  specialSavings,
}) {
  const paymentLine = paymentMethod === 'cod'
    ? 'Payment: Cash on delivery (special offer not applied)'
    : 'Payment: Prepaid / UPI (special offer applied where the pack has one)';
  const deliveryLine = deliveryMode === 'express'
    ? `Delivery: Express ₹${DELIVERY_FEES.express}`
    : `Delivery: Standard ₹${DELIVERY_FEES.standard}`;

  const lines = [
    `Delivery address: ${address}`,
    paymentLine,
    deliveryLine,
  ];
  if (specialSavings > 0) lines.push(`Prepaid special saving: ₹${specialSavings}`);
  if (couponCode) lines.push(`Coupon: ${couponCode}`);
  if (requirements && requirements.trim()) lines.push(`Note: ${requirements.trim()}`);
  lines.push('Payment and order updates are shared on WhatsApp.');
  return lines.join('\n');
}
