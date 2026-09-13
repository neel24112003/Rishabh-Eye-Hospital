import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, Clock, User, ShieldCheck, CheckCircle2, Send, Sparkles, Award, HeartHandshake, Loader2, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AppointmentSection() {
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const initialFormState = {
    name: '',
    phone: '',
    email: '',
    doctor: 'Dr. Hetalkumar R. Yagnik',
    service: 'Cataract Surgery (Phaco)',
    preferredDate: getTodayDate(),
    preferredTime: 'Morning (9:00 AM - 1:00 PM)',
    notes: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
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
        console.warn(`[AppointmentSection] API returned status ${res.status}`);
      }
    } catch (err) {
      console.warn('[AppointmentSection] API Email notice:', err);
    } finally {
      setIsSubmitting(false);
      setBookingSubmitted(true);

      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#B8ED78', '#35A6B7', '#51AABC']
      });

      setTimeout(() => {
        setBookingSubmitted(false);
        setFormData(initialFormState);
      }, 4500);
    }
  };

  return (
    <section id="appointment" className="py-24 relative bg-[#070C14] border-t border-slate-800/60 overflow-hidden">
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#35A6B7]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#B8ED78]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35A6B7]/15 border border-[#35A6B7]/30 text-[#B8ED78] text-xs font-bold tracking-wider uppercase mb-4 shadow-lg shadow-[#35A6B7]/10">
            <Calendar className="w-4 h-4" />
            <span>Priority OPD Booking</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Book Your <span className="text-gradient-lime">Eye Consultation</span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            Schedule your appointment online with Senior Super-Consultants at Rishabh Eye Hospital & Laser Center, Surat. Quick confirmation sent to your phone and email.
          </p>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT COLUMN: Booking Form (7 Cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-[#35A6B7]/40 shadow-2xl relative flex flex-col justify-between h-full">
            
            {/* Form Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">Fill Appointment Details</h3>
                <p className="text-xs text-slate-400">Direct Email & OPD Confirmation Sent Instantly</p>
              </div>

              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#B8ED78]/20 text-[#B8ED78] border border-[#B8ED78]/40 shrink-0">
                🟢 OPD OPEN
              </span>
            </div>

            {bookingSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="my-auto py-12 px-6 rounded-2xl bg-[#B8ED78]/15 border border-[#B8ED78] text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-[#B8ED78] mx-auto mb-4 animate-bounce" />
                <h4 className="font-display text-2xl font-extrabold text-white mb-2">Appointment Scheduled Successfully!</h4>
                <p className="text-sm text-slate-200 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. We have received your appointment request. Our hospital OPD coordinator will call you on <strong className="text-[#B8ED78]">{formData.phone}</strong> to confirm your slot!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between" autoComplete="off">
                <div className="space-y-4 mb-6">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Patient Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Shah"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#070C14] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#B8ED78] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mobile Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98250 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#070C14] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#B8ED78] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Patient Email Address (Optional for Auto-Reply)</label>
                    <input
                      type="email"
                      placeholder="e.g. patient@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#070C14] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#B8ED78] transition-colors"
                    />
                  </div>

                  {/* Doctor & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Senior Consultant *</label>
                      <div className="relative">
                        <select
                          value={formData.doctor}
                          onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                          className="w-full appearance-none px-4 py-3 rounded-xl bg-[#070C14] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B8ED78] transition-colors cursor-pointer pr-10"
                        >
                          <option value="Dr. Hetalkumar R. Yagnik">Dr. Hetalkumar R. Yagnik (Senior Super-Consultant)</option>
                          <option value="Dr. Shefali H. Yagnik">Dr. Shefali H. Yagnik (Consultant Surgeon)</option>
                          <option value="First Available Senior Specialist">First Available Senior Specialist</option>
                        </select>
                        <ChevronDown className="w-5 h-5 text-white absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Required Service / Speciality *</label>
                      <div className="relative">
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full appearance-none px-4 py-3 rounded-xl bg-[#070C14] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B8ED78] transition-colors cursor-pointer pr-10"
                        >
                          <option value="Cataract Surgery (Phaco)">Cataract Surgery (American Phaco)</option>
                          <option value="LASIK Spectacle Removal">Bladeless LASIK Surgery</option>
                          <option value="ICL Lens Implant">ICL Lens Implant</option>
                          <option value="Glaucoma Surgery">Glaucoma Care & Surgery</option>
                          <option value="Squint & Oculoplastic">Squint & Oculoplastic</option>
                          <option value="Retina Evaluation">Retina Care & Evaluation</option>
                          <option value="Comprehensive Checkup">Comprehensive Eye Checkup</option>
                        </select>
                        <ChevronDown className="w-5 h-5 text-white absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                      </div>
                    </div>
                  </div>

                  {/* Preferred Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        min={getTodayDate()}
                        value={formData.preferredDate}
                        onChange={(e) => {
                          setFormData({ ...formData, preferredDate: e.target.value });
                          e.target.blur();
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-[#070C14] border border-slate-700 text-white font-semibold text-sm focus:outline-none focus:border-[#B8ED78] transition-colors cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Time Slot *</label>
                      <div className="relative">
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className="w-full appearance-none px-4 py-3 rounded-xl bg-[#070C14] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B8ED78] transition-colors cursor-pointer pr-10"
                        >
                          <option value="Morning (9:00 AM - 1:00 PM)">Morning (9:00 AM - 1:00 PM)</option>
                          <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                          <option value="Evening (5:00 PM - 8:30 PM)">Evening (5:00 PM - 8:30 PM)</option>
                        </select>
                        <ChevronDown className="w-5 h-5 text-white absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Additional Notes / Symptoms (Optional)</label>
                    <textarea
                      rows="2"
                      placeholder="Describe any eye discomfort, power details, or previous reports..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#070C14] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#B8ED78] transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#B8ED78] via-[#35A6B7] to-[#51AABC] text-slate-950 font-extrabold text-base flex items-center justify-center gap-3 shadow-xl shadow-[#B8ED78]/25 hover:shadow-[#B8ED78]/40 hover:scale-[1.01] active:scale-95 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>CONFIRM & SEND APPOINTMENT REQUEST</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: Feature Showcase & Doctor Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Top Banner Card: Why Choose Rishabh Eyecare */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-[#35A6B7]/40 shadow-xl bg-gradient-to-br from-[#070C14] via-[#0E1726] to-[#070C14] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#B8ED78]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#B8ED78]" />
                <span className="text-xs font-mono font-bold text-[#B8ED78] uppercase tracking-wider">
                  World-Class Eye Care
                </span>
              </div>

              <h3 className="font-display text-2xl font-extrabold text-white mb-3 leading-snug">
                Why Book Consultation at Rishabh Eye Hospital?
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Recognized as one of Surat's premier super-specialty eye care centers with advanced surgical infrastructure and 100% patient satisfaction.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#35A6B7]/20 border border-[#35A6B7]/40 flex items-center justify-center shrink-0 text-[#B8ED78]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">German Modular Operation Theatre</h4>
                    <p className="text-xs text-slate-400">Zero-infection laminar airflow sterile environment for all surgeries.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#35A6B7]/20 border border-[#35A6B7]/40 flex items-center justify-center shrink-0 text-[#B8ED78]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">American Phaco & Bladeless LASIK</h4>
                    <p className="text-xs text-slate-400">Pioneer in 10-minute micro-incision cataract and spectacle removal.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#35A6B7]/20 border border-[#35A6B7]/40 flex items-center justify-center shrink-0 text-[#B8ED78]">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">30,000+ Successful Surgeries</h4>
                    <p className="text-xs text-slate-400">Led by Senior Super-Consultants Dr. Hetalkumar & Dr. Shefali Yagnik.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quick Helpline Banner */}
            <div className="glass-panel p-6 rounded-3xl border border-[#B8ED78]/40 bg-gradient-to-r from-[#35A6B7]/20 via-[#070C14] to-[#B8ED78]/15 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono font-bold text-[#B8ED78] uppercase mb-1">
                  Need Immediate Assistance?
                </div>
                <div className="text-base sm:text-lg font-bold text-white">
                  Call OPD Helpline Now
                </div>
                <div className="text-xs text-slate-300 font-semibold mt-0.5">
                  074055 63636 <span className="text-slate-500 font-normal">|</span> 98982 93695
                </div>
              </div>

              <a
                href="tel:07405563636"
                className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#35A6B7] to-[#B8ED78] p-0.5 shadow-lg shrink-0 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center text-slate-950"
              >
                <Phone className="w-6 h-6 animate-pulse" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
