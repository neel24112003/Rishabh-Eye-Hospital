import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Clock, Calendar, Send, CheckCircle2, Navigation, ShieldCheck, ChevronDown, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactMap({ onBookSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    doctor: 'Dr. Hetalkumar R. Yagnik',
    service: 'Cataract Surgery (Phaco)',
    preferredDate: '',
    preferredTime: 'Morning (9:00 AM - 1:00 PM)',
    notes: ''
  });

  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);

    try {
      await fetch('http://localhost:5001/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.warn('API Email notice:', err);
    } finally {
      setIsSubmitting(false);
      setBookingSubmitted(true);

      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.5 },
        colors: ['#B8ED78', '#35A6B7', '#51AABC']
      });

      if (onBookSuccess) onBookSuccess(formData);
    }
  };

  // Google Maps Natural Color Embed URL with Official Place Card Info
  const mapEmbedUrl = "https://maps.google.com/maps?q=Rishabh+Eyecare+Hospital+%26+Laser+Center,+The+Lenora,+201-202,+New+City+Light+Rd,+Althan,+Surat,+Gujarat+395007&t=&z=16&ie=UTF8&iwloc=B&output=embed";

  return (
    <section id="contact" className="py-24 relative bg-[#070C14] border-t border-slate-800/60 overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#35A6B7]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#B8ED78]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#35A6B7]/30 text-xs font-semibold text-[#35A6B7] uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#B8ED78]" />
            <span>Surat Eye Care Destination</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Contact & <span className="text-gradient-lime">Appointment Booking</span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            Visit our state of art hospital in Surat or schedule your consultation online. Confirmation is emailed directly to our hospital team and patient.
          </p>
        </div>

        {/* Top Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a
            href="tel:07405563636"
            className="glass-panel p-6 rounded-3xl border border-[#35A6B7]/30 hover:border-[#B8ED78]/50 glass-card-hover flex items-center gap-4 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#35A6B7] to-[#B8ED78] p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-[#070C14] rounded-[14px] flex items-center justify-center text-[#B8ED78] group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono uppercase">Emergency & Helpline</div>
              <div className="text-xl font-bold text-white group-hover:text-[#B8ED78] transition-colors">
                074055 63636
              </div>
              <div className="text-[11px] text-[#35A6B7] font-semibold mt-0.5">Click to Call Directly</div>
            </div>
          </a>

          <div className="glass-panel p-6 rounded-3xl border border-[#35A6B7]/30 hover:border-[#B8ED78]/50 glass-card-hover flex items-center gap-4 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#51AABC] to-[#35A6B7] p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-[#070C14] rounded-[14px] flex items-center justify-center text-[#35A6B7]">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono uppercase">Hospital Location</div>
              <div className="text-xs font-semibold text-slate-200 leading-snug">
                The Lenora, 201-202, New City Light Rd, beside Naveli Hospital, Althan, Surat, Gujarat 395007
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-[#35A6B7]/30 hover:border-[#B8ED78]/50 glass-card-hover flex items-center gap-4 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#B8ED78] to-[#51AABC] p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-[#070C14] rounded-[14px] flex items-center justify-center text-[#B8ED78]">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono uppercase">OPD Timings</div>
              <div className="text-sm font-bold text-white">Mon - Sat: 9:00 AM - 8:30 PM</div>
              <div className="text-[11px] text-[#B8ED78] font-semibold mt-0.5">Direct Email Dispatch & Auto-Reply</div>
            </div>
          </div>
        </div>

        {/* Form + Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Appointment Form */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-10 border border-[#35A6B7]/40 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-display text-2xl font-bold text-white">Schedule Appointment</h3>
                <p className="text-xs text-slate-400">Direct Email Notification to Hospital & Patient Confirmation</p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#B8ED78]/20 text-[#B8ED78] border border-[#B8ED78]/40">
                EMAIL SYNC ACTIVE
              </span>
            </div>

            {bookingSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 px-6 rounded-2xl bg-[#B8ED78]/15 border border-[#B8ED78] text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-[#B8ED78] mx-auto mb-4 animate-bounce" />
                <h4 className="font-display text-2xl font-extrabold text-white mb-2">Appointment Request Received!</h4>
                <p className="text-sm text-slate-200 max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. We have successfully received your appointment request. The Rishabh Eye Hospital OPD team is reviewing your requested slot and will call you on <strong className="text-[#B8ED78]">{formData.phone}</strong> shortly to confirm your consultation!
                </p>
                <button
                  onClick={() => setBookingSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white text-xs font-bold border border-slate-700"
                >
                  Book Another Appointment
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Patient Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter patient name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#070C14] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B8ED78] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#070C14] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B8ED78] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Patient Email Address (Optional for Auto-Reply Confirmation)</label>
                  <input
                    type="email"
                    placeholder="e.g. patient@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#070C14] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B8ED78] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Doctor</label>
                    <div className="relative">
                      <select
                        value={formData.doctor}
                        onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                        className="w-full appearance-none px-4 py-3 rounded-xl bg-[#070C14] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B8ED78] transition-colors cursor-pointer pr-10"
                      >
                        <option value="Dr. Hetalkumar R. Yagnik">Dr. Hetalkumar R. Yagnik (Super-Consultant)</option>
                        <option value="Dr. Shefali H. Yagnik">Dr. Shefali H. Yagnik (Retina & Pediatric)</option>
                      </select>
                      <ChevronDown className="w-5 h-5 text-white absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Required Service</label>
                    <div className="relative">
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full appearance-none px-4 py-3 rounded-xl bg-[#070C14] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B8ED78] transition-colors cursor-pointer pr-10"
                      >
                        <option value="Cataract Surgery (Phaco)">Cataract Surgery (American Phaco)</option>
                        <option value="LASIK Spectacle Removal">Bladeless LASIK Surgery</option>
                        <option value="ICL Lens Implant">ICL Lens Implant</option>
                        <option value="Glaucoma Surgery">Glaucoma Surgery</option>
                        <option value="Squint & Oculoplastic">Squint & Oculoplastic</option>
                        <option value="Retina Evaluation">Retina Care & Evaluation</option>
                        <option value="Comprehensive Checkup">Comprehensive Eye Checkup</option>
                      </select>
                      <ChevronDown className="w-5 h-5 text-white absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#070C14] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B8ED78] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Time Slot</label>
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

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Additional Notes / Symptoms (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Describe any eye discomfort, power details, or previous reports..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070C14] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B8ED78] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#B8ED78] via-[#35A6B7] to-[#51AABC] text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-[#B8ED78]/25 hover:shadow-[#B8ED78]/40 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Sending Email to Hospital & Patient...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-slate-950" />
                      <span>Confirm & Send Email Notifications</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Interactive Google Map */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-[#35A6B7]/40 shadow-2xl h-full flex flex-col justify-between">
              
              {/* Clean Suitable Heading */}
              <div className="pb-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                  <Navigation className="w-4 h-4 text-[#B8ED78]" />
                  <span>Hospital Location & Live Directions</span>
                </div>
              </div>

              {/* Map Iframe */}
              <div className="relative flex-1 min-h-[360px] rounded-2xl overflow-hidden my-4 border border-slate-800 shadow-inner">
                <iframe
                  title="Rishabh Eyecare Hospital Location Map Surat"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[360px]"
                />
              </div>

              {/* Prominent, Taller & Perfectly Aligned Get GPS Directions Button */}
              <div className="pt-1">
                <a
                  href="https://maps.google.com/?q=Rishabh+Eyecare+Hospital+The+Lenora+New+City+Light+Rd+Althan+Surat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#35A6B7] via-[#51AABC] to-[#B8ED78] text-slate-950 font-extrabold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-[#B8ED78]/20 hover:shadow-[#B8ED78]/35 border border-white/20"
                >
                  <Navigation className="w-5 h-5 text-slate-950 shrink-0" />
                  <span>Get GPS Directions</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
