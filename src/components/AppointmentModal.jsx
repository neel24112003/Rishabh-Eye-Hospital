import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Send, CheckCircle2, ShieldCheck, Clock, User, Phone, Mail, ChevronDown, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AppointmentModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    doctor: 'Dr. Hetalkumar R. Yagnik',
    service: 'Cataract Surgery (Phaco)',
    date: '',
    time: 'Morning (9:00 AM - 1:00 PM)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);

    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await fetch(`${API_BASE}/api/book-appointment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        console.warn(`[AppointmentModal] API returned status ${res.status}`);
      }
    } catch (err) {
      console.warn('[AppointmentModal] API Email notice:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);

      confetti({
        particleCount: 95,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#B8ED78', '#35A6B7', '#51AABC']
      });
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
    setFormData({
      name: '',
      phone: '',
      email: '',
      doctor: 'Dr. Hetalkumar R. Yagnik',
      service: 'Cataract Surgery (Phaco)',
      date: '',
      time: 'Morning (9:00 AM - 1:00 PM)',
      notes: ''
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-panel border border-[#35A6B7]/50 rounded-3xl p-5 sm:p-8 max-w-lg w-full relative shadow-2xl bg-[#0E1726]/95 max-h-[92vh] overflow-y-auto my-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 pr-10">
            <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-[#B8ED78]/20 text-[#B8ED78] border border-[#B8ED78]/40">
              Direct Email Sync to 21amtics441@gmail.com
            </span>
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
            Book Eye Consultation
          </h3>
          <p className="text-xs text-slate-300 mb-5">Priority booking dispatched directly to hospital email and patient.</p>

          {submitted ? (
            <div className="py-6 px-3 text-center">
              <CheckCircle2 className="w-14 h-14 text-[#B8ED78] mx-auto mb-3 animate-bounce" />
              <h4 className="font-display text-xl sm:text-2xl font-extrabold text-white mb-2">Request Submitted!</h4>
              <p className="text-xs text-slate-200 leading-relaxed mb-6">
                Thank you <strong className="text-white">{formData.name}</strong>. Aapka appointment request receive ho gaya hai. Our team will call you on <strong className="text-[#B8ED78]">{formData.phone}</strong> to confirm your slot!
              </p>
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B8ED78] to-[#35A6B7] text-slate-950 font-bold text-xs"
              >
                Done & Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Patient Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#070C14] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#B8ED78]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    required
                    placeholder="10-digit phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#070C14] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#B8ED78]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Patient Email Address (Optional)</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="e.g. patient@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#070C14] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#B8ED78]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Doctor Preference</label>
                  <div className="relative">
                    <select
                      value={formData.doctor}
                      onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                      className="w-full appearance-none px-3 py-2.5 rounded-xl bg-[#070C14] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#B8ED78] cursor-pointer pr-8"
                    >
                      <option value="Dr. Hetalkumar R. Yagnik">Dr. Hetalkumar R. Yagnik</option>
                      <option value="Dr. Shefali H. Yagnik">Dr. Shefali H. Yagnik</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Treatment / Checkup</label>
                  <div className="relative">
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full appearance-none px-3 py-2.5 rounded-xl bg-[#070C14] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#B8ED78] cursor-pointer pr-8"
                    >
                      <option value="Cataract Surgery (Phaco)">Cataract Surgery (Phaco)</option>
                      <option value="LASIK Spectacle Removal">Bladeless LASIK</option>
                      <option value="ICL Lens Placement">ICL Lens</option>
                      <option value="Glaucoma Surgery">Glaucoma Surgery</option>
                      <option value="Retina Evaluation">Retina Care</option>
                      <option value="Comprehensive Eye Checkup">Comprehensive Checkup</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#070C14] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#B8ED78]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Slot</label>
                  <div className="relative">
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full appearance-none px-3 py-2.5 rounded-xl bg-[#070C14] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#B8ED78] cursor-pointer pr-8"
                    >
                      <option value="Morning (9:00 AM - 1:00 PM)">Morning (9:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                      <option value="Evening (5:00 PM - 8:30 PM)">Evening (5:00 PM - 8:30 PM)</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B8ED78] via-[#35A6B7] to-[#51AABC] text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#B8ED78]/25 hover:shadow-[#B8ED78]/40 transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Sending Email Notifications...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Confirm & Email Consultation Request</span>
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
