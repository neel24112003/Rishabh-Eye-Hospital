import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, FileText, CreditCard, CheckCircle2, 
  Building2, ChevronRight, PhoneCall, Sparkles, HelpCircle 
} from 'lucide-react';

export default function CashlessSection({ onOpenAppointment }) {
  // 18 Partner Companies List mapped with verified images from public/images/cashless/
  const partnerCompanies = [
    {
      name: "Star Health Insurance",
      type: "Health Insurance",
      logo: "/images/cashless/star-health-insurance.jpeg"
    },
    {
      name: "Bajaj Allianz General Insurance",
      type: "General Insurance",
      logo: "/images/cashless/bajaj-allianz-general-insurance.jpeg"
    },
    {
      name: "Reliance General Insurance",
      type: "General Insurance",
      logo: "/images/cashless/reliance-general-insurance.jpeg"
    },
    {
      name: "IFFCO Tokio General Insurance",
      type: "General Insurance",
      logo: "/images/cashless/iffco-tokio-general-insurance.jpeg"
    },
    {
      name: "Chola MS Insurance",
      type: "General Insurance",
      logo: "/images/cashless/chola-ms-insurance.jpeg"
    },
    {
      name: "Tata AIG General Insurance",
      type: "General Insurance",
      logo: "/images/cashless/tata-aig-general-insurance.jpeg"
    },
    {
      name: "SBI General Insurance",
      type: "General Insurance",
      logo: "/images/cashless/sbi-general-insurance.jpeg"
    },
    {
      name: "GoDigit Insurance",
      type: "Digital Insurance",
      logo: "/images/cashless/godigit-insurance.jpeg"
    },
    {
      name: "Medi Assist TPA",
      type: "TPA Partner",
      logo: "/images/cashless/mediassist-tpa.jpeg"
    },
    {
      name: "FHPL TPA",
      type: "TPA Partner",
      logo: "/images/cashless/fhpl-tpa.jpeg"
    },
    {
      name: "Acko Insurance",
      type: "Digital Insurance",
      logo: "/images/cashless/acko-insurance.jpeg"
    },
    {
      name: "Galaxy Health Insurance",
      type: "Health Insurance",
      logo: "/images/cashless/galaxy-health-insurance.jpeg"
    },
    {
      name: "Link K Insurance",
      type: "Insurance Partner",
      logo: "/images/cashless/link-k-insurance.jpeg"
    },
    {
      name: "ManipalCigna Insurance",
      type: "Health Insurance",
      logo: "/images/cashless/manipal-cigna-insurance.jpeg"
    },
    {
      name: "Navi General Insurance",
      type: "General Insurance",
      logo: "/images/cashless/navi-general-insurance.jpeg"
    },
    {
      name: "Paramount TPA",
      type: "TPA Partner",
      logo: "/images/cashless/paramount-tpa.jpeg"
    },
    {
      name: "Raksha TPA",
      type: "TPA Partner",
      logo: "/images/cashless/raksha-tpa.jpeg"
    },
    {
      name: "Vidal TPA",
      type: "TPA Partner",
      logo: "/images/cashless/vidal-tpa.jpeg"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Submit Policy & ID",
      desc: "Present your health insurance card / TPA card along with a valid Govt Photo ID at our Cashless Helpdesk during admission."
    },
    {
      step: "02",
      title: "Pre-Authorization",
      desc: "Our insurance team coordinates directly with your TPA or insurance provider to process the pre-authorization approval."
    },
    {
      step: "03",
      title: "Cashless Surgery",
      desc: "Once approved, undergo painless eye surgery with zero upfront treatment cost for covered medical expenses."
    }
  ];

  return (
    <section id="cashless" className="py-24 relative bg-[#070C14] border-t border-slate-800/60 overflow-hidden">
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#35A6B7]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#B8ED78]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#35A6B7]/20 to-[#B8ED78]/20 border border-[#B8ED78]/40 mb-4 shadow-lg backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-[#B8ED78]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#B8ED78]">
              Insurance & TPA Coverage
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Cashless <span className="text-gradient-lime">Facilities & Reimbursement</span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            Rishabh Eyecare Hospital & Laser Center offers hassle-free cashless hospitalization and complete mediclaim reimbursement support with leading health insurance providers and TPAs.
          </p>
        </div>

        {/* Dual Facility Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Cashless TPA Facility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#35A6B7]/40 hover:border-[#B8ED78]/60 shadow-2xl glass-card-hover relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#B8ED78]/15 to-transparent rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#35A6B7]/30 to-[#B8ED78]/20 border border-[#B8ED78]/50 flex items-center justify-center text-[#B8ED78] shadow-inner">
                  <ShieldCheck className="w-7 h-7 text-[#B8ED78]" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#B8ED78]/15 text-[#B8ED78] border border-[#B8ED78]/30">
                  Zero Out-Of-Pocket
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[#B8ED78] transition-colors">
                1. Cashless TPA Facility
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Direct cashless hospitalization facility with top insurance companies and Third Party Administrators (TPAs). Pre-authorization is processed directly by our hospital insurance desk so patients can receive advanced eye care without advance cash deposits.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#B8ED78] shrink-0 mt-0.5" />
                  <span>Direct cashless claim authorization with 18+ insurance partners</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#B8ED78] shrink-0 mt-0.5" />
                  <span>Dedicated hospital insurance desk assisting at every step</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#B8ED78] shrink-0 mt-0.5" />
                  <span>Applicable for Cataract, LASIK, Glaucoma & Retinal Surgeries</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="w-full py-3 rounded-xl bg-[#35A6B7]/20 hover:bg-[#B8ED78] text-[#35A6B7] hover:text-slate-950 font-bold text-xs sm:text-sm border border-[#35A6B7]/40 transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>Check Cashless Eligibility</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Mediclaim Reimbursement Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#35A6B7]/40 hover:border-[#B8ED78]/60 shadow-2xl glass-card-hover relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#35A6B7]/15 to-transparent rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#35A6B7]/30 to-[#B8ED78]/20 border border-[#35A6B7]/50 flex items-center justify-center text-[#35A6B7] shadow-inner">
                  <CreditCard className="w-7 h-7 text-[#35A6B7]" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#35A6B7]/20 text-[#35A6B7] border border-[#35A6B7]/40">
                  Complete Documentation
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[#B8ED78] transition-colors">
                2. Mediclaim Reimbursement
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                If your insurance policy does not support cashless treatment at admission, we provide complete, standardized medical documentation, itemized bills, and NABH-compliant discharge summaries for quick claim reimbursement.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#35A6B7] shrink-0 mt-0.5" />
                  <span>Itemized hospital bills, payment receipts & breakdown statements</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#35A6B7] shrink-0 mt-0.5" />
                  <span>Doctor consultation notes, diagnostic OCT scans & case papers</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#35A6B7] shrink-0 mt-0.5" />
                  <span>Official medical certificates for corporate & government claims</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="w-full py-3 rounded-xl bg-[#35A6B7]/20 hover:bg-[#B8ED78] text-[#35A6B7] hover:text-slate-950 font-bold text-xs sm:text-sm border border-[#35A6B7]/40 transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>Request Mediclaim Help</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* How Cashless Works: 3-Step Process Breakdown */}
        <div className="mb-20 glass-panel rounded-3xl p-6 sm:p-10 border border-[#35A6B7]/30 bg-[#070C14]/90 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              How Cashless Admission Works
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Simple 3-step hassle-free approval process managed by our hospital insurance desk
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((item, idx) => (
              <div key={item.step} className="relative flex flex-col items-center text-center p-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#35A6B7] to-[#B8ED78] text-slate-950 font-black text-xl flex items-center justify-center mb-4 shadow-lg shadow-[#B8ED78]/20">
                  {item.step}
                </div>
                <h4 className="font-display text-lg font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Responsive Grid of 18 Partner Companies */}
        <div className="mb-8 flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-7 rounded-full bg-gradient-to-b from-[#B8ED78] to-[#35A6B7]" />
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
              Empaneled Insurance Companies & TPAs
            </h3>
          </div>
          <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-[#B8ED78]/15 text-[#B8ED78] border border-[#B8ED78]/30">
            18 Empaneled Partners
          </span>
        </div>

        {/* Grid of 18 Partners */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mb-16">
          {partnerCompanies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="glass-panel rounded-2xl p-3.5 sm:p-4 border border-[#35A6B7]/30 hover:border-[#B8ED78]/60 shadow-lg glass-card-hover flex flex-col items-center justify-between text-center group transition-all"
            >
              {/* White High-Contrast Container for Partner Logo */}
              <div className="w-full h-24 sm:h-28 rounded-xl bg-white p-3 flex items-center justify-center border border-slate-200/80 shadow-inner group-hover:scale-[1.03] transition-transform duration-300 overflow-hidden mb-3">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>

              {/* Company Title & Type Badge */}
              <div className="w-full">
                <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-[#B8ED78] transition-colors leading-snug line-clamp-2 mb-1">
                  {company.name}
                </h4>
                <span className="text-[10px] font-medium text-[#35A6B7]">
                  {company.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
