import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles, Building2, Eye, ShieldCheck } from 'lucide-react';

export default function EventGallery() {
  const slides = [
    {
      id: 1,
      title: "German Modular OT Surgical Suite",
      category: "Surgical OT Infrastructure",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "Bladeless LASIK Refractive Laser Suite",
      category: "Spectacle Removal Laser",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "Free Cataract Screening & Medical Eye Camp",
      category: "Community Outreach Event",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 4,
      title: "High-Precision Retinal Fundus Diagnostics",
      category: "Clinical Workshop",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 5,
      title: "Pediatric Vision Screening & Squint Alignment Event",
      category: "Pediatric Eye Care",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 6,
      title: "Advanced Microsurgical Tech Seminar",
      category: "Surgeon Masterclass",
      image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Autoplay carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const currentSlide = slides[currentIndex];

  return (
    <section id="gallery" className="py-24 relative bg-[#070C14] border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#35A6B7]/30 text-xs font-semibold text-[#35A6B7] uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5 text-[#B8ED78]" />
            <span>Ophthalmic Events & Surgical Highlights</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Event <span className="text-gradient-lime">Gallery</span>
          </h2>
        </div>

        {/* Carousel Showcase Container */}
        <div className="relative max-w-5xl mx-auto">
          
          <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden glass-panel border border-[#35A6B7]/40 shadow-2xl">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative flex flex-col justify-between p-6 sm:p-10"
              >
                {/* Real High-Res Background Image */}
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Vignette Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070C14] via-[#070C14]/40 to-black/30" />

                {/* Top Bar: Expand Button */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-[#B8ED78] border border-[#B8ED78]/40 backdrop-blur-md">
                    {currentSlide.category}
                  </span>

                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="p-2.5 rounded-xl bg-slate-950/80 text-slate-200 hover:text-[#B8ED78] border border-slate-700 hover:border-[#B8ED78] backdrop-blur-md transition-all shadow-lg"
                    title="View Fullscreen Photo"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Overlay: Title Only (No Theory) */}
                <div className="relative z-10 mt-auto">
                  <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md mb-4">
                    {currentSlide.title}
                  </h3>

                  {/* Slide Indicator Dots */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs font-mono text-slate-300">
                      PHOTO {currentIndex + 1} OF {slides.length}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {slides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            idx === currentIndex ? 'w-8 bg-[#B8ED78]' : 'w-2 bg-white/40'
                          }`}
                          aria-label={`Go to photo ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Left / Right Navigation Arrow Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/80 hover:bg-[#35A6B7] text-white hover:text-slate-950 border border-slate-700 transition-all z-20 backdrop-blur-md shadow-xl"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/80 hover:bg-[#B8ED78] text-white hover:text-slate-950 border border-slate-700 transition-all z-20 backdrop-blur-md shadow-xl"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Real Photo Thumbnails Bar Below */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-6">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative rounded-xl overflow-hidden h-20 border transition-all text-left group ${
                  idx === currentIndex
                    ? 'border-[#B8ED78] ring-2 ring-[#B8ED78]/50 shadow-lg scale-105'
                    : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent p-1.5 flex items-end">
                  <span className="text-[10px] font-bold text-white line-clamp-1">
                    {slide.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-5xl w-full glass-panel border border-[#35A6B7]/50 rounded-3xl overflow-hidden relative bg-[#070C14] shadow-2xl"
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 text-white hover:text-[#B8ED78] border border-slate-700 z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-[70vh] w-full">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="w-full h-full object-contain bg-black"
                />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#B8ED78] text-slate-950 mb-2 inline-block">
                      {currentSlide.category}
                    </span>
                    <h4 className="font-display text-2xl font-extrabold text-white">
                      {currentSlide.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => setLightboxOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#B8ED78] text-slate-950 font-bold text-xs hover:scale-105 transition-transform"
                  >
                    Close Fullscreen
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
