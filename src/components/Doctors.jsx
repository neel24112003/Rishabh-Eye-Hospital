import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Sparkles, Shield, UserCheck, Star, Stethoscope, Eye, User } from 'lucide-react';

export default function Doctors() {
  const doctors = [
    {
      name: "Dr. Hetalkumar R. Yagnik",
      title: "Senior Super-Consultant Ophthalmic Surgeon",
      experience: "17+ Years Experience",
      image: "/images/dr-hetal-yagnik.jpg",
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
      image: "/images/dr-shefali-yagnik.jpg",
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
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#35A6B7]/30 hover:border-[#B8ED78]/50 shadow-xl glass-card-hover relative group flex flex-col sm:flex-row gap-6 items-stretch overflow-hidden"
            >
              {/* Doctor Real Photo Portrait Card */}
              <div className="relative w-full sm:w-56 h-72 sm:h-auto rounded-2xl overflow-hidden shrink-0 border border-[#35A6B7]/40 shadow-xl bg-[#070C14] group-hover:border-[#B8ED78]/60 transition-all">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
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

                  <div className="flex flex-wrap gap-1.5">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
