import React from 'react';
import { Phone, MapPin, Mail, Clock, Navigation, Compass, ExternalLink, ShieldCheck } from 'lucide-react';

export default function ContactSection() {
  // Google Maps Embed URL with Official Place Card & Location Pin (Same to Same Google Maps View)
  const mapEmbedUrl = "https://maps.google.com/maps?q=Rishabh+Eye+Hospital+and+laser+center,+The+Lenora,+201-202,+New+City+Light+Rd,+beside+Naveli+Hospital,+opposite+St.+Thomas+School,+New+Tirumala,+New+City+Light,+Althan,+Surat,+Gujarat+395007&t=&z=16&ie=UTF8&iwloc=&output=embed";
  
  const googleMapsDirectionsUrl = "https://www.google.com/maps/search/?api=1&query=Rishabh+Eye+Hospital+and+laser+center+The+Lenora+Surat";

  return (
    <section id="contact" className="py-24 relative bg-[#04070D] border-t border-slate-800/60 overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#35A6B7]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#B8ED78]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Visit Our <span className="text-gradient-lime">Eye Hospital in Surat</span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            Located in Althan, New City Light, Surat. Visit us during OPD hours or call our emergency helpline numbers for immediate ophthalmic assistance.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Card 1: Address */}
          <div className="glass-panel p-6 rounded-3xl border border-[#35A6B7]/30 hover:border-[#B8ED78]/50 glass-card-hover flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#35A6B7] to-[#B8ED78] p-0.5 shadow-lg mb-4">
                <div className="w-full h-full bg-[#070C14] rounded-[14px] flex items-center justify-center text-[#B8ED78] group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-display text-base font-bold text-white mb-2">Hospital Address</h3>
              <p className="text-xs font-semibold text-[#B8ED78] leading-relaxed mb-4">
                The Lenora, 201-202, New City Light Rd, beside Naveli Hospital, opposite St. Thomas School, New Tirumala, Althan, Surat - 395007.
              </p>
            </div>

            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#35A6B7] hover:text-white transition-colors group/link"
            >
              <span>Get Directions</span>
              <Navigation className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Card 2: Helpline */}
          <div className="glass-panel p-6 rounded-3xl border border-[#35A6B7]/30 hover:border-[#B8ED78]/50 glass-card-hover flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#35A6B7] to-[#B8ED78] p-0.5 shadow-lg mb-4">
                <div className="w-full h-full bg-[#070C14] rounded-[14px] flex items-center justify-center text-[#B8ED78] group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 animate-pulse" />
                </div>
              </div>
              <h3 className="font-display text-base font-bold text-white mb-2">Helpline Numbers</h3>
              <p className="text-xs text-slate-400 mb-2">Available for OPD Booking & Emergency Care</p>
              <div className="text-sm font-bold text-[#B8ED78] space-y-1 mb-4">
                <div><a href="tel:07405563636" className="hover:underline">074055 63636</a></div>
                <div><a href="tel:9898293695" className="hover:underline">98982 93695</a></div>
              </div>
            </div>

            <a
              href="tel:07405563636"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#35A6B7] hover:text-white transition-colors"
            >
              <span>Call OPD Helpline</span>
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Email */}
          <div className="glass-panel p-6 rounded-3xl border border-[#35A6B7]/30 hover:border-[#B8ED78]/50 glass-card-hover flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#35A6B7] to-[#B8ED78] p-0.5 shadow-lg mb-4">
                <div className="w-full h-full bg-[#070C14] rounded-[14px] flex items-center justify-center text-[#B8ED78] group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-display text-base font-bold text-white mb-2">Email Support</h3>
              <p className="text-xs text-slate-400 mb-2">Send Reports & Medical Inquiries</p>
              <div className="text-xs font-semibold text-[#B8ED78] break-all mb-4">
                <a href="mailto:rishabheyecare36@gmail.com" className="hover:underline">
                  rishabheyecare36@gmail.com
                </a>
              </div>
            </div>

            <a
              href="mailto:rishabheyecare36@gmail.com"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#35A6B7] hover:text-white transition-colors"
            >
              <span>Send Mail Notice</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 4: OPD Hours */}
          <div className="glass-panel p-6 rounded-3xl border border-[#35A6B7]/30 hover:border-[#B8ED78]/50 glass-card-hover flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#35A6B7] to-[#B8ED78] p-0.5 shadow-lg mb-4">
                <div className="w-full h-full bg-[#070C14] rounded-[14px] flex items-center justify-center text-[#B8ED78] group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-display text-base font-bold text-white mb-2">OPD Working Hours</h3>
              <div className="text-xs text-slate-300 space-y-2 mb-4">
                <div className="flex flex-col gap-0.5 border-b border-slate-800 pb-2">
                  <div className="flex justify-between font-semibold text-slate-200">
                    <span>Mon - Sat:</span>
                    <span className="text-[#B8ED78] font-bold">11:00 AM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-end font-semibold text-[#B8ED78]">
                    <span className="font-bold">5:00 PM - 7:00 PM</span>
                  </div>
                </div>
                <div className="text-[11px] font-bold text-amber-400/90 pt-0.5">
                  (Strictly by Appointment)
                </div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#35A6B7] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#35A6B7]" />
              <span>Strictly Prior Appointment Only</span>
            </div>
          </div>

        </div>

        {/* Full-Width Interactive Google Maps Embed Container */}
        <div className="glass-panel rounded-3xl p-3 sm:p-4 border border-[#35A6B7]/40 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 mb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#B8ED78]" />
              <span className="text-xs font-bold text-white tracking-wide">
                Google Maps Location — Rishabh Eye Hospital and laser center, Surat
              </span>
            </div>

            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#35A6B7] to-[#B8ED78] text-slate-950 text-xs font-extrabold hover:opacity-90 shadow-md transition-all"
            >
              <span>Get Driving Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative w-full h-[460px] sm:h-[500px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
            {/* Google Maps Place Card Overlay (Always Visible on Mobile & Desktop) */}
            <div className="absolute top-3 left-3 z-10 max-w-[280px] xs:max-w-[310px] sm:max-w-[350px] bg-white rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-slate-200 text-slate-900 pointer-events-auto">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    Rishabh Eye Hospital and laser center
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-blue-600 transition-colors"
                    title="Open in Google Maps"
                  >
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>

                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1A73E8] hover:bg-blue-700 flex items-center justify-center text-white shadow-md transition-colors"
                    title="Get Directions"
                  >
                    <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  </a>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                The Lenora, 201-202, New City Light Rd, beside naveli hospital, opp. St. Thomas school, New Tirumala, New City Light, Althan, Surat, Gujarat 395007, India
              </p>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <span className="font-bold text-slate-900">4.9</span>
                <span className="text-amber-500 text-sm">★</span>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  (272)
                </a>
              </div>
            </div>

            <iframe
              title="Rishabh Eye Hospital and laser center Google Map Location Surat"
              src={mapEmbedUrl}
              className="w-full h-full border-0 rounded-2xl"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
