import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Activity, Eye, CheckCircle2, Award, Sparkles } from 'lucide-react';

export default function Equipment() {
  const [activeCategory, setActiveCategory] = useState('All');

  const equipments = [
    {
      id: "01",
      name: "IntraLase FS Femtosecond Laser",
      category: "Femtosecond LASIK Tech",
      image: "/images/equipments/Intra lase.jpeg",
      description: "Ultra-fast femtosecond laser for 100% bladeless corneal flap creation in LASIK surgeries with sub-micron accuracy.",
      features: [
        "100% Bladeless Flap Creation",
        "Computer-Controlled Precision",
        "Enhanced Flap Stability",
        "Rapid Visual Recovery"
      ]
    },
    {
      id: "02",
      name: "VISX STAR S4 IR with CustomVue Excimer Laser",
      category: "CustomVue Excimer Laser",
      image: "/images/equipments/VISX STAR S4.jpeg",
      description: "Advanced wavefront-guided CustomVue excimer laser system with Iris Registration (IR) for customized spectacle removal.",
      features: [
        "3D Active Eye Tracking",
        "Iris Registration (IR) Technology",
        "Wavefront-Guided CustomVue",
        "Variable Spot Scanning"
      ]
    },
    {
      id: "03",
      name: "Optovue iVue / iVue 80 SD-OCT",
      category: "Spectral-Domain OCT",
      image: "/images/equipments/optovue ivue.jpeg",
      description: "High-speed Spectral-Domain Optical Coherence Tomography (SD-OCT) for 3D cross-sectional retinal, macula & optic nerve imaging.",
      features: [
        "80,000 A-scans/sec High Speed",
        "3D Retina & Macular Mapping",
        "Glaucoma GCC Analysis",
        "Sub-micron Layer Resolution"
      ]
    },
    {
      id: "04",
      name: "MÖLLER-WEDEL Microflex Ophthalmic Microscope",
      category: "German Surgical Optics",
      image: "/images/equipments/moller wedel microflex.jpeg",
      description: "Precision German surgical operating microscope featuring coaxial red reflex and crystal-clear stereo optics for microsurgery.",
      features: [
        "German Optical Precision",
        "Coaxial Red Reflex Lighting",
        "Motorized Zoom & Focus",
        "High-Def Surgical Recording"
      ]
    },
    {
      id: "05",
      name: "Alcon LEGION Phaco System",
      category: "American Cataract Tech",
      image: "/images/equipments/alcon legieon.jpeg",
      description: "Premium Alcon phacoemulsification console designed for ultra-smooth 1.8mm micro-incision cataract surgery and rapid recovery.",
      features: [
        "1.8mm Micro-Incision Phaco",
        "Active Fluidics Pressure Control",
        "Ultrasonic Energy Efficiency",
        "Zero-Suture Quick Healing"
      ]
    },
    {
      id: "06",
      name: "Alcon ARGOS Optical Biometer",
      category: "Optical Biometry & IOL",
      image: "/images/equipments/alcon argos.jpeg",
      description: "Swept-Source OCT optical biometer providing ultra-accurate IOL power calculations even through dense cataract lenses.",
      features: [
        "Swept-Source OCT Technology",
        "Full-Eye Length Measurement",
        "Dense Cataract Penetration",
        "Premium IOL Calculation"
      ]
    },
    {
      id: "07",
      name: "HUVITZ HRK-7000A Auto Ref/Keratometer",
      category: "Automated Refraction",
      image: "/images/equipments/huvitz hrk.jpeg",
      description: "Wavefront map technology auto ref-keratometer delivering instantaneous, high-precision refractive power measurements.",
      features: [
        "Hartmann-Shack Wavefront Sensor",
        "Auto Tracking & Alignment",
        "Keratometry & Peripheral Mapping",
        "Instant Power Calculation"
      ]
    },
    {
      id: "08",
      name: "HUVITZ CRK-7000 Auto Ref/Keratometer",
      category: "Corneal Diagnostics",
      image: "/images/equipments/Huvitz CRK.jpeg",
      description: "Precision diagnostic auto ref/keratometer for fast corneal curvature analysis, contact lens fitting, and refraction testing.",
      features: [
        "Corneal Curvature Analysis",
        "Pupil & Iris Diameter Measurement",
        "High-Speed Auto Measurement",
        "Clear Graphical Display"
      ]
    },
    {
      id: "09",
      name: "Quantel Medical AXIS II PR A-Scan Biometer",
      category: "Ultrasound Biometry",
      image: "/images/equipments/quantel medical.jpeg",
      description: "High-precision ultrasonic A-scan biometer with pachymetry for accurate axial length measurements and corneal thickness calculation.",
      features: [
        "High-Frequency Ultrasound Probe",
        "Corneal Pachymetry Mapping",
        "Multi-Formula IOL Calculations",
        "Contact & Immersion Modes"
      ]
    },
    {
      id: "10",
      name: "Aurolab Hawk-I Slit Lamp / Imaging System",
      category: "Digital Slit Lamp Imaging",
      image: "/images/equipments/Aurolab Hawk.jpeg",
      description: "High-resolution digital slit lamp biomicroscope for detailed anterior segment and corneal examination with live photo capture.",
      features: [
        "High-Resolution Digital Camera",
        "Five-Step Magnification",
        "Integrated Slit Lamp Optics",
        "Live Patient Photo Storage"
      ]
    },
    {
      id: "11",
      name: "Oscar Vision Digital Vision Chart",
      category: "Digital Acuity System",
      image: "/images/equipments/oscar vision.jpeg",
      description: "Advanced computerized chart display system providing standardized Snellen, LogMAR, and color vision acuity testing.",
      features: [
        "Multi-Distance Snellen & LogMAR",
        "Contrast Sensitivity Testing",
        "Color Vision & Ishihara Charts",
        "Remote Controlled Interface"
      ]
    }
  ];

  const categories = ['All', 'Surgical & Laser Tech', 'Diagnostic & OCT', 'Refraction & Acuity'];

  const filteredEquipments = equipments.filter(item => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Surgical & Laser Tech') return ['01', '02', '04', '05'].includes(item.id);
    if (activeCategory === 'Diagnostic & OCT') return ['03', '06', '09', '10'].includes(item.id);
    if (activeCategory === 'Refraction & Acuity') return ['07', '08', '11'].includes(item.id);
    return true;
  });

  return (
    <section id="equipment" className="py-24 relative bg-[#070C14] border-t border-slate-800/60 overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#35A6B7]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#B8ED78]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            International Standard <span className="text-gradient-lime">Surgical & Diagnostic Equipment</span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            Rishabh Eye Hospital is equipped with 11 world-class American, German, and international ophthalmic systems to deliver 100% precision, zero-infection safety, and optimal vision outcomes.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#B8ED78] to-[#35A6B7] text-slate-950 shadow-lg shadow-[#B8ED78]/20 font-extrabold scale-105'
                    : 'glass-panel text-slate-300 hover:text-white hover:border-[#35A6B7]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 11 Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredEquipments.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="glass-panel rounded-3xl p-6 border border-[#35A6B7]/30 hover:border-[#B8ED78]/60 shadow-xl glass-card-hover relative group flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Equipment Real Image Header */}
                <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-[#35A6B7]/40 mb-5 bg-[#070C14]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />
                  
                  {/* Number Badge Top Left */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-xl text-xs font-mono font-extrabold bg-[#B8ED78] text-slate-950 shadow-lg border border-white/30">
                    #{item.id}
                  </span>

                  {/* Category Badge Overlay Top Right */}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/85 text-[#B8ED78] border border-[#B8ED78]/40 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-display text-lg font-extrabold text-white group-hover:text-[#B8ED78] transition-colors mb-2 leading-snug">
                  {item.name}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed mb-4 min-h-[48px]">
                  {item.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-5 pt-3 border-t border-slate-800/80">
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B8ED78] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Status */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#35A6B7]" />
                  <span>OPERATIONAL</span>
                </span>
                <span className="text-[#B8ED78] font-bold">100% CALIBRATED</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
