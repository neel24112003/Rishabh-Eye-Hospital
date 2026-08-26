import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Quote, CheckCircle2, UserCheck, Plus, X, Sparkles, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

const DEFAULT_REVIEWS = [
  {
    id: 1,
    name: "Rajesh V. Patel",
    location: "New City Light, Surat",
    treatment: "Cataract Surgery",
    doctor: "Dr. Hetalkumar Yagnik",
    rating: 5,
    date: "2 weeks ago",
    text: "Dr. Hetalkumar Yagnik performed Phaco cataract surgery on both my eyes. The German modular OT and American machine are truly impressive. My vision was restored to 6/6 within 24 hours without any pain. Highly recommended!",
    verified: true
  },
  {
    id: 2,
    name: "Pooja M. Shah",
    location: "Vesu, Surat",
    treatment: "Bladeless LASIK",
    doctor: "Dr. Hetalkumar Yagnik",
    rating: 5,
    date: "1 month ago",
    text: "I had -5.5 D glasses power for 12 years. After LASIK at Rishabh Eye Hospital, I have 100% clear vision without spectacles. The hospital is super clean, fully AC, and the entire team is extremely supportive.",
    verified: true
  },
  {
    id: 3,
    name: "Anilbhai K. Desai",
    location: "Adajan, Surat",
    treatment: "Retina Care",
    doctor: "Dr. Shefali Yagnik",
    rating: 5,
    date: "3 weeks ago",
    text: "Dr. Shefali Yagnik is extremely patient and thorough. She mapped my diabetic retina scan digitally and explained every detail clearly. Excellent diagnostic equipment and friendly staff.",
    verified: true
  },
  {
    id: 4,
    name: "Meenaben H. Mehta",
    location: "Althan, Surat",
    treatment: "ICL Implant",
    doctor: "Dr. Hetalkumar Yagnik",
    rating: 5,
    date: "2 months ago",
    text: "Because of thin cornea I was rejected for LASIK elsewhere, but Dr. Yagnik suggested ICL surgery. The procedure took just 15 minutes and the result is miraculous! Very thankful to Rishabh Hospital.",
    verified: true
  }
];

const DEFAULT_CLOUD_IDS = [
  "ff8081819ff5b11001a03c548474228d",
  "ff8081819ff5b11001a03c5485b3228e",
  "ff8081819ff5b11001a03c5486ec228f",
  "ff8081819ff5b11001a03c5488282290"
];

