import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Zap, Shield, Sparkles, CheckCircle2, ChevronRight, X, Clock, Award, Activity } from 'lucide-react';

export default function Services({ onOpenAppointment }) {
  const [selectedService, setSelectedService] = useState(null);

  const surgicalServices = [
    {
      id: "cataract",
      title: "Cataract Surgery (Phaco)",
      badge: "American Phaco System",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
      shortDesc: "Micro-incision sutureless cataract removal with premium multifocal & toric lens implantation.",
      details: {
        duration: "15 - 20 Mins",
        anesthesia: "No-Injection Topical Drops",
        recovery: "24 Hours Rapid Vision Recovery",
        features: [
          "Micro-incision 1.8mm no-stitch technique",
          "Foldable Premium Aspheric IOL implantation",
          "Multifocal & Toric astigmatism correction",
          "Same-day discharge with post-op care kit"
        ]
      }
    },
    {
      id: "lasik",
      title: "Bladeless LASIK",
      badge: "Spectacle Removal",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
      shortDesc: "Advanced computer-guided refractive laser procedure to eliminate glasses permanently.",
      details: {
        duration: "10 Mins per eye",
        anesthesia: "Numbing Drops",
        recovery: "Immediate Next-Day Clear Vision",
        features: [
          "Customized wavefront topography guided",
          "Ultra-fast femtosecond laser technology",
          "Painfree procedure with minimal downtime",
          "Ideal for myopia, hyperopia & astigmatism"
        ]
      }
    },
    {
      id: "icl",
      title: "ICL Lens Implantation",
      badge: "High Power Correction",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
      shortDesc: "Implantable Collamer Lens placement for patients not suited for conventional LASIK.",
      details: {
        duration: "20 Mins",
        anesthesia: "Drop Anesthesia",
        recovery: "Same Day Vision",
        features: [
          "Reversible biocompatible Collamer lens",
          "Preserves natural corneal curvature",
          "Built-in UV protection filter",
          "Ideal for thin corneas & high spectacle numbers"
        ]
      }
    },
    {
      id: "glaucoma",
      title: "Glaucoma Care & Surgery",
      badge: "Intraocular Pressure Control",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80",
      shortDesc: "Early diagnosis, trabeculectomy & valve implants to prevent irreversible optic nerve damage.",
      details: {
        duration: "30 - 45 Mins",
        anesthesia: "Local Anesthesia",
        recovery: "Guided Medical Recovery",
        features: [
          "Non-contact tonometer pressure tracking",
          "Computerized visual field perimeter analysis",
          "Advanced SLT laser trabeculoplasty",
          "Filtration surgery for pressure management"
        ]
      }
    }
  ];

  const diagnosticServices = [
    {
      id: "retina",
      title: "Retina Evaluation & Care",
      badge: "Diabetic Screening",
      image: "/images/hospital-interior-3.jpg",
      shortDesc: "Screens and evaluates the back of the eye for diabetic retinopathy, macula & blood vessel health.",
      time: "30 Mins",
      specs: [
        "Digital fundus retinal imaging",
        "Diabetic & hypertensive retinopathy tracking",
        "Anti-VEGF intravitreal therapy guidance"
      ]
    },
    {
      id: "squint",
      title: "Squint & Pediatric Eye Care",
      badge: "Ocular Alignment",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
      shortDesc: "Surgical and orthoptic correction of eye misalignment and amblyopia (lazy eye) in children & adults.",
      time: "25 Mins",
      specs: [
        "Extraocular muscle alignment surgery",
        "Amblyopia vision therapy patches",
        "Pediatric refraction & vision screening"
      ]
    },
    {
      id: "oculoplastic",
      title: "Oculoplastic & DCR",
      badge: "Eyelid & Lacrimal Surgery",
      image: "/images/hospital-interior-4.jpg",
      shortDesc: "Reconstructive surgeries for drooping eyelids (ptosis), watery eyes (lacrimal blockage), and eyelid tumors.",
      time: "40 Mins",
      specs: [
        "Dacryocystorhinostomy (DCR) watery eye relief",
        "Ptosis eyelid elevation surgery",
        "Entropion & Ectropion lid repair"
      ]
    },
    {
      id: "checkup",
      title: "Comprehensive Eye Checkup",
      badge: "Full OPD Diagnostics",
      image: "/images/hospital-interior-1.jpg",
      shortDesc: "Complete 12-point computer diagnostic eye examination including auto-refraction, slit lamp & pressure check.",
      time: "20 Mins",
      specs: [
        "Computerized auto-refraction & prescription",
        "Slit lamp biomicroscopy of cornea & lens",
        "Non-contact intraocular pressure check"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 relative bg-[#070C14] border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Super-Specialty <span className="text-gradient-lime">Eye Treatments</span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            From sutureless cataract surgery to bladeless LASIK spectacle removal and retinal evaluation — delivered with German OT standards.
          </p>
        </div>

        {/* Surgical Category Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-2.5 h-7 rounded-full bg-gradient-to-b from-[#B8ED78] to-[#35A6B7]" />
          <h3 className="font-display text-xl font-bold text-white uppercase tracking-wide">
            1. Surgical & Laser Specialties
          </h3>
        </div>

        {/* Surgical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {surgicalServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="glass-panel rounded-3xl p-5 border border-[#35A6B7]/30 hover:border-[#B8ED78]/60 shadow-xl glass-card-hover flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Real Procedure Photo Header */}
                <div className="relative h-40 w-full rounded-2xl overflow-hidden border border-[#35A6B7]/40 mb-4 bg-[#070C14]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />
                  
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 text-[#B8ED78] border border-[#B8ED78]/40 backdrop-blur-md">
                    {service.badge}
                  </span>
                </div>

                <h4 className="font-display text-lg font-bold text-white group-hover:text-[#B8ED78] transition-colors mb-2">
                  {service.title}
                </h4>

                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-semibold text-[#35A6B7] hover:text-[#B8ED78] flex items-center gap-1 transition-colors"
                >
                  <span>View Technical Specs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenAppointment}
                  className="px-3 py-1 rounded-xl bg-[#35A6B7]/20 hover:bg-[#B8ED78] text-[#35A6B7] hover:text-slate-950 font-bold text-xs border border-[#35A6B7]/40 transition-all"
                >
                  Book
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Diagnostic Category Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-2.5 h-7 rounded-full bg-gradient-to-b from-[#B8ED78] to-[#35A6B7]" />
          <h3 className="font-display text-xl font-bold text-white uppercase tracking-wide">
            2. Diagnostic & Clinical Services
          </h3>
        </div>

        {/* Diagnostic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {diagnosticServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="glass-panel rounded-3xl p-5 border border-[#35A6B7]/30 hover:border-[#B8ED78]/60 shadow-xl glass-card-hover flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Real Diagnostic Photo Header */}
                <div className="relative h-40 w-full rounded-2xl overflow-hidden border border-[#35A6B7]/40 mb-4 bg-[#070C14]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />
                  
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-950/80 text-[#B8ED78] border border-[#B8ED78]/40 backdrop-blur-md">
                    {service.time}
                  </span>
                </div>

                <h4 className="font-display text-lg font-bold text-white group-hover:text-[#B8ED78] transition-colors mb-2">
                  {service.title}
                </h4>

                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-[#B8ED78]">OPD Daily Available</span>
                <button
                  onClick={onOpenAppointment}
                  className="px-3 py-1 rounded-xl bg-[#35A6B7]/20 hover:bg-[#B8ED78] text-[#35A6B7] hover:text-slate-950 font-bold text-xs border border-[#35A6B7]/40 transition-all"
                >
                  Consult
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-panel border border-[#35A6B7]/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl bg-[#0E1726]/95"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#B8ED78]/20 text-[#B8ED78] border border-[#B8ED78]/40">
                  {selectedService.badge}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                {selectedService.title}
              </h3>

              <p className="text-slate-300 text-xs leading-relaxed mb-6">
                {selectedService.shortDesc}
              </p>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#070C14] border border-slate-800 text-center mb-6">
                <div>
                  <div className="text-[10px] text-slate-400 font-mono">Duration</div>
                  <div className="text-xs font-bold text-white">{selectedService.details.duration}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-mono">Anesthesia</div>
                  <div className="text-xs font-bold text-[#B8ED78]">{selectedService.details.anesthesia}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-mono">Recovery</div>
                  <div className="text-xs font-bold text-[#35A6B7]">{selectedService.details.recovery}</div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">Key Clinical Advantages:</div>
                {selectedService.details.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#B8ED78] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenAppointment();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B8ED78] via-[#35A6B7] to-[#51AABC] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-[#B8ED78]/30 transition-all"
              >
                Book Consultation for {selectedService.title}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
