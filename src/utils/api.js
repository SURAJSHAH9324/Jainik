/**
 * Jainik storefront → FastAPI API client
 *
 * Local dev (Vite proxy): leave VITE_API_URL unset — requests go to /api → localhost:8000
 * Production: VITE_API_URL=https://your-api.example.com
 */

const API_BASE = import.meta.env.VITE_API_URL || '';

function normalizeItems(items) {
  return items.map((item) => ({
    name: item.name,
    qty: item.qty ?? item.quantity ?? 1,
    price: item.price,
  }));
}

async function parseJson(res) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

// ─── ORDERS ──────────────────────────────────────────────────────

export async function saveOrderToBackend({
  customerName,
  phone,
  address,
  items,
  totalAmount,
  discountApplied,
  isFirstCustomer,
  notes,
}) {
  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: customerName,
        phone: phone.replace('+91', '').replace(/\s/g, '').slice(-10),
        address,
        items: normalizeItems(items),
        total_amount: totalAmount,
        discount_applied: discountApplied || 0,
        is_first_customer: isFirstCustomer || false,
        notes,
      }),
    });
    const data = await parseJson(res);
    return { success: res.ok, data };
  } catch (err) {
    console.warn('[Jainik API] Could not save order:', err.message);
    return { success: false, error: err.message };
  }
}

export async function checkPhoneOrdered(phone) {
  try {
    const clean = phone.replace('+91', '').replace(/\s/g, '').slice(-10);
    const res = await fetch(`${API_BASE}/api/orders/check-phone/${clean}`);
    return await res.json();
  } catch {
    return {
      has_ordered: false,
      order_count: 0,
      customer_type: 'FIRST_TIME',
      eligible_for_first_order_discount: true,
    };
  }
}

// ─── REVIEWS ─────────────────────────────────────────────────────

export async function getPublicReviews(limit = 20) {
  try {
    const res = await fetch(`${API_BASE}/api/reviews?limit=${limit}`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function submitReview({ customerName, phone, rating, comment }) {
  const res = await fetch(`${API_BASE}/api/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer_name: customerName,
      phone: phone.replace('+91', '').replace(/\s/g, '').slice(-10),
      rating,
      comment,
    }),
  });
  const data = await parseJson(res);
  if (!res.ok) throw new Error(data.detail || 'Failed to submit review');
  return data;
}

// ─── MESSAGES ────────────────────────────────────────────────────

export async function submitMessage({ name, phone, message }) {
  try {
    const res = await fetch(`${API_BASE}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, message }),
    });
    return await parseJson(res);
  } catch {
    return { success: false };
  }
}

// ─── ADMIN ───────────────────────────────────────────────────────

export async function adminApiCall(endpoint, method = 'GET', passkey, body) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Key': passkey,
    },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${endpoint}`, opts);
  const data = await parseJson(res);
  if (!res.ok) {
    throw new Error(data.detail || 'Request failed');
  }
  return data;
}
