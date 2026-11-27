import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { FiveStepProcessSection } from './components/FiveStepProcessSection';
import { ProblemsSection } from './components/ProblemsSection';
import { WhoIsThisForSection } from './components/WhoIsThisForSection';
import { ClarityCallSection } from './components/ClarityCallSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { BOOKING_FORM_URL } from './config';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleOpenForm = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Main View Flow */}
      <main className="flex-1">
        {/* SECTION 1 — HERO */}
        <HeroSection onBookCall={handleOpenForm} formUrl={BOOKING_FORM_URL} />

        {/* SECTION 2 — 5 STEP PROCESS */}
        <FiveStepProcessSection />

        {/* SECTION 3 — THEIR PROBLEMS & ROADMAP HIGHLIGHT (MERGED) */}
        <ProblemsSection />

        {/* SECTION 3 — MARRIAGE CLARITY CALL */}
        <ClarityCallSection onBookCall={handleOpenForm} formUrl={BOOKING_FORM_URL} />

        {/* SECTION 4 — WHO IS THIS FOR */}
        <WhoIsThisForSection onBookCall={handleOpenForm} formUrl={BOOKING_FORM_URL} />

        {/* SECTION 5 — REAL CLIENT TESTIMONIALS SLIDER */}
        <TestimonialsSection onBookCall={handleOpenForm} formUrl={BOOKING_FORM_URL} />

        {/* SECTION 7 — FREQUENTLY ASKED QUESTIONS */}
        <FAQSection onBookCall={handleOpenForm} formUrl={BOOKING_FORM_URL} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile-First Sticky CTA (Visible on scroll) */}
      <StickyMobileCTA
        onBookCall={handleOpenForm}
        formUrl={BOOKING_FORM_URL}
      />

      {/* Popup Form & Meeting Calendar Link Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
