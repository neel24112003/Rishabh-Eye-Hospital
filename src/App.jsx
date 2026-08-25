import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutHospital from './components/AboutHospital';
import Doctors from './components/Doctors';
import Services from './components/Services';
import Equipment from './components/Equipment';
import EventGallery from './components/EventGallery';
import Reviews from './components/Reviews';
import ContactMap from './components/ContactMap';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import { Phone } from 'lucide-react';

export default function App() {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070C14] text-slate-100 selection:bg-[#B8ED78] selection:text-slate-900 overflow-x-hidden relative">
      {/* Sticky Header Navbar */}
      <Navbar onOpenAppointment={() => setAppointmentModalOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with 3D Cyber Eye Visualizer */}
        <Hero onOpenAppointment={() => setAppointmentModalOpen(true)} />

        {/* Doctors Section */}
        <Doctors onOpenAppointment={() => setAppointmentModalOpen(true)} />

        {/* About Hospital Section */}
        <AboutHospital />

        {/* Services Section */}
        <Services onOpenAppointment={() => setAppointmentModalOpen(true)} />

        {/* Equipment Section */}
        <Equipment />

        {/* Event Gallery Section */}
        <EventGallery />

        {/* Reviews Section */}
        <Reviews />

        {/* Contact & Map Section */}
        <ContactMap onBookSuccess={() => {}} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Appointment Modal */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
      />

      {/* Floating Quick Contact Widgets (Right Bottom) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Official WhatsApp Floating Widget */}
        <a
          href="https://wa.me/917405563636?text=Hello%20Rishabh%20Eye%20Hospital,%20I%20want%20to%20inquire%20about%20an%20appointment."
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 p-3 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white/20 group"
          title="Chat on WhatsApp (074055 63636)"
          aria-label="WhatsApp Chat"
        >
          <svg className="w-7 h-7 fill-current group-hover:rotate-12 transition-transform" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>

        {/* Phone Helpline Call Floating Widget */}
        <a
          href="tel:07405563636"
          className="w-13 h-13 p-3.5 rounded-full bg-gradient-to-r from-[#B8ED78] to-[#35A6B7] text-slate-950 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white/20 group"
          title="Call Helpline 074055 63636"
          aria-label="Call OPD Helpline"
        >
          <Phone className="w-6 h-6 animate-pulse group-hover:rotate-12 transition-transform" />
        </a>
      </div>
    </div>
  );
}
