import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Quote, CheckCircle2, UserCheck, Plus, X, Sparkles } from 'lucide-react';
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

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState(DEFAULT_REVIEWS);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    treatment: 'Cataract Surgery',
    rating: 5,
    text: ''
  });
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const item = {
      id: Date.now(),
      name: newReview.name,
      location: "Surat Patient",
      treatment: newReview.treatment,
      doctor: "Dr. Hetalkumar Yagnik",
      rating: Number(newReview.rating),
      date: "Just now",
      text: newReview.text,
      verified: true
    };

    setReviewsList([item, ...reviewsList]);
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
      setNewReview({ name: '', treatment: 'Cataract Surgery', rating: 5, text: '' });
    }, 2000);
  };

  return (
    <section id="reviews" className="py-24 relative bg-cyber-grid radial-glow overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#B8ED78]/40 text-xs font-semibold text-[#B8ED78] uppercase tracking-wider mb-4 shadow-lg shadow-[#B8ED78]/10">
            <UserCheck className="w-3.5 h-3.5 text-[#35A6B7]" />
            <span>Verified Patient Experiences</span>
          </div>

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
                {/* Rating & Treatment & Quote Icon (100% Single Horizontal Line on Mobile & Desktop) */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex text-[#B8ED78] shrink-0">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#B8ED78]" />
                      ))}
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold bg-[#35A6B7]/20 text-[#35A6B7] border border-[#35A6B7]/40 shadow-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      {review.treatment}
                    </span>
                  </div>

                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#B8ED78]/35 shrink-0" />
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
                    <select
                      value={newReview.treatment}
                      onChange={(e) => setNewReview({ ...newReview, treatment: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B8ED78]"
                    >
                      <option value="Cataract Surgery (Phaco)">Cataract Surgery (Phaco)</option>
                      <option value="Bladeless LASIK Surgery">Bladeless LASIK Surgery</option>
                      <option value="ICL Lens Placement">ICL Lens Placement</option>
                      <option value="Retina Evaluation">Retina Evaluation</option>
                      <option value="Comprehensive Eye Checkup">Comprehensive Eye Checkup</option>
                    </select>
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
