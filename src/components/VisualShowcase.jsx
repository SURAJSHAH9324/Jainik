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
    <section id="showcase" className="py-20 bg-[#241611] text-[#FFFBED] relative border-b border-[#D8C08A]/20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2E1D17] border border-[#D8C08A]/30 text-[#D8C08A] text-xs font-black uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A46C]" />
            <span>VISUAL STORY & CRAFT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#FFFBED] tracking-tight">
            Inside the <span className="italic font-normal text-[#C9A46C]">Jainik Standard</span>
          </h2>
          <p className="text-[#F3E8DD]/80 text-xs sm:text-sm font-medium">
            Swipe through our official brand visuals and pure ingredient formulation.
          </p>
        </div>

        {/* Main Showcase Container */}
        <div className="max-w-5xl mx-auto">
          
          {/* Main Visual Display Frame */}
          <div className="relative rounded-3xl overflow-hidden bg-[#1A0F0B] border border-[#D8C08A]/30 shadow-2xl">
            
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

          {/* Thumbnail Tabs */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3 mt-4">
            {SHOWCASE_SLIDES.map((slide, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`p-2 rounded-2xl border text-left transition-all ${
                    isActive
                      ? 'border-[#C9A46C] bg-[#1A0F0B] ring-2 ring-[#C9A46C]/40 shadow-sm'
                      : 'border-[#D8C08A]/20 bg-[#241611] hover:bg-[#2E1D17]'
                  }`}
                >
                  <div className="aspect-[16/9] rounded-lg overflow-hidden bg-[#2E1D17] mb-1.5">
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className={`w-full h-full object-cover transition-opacity ${isActive ? 'opacity-100' : 'opacity-60'}`}
                    />
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#C9A46C] block">
                      Slide {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-[#FFFBED] line-clamp-1">
                      {slide.title}
                    </span>
                  </div>
                  <div className="sm:hidden text-center text-[10px] font-black text-[#D8C08A]">
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
