import React, { useCallback, useEffect, useState } from 'react';
import { ChefHat, RotateCcw, Undo2, Sparkles } from 'lucide-react';
import { INGREDIENTS } from '../../data/products';
import { adminApiCall } from '../../utils/api';

const PASSKEY_LENGTH = 10;

const INGredientVisual = [
  { emoji: '🥜', short: 'Almond' },
  { emoji: '🌰', short: 'Cashew' },
  { emoji: '🫛', short: 'Pista' },
  { emoji: '🎃', short: 'Pumpkin' },
  { emoji: '🌾', short: 'Oats' },
  { emoji: '🫘', short: 'Chana' },
  { emoji: '🍉', short: 'Melon seed' },
  { emoji: '📅', short: 'Dates' },
  { emoji: '🍯', short: 'Jaggery' },
  { emoji: '🍫', short: 'Cocoa' },
];

export default function AdminVaultUnlock({ onUnlock }) {
  const [sequence, setSequence] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('Begin the secret recipe — tap ten ingredients in order.');
  const [shake, setShake] = useState(false);
  const [pulseIdx, setPulseIdx] = useState(null);

  const passkey = sequence.map((idx) => String(idx)).join('');

  const verify = useCallback(
    async (key) => {
      setLoading(true);
      setError('');
      setMessage('The kitchen is tasting your ritual…');
      try {
        await adminApiCall('/api/admin/dashboard', 'GET', key);
        setMessage('Pure recipe. Welcome back, head chef.');
        setTimeout(() => onUnlock(key), 500);
      } catch {
        setError('That order is not in the master scroll.');
        setMessage('The ritual resets — try the true sequence again.');
        setShake(true);
        setSequence([]);
        setTimeout(() => setShake(false), 550);
      } finally {
        setLoading(false);
      }
    },
    [onUnlock],
  );

  useEffect(() => {
    if (sequence.length === PASSKEY_LENGTH && !loading) {
      verify(passkey);
    }
  }, [sequence.length, passkey, loading, verify]);

  const tapIngredient = (index) => {
    if (sequence.length >= PASSKEY_LENGTH || loading) return;
    setSequence((s) => [...s, index]);
    setPulseIdx(index);
    setError('');
    setMessage(
      sequence.length + 1 === PASSKEY_LENGTH
        ? 'Final touch… sealing the vault.'
        : `${INGredientVisual[index].emoji} added to the bowl (${sequence.length + 1}/${PASSKEY_LENGTH})`,
    );
    setTimeout(() => setPulseIdx(null), 350);
  };

  const undo = () => {
    if (loading || !sequence.length) return;
    setSequence((s) => s.slice(0, -1));
    setMessage('Removed the last pinch from the mix.');
    setError('');
  };

  const reset = () => {
    if (loading) return;
    setSequence([]);
    setMessage('Fresh board. Start the ritual again.');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#1A0F0B] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="admin-vault-grain pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      <div className={`w-full max-w-lg relative z-10 ${shake ? 'admin-vault-shake' : ''}`}>
        <header className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#C9A46C]/20 border border-[#C9A46C]/35 flex items-center justify-center mx-auto mb-3 shadow-[0_0_30px_rgba(201,164,108,0.2)]">
            <ChefHat className="w-8 h-8 text-[#C9A46C]" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#C9A46C]/80 mb-1 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" /> Master kitchen seal
          </p>
          <h1 className="text-2xl font-black text-[#FFFBED]">Secret Recipe Ritual</h1>
          <p className="text-xs text-[#C9A46C]/70 mt-2 max-w-sm mx-auto leading-relaxed">
            No keys, no numbers — only the ten sacred ingredients, in the order only head chefs know.
          </p>
        </header>

        {/* Recipe bowl progress */}
        <div className="bg-[#241611] border border-[#C9A46C]/25 rounded-2xl p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-black uppercase text-[#C9A46C]/60">
              Mixing bowl
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={undo}
                disabled={!sequence.length || loading}
                className="p-1.5 rounded-lg text-[#C9A46C] hover:bg-[#C9A46C]/10 disabled:opacity-30"
                title="Undo last"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={!sequence.length || loading}
                className="p-1.5 rounded-lg text-[#C9A46C] hover:bg-[#C9A46C]/10 disabled:opacity-30"
                title="Start over"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="h-3 rounded-full bg-[#1A0F0B] border border-[#C9A46C]/20 overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#8B6914] via-[#C9A46C] to-[#D8BA8A] transition-all duration-500 ease-out"
              style={{ width: `${(sequence.length / PASSKEY_LENGTH) * 100}%` }}
            />
          </div>

          <div className="flex flex-wrap gap-1.5 min-h-[2.5rem]">
            {sequence.length === 0 && (
              <span className="text-xs text-[#C9A46C]/40 italic">Empty bowl…</span>
            )}
            {sequence.map((idx, i) => (
              <span
                key={`${i}-${idx}`}
                className="text-lg admin-vault-pop inline-block"
                title={INGREDIENTS[idx]?.english}
              >
                {INGredientVisual[idx].emoji}
              </span>
            ))}
          </div>

          <p className="text-xs text-[#FFFBED]/80 mt-3 font-medium min-h-[2.5rem]">
            {loading ? '…' : message}
          </p>
          {error && (
            <p className="text-xs font-bold text-red-400 mt-1">{error}</p>
          )}
        </div>

        {/* Ingredient altar — index 0–9 maps to passkey digits */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          {INGREDIENTS.map((ing, index) => {
            const vis = INGredientVisual[index];
            const active = pulseIdx === index;
            return (
              <button
                key={ing.english}
                type="button"
                disabled={loading}
                onClick={() => tapIngredient(index)}
                title={`Digit ${index}`}
                className={`group relative text-left p-3 rounded-2xl border-2 transition-all duration-200 disabled:opacity-50 ${
                  active
                    ? 'border-[#FFFBED] bg-[#C9A46C]/30 scale-105 shadow-[0_0_20px_rgba(201,164,108,0.4)]'
                    : 'border-[#C9A46C]/25 bg-[#241611] hover:border-[#C9A46C]/60 hover:bg-[#2a1a14]'
                }`}
              >
                <span
                  className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-[#1A0F0B]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  aria-hidden
                >
                  <span className="text-4xl font-black text-[#C9A46C] tabular-nums drop-shadow-[0_0_12px_rgba(201,164,108,0.8)]">
                    {index}
                  </span>
                </span>
                <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">
                  {vis.emoji}
                </span>
                <span className="text-[10px] font-black text-[#FFFBED] leading-tight block line-clamp-2">
                  {ing.name.split('(')[0].trim()}
                </span>
                <span className="text-[9px] text-[#C9A46C]/50 font-medium">{vis.short}</span>
              </button>
            );
          })}
        </div>

        <p className="text-center text-[10px] text-[#C9A46C]/35 mt-5">
          Jainik Foods · Karanja (Lad) · Ahimsa kitchen access
        </p>
      </div>
    </div>
  );
}
