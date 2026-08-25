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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Top Pill Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#B8ED78]/40 mb-6 shadow-lg shadow-[#B8ED78]/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8ED78] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B8ED78]"></span>
              </span>
              <span className="text-xs font-semibold tracking-wider text-[#B8ED78] uppercase">
                Surat's Premier Ophthalmic & Laser Hub
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Empowering Clear Vision With{' '}
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
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
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

            {/* Key Feature Trust Pills */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full border-t border-slate-800/80 pt-6">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#35A6B7]/10 border border-[#35A6B7]/30 text-[#35A6B7]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-300 font-medium">German Standard OT</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#B8ED78]/10 border border-[#B8ED78]/30 text-[#B8ED78]">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-300 font-medium">17+ Years Legacy</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#51AABC]/10 border border-[#51AABC]/30 text-[#51AABC]">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-300 font-medium">American Phaco System</span>
              </div>
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
          <div className="glass-panel p-5 rounded-2xl border border-[#35A6B7]/25 flex items-center gap-4 hover:border-[#B8ED78]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#35A6B7]/20 to-[#B8ED78]/20 border border-[#B8ED78]/30 flex items-center justify-center text-[#B8ED78]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">17+</div>
              <div className="text-xs text-slate-400 font-medium">Years Super-Experience</div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-[#35A6B7]/25 flex items-center gap-4 hover:border-[#B8ED78]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#35A6B7]/20 to-[#B8ED78]/20 border border-[#B8ED78]/30 flex items-center justify-center text-[#35A6B7]">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#B8ED78]">100%</div>
              <div className="text-xs text-slate-400 font-medium">Successful Track Record</div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-[#35A6B7]/25 flex items-center gap-4 hover:border-[#B8ED78]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#35A6B7]/20 to-[#B8ED78]/20 border border-[#B8ED78]/30 flex items-center justify-center text-[#51AABC]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">German</div>
              <div className="text-xs text-slate-400 font-medium">Modular Operation Theatre</div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-[#35A6B7]/25 flex items-center gap-4 hover:border-[#B8ED78]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#35A6B7]/20 to-[#B8ED78]/20 border border-[#B8ED78]/30 flex items-center justify-center text-[#B8ED78]">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">American</div>
              <div className="text-xs text-slate-400 font-medium">World-Class Phaco System</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
