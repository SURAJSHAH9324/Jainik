import React from 'react';
import { X, ZoomIn, Download, ExternalLink } from 'lucide-react';

export default function ImageModal({ imageSrc, title, subtitle, onClose }) {
  if (!imageSrc) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center bg-slate-900/90 border border-amber-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
          <div>
            <h3 className="text-white font-black text-base sm:text-lg">{title || 'Jainik Energy Bar Asset'}</h3>
            {subtitle && <p className="text-amber-400 text-xs font-medium">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-2">
            <a 
              href={imageSrc} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-xs flex items-center gap-1.5"
              title="Open full image in new tab"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Open Full Size</span>
            </a>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Display */}
        <div className="w-full flex-1 flex items-center justify-center overflow-auto rounded-2xl bg-black/60 p-2">
          <img 
            src={imageSrc} 
            alt={title || 'Poster view'} 
            className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl"
          />
        </div>

        {/* Footer */}
        <div className="w-full pt-3 mt-2 flex items-center justify-between text-xs text-slate-400">
          <span>Official Jainik Foods Asset • Built on Purity</span>
          <span className="text-amber-400 font-bold">FSSAI Certified</span>
        </div>
      </div>
    </div>
  );
}
