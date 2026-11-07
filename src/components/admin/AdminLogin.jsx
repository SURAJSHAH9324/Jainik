import React, { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import { adminLogin } from '../../utils/api';

export default function AdminLogin({ onUnlock }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await adminLogin({ username: username.trim(), password });
      onUnlock(data.token);
    } catch (err) {
      setError(err.message || 'Wrong username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A0F0B] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#241611] text-[#C9A46C] flex items-center justify-center">
          <Lock className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-[#241611]">Jainik admin</h1>
          <p className="text-xs text-[#5C361D] mt-1">Sign in to see orders, reviews, and kitchen notes.</p>
        </div>
        <label className="block text-xs font-black uppercase tracking-wider text-[#241611]">
          Username
          <input
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full border border-[#D8C08A] rounded-xl px-3 py-2.5 text-sm font-medium normal-case tracking-normal"
          />
        </label>
        <label className="block text-xs font-black uppercase tracking-wider text-[#241611]">
          Password
          <input
            required
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-[#D8C08A] rounded-xl px-3 py-2.5 text-sm font-medium normal-case tracking-normal"
          />
        </label>
        {error && <p className="text-xs text-rose-700 font-medium">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-[#241611] text-[#C9A46C] text-sm font-black flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Sign in
        </button>
      </form>
    </div>
  );
}
