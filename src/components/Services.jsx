import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, FileCheck, Eye, Activity, Layers, Crosshair, 
  Glasses, ShieldAlert, CreditCard, ShieldCheck, Sparkles, 
  ChevronRight, X, CheckCircle2, Award, Zap, HeartPulse
} from 'lucide-react';

export default function Services({ onOpenAppointment }) {
  const [selectedService, setSelectedService] = useState(null);

  const hospitalServices = [
    {
      id: "hs-1",
      title: "Ophthalmic Consultation For Any Eye Disease",
      badge: "OPD Consultation",
      icon: Stethoscope,
      image: "/images/services/ophthalmic-consultation.jpg",
      shortDesc: "Comprehensive clinical evaluation and expert diagnosis for all anterior and posterior segment eye conditions."
    },
    {
      id: "hs-2",
      title: "Eye Check Up Certification",
      badge: "Medical Certificate",
      icon: FileCheck,
      image: "/images/services/eye-checkup-cert.jpg",
      shortDesc: "Official medical eye fitness certificates for driving license, employment, school & regulatory compliance."
    },
    {
      id: "hs-3",
      title: "Retinal Investigations (Optical Coherence Tomography)",
      badge: "OCT Diagnostics",
      icon: Eye,
      image: "/images/services/retinal-investigation-oct.jpg",
      shortDesc: "High-resolution 3D cross-sectional optical scanning for macular degeneration, diabetic retina & macula."
    },
    {
      id: "hs-4",
      title: "Glaucoma Assessment By OCT",
      badge: "Optic Nerve Analysis",
      icon: Activity,
      image: "/images/services/glaucoma-assessment-oct.jpg",
      shortDesc: "Quantitative RNFL nerve fiber layer scanning and optic disc cup-to-disc ratio mapping for early glaucoma."
    },
    {
      id: "hs-5",
      title: "Pachymetry",
      badge: "Corneal Thickness",
      icon: Layers,
      image: "/images/services/pachymetry.jpg",
      shortDesc: "Ultrasonic & optical measurement of corneal thickness crucial for LASIK eligibility & IOP calibration."
    },
    {
      id: "hs-6",
      title: "IOL Power Calculation By A-Scan Biometer",
      badge: "Precision Biometry",
      icon: Crosshair,
      image: "/images/services/iol-power-calculation.jpg",
      shortDesc: "High-precision acoustic biometry to determine exact intraocular lens power for custom cataract surgery."
    },
    {
      id: "hs-7",
      title: "Refraction For Spectacle Check Up",
      badge: "Vision Correction",
      icon: Glasses,
      image: "/images/services/refraction-spectacle.jpg",
      shortDesc: "Computerized refraction and subjective prescription testing for crystal clear spectacle vision."
    },
    {
      id: "hs-8",
      title: "Anaesthesia Related Services",
      badge: "Patient Comfort",
      icon: ShieldAlert,
      image: "/images/services/anaesthesia-services.jpg",
      shortDesc: "Specialized ophthalmic topical, local, and monitored anaesthetic care ensuring painless procedures."
    },
    {
      id: "hs-9",
      title: "Mediclaim Reimbursement",
      badge: "Financial Support",
      icon: CreditCard,
      image: "/images/services/mediclaim-reimbursement.jpg",
      shortDesc: "Hassle-free documentation and claim submission support for all major health insurance policies."
    },
    {
      id: "hs-10",
      title: "Cashless TPA Facility",
      badge: "Insurance Approved",
      icon: ShieldCheck,
      image: "/images/services/cashless-tpa-facility.jpg",
      shortDesc: "Direct cashless hospitalization facility with leading TPAs and private health insurance providers."
    }
  ];

  const eyeSurgeries = [
    {
      id: "es-1",
      title: "Cataract Surgeries With IOL Implantation",
      badge: "Phaco Sutureless",
      icon: Zap,
      image: "/images/services/cataract-surgery-iol.jpg",
      shortDesc: "Micro-incision stitchless Phacoemulsification with premium multifocal, toric & monofocal lens implants."
    },
    {
      id: "es-2",
      title: "Corneal Disease Surgery",
      badge: "Cornea Care",
      icon: ShieldCheck,
      image: "/images/services/corneal-disease-surgery.jpg",
      shortDesc: "Surgical management of pterygium, corneal ulcers, dystrophies, corneal cross-linking & transplants."
    },
    {
      id: "es-3",
      title: "Oculoplastic Surgery",
      badge: "Reconstructive Care",
      icon: Eye,
      image: "/images/services/oculoplastic-surgery.jpg",
      shortDesc: "Specialized aesthetic & functional plastic surgery of eyelids, orbit, tear ducts & facial structures."
    },
    {
      id: "es-4",
      title: "Glaucoma Check Up & Surgery",
      badge: "IOP Control",
      icon: Activity,
      image: "/images/services/glaucoma-surgery.jpg",
      shortDesc: "Trabeculectomy, glaucoma drainage valves, and SLT laser treatments to halt optic nerve damage."
    },
    {
      id: "es-5",
      title: "Retinal Examination, Vitrectomy & Intravitreal Injections",
      badge: "Medical Retina",
      icon: HeartPulse,
      image: "/images/services/retinal-exam-vitrectomy.jpg",
      shortDesc: "Advanced posterior vitrectomy, Anti-VEGF injections & retinal laser for diabetic retinopathy & macula."
    },
    {
      id: "es-6",
      title: "Laser Surgeries (YAG Capsulotomy, Iridotomy & LASIK)",
      badge: "Advanced Laser",
      icon: Sparkles,
      image: "/images/services/laser-surgery-yag-lasik.jpg",
      shortDesc: "Bladeless LASIK spectacle removal, YAG laser for secondary cataract & YAG peripheral iridotomy."
    },
    {
      id: "es-7",
      title: "Squint Assessment & Surgery",
      badge: "Ocular Alignment",
      icon: Crosshair,
      image: "/images/services/squint-assessment-surgery.jpg",
      shortDesc: "Precision extraocular muscle recession/resection surgery to restore perfect alignment in children & adults."
    },
    {
      id: "es-8",
      title: "Stem Cell Transplantation",
      badge: "Ocular Surface",
      icon: Award,
      image: "/images/services/stem-cell-transplantation.jpg",
      shortDesc: "Limbal stem cell graft transplantation for severe chemical injuries and ocular surface reconstruction."
    },
    {
      id: "es-9",
      title: "Lid Surgeries",
      badge: "Eyelid Repair",
      icon: ShieldCheck,
      image: "/images/services/lid-surgeries.jpg",
      shortDesc: "Surgical correction of entropion, ectropion, eyelid tumors, chalazion excision & eyelid lacerations."
    },
    {
      id: "es-10",
      title: "DCR Surgery (Dacryocystorhinostomy)",
      badge: "Tear Duct Care",
      icon: Layers,
      image: "/images/services/dcr-surgery.jpg",
      shortDesc: "Bypass surgery for nasolacrimal duct obstruction to eliminate chronic watery eye tearing."
    },
    {
      id: "es-11",
      title: "Amblyopia Therapy",
      badge: "Lazy Eye Care",
      icon: Stethoscope,
      image: "/images/services/amblyopia-therapy.jpg",
      shortDesc: "Structured orthoptic occlusion therapy and binocular visual training to stimulate lazy eye development."
    },
    {
      id: "es-12",
      title: "Contact Lens Clinic",
      badge: "Specialty Lenses",
      icon: Glasses,
      image: "/images/services/contact-lens-clinic.jpg",
      shortDesc: "Expert fitting for Scleral, RGP, Toric, Bifocal, and Cosmetic specialty contact lenses."
    },
    {
      id: "es-13",
      title: "Anaesthesia Related To Eye Surgery Services",
      badge: "Safe Surgical Care",
      icon: ShieldAlert,
      image: "/images/services/anaesthesia-eye-surgery.jpg",
      shortDesc: "Peribulbar, retrobulbar, topical, and intravenous monitored sedation for completely painless surgeries."
    }
  ];

  return (
    <section id="services" className="py-24 relative bg-[#070C14] border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Super-Specialty <span className="text-gradient-lime">Services & Surgeries</span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            Comprehensive ophthalmic OPD diagnostics, insurance coverage, and microsurgeries executed under German modular OT standards.
          </p>
        </div>

        {/* SECTION 1: HOSPITAL SERVICES */}
        <div className="mb-8 flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-7 rounded-full bg-gradient-to-b from-[#B8ED78] to-[#35A6B7]" />
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
              1. Hospital Services
            </h3>
          </div>
          <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-[#B8ED78]/15 text-[#B8ED78] border border-[#B8ED78]/30">
            10 Facilities
          </span>
        </div>

        {/* Hospital Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {hospitalServices.map((service, index) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-panel rounded-3xl p-5 border border-[#35A6B7]/30 hover:border-[#B8ED78]/60 shadow-xl glass-card-hover flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Real Procedure Photo Header */}
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-[#35A6B7]/40 mb-4 bg-[#070C14]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
                    
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/85 text-[#B8ED78] border border-[#B8ED78]/40 backdrop-blur-md">
                      {service.badge}
                    </span>

                    <div className="absolute bottom-2.5 left-2.5 w-8 h-8 rounded-xl bg-[#070C14]/90 border border-[#35A6B7]/40 flex items-center justify-center text-[#B8ED78]">
                      <IconComp className="w-4 h-4 text-[#B8ED78]" />
                    </div>
                  </div>

                  <h4 className="font-display text-base font-bold text-white group-hover:text-[#B8ED78] transition-colors mb-2 leading-snug">
                    {service.title}
                  </h4>

                  <p className="text-slate-300 text-xs leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-[#35A6B7]">Hospital OPD Facility</span>
                  <button
                    onClick={onOpenAppointment}
                    className="px-3 py-1 rounded-xl bg-[#35A6B7]/20 hover:bg-[#B8ED78] text-[#35A6B7] hover:text-slate-950 font-bold text-xs border border-[#35A6B7]/40 transition-all flex items-center gap-1"
                  >
                    <span>Consult</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* SECTION 2: EYE SURGERIES */}
        <div className="mb-8 flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-7 rounded-full bg-gradient-to-b from-[#35A6B7] to-[#B8ED78]" />
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
              2. Eye Surgeries
            </h3>
          </div>
          <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-[#35A6B7]/20 text-[#35A6B7] border border-[#35A6B7]/40">
            13 Surgical Procedures
          </span>
        </div>

        {/* Eye Surgeries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {eyeSurgeries.map((service, index) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="glass-panel rounded-3xl p-5 border border-[#35A6B7]/30 hover:border-[#B8ED78]/60 shadow-xl glass-card-hover flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Real Surgical Photo Header */}
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-[#35A6B7]/40 mb-4 bg-[#070C14]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
                    
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/85 text-[#B8ED78] border border-[#B8ED78]/40 backdrop-blur-md">
                      {service.badge}
                    </span>

                    <div className="absolute bottom-2.5 left-2.5 w-8 h-8 rounded-xl bg-[#070C14]/90 border border-[#35A6B7]/40 flex items-center justify-center text-[#B8ED78]">
                      <IconComp className="w-4 h-4 text-[#B8ED78]" />
                    </div>
                  </div>

                  <h4 className="font-display text-base font-bold text-white group-hover:text-[#B8ED78] transition-colors mb-2 leading-snug">
                    {service.title}
                  </h4>

                  <p className="text-slate-300 text-xs leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-[#B8ED78]">German Modular OT</span>
                  <button
                    onClick={onOpenAppointment}
                    className="px-3 py-1 rounded-xl bg-[#35A6B7]/20 hover:bg-[#B8ED78] text-[#35A6B7] hover:text-slate-950 font-bold text-xs border border-[#35A6B7]/40 transition-all flex items-center gap-1"
                  >
                    <span>Book OT</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
