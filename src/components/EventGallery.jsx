import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Building2, Play, ShieldCheck, Sparkles } from 'lucide-react';

export default function EventGallery() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      videoRef.current.volume = 1.0;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const handleVolumeChange = () => {
    if (videoRef.current) {
      setIsMuted(videoRef.current.muted || videoRef.current.volume === 0);
    }
  };

  return (
    <section id="gallery" className="py-24 relative bg-[#070C14] border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Hospital <span className="text-gradient-lime">Tour</span>
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
              
              {/* Floating Sound Toggle Button */}
              <button
                onClick={toggleMute}
                className="absolute top-4 right-4 z-30 px-4 py-2.5 rounded-xl bg-slate-950/90 hover:bg-slate-900 border border-[#35A6B7]/60 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title={isMuted ? "Click to turn on sound" : "Click to mute sound"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-rose-400" />
                    <span className="text-rose-200">Unmute Sound (Enable Audio)</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#B8ED78] animate-pulse" />
                    <span className="text-[#B8ED78]">Sound On</span>
                  </>
                )}
              </button>

              {/* Continuously Looping Hospital Tour Video with Audio Enabled */}
              <video
                ref={videoRef}
                src="/videos/hospital-tour.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                controls
                preload="auto"
                onVolumeChange={handleVolumeChange}
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
