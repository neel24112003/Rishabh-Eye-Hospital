import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, Activity, Eye, CheckCircle2 } from 'lucide-react';

export default function Equipment() {
  const equipments = [
    {
      name: "Alcon Laureate World Phaco System",
      category: "American Cataract Tech",
      icon: Cpu,
      accentColor: "from-[#B8ED78] to-[#35A6B7]",
      description: "State-of-the-art American phacoemulsification console engineered for micro-incision sutureless cataract removal with supreme safety.",
      features: [
        "1.8mm micro-incision capability",
        "Real-time intraocular fluidics management",
        "Ultrasonic energy wave precision",
        "Zero suture rapid healing"
      ]
    },
    {
      name: "Modular German Operation Theatre",
      category: "Surgical OT Infrastructure",
      icon: ShieldCheck,
      accentColor: "from-[#35A6B7] to-[#51AABC]",
      description: "International standard modular operation theatre equipped with laminar airflow HEPA filters and ultra-clean sterile environment.",
      features: [
        "Laminar airflow 99.97% HEPA air filtration",
        "Anti-static seamless hygienic flooring",
        "Microscope integrated HD surgical recording",
        "Zero-infection safety protocol"
      ]
    },
    {
      name: "Bladeless Refractive LASIK Suite",
      category: "Spectacle Removal Laser",
      icon: Zap,
      accentColor: "from-[#51AABC] to-[#B8ED78]",
      description: "Computerized topography-guided laser system for precise corneal reshaping and rapid 24-hour spectacle-free vision.",
      features: [
        "Sub-micron corneal topography mapping",
        "High-speed automated eye tracker",
        "Wavefront customized beam delivery",
        "Immediate vision restoration"
      ]
    },
    {
      name: "Digital Retinal Imaging Instruments",
      category: "High-Resolution Fundus Imaging",
      icon: Eye,
      accentColor: "from-[#B8ED78] to-[#51AABC]",
      description: "Precision diagnostic tools built to map and examine the delicate inner structures of the retina.",
      features: [
        "Diabetic retinopathy screening",
        "Macular degeneration tracking",
        "Non-mydriatic high-res photos"
      ]
    }
  ];

  return (
    <section id="equipment" className="py-24 relative bg-[#070C14] border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#35A6B7]/30 text-xs font-semibold text-[#35A6B7] uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#B8ED78]" />
            <span>State-of-Art Medical Technology</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            International Standard <span className="text-gradient-lime">Surgical Equipment</span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            Rishabh Eye Hospital is equipped with leading American and German surgical technology to deliver uncompromised visual accuracy and patient safety.
          </p>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {equipments.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#35A6B7]/30 hover:border-[#B8ED78]/60 shadow-xl glass-card-hover relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#35A6B7] to-[#B8ED78] p-0.5 shadow-lg shrink-0">
                      <div className="w-full h-full bg-[#070C14] rounded-[14px] flex items-center justify-center text-[#B8ED78] group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#B8ED78]/15 text-[#B8ED78] border border-[#B8ED78]/30">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#B8ED78] transition-colors mb-3">
                    {item.name}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B8ED78] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">STATUS: OPERATIONAL</span>
                  <span className="text-xs font-bold text-[#B8ED78] font-mono">100% CALIBRATED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
