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

        {/* Video Player Showcase Container with Theme Square Frame */}
        <div className="relative max-w-5xl mx-auto">
          {/* Theme Outer Glowing Frame */}
          <div className="relative p-2 sm:p-3 rounded-3xl bg-gradient-to-br from-[#35A6B7]/50 via-slate-800/80 to-[#B8ED78]/50 border-2 border-[#35A6B7]/60 shadow-[0_0_40px_rgba(53,166,183,0.35)] group">
            
            {/* Corner Decorative Square Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#B8ED78] rounded-tl-xl pointer-events-none z-20"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#B8ED78] rounded-tr-xl pointer-events-none z-20"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#B8ED78] rounded-bl-xl pointer-events-none z-20"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#B8ED78] rounded-br-xl pointer-events-none z-20"></div>

            <div className="relative h-[380px] sm:h-[540px] rounded-2xl overflow-hidden bg-[#070C14] border border-[#35A6B7]/30">
              {/* Continuously Looping Hospital View Video */}
              <video
                src="/videos/hospital-tour.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
                preload="auto"
                className="w-full h-full object-cover rounded-2xl"
              >
                Your browser does not support the video tag.
              </video>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

