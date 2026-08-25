import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Calendar, Sparkles, Shield, UserCheck, Star, Stethoscope, Eye, User } from 'lucide-react';

export default function Doctors({ onOpenAppointment }) {
  const doctors = [
    {
      name: "Dr. Hetalkumar R. Yagnik",
      title: "Senior Super-Consultant Ophthalmic Surgeon",
      experience: "17+ Years Experience",
      avatarInitials: "HY",
      badgeColor: "from-[#35A6B7] to-[#B8ED78]",
      description: "Vast experience of 17 years with an unblemished track record of all surgeries executed successfully. Pioneer in American Phaco Cataract Surgeries, Bladeless LASIK spectacle removal, and ICL implants.",
      specialties: [
        "Phaco Cataract Surgery",
        "LASIK Spectacle Removal",
        "ICL Implants",
        "Glaucoma & Refractive Care"
      ],
      qualifications: "M.S. (Ophthalmology), Senior Super-Consultant",
      rating: "5.0",
      reviewsCount: "2,400+ Patients"
    },
    {
      name: "Dr. Shefali H. Yagnik",
      title: "Consultant Ophthalmic Surgeon",
      experience: "14+ Years Experience",
      avatarInitials: "SY",
      badgeColor: "from-[#51AABC] to-[#35A6B7]",
      description: "Specialized consultant in Medical Retina, Pediatric Eye Diagnostics, Squint Alignment, and Oculoplastic Reconstructive Surgeries with compassionate patient-centric care.",
      specialties: [
        "Medical Retina Care",
        "Squint & Pediatric Surgery",
        "Oculoplastic & DCR",
        "Comprehensive Eye Diagnostics"
      ],
      qualifications: "M.S. (Ophthalmology), Fellowship in Retina & Cornea",
      rating: "4.9",
      reviewsCount: "1,850+ Patients"
    }
  ];

  return (
    <section id="doctors" className="py-24 relative bg-[#070C14] border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#35A6B7]/30 text-xs font-semibold text-[#35A6B7] uppercase tracking-wider mb-4">
            <UserCheck className="w-3.5 h-3.5 text-[#B8ED78]" />
            <span>World-Class Medical Leadership</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Meet Our Senior <span className="text-gradient-lime">Super-Consultants</span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            Our expert surgeons bring decades of international clinical mastery, high-precision microsurgery skills, and warm personal dedication to every patient.
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#35A6B7]/30 hover:border-[#B8ED78]/50 shadow-xl glass-card-hover relative group flex flex-col sm:flex-row gap-6 items-start"
            >
              {/* Doctor Avatar Badge (High-Definition Styled Card) */}
              <div className="relative w-full sm:w-48 h-56 sm:h-full rounded-2xl overflow-hidden shrink-0 border border-[#35A6B7]/40 shadow-lg bg-gradient-to-b from-[#0E1726] to-[#070C14] flex flex-col items-center justify-center p-6 text-center">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${doctor.badgeColor} p-0.5 shadow-xl mb-3 group-hover:scale-105 transition-transform`}>
                  <div className="w-full h-full bg-[#070C14] rounded-[14px] flex items-center justify-center font-display font-black text-2xl text-[#B8ED78]">
                    {doctor.avatarInitials}
                  </div>
                </div>

                <div className="font-bold text-white text-sm">{doctor.name.split(' ')[0]} {doctor.name.split(' ')[1]}</div>
                <div className="text-[11px] text-[#35A6B7] font-semibold mt-0.5">{doctor.experience}</div>

                <div className="mt-4 py-1 px-3 rounded-full bg-[#B8ED78]/15 border border-[#B8ED78]/40 text-[10px] font-bold text-[#B8ED78]">
                  SURAT CLINIC
                </div>
              </div>

              {/* Doctor Info */}
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#35A6B7]/15 border border-[#35A6B7]/30 text-xs font-semibold text-[#35A6B7]">
                      <Star className="w-3.5 h-3.5 fill-[#B8ED78] text-[#B8ED78]" />
                      <span>{doctor.rating} ({doctor.reviewsCount})</span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400">Surat, Gujarat</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#B8ED78] transition-colors mb-1">
                    {doctor.name}
                  </h3>

                  <p className="text-xs font-semibold text-[#35A6B7] uppercase tracking-wider mb-2">
                    {doctor.title}
                  </p>

                  <p className="text-xs text-slate-400 font-mono mb-4">
                    {doctor.qualifications}
                  </p>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                    {doctor.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {doctor.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-[11px] font-medium text-slate-200"
                      >
                        ✓ {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenAppointment}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#35A6B7] to-[#51AABC] hover:from-[#B8ED78] hover:to-[#35A6B7] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>Book Slot with {doctor.name.split(' ')[1]}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
