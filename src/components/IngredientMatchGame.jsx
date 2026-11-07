import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { X, Trophy, Copy, Check, ShoppingBag, RotateCcw, Timer } from 'lucide-react';
import { INGREDIENTS } from '../data/products';

const PAIR_EMOJI = {
  almonds: '🥜',
  cashews: '🌰',
  pistachios: '🫛',
  pumpkin: '🎃',
  oats: '🌾',
  chana: '🫘',
  watermelon: '🍉',
  dates: '📅',
  jaggery: '🍯',
  chocolate: '🍫',
};

function pickGamePairs(count = 6) {
  const pool = INGREDIENTS.map((ing, i) => {
    const key = ing.english.split(' ')[0].toLowerCase();
    const emoji =
      Object.entries(PAIR_EMOJI).find(([k]) => ing.english.toLowerCase().includes(k))?.[1] ||
      ['🥜', '🌰', '🫘', '🍯', '🌾', '✨'][i % 6];
    return {
      id: key + i,
      label: ing.english.split(' ')[0],
      emoji,
    };
  });
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function buildDeck(pairs) {
  const cards = pairs.flatMap((p) => [
    { uid: `${p.id}-a`, pairId: p.id, label: p.label, emoji: p.emoji },
    { uid: `${p.id}-b`, pairId: p.id, label: p.label, emoji: p.emoji },
  ]);
  return cards.sort(() => Math.random() - 0.5);
}

const WIN_COUPON = 'AHIMSA15';

export default function IngredientMatchGame({ isOpen, onClose, onOpenCart }) {
  const [pairs, setPairs] = useState(() => pickGamePairs(6));
  const [deck, setDeck] = useState(() => buildDeck(pairs));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [lock, setLock] = useState(false);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [copied, setCopied] = useState(false);

  const won = matched.length === pairs.length;

  useEffect(() => {
    if (!isOpen || won) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [isOpen, won]);

  const reset = useCallback(() => {
    const fresh = pickGamePairs(6);
    setPairs(fresh);
    setDeck(buildDeck(fresh));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setSeconds(0);
    setLock(false);
  }, []);

  const handleFlip = (uid, pairId) => {
    if (lock || won) return;
    if (flipped.includes(uid) || matched.includes(pairId)) return;

    const next = [...flipped, uid];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      setLock(true);
      const a = deck.find((c) => c.uid === next[0]);
      const b = deck.find((c) => c.uid === next[1]);
      if (a?.pairId === b?.pairId) {
        setMatched((m) => [...m, pairId]);
        setFlipped([]);
        setLock(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLock(false);
        }, 700);
      }
    }
  };

  const stars = useMemo(() => {
    if (!won) return 0;
    if (moves <= 10) return 3;
    if (moves <= 16) return 2;
    return 1;
  }, [won, moves]);

  const copyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(WIN_COUPON);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-warm-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FFFBED] border border-warm-300 rounded-3xl shadow-warm-xl overflow-hidden text-warm-900 max-h-[90vh] overflow-y-auto">
        <div className="h-1.5 bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-800" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-warm-100 hover:bg-warm-200 text-warm-600 z-10"
          aria-label="Close game"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-warm-600 mb-1">
            Jainik mini-game
          </p>
          <h2 className="text-2xl font-black text-warm-950 pr-8">
            Match the <span className="text-warm-600">Superfoods</span>
          </h2>
          <p className="text-xs text-warm-600 mt-1 mb-4">
            Flip cards, find all ingredient pairs, unlock a secret cart coupon.
          </p>

          {!won ? (
            <>
              <div className="flex gap-4 text-xs font-bold text-warm-700 mb-4">
                <span className="flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5" /> {seconds}s
                </span>
                <span>Moves: {moves}</span>
                <span>Pairs: {matched.length}/{pairs.length}</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                {deck.map((card) => {
                  const isUp =
                    flipped.includes(card.uid) || matched.includes(card.pairId);
                  return (
                    <button
                      key={card.uid}
                      type="button"
                      onClick={() => handleFlip(card.uid, card.pairId)}
                      className="aspect-square perspective-[600px] focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-600 rounded-2xl"
                    >
                      <div
                        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                          isUp ? '[transform:rotateY(180deg)]' : ''
                        }`}
                      >
                        <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-warm-800 to-warm-950 border-2 border-[#C9A46C]/40 flex items-center justify-center text-2xl shadow-inner">
                          🌾
                        </div>
                        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-2xl bg-white border-2 border-warm-300 flex flex-col items-center justify-center p-1 shadow-md">
                          <span className="text-2xl sm:text-3xl">{card.emoji}</span>
                          <span className="text-[9px] sm:text-[10px] font-black text-warm-800 mt-1 text-center leading-tight">
                            {card.label}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-4 text-xs font-bold text-warm-600 hover:text-warm-900 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Shuffle again
              </button>
            </>
          ) : (
            <div className="text-center space-y-4 py-4 animate-fadeIn">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-black text-warm-950">Recipe unlocked!</h3>
              <p className="text-sm text-warm-700">
                {stars === 3 ? 'Master chef speed!' : stars === 2 ? 'Solid kitchen skills!' : 'You made it — nice!'}
              </p>
              <div className="flex justify-center gap-1 text-amber-500 text-xl">
                {'★'.repeat(stars)}
                {'☆'.repeat(3 - stars)}
              </div>
              <p className="text-xs text-warm-600">
                {moves} moves · {seconds} seconds
              </p>

              <div className="p-4 rounded-2xl bg-warm-100 border border-warm-300">
                <p className="text-[10px] font-black uppercase text-warm-600 mb-2">
                  Your reward — 15% off in cart
                </p>
                <div className="flex items-center justify-center gap-2">
                  <code className="text-lg font-black tracking-wider text-warm-950 bg-white px-4 py-2 rounded-xl border border-warm-300">
                    {WIN_COUPON}
                  </code>
                  <button
                    type="button"
                    onClick={copyCoupon}
                    className="p-2.5 rounded-xl bg-warm-900 text-white hover:bg-warm-800"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onOpenCart?.();
                    onClose();
                  }}
                  className="flex-1 py-3 rounded-xl btn-warm-primary text-xs font-bold flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Open cart & apply code
                </button>
                <button type="button" onClick={reset} className="flex-1 py-3 rounded-xl btn-warm-secondary text-xs font-bold">
                  Play again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
