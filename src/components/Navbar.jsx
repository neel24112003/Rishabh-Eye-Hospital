import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Phone, Calendar, Menu, X, ShieldCheck, ChevronRight, MapPin } from 'lucide-react';

export default function Navbar({ onOpenAppointment }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // ScrollSpy
      const sections = ['home', 'doctors', 'about', 'infrastructure', 'services', 'equipment', 'gallery', 'reviews', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Doctors', href: '#doctors', id: 'doctors' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Hospital Interior', href: '#infrastructure', id: 'infrastructure' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Equipment', href: '#equipment', id: 'equipment' },
    { name: 'Events', href: '#gallery', id: 'gallery' },
    { name: 'Reviews', href: '#reviews', id: 'reviews' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Main Glassmorphism Navbar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'py-2.5 bg-[#070C14]/95 backdrop-blur-2xl border-b border-[#35A6B7]/30 shadow-2xl shadow-[#070C14]'
            : 'py-4 bg-[#070C14]/60 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Branding */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#35A6B7] via-[#51AABC] to-[#B8ED78] p-0.5 shadow-lg shadow-[#35A6B7]/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#070C14] rounded-[10px] flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#B8ED78] group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg tracking-tight text-white group-hover:text-[#B8ED78] transition-colors">
                  RISHABH
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#35A6B7]/20 text-[#35A6B7] border border-[#35A6B7]/30">
                  EYECARE
                </span>
              </div>
              <span className="text-[10px] tracking-wider text-slate-400 font-medium -mt-0.5">
                Hospital & Laser Center • Surat
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full glass-panel border border-[#35A6B7]/20">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'text-[#070C14] font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navTabActive"
                      className="absolute inset-0 bg-gradient-to-r from-[#B8ED78] to-[#35A6B7] rounded-full -z-10 shadow-md shadow-[#B8ED78]/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAppointment}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-gradient-to-r from-[#B8ED78] via-[#35A6B7] to-[#51AABC] hover:opacity-95 shadow-lg shadow-[#B8ED78]/25 hover:shadow-[#B8ED78]/40 hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 group"
            >
              <Calendar className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
              <span>Book Appointment</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl glass-panel border border-[#35A6B7]/30 text-slate-200 hover:text-[#B8ED78] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-20 z-30 lg:hidden p-4"
          >
            <div className="glass-panel border border-[#35A6B7]/40 rounded-2xl p-5 shadow-2xl backdrop-blur-2xl bg-[#070C14]/95 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-1">
                <span className="text-xs font-bold text-[#B8ED78] tracking-wider uppercase">Menu Navigation</span>
                <span className="text-[11px] text-slate-400 font-mono">Surat Center</span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === link.id
                      ? 'bg-gradient-to-r from-[#35A6B7]/20 to-[#B8ED78]/10 text-[#B8ED78] border border-[#B8ED78]/30 font-bold'
                      : 'text-slate-200 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              ))}

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAppointment();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B8ED78] to-[#35A6B7] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#B8ED78]/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment Now</span>
                </button>

                <a
                  href="tel:07405563636"
                  className="w-full py-2.5 rounded-xl glass-panel border border-[#35A6B7]/40 text-[#B8ED78] font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Hotline: 074055 63636</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
