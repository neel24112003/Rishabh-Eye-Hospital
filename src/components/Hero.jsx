import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Calendar, Sparkles, Award, Shield, CheckCircle2, ChevronRight, PhoneCall, Zap, Activity } from 'lucide-react';
import EyeVisualizerCanvas from './3D/EyeVisualizerCanvas';

export default function Hero({ onOpenAppointment }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="home" className="relative pt-32 lg:pt-36 pb-20 overflow-hidden bg-cyber-grid radial-glow">
      {/* Background Glowing Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#35A6B7]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#B8ED78]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start pt-6 sm:pt-8 lg:pt-10"
          >
            {/* Headline - Guaranteed 2 Lines */}
            <motion.h1 variants={itemVariants} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] xl:text-5xl font-extrabold tracking-tight text-white leading-[1.18] mb-6">
              <span className="block">Empowering Clear Vision With</span>
              <span className="text-gradient-lime block mt-1">
                Futuristic Precision
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p variants={itemVariants} className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              Welcome to <strong className="text-white font-semibold">Rishabh Eye Hospital & Laser Center</strong>, Surat. 
              Equipped with fully modular international standard <span className="text-[#B8ED78] font-medium">German Operation Theatre</span>, 
              world-class <span className="text-[#35A6B7] font-medium">American Phaco Technology</span>, and 
              bladeless laser spectacle removal by senior super-consultant <strong className="text-white">Dr. Hetalkumar Yagnik</strong>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-7">
              <button
                onClick={onOpenAppointment}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#B8ED78] via-[#35A6B7] to-[#51AABC] shadow-xl shadow-[#B8ED78]/20 hover:shadow-[#B8ED78]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Calendar className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
                <span>Book Consultation</span>
                <ChevronRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl glass-panel border border-[#35A6B7]/40 text-slate-100 hover:text-[#B8ED78] hover:border-[#B8ED78]/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold group"
              >
                <Zap className="w-4 h-4 text-[#35A6B7] group-hover:text-[#B8ED78] transition-colors" />
                <span>Explore LASIK & Treatments</span>
              </a>
            </motion.div>

            {/* Hospital Official Slogan - Prominent & Bold */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl glass-panel border border-[#B8ED78]/40 bg-[#070C14]/80 shadow-lg shadow-[#B8ED78]/10 hover:border-[#B8ED78]/70 transition-all duration-300">
              <Sparkles className="w-5 h-5 text-[#B8ED78] shrink-0 animate-pulse" />
              <p className="text-white text-sm sm:text-base font-extrabold tracking-wide">
                <span className="text-gradient-lime">Clear Vision, Better Life</span> — We Care For Your Eyes
              </p>
            </motion.div>
          </motion.div>

          {/* Right Interactive 3D Canvas Column */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full relative"
            >
              {/* Decorative Frame */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#B8ED78]/30 via-[#35A6B7]/30 to-[#51AABC]/30 rounded-3xl blur-xl opacity-70 animate-pulse-slow" />
              
              <div className="relative glass-panel rounded-3xl p-3 border border-[#35A6B7]/30 shadow-2xl overflow-hidden">
                <EyeVisualizerCanvas />
              </div>
            </motion.div>
          </div>

        </div>

        {/* Hero Bottom Stats Counter Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-[#35A6B7]/25 flex items-center gap-2.5 sm:gap-4 hover:border-[#B8ED78]/40 transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#35A6B7]/20 to-[#B8ED78]/20 border border-[#B8ED78]/30 flex items-center justify-center text-[#B8ED78] shrink-0">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display text-white truncate">17+</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium leading-tight">Years Super-Experience</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-[#35A6B7]/25 flex items-center gap-2.5 sm:gap-4 hover:border-[#B8ED78]/40 transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#35A6B7]/20 to-[#B8ED78]/20 border border-[#B8ED78]/30 flex items-center justify-center text-[#35A6B7] shrink-0">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display text-[#B8ED78] truncate">100%</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium leading-tight">Successful Track Record</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-[#35A6B7]/25 flex items-center gap-2.5 sm:gap-4 hover:border-[#B8ED78]/40 transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#35A6B7]/20 to-[#B8ED78]/20 border border-[#B8ED78]/30 flex items-center justify-center text-[#51AABC] shrink-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="text-lg sm:text-2xl md:text-3xl font-extrabold font-display text-white truncate">German</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium leading-tight">Modular Operation Theatre</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-[#35A6B7]/25 flex items-center gap-2.5 sm:gap-4 hover:border-[#B8ED78]/40 transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#35A6B7]/20 to-[#B8ED78]/20 border border-[#B8ED78]/30 flex items-center justify-center text-[#B8ED78] shrink-0">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="text-lg sm:text-2xl md:text-3xl font-extrabold font-display text-white truncate">American</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium leading-tight">World-Class Phaco System</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
