import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Play, ShieldCheck, Sparkles } from 'lucide-react';

export default function EventGallery() {
  /*
  // Commented out previous image slider items as requested:
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
    }
  ];
  */

  return (
    <section id="gallery" className="py-24 relative bg-[#070C14] border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Hospital <span className="text-gradient-lime">View</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Take a continuous video tour of Rishabh Eyecare Hospital & Laser Center featuring our modern infrastructure, AC waiting lounges, and international surgical suites.
          </p>
        </div>

        {/* Video Player Showcase Container */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative h-[380px] sm:h-[540px] rounded-3xl overflow-hidden glass-panel border border-[#35A6B7]/40 shadow-2xl bg-[#070C14] group">
            
            {/* Continuously Looping Hospital View Video */}
            <video
              src="/videos/hospital-view.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full object-cover rounded-3xl"
            >
              Your browser does not support the video tag.
            </video>

            {/* Top Overlay Badge */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-slate-950/85 text-[#B8ED78] border border-[#B8ED78]/40 backdrop-blur-md shadow-lg flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#B8ED78]" />
                <span>Rishabh Eyecare Hospital — Full Video Tour</span>
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

