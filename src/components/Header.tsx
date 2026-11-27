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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#081120] flex items-center justify-center text-white font-bold text-lg tracking-wider shadow-xs">
            M<span className="text-[#ffd43f]">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-tight text-[#081120] font-display leading-none">
              MARRIAGE <span className="text-[#ffd43f]">MATRIX</span>
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 mt-0.5">
              Marriage Clarity Mentorship
            </span>
          </div>
        </div>

        {/* Right CTA & Privacy Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100/90 px-3 py-1.5 rounded-full border border-slate-200/80">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>100% Confidential</span>
          </div>
          
          <button
            onClick={handleClick}
            id="nav-cta-btn"
            className="inline-flex items-center gap-1.5 bg-[#ffd43f] hover:bg-[#f5c721] text-[#081120] text-xs sm:text-sm font-black px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-xs hover:shadow transition-all duration-150 active:scale-95 cursor-pointer uppercase tracking-wider border border-amber-300"
          >
            <span>Book Your Marriage Clarity Call</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </header>
  );
};