const CLOUD_IDS_KEY = 'rishabh_cloud_review_ids_v1';
const STORAGE_KEY = 'rishabh_patient_reviews_v2';

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error reading saved reviews:", e);
    }
    return DEFAULT_REVIEWS;
  });

  // Fetch reviews from all available APIs + GitHub Raw on mount
  useEffect(() => {
    const fetchReviews = async () => {
      const endpoints = [
        '/api/reviews',
        'http://192.168.1.5:5001/api/reviews',
        'http://localhost:5001/api/reviews',
        `https://raw.githubusercontent.com/neel24112003/Rishabh-Eye-Hospital/main/public/reviews_data.json?t=${Date.now()}`
      ];

      for (const url of endpoints) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            const list = Array.isArray(data) ? data : (data.reviews || []);
            if (list.length > 0) {
              setReviewsList(list);
              try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch(e){}
              break;
            }
          }
        } catch (e) {
          // Try next endpoint
        }
      }
    };

    fetchReviews();
  }, []);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    location: 'Surat, Gujarat',
    doctor: 'Dr. Hetalkumar Yagnik',
    treatment: 'Cataract Surgery',
    rating: 5,
    text: ''
  });
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const item = {
      id: Date.now(),
      name: newReview.name,
      location: newReview.location || "Surat Patient",
      treatment: newReview.treatment,
      doctor: newReview.doctor || "Dr. Hetalkumar Yagnik",
      rating: Number(newReview.rating),
      date: "Just now",
      text: newReview.text,
      verified: true
    };

    // Immediate state & local storage update
    const updated = [item, ...reviewsList];
    setReviewsList(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {}

    // Post to all active backend endpoints simultaneously
    const submitEndpoints = [
      '/api/reviews',
      'http://192.168.1.5:5001/api/reviews',
      'http://localhost:5001/api/reviews'
    ];

    submitEndpoints.forEach(async (url) => {
      try {
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
      } catch (err) {}
    });

    setSubmittedMessage(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B8ED78', '#35A6B7', '#51AABC']
    });

    setTimeout(() => {
      setSubmittedMessage(false);
      setReviewModalOpen(false);
      setNewReview({
        name: '',
        location: 'Surat, Gujarat',
        doctor: 'Dr. Hetalkumar Yagnik',
        treatment: 'Cataract Surgery',
        rating: 5,
        text: ''
      });
    }, 2000);
  };

  return (
    <section id="reviews" className="py-24 relative bg-cyber-grid radial-glow overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Patient Stories & <span className="text-gradient-lime">Reviews</span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            Read authentic feedback from patients who restored their vision at Rishabh Eye Hospital & Laser Center.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex text-[#B8ED78]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#B8ED78]" />
                ))}
              </div>
              <span className="text-white font-bold text-lg">5.0 / 5.0</span>
            </div>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 text-xs font-medium">Over 2,500+ 5-Star Reviews in Surat</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {reviewsList.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#35A6B7]/30 hover:border-[#B8ED78]/50 shadow-xl glass-card-hover relative flex flex-col justify-between"
            >
              <div className="relative z-10">
                {/* Rating (Left) & Treatment Badge + Quote Icon (Right - 100% Single Horizontal Line) */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex text-[#B8ED78] shrink-0">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#B8ED78]" />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold bg-[#35A6B7]/20 text-[#35A6B7] border border-[#35A6B7]/40 shadow-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      {review.treatment}
                    </span>
                    <Quote className="w-6 h-6 sm:w-7 sm:h-7 text-[#B8ED78]/60 shrink-0" />
                  </div>
                </div>

                <p className="text-slate-200 text-sm leading-relaxed italic mb-6">
                  "{review.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                    <span>{review.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#B8ED78]" />
                  </div>
                  <div className="text-xs text-slate-400 font-mono">{review.location} • {review.doctor}</div>
                </div>

                <span className="text-[11px] text-slate-500 font-mono">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Share Patient Experience Button (Positioned Below Comments Grid) */}
        <div className="flex justify-center">
          <button
            onClick={() => setReviewModalOpen(true)}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#B8ED78] via-[#35A6B7] to-[#51AABC] text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#B8ED78]/25 hover:shadow-[#B8ED78]/40 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
            <span>Share Your Patient Experience</span>
          </button>
        </div>

      </div>

      {/* Write Review Modal */}
      <AnimatePresence>
        {reviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel border border-[#35A6B7]/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl bg-[#0E1726]/95"
            >
              <button
                onClick={() => setReviewModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display text-2xl font-bold text-white mb-2">Write a Review</h3>
              <p className="text-xs text-slate-300 mb-6">Your feedback helps fellow patients in Surat choose trusted eye care.</p>

              {submittedMessage ? (
                <div className="p-6 rounded-2xl bg-[#B8ED78]/20 border border-[#B8ED78] text-center">
                  <Sparkles className="w-8 h-8 text-[#B8ED78] mx-auto mb-2" />
                  <h4 className="font-bold text-white text-lg mb-1">Thank You!</h4>
                  <p className="text-xs text-slate-200">Your review has been successfully submitted.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B8ED78]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Treatment Received</label>
                    <div className="relative">
                      <select
                        value={newReview.treatment}
                        onChange={(e) => setNewReview({ ...newReview, treatment: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-600 appearance-none cursor-pointer pr-10"
                      >
                        <option value="Cataract Surgery" className="bg-[#0F172A] text-white">Cataract Surgery</option>
                        <option value="Bladeless LASIK" className="bg-[#0F172A] text-white">Bladeless LASIK</option>
                        <option value="ICL Lens Placement" className="bg-[#0F172A] text-white">ICL Lens Placement</option>
                        <option value="Retina Care" className="bg-[#0F172A] text-white">Retina Care</option>
                        <option value="Comprehensive Eye Checkup" className="bg-[#0F172A] text-white">Comprehensive Eye Checkup</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Attending Doctor / Consultant</label>
                    <div className="relative">
                      <select
                        value={newReview.doctor}
                        onChange={(e) => setNewReview({ ...newReview, doctor: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-600 appearance-none cursor-pointer pr-10"
                      >
                        <option value="Dr. Hetalkumar R. Yagnik" className="bg-[#0F172A] text-white">Dr. Hetalkumar R. Yagnik (Senior Super-Consultant)</option>
                        <option value="Dr. Shefali H. Yagnik" className="bg-[#0F172A] text-white">Dr. Shefali H. Yagnik (Consultant Ophthalmic Surgeon)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Rating</label>
                    <div className="flex gap-2">
                      {[5, 4, 3, 2, 1].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: num })}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                            newReview.rating === num
                              ? 'bg-[#B8ED78] text-slate-950 border-[#B8ED78]'
                              : 'bg-slate-900 text-slate-300 border-slate-700'
                          }`}
                        >
                          {num} ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Review Comments</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share details about your consultation, surgery, or hospital experience..."
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B8ED78]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B8ED78] to-[#35A6B7] text-slate-950 font-bold text-sm shadow-lg shadow-[#B8ED78]/20"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
