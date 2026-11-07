/**
 * Jainik storefront → FastAPI API client
 *
 * Production storefront calls https://jainik-energy-bar.onrender.com
 * Override with VITE_API_URL when you need a different server.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'https://jainik-energy-bar.onrender.com';

export function apiErrorMessage(data, fallback = 'Request failed') {
  if (!data) return fallback;
  if (typeof data.detail === 'string') return data.detail;
  if (Array.isArray(data.detail)) {
    const text = data.detail.map((item) => item.msg || item.message || '').filter(Boolean).join(', ');
    if (text) return text;
  }
  if (typeof data.message === 'string' && data.success === false) return data.message;
  return fallback;
}

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
    const success = res.ok && data.success !== false && Boolean(data.order_ref);
    return {
      success,
      data,
      error: success ? '' : apiErrorMessage(data, 'Order was not saved. Please try again.'),
    };
  } catch (err) {
    console.warn('[Jainik API] Could not save order:', err.message);
    return { success: false, error: err.message || 'Could not reach the order server.' };
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
  if (!res.ok || data.success === false) {
    throw new Error(apiErrorMessage(data, 'Failed to submit review'));
  }
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
    const data = await parseJson(res);
    const success = res.ok && data.success !== false;
    return {
      success,
      data,
      error: success ? '' : apiErrorMessage(data, 'Message was not saved.'),
    };
  } catch (err) {
    return { success: false, error: err.message || 'Could not reach the server.' };
  }
}

// ─── ADMIN ───────────────────────────────────────────────────────

const ADMIN_TOKEN_KEY = 'jainik_admin_token';

export function getAdminToken() {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY) || '';
}

export function setAdminToken(token) {
  if (token) sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  else sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}

export async function adminLogin({ username, password }) {
  const res = await fetch(`${API_BASE}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await parseJson(res);
  if (!res.ok || !data.token) {
    throw new Error(apiErrorMessage(data, 'Wrong username or password.'));
  }
  setAdminToken(data.token);
  return data;
}

export async function getPublicBlog() {
  try {
    const res = await fetch(`${API_BASE}/api/blog`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function adminApiCall(endpoint, method = 'GET', token, body) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token || getAdminToken()}`,
    },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${endpoint}`, opts);
  const data = await parseJson(res);
  if (!res.ok) {
    throw new Error(apiErrorMessage(data, 'Request failed'));
  }
  return data;
}
