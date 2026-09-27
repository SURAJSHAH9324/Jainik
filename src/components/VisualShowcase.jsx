import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Sparkles, MessageSquare, Maximize2 } from 'lucide-react';
import { SHOWCASE_SLIDES } from '../data/products';
import { openWhatsAppDirectChat } from '../utils/whatsapp';

export default function VisualShowcase({ onOpenImage }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? SHOWCASE_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === SHOWCASE_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = SHOWCASE_SLIDES[currentIndex];

  return (
    <section id="showcase" className="py-20 bg-[#FAF6F0] text-warm-900 relative border-b border-warm-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-warm-300 text-warm-800 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Visual Story & Craft</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-warm-900 tracking-tight">
            Inside the <span className="text-warm-600">Jainik Standard</span>
          </h2>
          <p className="text-warm-700 text-xs sm:text-sm">
            Swipe through our official brand visuals and pure ingredient formulation.
          </p>
        </div>

        {/* Main Showcase Container */}
        <div className="max-w-5xl mx-auto">
          
          {/* Main Visual Display Frame */}
          <div className="relative rounded-3xl overflow-hidden bg-white border border-warm-300 shadow-warm-lg">
            
            {/* Clickable Image Container */}
            <div 
              onClick={() => onOpenImage(currentSlide.image, currentSlide.title, currentSlide.subtitle)}
              className="relative aspect-[16/8] sm:aspect-[16/7] w-full overflow-hidden bg-warm-100 cursor-pointer group"
            >
              <img 
                src={currentSlide.image} 
                alt={currentSlide.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-warm-950/80 via-warm-950/20 to-transparent pointer-events-none" />

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-16 sm:right-24 text-white space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                  IMAGE {currentIndex + 1} OF {SHOWCASE_SLIDES.length}
                </span>
                <h3 className="text-base sm:text-2xl font-black tracking-tight text-white drop-shadow-sm">
                  {currentSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-warm-100/90 font-medium line-clamp-2 drop-shadow-xs">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Lightbox Zoom Indicator */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenImage(currentSlide.image, currentSlide.title, currentSlide.subtitle);
                }}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-warm-900 p-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 text-xs font-bold"
                title="View Full Resolution"
              >
                <Maximize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Zoom Fullscreen</span>
              </button>
            </div>

            {/* Slider Navigation Arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-warm-900 shadow-md flex items-center justify-center transition-all hover:scale-110 border border-warm-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-warm-900 shadow-md flex items-center justify-center transition-all hover:scale-110 border border-warm-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* 5 Barefruit-Style Thumbnail Tabs */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3 mt-4">
            {SHOWCASE_SLIDES.map((slide, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`p-2 rounded-2xl border text-left transition-all ${
                    isActive
                      ? 'border-warm-900 bg-white ring-2 ring-warm-900/10 shadow-sm'
                      : 'border-warm-200 bg-white/60 hover:bg-white hover:border-warm-300'
                  }`}
                >
                  <div className="aspect-[16/9] rounded-lg overflow-hidden bg-warm-100 mb-1.5">
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className={`w-full h-full object-cover transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`}
                    />
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-[10px] font-black uppercase tracking-wider text-warm-500 block">
                      Slide {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-warm-900 line-clamp-1">
                      {slide.title}
                    </span>
                  </div>
                  <div className="sm:hidden text-center text-[10px] font-black text-warm-800">
                    #{idx + 1}
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
