export const serviceCategories = [
  {
    category: "Eye Surgeries",
    services: [
      "Cataract Surgeries With IOL Implantation",
      "Corneal Disease Surgery",
      "Oculoplastic Surgery",
      "Glaucoma Check Up & Surgery",
      "Retinal Examination, Vitrectomy & Intravitreal Injections",
      "Laser Surgeries (YAG Capsulotomy, Iridotomy & LASIK)",
      "Squint Assessment & Surgery",
      "Stem Cell Transplantation",
      "Lid Surgeries",
      "DCR Surgery (Dacryocystorhinostomy)",
      "Amblyopia Therapy",
      "Contact Lens Clinic",
      "Anaesthesia Related To Eye Surgery Services"
    ]
  },
  {
    category: "Hospital Services & Investigations",
    services: [
      "Ophthalmic Consultation For Any Eye Disease",
      "Eye Check Up Certification",
      "Retinal Investigations (Optical Coherence Tomography)",
      "Glaucoma Assessment By OCT",
      "Pachymetry (Corneal Thickness)",
      "IOL Power Calculation By A-Scan Biometer",
      "Refraction For Spectacle Check Up",
      "Anaesthesia Related Services",
      "Mediclaim Reimbursement",
      "Cashless TPA Facility"
    ]
  }
];

export const allServicesList = [
  ...serviceCategories[0].services,
  ...serviceCategories[1].services
];
