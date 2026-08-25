import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles, Building2, Cpu, Eye, Award, ShieldCheck } from 'lucide-react';

export default function EventGallery() {
  const slides = [
    {
      id: 1,
      title: "Modular German Operation Theatre",
      category: "Surgical OT",
      tag: "100% Sterile HEPA Cleanroom",
      gradient: "from-[#070C14] via-[#0E1726] to-[#1B7B93]",
      accentColor: "#B8ED78",
      icon: ShieldCheck,
      desc: "Ultra-clean Modular OT equipped with 99.97% HEPA laminar airflow, surgical microscopes & zero-infection sterilization."
    },
    {
      id: 2,
      title: "Alcon Laureate American Phaco Suite",
      category: "Cataract Surgery",
      tag: "Sutureless 1.8mm Surgery",
      gradient: "from-[#0E1726] via-[#1B2A3D] to-[#35A6B7]",
      accentColor: "#35A6B7",
      icon: Cpu,
      desc: "World-renowned American Phaco system console for high-precision micro-incision cataract lens replacement."
    },
    {
      id: 3,
      title: "Bladeless LASIK Refractive Center",
      category: "Laser Surgery",
      tag: "Spectacle-Free 24hr Recovery",
      gradient: "from-[#070C14] via-[#152338] to-[#51AABC]",
      accentColor: "#51AABC",
      icon: Sparkles,
      desc: "Computer-guided topography LASIK suite delivering sub-micron corneal laser alignment for permanent glass removal."
    },
    {
      id: 4,
      title: "Spacious Fully AC Patient Lounge",
      category: "Hospital Infrastructure",
      tag: "Ample Waiting Capacity",
      gradient: "from-[#0B1524] via-[#0E1726] to-[#254B5E]",
      accentColor: "#B8ED78",
      icon: Building2,
      desc: "Comfortable, climate-controlled AC reception lounge designed for maximum patient convenience and relaxing care."
    },
    {
      id: 5,
      title: "Digital Retina & Diagnostic Hub",
      category: "Diagnostics",
      tag: "High-Res Fundus Imaging",
      gradient: "from-[#070C14] via-[#1A2E40] to-[#1B7B93]",
      accentColor: "#35A6B7",
      icon: Eye,
      desc: "Advanced non-mydriatic digital retinal imaging for diabetic retinopathy, macula evaluation, and optic nerve mapping."
    },
    {
      id: 6,
      title: "In-House Precision Optical Store",
      category: "Optical Care",
      tag: "Branded Lenses & Frames",
      gradient: "from-[#0E1726] via-[#0B1524] to-[#35A6B7]",
      accentColor: "#51AABC",
      icon: Award,
      desc: "Complete spectacle dispensing unit with premium anti-glare, progressives, and protective computer eye glasses."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Autoplay carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const currentSlide = slides[currentIndex];
  const SlideIcon = currentSlide.icon;

  return (
    <section id="gallery" className="py-24 relative bg-[#070C14] border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#35A6B7]/30 text-xs font-semibold text-[#35A6B7] uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5 text-[#B8ED78]" />
            <span>State-of-the-Art Infrastructure</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Hospital Tour & <span className="text-gradient-lime">Event Gallery</span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            Take a visual tour through Rishabh Eye Hospital’s international modular operation theatres, laser suites, and patient care lounges in Surat.
          </p>
        </div>

        {/* Carousel Showcase Container */}
        <div className="relative max-w-5xl mx-auto">
          
          <div className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden glass-panel border border-[#35A6B7]/40 shadow-2xl">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className={`w-full h-full bg-gradient-to-br ${currentSlide.gradient} p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden`}
              >
                {/* Visual Background Accent Pattern */}
                <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#35A6B7]/10 blur-3xl pointer-events-none" />
                <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
                  <SlideIcon className="w-96 h-96 text-white" />
                </div>

                {/* Top Badge */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#B8ED78]/20 text-[#B8ED78] border border-[#B8ED78]/40">
                      {currentSlide.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700">
                      {currentSlide.tag}
                    </span>
                  </div>

                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="p-2.5 rounded-xl bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 hover:border-[#B8ED78] transition-colors"
                    title="Expand View"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Middle Content */}
                <div className="max-w-xl z-10 my-auto">
                  <div className="w-16 h-16 rounded-2xl bg-[#070C14] border border-[#35A6B7]/50 flex items-center justify-center text-[#B8ED78] mb-4 shadow-xl">
                    <SlideIcon className="w-8 h-8" />
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
                    {currentSlide.title}
                  </h3>

                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                    {currentSlide.desc}
                  </p>
                </div>

                {/* Bottom Slide Info & Controls */}
                <div className="flex items-center justify-between z-10 pt-4 border-t border-slate-800/80">
                  <div className="text-xs font-mono text-slate-400">
                    SLIDE {currentIndex + 1} OF {slides.length}
                  </div>

                  {/* Indicator Pills */}
                  <div className="flex items-center gap-1.5">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentIndex ? 'w-8 bg-[#B8ED78]' : 'w-2 bg-slate-700'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Left / Right Arrow Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-[#35A6B7] text-white hover:text-slate-950 border border-slate-700 transition-all z-20 backdrop-blur-md"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-[#B8ED78] text-white hover:text-slate-950 border border-slate-700 transition-all z-20 backdrop-blur-md"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnail Grid Below */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
            {slides.map((slide, idx) => {
              const ThumbIcon = slide.icon;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between h-24 ${
                    idx === currentIndex
                      ? 'bg-[#0E1726] border-[#B8ED78] shadow-lg shadow-[#B8ED78]/10'
                      : 'glass-panel border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <ThumbIcon className={`w-5 h-5 ${idx === currentIndex ? 'text-[#B8ED78]' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-[11px] font-bold text-white line-clamp-1">{slide.title}</div>
                    <div className="text-[9px] text-slate-400 font-mono">{slide.category}</div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl w-full glass-panel border border-[#35A6B7]/50 rounded-3xl p-8 relative bg-[#0E1726]"
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#B8ED78]/20 text-[#B8ED78] border border-[#B8ED78]/40">
                  {currentSlide.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300">
                  {currentSlide.tag}
                </span>
              </div>

              <h3 className="font-display text-3xl font-bold text-white mb-3">
                {currentSlide.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {currentSlide.desc}
              </p>

              <div className="p-6 rounded-2xl bg-[#070C14] border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-[#35A6B7]">Rishabh Eye Hospital & Laser Center • Surat</span>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#B8ED78] text-slate-950 font-bold text-xs"
                >
                  Close Modal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
