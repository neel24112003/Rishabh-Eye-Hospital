import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Sparkles, Shield, UserCheck, Star, Stethoscope, Eye, User } from 'lucide-react';

export default function Doctors() {
  const doctors = [
    {
      name: "Dr. Hetalkumar R. Yagnik",
      qualifications: "D.O.M.S., D.N.B., M.N.A.M.S. (Ophthal)",
      title: "Senior Super-Consultant • Phaco, Cornea & Oculoplastic Surgeon",
      fellowships: [
        "Fellow of Cornea Foundation (Ahmedabad)",
        "Fellow of Sir Gangaram Hospital (Oculoplasty, New Delhi)"
      ],
      clinicalFocus: [],
      experience: "20+ Years Experience",
      image: "/images/dr-hetal-yagnik.jpg",
      objectPosition: "object-top",
      badgeColor: "from-[#35A6B7] to-[#B8ED78]",
      description: "Senior Super-Consultant with 20+ years of vast surgical mastery and an unblemished track record. Renowned pioneer in high-precision American Phaco Cataract Surgeries, German optics microsurgery, Bladeless LASIK spectacle removal, Cornea transplants, Oculoplastic reconstructions, and ICL implants.",
      specialties: [
        "Phaco Cataract Surgery",
        "Cornea & Refractive Care",
        "Oculoplastic Reconstruction",
        "Bladeless LASIK & ICL",
        "Glaucoma Management",
        "German Modular OT Surgery"
      ],
      rating: "5.0",
      reviewsCount: "2,400+ Patients"
    },
    {
      name: "Dr. Shefali H. Yagnik",
      qualifications: "B. Optom.",
      title: "Senior Orthoptist & Contact Lens Specialist",
      fellowships: [],
      clinicalFocus: [
        "Specialist in Binocular Vision Therapy & Non-Surgical Squint Alignment",
        "Expert in Custom Specialty Contact Lenses & Pediatric Diagnostics"
      ],
      experience: "20+ Years Experience",
      image: "/images/dr-shefali-yagnik.jpg",
      objectPosition: "object-[50%_20%]",
      badgeColor: "from-[#51AABC] to-[#35A6B7]",
      description: "Leading Orthoptist & Contact Lens Specialist with 20+ years of clinical mastery. Specialized in advanced binocular vision evaluation, pediatric refraction diagnostics, non-surgical squint therapy, computer vision syndrome (CVS) treatment, and custom specialty contact lens fitting with compassionate patient care.",
      specialties: [
        "Orthoptics & Binocular Care",
        "Specialty Contact Lenses",
        "Pediatric Eye Diagnostics",
        "Squint Alignment Therapy",
        "Amblyopia (Lazy Eye) Care",
        "Computer Vision Therapy"
      ],
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
            Our expert specialists bring decades of clinical mastery, high-precision microsurgery skills, and warm personal dedication to every patient.
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
              <div className="relative w-full sm:w-60 h-80 sm:h-auto rounded-2xl overflow-hidden shrink-0 border border-[#35A6B7]/40 shadow-xl bg-[#070C14] group-hover:border-[#B8ED78]/60 transition-all">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/dr-shefali-yagnik.jpg';
                  }}
                  className={`w-full h-full object-cover ${doctor.objectPosition || 'object-top'} group-hover:scale-105 transition-transform duration-500`}
                />
              </div>

              {/* Doctor Info */}
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#35A6B7]/15 border border-[#35A6B7]/30 text-xs font-semibold text-[#35A6B7] mb-3">
                    <Star className="w-3.5 h-3.5 fill-[#B8ED78] text-[#B8ED78]" />
                    <span>5 Star Services</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#B8ED78] transition-colors mb-1">
                    {doctor.name}
                  </h3>

                  <p className="text-sm font-bold text-[#B8ED78] tracking-wide mb-1">
                    {doctor.qualifications}
                  </p>

                  <p className="text-xs font-semibold text-[#35A6B7] uppercase tracking-wider mb-3">
                    {doctor.title}
                  </p>

                  {doctor.fellowships && doctor.fellowships.length > 0 && (
                    <div className="space-y-1.5 mb-4 bg-[#35A6B7]/10 p-2.5 rounded-xl border border-[#35A6B7]/30">
                      {doctor.fellowships.map((fellowship, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                          <Award className="w-3.5 h-3.5 text-[#B8ED78] shrink-0" />
                          <span>{fellowship}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {doctor.clinicalFocus && doctor.clinicalFocus.length > 0 && (
                    <div className="space-y-1.5 mb-4 bg-[#35A6B7]/10 p-2.5 rounded-xl border border-[#35A6B7]/30">
                      {doctor.clinicalFocus.map((focus, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                          <Award className="w-3.5 h-3.5 text-[#B8ED78] shrink-0" />
                          <span>{focus}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {doctor.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {doctor.specialties.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-[11px] font-medium text-slate-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B8ED78] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Experience Bar */}
                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-[#B8ED78]">
                    <Shield className="w-3.5 h-3.5 text-[#B8ED78]" />
                    <span>20+ Years Clinical Mastery</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



