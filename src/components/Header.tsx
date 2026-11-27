import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { BOOKING_FORM_URL } from '../config';

interface HeaderProps {
  onBookCall?: () => void;
  formUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({ onBookCall, formUrl = BOOKING_FORM_URL }) => {
  const handleClick = () => {
    if (onBookCall) {
      onBookCall();
    } else if (formUrl) {
      window.open(formUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#0e2a6e]/15 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#0e2a6e] flex items-center justify-center text-white font-bold text-lg tracking-wider shadow-xs">
            M<span className="text-[#ffde59]">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-tight text-[#0e2a6e] font-display leading-none">
              MARRIAGE <span className="text-[#ffde59]">MATRIX</span>
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-black/60 mt-0.5">
              Marriage Clarity Mentorship
            </span>
          </div>
        </div>

        {/* Right CTA & Privacy Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#0e2a6e] bg-[#0e2a6e]/[0.05] px-3 py-1.5 rounded-full border border-[#0e2a6e]/15">
            <Lock className="w-3.5 h-3.5 text-[#0e2a6e] shrink-0" />
            <span>100% Confidential</span>
          </div>
          
          <button
            onClick={handleClick}
            id="nav-cta-btn"
            className="inline-flex items-center gap-1.5 bg-[#ffde59] hover:bg-[#ffde59]/90 text-black text-xs sm:text-sm font-black px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-xs hover:shadow transition-all duration-150 active:scale-95 cursor-pointer uppercase tracking-wider border border-black/15"
          >
            <span>Book Your Marriage Proposal Strategy Call</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </header>
  );
};

