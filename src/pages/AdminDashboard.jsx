import React, { useState, useEffect, useCallback } from 'react';
import {
  ShoppingBag, Users, Star, MessageSquare, TrendingUp, Package,
  CheckCircle2, Truck, Clock, XCircle, Eye, RefreshCw,
  ChevronDown, Award, Zap, LogOut, Check, X, Bell
} from 'lucide-react';

import { adminApiCall } from '../utils/api';
import AdminVaultUnlock from '../components/admin/AdminVaultUnlock';

// ─── STATUS CONFIG ──────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  PENDING:    { label: 'Pending',    icon: Clock,        color: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-200' },
  CONFIRMED:  { label: 'Confirmed',  icon: CheckCircle2, color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-200' },
  DISPATCHED: { label: 'Dispatched', icon: Truck,        color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  DELIVERED:  { label: 'Delivered',  icon: Check,        color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200' },
  CANCELLED:  { label: 'Cancelled',  icon: XCircle,      color: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-200' },
};

const CUSTOMER_TYPE_CONFIG = {
  FIRST_TIME: { label: '🌟 First Timer',   color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  RETURNING:  { label: '🔁 Returning',     color: 'text-blue-700',    bg: 'bg-blue-50',    border: 'border-blue-200' },
  DAILY:      { label: '👑 Daily Buyer',   color: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200' },
};

// ══════════════════════════════════════════════════════════════════
//  STAT CARD
// ══════════════════════════════════════════════════════════════════
function StatCard({ icon: Icon, label, value, sub, iconColor = 'text-[#C9A46C]', iconBg = 'bg-[#C9A46C]/10' }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-black text-gray-900 mt-1">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  ORDER ROW (Swiggy Style)
// ══════════════════════════════════════════════════════════════════
function OrderRow({ order, passkey, onRefresh }) {
  const [updating, setUpdating] = useState(false);
  const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
  const custCfg = CUSTOMER_TYPE_CONFIG[order.customer_type] || CUSTOMER_TYPE_CONFIG.FIRST_TIME;
  const StatusIcon = statusCfg.icon;

  const nextStatuses = {
    PENDING:    ['CONFIRMED', 'CANCELLED'],
    CONFIRMED:  ['DISPATCHED', 'CANCELLED'],
    DISPATCHED: ['DELIVERED'],
    DELIVERED:  [],
    CANCELLED:  [],
  };

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      await adminApiCall(`/api/admin/orders/${order.id}/status`, 'PATCH', passkey, { status: newStatus });
      onRefresh();
    } catch (e) {
      alert(e.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-black text-gray-900">{order.order_ref}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${custCfg.bg} ${custCfg.color} ${custCfg.border}`}>
              {custCfg.label}
            </span>
          </div>
          <p className="text-xs font-bold text-gray-700">{order.customer_name}</p>
          <p className="text-xs text-gray-400">📞 {order.phone}</p>
        </div>
        <div className="text-right">
          <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${statusCfg.bg} ${statusCfg.color} ${statusCfg.border}`}>
            <StatusIcon className="w-3 h-3" />
            {statusCfg.label}
          </span>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(order.created_at).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-gray-50 rounded-xl p-3 mb-3 text-xs space-y-1">
        {order.items?.map((item, i) => (
          <div key={i} className="flex justify-between text-gray-700">
            <span>{item.name} × {item.qty}</span>
            <span className="font-bold">₹{(item.price * item.qty).toFixed(0)}</span>
          </div>
        ))}
        <div className="border-t border-gray-200 pt-1 flex justify-between font-black text-gray-900">
          <span>Total</span>
          <span>₹{order.total_amount}</span>
        </div>
        {order.discount_applied > 0 && (
          <div className="flex justify-between text-emerald-600 text-[11px] font-bold">
            <span>First Order Discount</span>
            <span>-₹{order.discount_applied}</span>
          </div>
        )}
      </div>

      {/* Address */}
      {order.address && (
        <p className="text-[11px] text-gray-500 mb-3 flex items-start gap-1">
          <span className="mt-0.5">📍</span>
          <span>{order.address}</span>
        </p>
      )}

      {/* Status Actions */}
      {nextStatuses[order.status]?.length > 0 && (
        <div className="flex gap-2">
          {nextStatuses[order.status].map(s => {
            const cfg = STATUS_CONFIG[s];
            const Icon = cfg.icon;
            return (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                disabled={updating}
                className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 border ${
                  s === 'CANCELLED' 
                    ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                    : 'border-[#C9A46C]/30 bg-[#C9A46C]/10 text-[#241611] hover:bg-[#C9A46C]/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {s === 'CANCELLED' ? 'Cancel' : `Mark ${cfg.label}`}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  MAIN ADMIN DASHBOARD
// ══════════════════════════════════════════════════════════════════
export default function AdminDashboard() {
  const [passkey, setPasskey] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [data, setData] = useState({
    dashboard: null,
    orders: [],
    customers: [],
    reviews: [],
    messages: [],
  });
  const [loading, setLoading] = useState(false);
  const [orderFilter, setOrderFilter] = useState('');

  const fetchAll = useCallback(async (key) => {
    if (!passkey) return;
    setLoading(true);
    try {
      if (key === 'dashboard' || key === 'all') {
        const dash = await adminApiCall('/api/admin/dashboard', 'GET', passkey);
        setData(d => ({ ...d, dashboard: dash }));
      }
      if (key === 'orders' || key === 'all') {
        const statusParam = orderFilter ? `?status=${orderFilter}` : '';
        const orders = await adminApiCall(`/api/admin/orders${statusParam}`, 'GET', passkey);
        setData(d => ({ ...d, orders }));
      }
      if (key === 'customers' || key === 'all') {
        const customers = await adminApiCall('/api/admin/customers', 'GET', passkey);
        setData(d => ({ ...d, customers }));
      }
      if (key === 'reviews' || key === 'all') {
        const reviews = await adminApiCall('/api/admin/reviews', 'GET', passkey);
        setData(d => ({ ...d, reviews }));
      }
      if (key === 'messages' || key === 'all') {
        const messages = await adminApiCall('/api/admin/messages', 'GET', passkey);
        setData(d => ({ ...d, messages }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [passkey, orderFilter]);

  useEffect(() => {
    if (passkey) fetchAll('all');
  }, [passkey, fetchAll]);

  useEffect(() => {
    if (passkey && activeTab === 'orders') fetchAll('orders');
  }, [orderFilter]);

  const handleApproveReview = async (id) => {
    await adminApiCall(`/api/admin/reviews/${id}/approve`, 'PATCH', passkey);
    fetchAll('reviews');
    fetchAll('dashboard');
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    await adminApiCall(`/api/admin/reviews/${id}`, 'DELETE', passkey);
    fetchAll('reviews');
  };

  const handleMarkRead = async (id) => {
    await adminApiCall(`/api/admin/messages/${id}/read`, 'PATCH', passkey);
    fetchAll('messages');
    fetchAll('dashboard');
  };

  if (!passkey) {
    return <AdminVaultUnlock onUnlock={setPasskey} />;
  }

  const dash = data.dashboard;

  const TABS = [
    { id: 'orders',    label: 'Orders',    icon: ShoppingBag,   badge: dash?.overview?.pending_orders },
    { id: 'customers', label: 'Customers', icon: Users,         badge: null },
    { id: 'reviews',   label: 'Reviews',   icon: Star,          badge: dash?.alerts?.pending_reviews_to_approve },
    { id: 'messages',  label: 'Messages',  icon: MessageSquare, badge: dash?.alerts?.unread_messages },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── TOP NAV ──────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#1A0F0B] border-b border-[#C9A46C]/20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#C9A46C]/20 border border-[#C9A46C]/30 flex items-center justify-center">
            <Package className="w-4 h-4 text-[#C9A46C]" />
          </div>
          <div>
            <h1 className="text-sm font-black text-white leading-none">Jainik Admin</h1>
            <p className="text-[10px] text-[#C9A46C]/60">Kitchen Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchAll(activeTab)}
            className="p-2 rounded-lg bg-[#C9A46C]/10 text-[#C9A46C] hover:bg-[#C9A46C]/20 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setPasskey(null)}
            className="p-2 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── STATS ROW ─────────────────────────────────── */}
      {dash && (
        <div className="px-4 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={ShoppingBag} label="Total Orders" value={dash.overview.total_orders} sub={`${dash.overview.today_orders} today`} />
          <StatCard icon={TrendingUp}  label="Total Revenue" value={`₹${(dash.overview.total_revenue || 0).toLocaleString('en-IN')}`} sub={`₹${(dash.overview.today_revenue || 0).toLocaleString('en-IN')} today`} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
          <StatCard icon={Clock}       label="Pending Orders" value={dash.overview.pending_orders} sub="Need action" iconColor="text-amber-600" iconBg="bg-amber-50" />
          <StatCard icon={Users}       label="Customers" value={dash.customers.first_timers + dash.customers.returning + dash.customers.daily_buyers} sub={`👑 ${dash.customers.daily_buyers} daily buyers`} iconColor="text-purple-600" iconBg="bg-purple-50" />
        </div>
      )}

      {/* ── TABS ──────────────────────────────────────── */}
      <div className="px-4 pt-4">
        <div className="flex gap-1 bg-white rounded-2xl border border-gray-100 p-1.5 shadow-sm">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-black transition-all relative ${
                  activeTab === tab.id
                    ? 'bg-[#241611] text-[#C9A46C]'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────────────── */}
      <main className="px-4 py-4 pb-16 space-y-3">

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <>
            {/* Filter Row */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {['', 'PENDING', 'CONFIRMED', 'DISPATCHED', 'DELIVERED', 'CANCELLED'].map(s => (
                <button
                  key={s}
                  onClick={() => setOrderFilter(s)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-black border transition-all flex-shrink-0 ${
                    orderFilter === s
                      ? 'bg-[#241611] text-[#C9A46C] border-[#241611]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {s || 'All Orders'}
                </button>
              ))}
            </div>

            {loading && <p className="text-center text-gray-400 text-sm py-8">Loading orders...</p>}

            {!loading && data.orders.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-bold">No orders yet</p>
                <p className="text-xs">Orders will appear here when customers place them!</p>
              </div>
            )}

            {data.orders.map(order => (
              <OrderRow key={order.id} order={order} passkey={passkey} onRefresh={() => { fetchAll('orders'); fetchAll('dashboard'); }} />
            ))}
          </>
        )}

        {/* CUSTOMERS TAB */}
        {activeTab === 'customers' && (
          <>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-black text-gray-900 text-sm">All Customers</h3>
                <p className="text-xs text-gray-400">Ordered by most purchases</p>
              </div>
              {data.customers.map((c, i) => {
                const cfg = CUSTOMER_TYPE_CONFIG[c.loyalty_tier] || CUSTOMER_TYPE_CONFIG.FIRST_TIME;
                return (
                  <div key={c.phone} className={`p-4 flex items-center justify-between ${i !== 0 ? 'border-t border-gray-50' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F3E8DD] border border-[#D8C08A] flex items-center justify-center font-black text-[#241611] text-sm">
                        {c.customer_name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900">{c.customer_name}</p>
                        <p className="text-xs text-gray-400">📞 {c.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                        {cfg.label}
                      </span>
                      <p className="text-xs font-black text-gray-800 mt-1">{c.total_orders} orders • ₹{(c.total_spent || 0).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                );
              })}
              {data.customers.length === 0 && (
                <div className="text-center py-10 text-gray-400 text-sm">No customers yet!</div>
              )}
            </div>
          </>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <>
            <p className="text-xs text-gray-500 font-medium">
              {data.reviews.filter(r => !r.is_approved).length} pending approval. Approved reviews show on the website.
            </p>
            {data.reviews.map(review => (
              <div key={review.id} className={`bg-white rounded-2xl border shadow-sm p-4 ${!review.is_approved ? 'border-amber-200' : 'border-gray-100'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-black text-gray-900">{review.customer_name}</span>
                      {review.verified_buyer && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                          ✓ Verified Buyer
                        </span>
                      )}
                      {!review.is_approved && (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                          ⏳ Pending
                        </span>
                      )}
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">"{review.comment}"</p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {new Date(review.created_at).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {!review.is_approved && (
                      <button onClick={() => handleApproveReview(review.id)} className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 transition-all" title="Approve">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button onClick={() => handleDeleteReview(review.id)} className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 border border-red-200 transition-all" title="Delete">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {data.reviews.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Star className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-bold">No reviews yet</p>
              </div>
            )}
          </>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <>
            {data.messages.map(msg => (
              <div key={msg.id} className={`bg-white rounded-2xl border shadow-sm p-4 ${msg.status === 'UNREAD' ? 'border-blue-200 ring-1 ring-blue-100' : 'border-gray-100'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-black text-gray-900">{msg.name}</span>
                      {msg.status === 'UNREAD' && (
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                          <Bell className="w-2.5 h-2.5" /> New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mb-2">📞 {msg.phone} • {new Date(msg.created_at).toLocaleString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-xl">{msg.message}</p>
                  </div>
                  {msg.status === 'UNREAD' && (
                    <button onClick={() => handleMarkRead(msg.id)} className="p-2 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 border border-blue-200 transition-all flex-shrink-0" title="Mark as Read">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {data.messages.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-bold">No messages yet</p>
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
}
