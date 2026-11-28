import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { BOOKING_FORM_URL } from '../config';
import coachImage from '../assets/images/coach.jpg.jpg';

interface HeroSectionProps {
  onBookCall?: () => void;
  formUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookCall, formUrl = BOOKING_FORM_URL }) => {
  const handleClick = () => {
    if (onBookCall) {
      onBookCall();
    } else if (formUrl) {
      window.open(formUrl, '_blank', 'noopener,noreferrer');
    }
  };
  return (
    <section id="hero-section" className="relative pt-6 pb-10 md:pt-10 md:pb-14 overflow-hidden bg-white border-b border-[#0e2a6e]/15">
      {/* Subtle pink and navy top wash */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#ff006b]/[0.05] via-[#0e2a6e]/[0.03] to-transparent pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* High-Impact Sub-hook */}
        <div className="block max-w-2xl mx-auto px-5 py-2.5 rounded-xl bg-[#ffde59]/30 border border-[#ffde59] text-black font-bold text-sm sm:text-base mb-5 tracking-wide">
          A <span className="text-[#ff006b] font-black">60 Minute Call</span> that fixes what you &amp; your family couldn&apos;t.
        </div>

        {/* Headline - 3 lines on mobile view, 2 lines on desktop/tablet */}
        <h1 className="text-[25px] sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-black text-black font-display leading-[1.28] sm:leading-[1.26] md:leading-[1.22] lg:leading-[1.2] mb-4 sm:mb-5 max-w-5xl mx-auto text-center tracking-tight">
          {/* Mobile view (3 specific lines) */}
          <div className="block sm:hidden space-y-1">
            <span className="block">
              For <span className="text-[#ff006b]">Successful Men</span>
            </span>
            <span className="block">
              struggling to get
            </span>
            <span className="block">
              <span className="text-[#0e2a6e]">
                the right marriage proposals.
              </span>
            </span>
          </div>

          {/* Desktop & Tablet view (2 lines) */}
          <div className="hidden sm:block">
            <span className="block">
              For <span className="text-[#ff006b]">Successful Men</span> struggling
            </span>
            <span className="block mt-1 sm:mt-1.5">
              to get{' '}
              <span className="text-[#0e2a6e]">
                the right marriage proposals.
              </span>
            </span>
          </div>
        </h1>

        {/* Subtext under headline */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-black/75 font-medium leading-relaxed mb-6 sm:mb-7">
          Discover what&apos;s holding you back and get a personalised roadmap to
          <br />
          <span className="font-bold text-[#0e2a6e] underline decoration-[#ffde59] decoration-2 underline-offset-4">
            100 marriage proposals according to your expectations &amp; background.
          </span>
        </p>

        {/* Coach Video above CTA button - Wistia Player */}
        <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 w-full">
          <div className="relative w-full max-w-xl md:max-w-2xl mx-auto group">
            {/* Soft decorative shadow/glow behind */}
            <div className="absolute -inset-1.5 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-[#ff006b]/25 via-[#ffde59]/40 to-[#0e2a6e]/25 opacity-70 blur-md group-hover:opacity-90 transition duration-300" />
            
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-black">
              {/* @ts-ignore - custom element rendered by Wistia script */}
              <wistia-player
                media-id="7aro4lw1ha"
                aspect="1.7777777777777777"
                autoplay="true"
                silent-autoplay="allow"
                playsinline="true"
              ></wistia-player>
            </div>
          </div>
        </div>

        {/* Primary CTA & Reassurance */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleClick}
            id="hero-primary-cta"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 bg-[#ff006b] hover:bg-[#ff006b]/90 text-white text-sm sm:text-lg font-black px-6 sm:px-11 py-4 sm:py-4.5 rounded-xl shadow-lg shadow-[#ff006b]/25 hover:shadow-xl transition-all duration-200 active:scale-[0.98] cursor-pointer tracking-wide uppercase border border-black/10"
          >
            <span className="sm:whitespace-nowrap">
              <span className="hidden sm:inline">BOOK YOUR </span>
              <span>MARRIAGE PROPOSAL STRATEGY CALL</span>
            </span>
            <ArrowRight className="w-5 h-5 text-[#ffde59] stroke-[2.75] shrink-0" />
          </button>

          {/* Coach Note Under Button */}
          <p className="mt-2.5 text-xs sm:text-sm text-black/70 font-medium tracking-tight">
            Your call will be with one of our expert coaches.
          </p>

          {/* Reassurance metadata */}
          <p className="mt-2 text-xs sm:text-sm text-black/60 font-semibold tracking-wide flex items-center justify-center gap-2">
            <span className="text-[#ff006b] font-bold">100% Free</span>
            <span className="text-black/30">•</span>
            <span>Strictly Confidential</span>
          </p>
        </div>
      </div>
    </section>
  );
};
