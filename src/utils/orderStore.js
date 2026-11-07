const STORAGE_KEY = 'jainik_order_history';

export function readLocalOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLocalOrder(order) {
  const next = [order, ...readLocalOrders()].slice(0, 40);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function localOrdersForPhone(phone) {
  const digits = (phone || '').replace(/\D/g, '').slice(-10);
  if (digits.length < 10) return [];
  return readLocalOrders().filter((order) => {
    const saved = String(order.phone || '').replace(/\D/g, '').slice(-10);
    return saved === digits;
  });
}
