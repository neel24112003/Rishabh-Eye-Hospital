import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles, Building2, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function HospitalGallery() {
  const galleryItems = [
    {
      id: 1,
      title: "Spacious Executive Reception & Waiting Lounge",
      category: "Lounge",
      categoryLabel: "🛋️ Patient Waiting Lounge",
      image: "/images/hospital-interior-1.jpg",
      description: "Designed for ultimate patient comfort featuring ergonomic seating, soothing warm lighting, tranquil spiritual corner, and digital queue display system."
    },
    {
      id: 2,
      title: "Precision Ophthalmic Diagnostic Room",
      category: "Diagnostics",
      categoryLabel: "🔬 Advanced Diagnostic Suite",
      image: "/images/hospital-interior-2.jpg",
      description: "Equipped with state-of-the-art computerised auto-refractometer, non-contact tonometer, corneal topographer, and digital vision testing units."
    },
    {
      id: 3,
      title: "Dr. Hetalkumar Yagnik Consultation Chamber",
      category: "Chambers",
      categoryLabel: "👨‍⚕️ Super-Consultant Suite",
      image: "/images/hospital-interior-3.jpg",
      description: "Private, soundproof consultation suite with high-definition slit-lamp monitors, digital retinal camera, and live patient education screens."
    },
    {
      id: 4,
      title: "State-of-the-Art OPD Examination Suite",
      category: "OPD",
      categoryLabel: "👁️ OPD Examination & Slit Lamp Unit",
      image: "/images/hospital-interior-4.jpg",
      description: "Comprehensive automated workstation with motorized patient examination chairs, Zeiss slit-lamp microscopy, and digital keratometry."
    }
  ];

  const [activeTab, setActiveTab] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const filteredItems = activeTab === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="infrastructure" className="py-24 relative bg-[#04070D] border-t border-slate-800/60 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#35A6B7]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#B8ED78]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#35A6B7]/30 text-xs font-semibold text-[#35A6B7] uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5 text-[#B8ED78]" />
            <span>Hospital Ambiance & Facilities</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Inside Our <span className="text-gradient-lime">Modern Eye Hospital</span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            Step inside Rishabh Eye Hospital & Laser Center in Surat — built with world-class medical architecture, serene patient lounges, and hygienic diagnostic suites.
          </p>

          {/* Filter Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {['All', 'Lounge', 'Diagnostics', 'Chambers', 'OPD'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-[#B8ED78] to-[#35A6B7] text-slate-950 shadow-lg shadow-[#B8ED78]/20 scale-105'
                    : 'bg-[#0E1726]/80 text-slate-400 border border-slate-800 hover:text-white hover:border-[#35A6B7]/50'
                }`}
              >
                {tab === 'All' ? '✨ All Areas (4)' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              className="group glass-panel rounded-3xl overflow-hidden border border-[#35A6B7]/30 hover:border-[#B8ED78]/60 transition-all duration-300 glass-card-hover flex flex-col justify-between cursor-pointer relative"
            >
              {/* Image Box */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#070C14]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070C14] via-[#070C14]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#070C14]/85 text-[#B8ED78] border border-[#B8ED78]/40 backdrop-blur-md shadow-lg">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Hover Maximize Icon Button */}
                <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#070C14]/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-110">
                  <Maximize2 className="w-4 h-4 text-[#B8ED78]" />
                </div>
              </div>

              {/* Card Footer Text */}
              <div className="p-6 bg-[#070C14]/90 flex-1 flex flex-col justify-between border-t border-slate-800/80">
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#B8ED78] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Infrastructure Feature Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center">
            <div className="text-xl font-extrabold text-[#B8ED78] mb-0.5">100% Hygienic</div>
            <div className="text-xs text-slate-400">Sterilized OPD & OT</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center">
            <div className="text-xl font-extrabold text-[#35A6B7] mb-0.5">Air Conditioned</div>
            <div className="text-xs text-slate-400">Climate Controlled Chambers</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center">
            <div className="text-xl font-extrabold text-[#51AABC] mb-0.5">Spacious Lounge</div>
            <div className="text-xs text-slate-400">Ergonomic Patient Seating</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center">
            <div className="text-xl font-extrabold text-white mb-0.5">Prime Location</div>
            <div className="text-xs text-slate-400">New City Light, Althan</div>
          </div>
        </div>

      </div>

      {/* Full-Screen Interactive Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image Box */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full bg-[#070C14] rounded-3xl border border-[#35A6B7]/40 overflow-hidden shadow-2xl relative"
            >
              <div className="relative h-[50vh] sm:h-[65vh] w-full bg-black">
                <img
                  src={filteredItems[selectedImageIndex].image}
                  alt={filteredItems[selectedImageIndex].title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Lightbox Footer Details */}
              <div className="p-6 bg-[#070C14] border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#B8ED78] uppercase tracking-wider block mb-1">
                    {filteredItems[selectedImageIndex].categoryLabel}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">
                    {filteredItems[selectedImageIndex].title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                    {filteredItems[selectedImageIndex].description}
                  </p>
                </div>

                <div className="text-xs text-slate-400 font-mono shrink-0">
                  Image {selectedImageIndex + 1} of {filteredItems.length}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
