import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Eye, Wind, CheckCircle2, Sparkles, Building2, Cpu, Stethoscope, Microscope } from 'lucide-react';

export default function AboutHospital() {
  const highlights = [
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
      title: "17+ Years & 100% Track Record",
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
    },
    {
      title: "In-House Optical Shop",
      desc: "Complete spectacle and contact lens dispensing for all budgets directly under one roof.",
      icon: Building2,
      color: "from-[#B8ED78] to-[#51AABC]"
    }
  ];

  return (
    <section id="about" className="py-24 relative bg-cyber-grid radial-glow overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-center leading-tight">
            <span className="inline-block">Rishabh Eyecare Hospital &</span>{' '}
            <span className="text-gradient-lime inline-block">Laser Center</span>
          </h2>
        </div>

        {/* Verbatim Hospital Statement Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel rounded-3xl p-8 sm:p-12 border border-[#35A6B7]/40 shadow-2xl relative mb-16 overflow-hidden group"
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
              Rishabh Eyecare Hospital and Laser Center is a state-of-the-art hospital featuring ample fully AC waiting space, fully modular international-standard German Operation Theatre, and American world-class Phaco system for cataract surgery. We provide an in-house optical shop for all classes, best-in-class investigative instruments, and laser spectacle removal facility, performed by Senior Super-Consultant Dr. Hetalkumar Yagnik having a vast experience of 17 years with a proven track record of all surgeries executed successfully. We offer all types of ophthalmic checkups and surgeries with spectacle and contact lens dispensing under one roof. Rishabh Eyecare Hospital has started its new setup with ultramodern facilities for our patients.
            </p>

            {/* Doctors Showcase Bar */}
            <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 pt-6 border-t border-slate-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                {/* Dr. Hetalkumar */}
                <div className="flex items-center gap-3.5 bg-[#070C14]/80 sm:bg-transparent p-3 sm:p-0 rounded-2xl border border-[#35A6B7]/30 sm:border-none shadow-md sm:shadow-none">
                  <img
                    src="/images/dr-hetal-yagnik.jpg"
                    alt="Dr. Hetalkumar R. Yagnik"
                    className="w-12 h-12 rounded-full object-cover object-top border-2 border-[#B8ED78] shadow-lg shrink-0"
                  />
                  <div>
                    <div className="font-bold text-white text-sm sm:text-base">Dr. Hetalkumar R. Yagnik</div>
                    <div className="text-xs text-[#B8ED78] font-semibold">Senior Super-Consultant • 17+ Years Exp</div>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-10 bg-slate-800" />

                {/* Dr. Shefali */}
                <div className="flex items-center gap-3.5 bg-[#070C14]/80 sm:bg-transparent p-3 sm:p-0 rounded-2xl border border-[#35A6B7]/30 sm:border-none shadow-md sm:shadow-none">
                  <img
                    src="/images/dr-shefali-yagnik.jpg"
                    alt="Dr. Shefali H. Yagnik"
                    className="w-12 h-12 rounded-full object-cover object-top border-2 border-[#35A6B7] shadow-lg shrink-0"
                  />
                  <div>
                    <div className="font-bold text-white text-sm sm:text-base">Dr. Shefali H. Yagnik</div>
                    <div className="text-xs text-[#35A6B7] font-semibold">Consultant Ophthalmic Surgeon • 14+ Years Exp</div>
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
    </section>
  );
}
