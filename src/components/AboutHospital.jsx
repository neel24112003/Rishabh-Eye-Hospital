import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award, Eye, Wind, CheckCircle2, Sparkles, Building2, Cpu, FileCheck, X, Maximize2, Shield } from 'lucide-react';

export default function AboutHospital() {
  const [showCertModal, setShowCertModal] = useState(false);

  const highlights = [
    {
      title: "NABH Accredited SHCO",
      desc: "Officially certified by National Accreditation Board for Hospitals & Healthcare Providers for patient safety & quality care.",
      icon: ShieldCheck,
      color: "from-[#B8ED78] to-[#35A6B7]"
    },
    {
      title: "German Modular OT",
      desc: "Fully modular international standard surgical environment with zero-laminar airflow & micro-filtration.",
      icon: Cpu,
      color: "from-[#35A6B7] to-[#51AABC]"
    },
    {
      title: "American Phaco System",
      desc: "Alcon Laureate world-class Phacoemulsification technology for ultra-precise micro-incision cataract surgery.",
      icon: Eye,
      color: "from-[#B8ED78] to-[#35A6B7]"
    },
    {
      title: "20+ Years & 100% Track Record",
      desc: "Surgeries led by Senior Super-Consultant Dr. Hetalkumar Yagnik & Dr. Shefali Yagnik with an unblemished record.",
      icon: Award,
      color: "from-[#51AABC] to-[#B8ED78]"
    },
    {
      title: "Laser Spectacle Removal",
      desc: "Advanced refractive laser facility eliminating the need for glasses and contact lenses.",
      icon: Sparkles,
      color: "from-[#35A6B7] to-[#B8ED78]"
    },
    {
      title: "Ample Fully AC Waiting Space",
      desc: "Ultramodern, climate-controlled waiting space engineered for maximum patient comfort.",
      icon: Wind,
      color: "from-[#51AABC] to-[#35A6B7]"
    }
  ];

  return (
    <section id="about" className="py-24 relative bg-cyber-grid radial-glow overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-center leading-tight">
            About <span className="text-gradient-lime">Rishabh Eyecare Hospital & Laser Center</span>
          </h2>
        </div>

        {/* Verbatim Hospital Statement Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel rounded-3xl p-8 sm:p-12 border border-[#35A6B7]/40 shadow-2xl relative mb-12 overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#B8ED78]/15 via-[#35A6B7]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 rounded-xl bg-[#B8ED78]/20 border border-[#B8ED78]/40 text-[#B8ED78]">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <span className="font-mono text-xs font-bold text-[#B8ED78] uppercase tracking-widest">
                OFFICIAL HOSPITAL OVERVIEW & MISSION STATEMENT
              </span>
            </div>

            {/* Clean Normal Readable Overview Paragraph */}
            <p className="font-sans text-base sm:text-lg text-slate-200 leading-relaxed border-l-4 border-[#B8ED78] pl-5 sm:pl-6 py-2 my-6">
              Rishabh Eyecare Hospital and Laser Center is a state-of-the-art hospital featuring ample fully AC waiting space, fully modular international-standard German Operation Theatre, and American world-class Phaco system for cataract surgery. We provide an in-house optical shop for all classes, best-in-class investigative instruments, and laser spectacle removal facility, performed by Senior Super-Consultant Dr. Hetalkumar Yagnik having a vast experience of 20+ years with an unblemished track record, alongside specialized binocular vision therapy, pediatric diagnostics & specialty contact lens care led by Senior Specialist Dr. Shefali Yagnik. We offer all types of ophthalmic checkups and surgeries with spectacle and contact lens dispensing under one roof. Rishabh Eyecare Hospital has started its new setup with ultramodern facilities for our patients.
            </p>

            {/* Doctors Showcase Bar */}
            <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 pt-6 border-t border-slate-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                {/* Dr. Hetalkumar */}
                <div className="flex items-center gap-3.5 bg-[#070C14]/80 sm:bg-transparent p-3 sm:p-0 rounded-2xl border border-[#35A6B7]/30 sm:border-none shadow-md sm:shadow-none">
                  <img
                    src="/images/dr-hetal-yagnik.jpg"
                    alt="Dr. Hetalkumar R. Yagnik"
                    className="w-14 h-14 rounded-full object-cover object-[50%_15%] border-2 border-[#B8ED78] shadow-lg shrink-0"
                  />
                  <div>
                    <div className="font-bold text-white text-sm sm:text-base">Dr. Hetalkumar R. Yagnik</div>
                    <div className="text-xs text-[#B8ED78] font-semibold">D.O.M.S., D.N.B., M.N.A.M.S. • Phaco, Cornea & Oculoplastic Surgeon</div>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-10 bg-slate-800" />

                {/* Dr. Shefali */}
                <div className="flex items-center gap-3.5 bg-[#070C14]/80 sm:bg-transparent p-3 sm:p-0 rounded-2xl border border-[#35A6B7]/30 sm:border-none shadow-md sm:shadow-none">
                  <img
                    src="/images/dr-shefali-yagnik.jpg"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/dr-shefali-yagnik.jpg'; }}
                    alt="Dr. Shefali H. Yagnik"
                    className="w-14 h-14 rounded-full object-cover object-[50%_25%] border-2 border-[#35A6B7] shadow-lg shrink-0"
                  />
                  <div>
                    <div className="font-bold text-white text-sm sm:text-base">Dr. Shefali H. Yagnik</div>
                    <div className="text-xs text-[#35A6B7] font-semibold">B. Optom. • Orthoptist & Contact Lens Specialist</div>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl glass-panel border border-[#B8ED78]/40 text-xs font-bold text-[#B8ED78] shadow-md shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[#B8ED78]" />
                <span>100% Successful Surgery Record</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* NABH CERTIFICATE SHOWCASE CONTAINER (Left: Image | Right: Theory) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#B8ED78]/50 shadow-2xl relative mb-16 overflow-hidden bg-gradient-to-br from-[#070C14] via-[#0E1726] to-[#070C14]"
        >
          {/* Subtle Ambient Light */}
          <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#B8ED78]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Side: NABH Certificate Image Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div 
                onClick={() => setShowCertModal(true)}
                className="relative group cursor-pointer w-full max-w-sm rounded-2xl overflow-hidden border-2 border-[#B8ED78]/60 shadow-[0_0_30px_rgba(184,237,120,0.25)] bg-[#070C14] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(184,237,120,0.4)]"
              >
                <img
                  src="/images/nabh-certificate.jpg"
                  alt="NABH Accreditation Certificate - Rishabh Eyecare Hospital"
                  className="w-full h-auto object-contain rounded-xl group-hover:opacity-95 transition-opacity"
                />

                {/* Hover Click to Expand Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-xs">
                  <span className="p-3 rounded-full bg-[#B8ED78] text-slate-950 shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Click to View Full Certificate</span>
                </div>

                {/* Corner Accreditation Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold bg-slate-950/90 text-[#B8ED78] border border-[#B8ED78]/50 shadow-md flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B8ED78]" />
                  <span>NABH Certified</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-3 text-center">Click certificate to inspect high-res official document</p>
            </div>

            {/* Right Side: NABH Certificate Theory & Accreditation Details */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B8ED78]/15 border border-[#B8ED78]/40 text-xs font-extrabold text-[#B8ED78] mb-4 w-fit">
                <Award className="w-4 h-4 text-[#B8ED78]" />
                <span>National Quality Accreditation</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                National Accreditation Board for Hospitals & Healthcare Providers
              </h3>

              <p className="text-xs font-semibold font-mono text-[#35A6B7] uppercase tracking-wider mb-4">
                Constituent Board of Quality Council of India (QCI)
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Rishabh Eyecare Hospital and Laser Center has been officially assessed and certified to comply with <strong className="text-white">NABH Entry Level - Small Healthcare Organisation (SHCO)</strong> requirements, verifying our commitment to international standards of patient safety, clinical quality, and surgical hygiene.
              </p>

              {/* Certificate Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-[#070C14]/90 border border-slate-800">
                <div className="flex items-start gap-2.5">
                  <FileCheck className="w-4 h-4 text-[#B8ED78] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-slate-400 font-mono block">Certificate Number</span>
                    <span className="text-xs font-bold text-white font-mono">PESHCO-2025-11222</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-[#35A6B7] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-slate-400 font-mono block">Serial & ISQua Accreditation</span>
                    <span className="text-xs font-bold text-white font-mono">SI No. 028070</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:col-span-2 pt-2 border-t border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-[#B8ED78] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-slate-400 font-mono block">Validity Period</span>
                    <span className="text-xs font-bold text-[#B8ED78]">August 26, 2025 – August 25, 2027</span>
                  </div>
                </div>
              </div>

              {/* Core Quality Pillars */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#B8ED78] shrink-0" />
                  <span><strong>Patient Safety & Quality of Care:</strong> Full compliance with NABH SHCO standards.</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#B8ED78] shrink-0" />
                  <span><strong>Zero-Infection Protocols:</strong> Sterilization & laminar airflow in modular German OT.</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#B8ED78] shrink-0" />
                  <span><strong>ISQua Accredited Organisation:</strong> Verified by CEO Dr. Atul Mohan Kochhar.</span>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel rounded-2xl p-6 border border-[#35A6B7]/25 hover:border-[#B8ED78]/50 glass-card-hover group relative"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${item.color} p-0.5 shadow-lg shrink-0`}>
                    <div className="w-full h-full bg-[#070C14] rounded-[10px] flex items-center justify-center text-[#B8ED78] group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-[#B8ED78] transition-colors leading-tight">
                    {item.title}
                  </h3>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Full Resolution Certificate Viewer Modal */}
      <AnimatePresence>
        {showCertModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full glass-panel border border-[#B8ED78]/50 rounded-3xl p-4 sm:p-6 shadow-2xl bg-[#070C14] max-h-[90vh] flex flex-col items-center overflow-auto"
            >
              <button
                onClick={() => setShowCertModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-4">
                <h3 className="font-display text-xl font-bold text-white">NABH Official Certificate</h3>
                <p className="text-xs text-[#B8ED78] font-mono">Certificate No: PESHCO-2025-11222 | Rishabh Eyecare Hospital</p>
              </div>

              <img
                src="/images/nabh-certificate.jpg"
                alt="NABH Official Certificate Full Resolution"
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl border border-[#35A6B7]/40 shadow-xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
