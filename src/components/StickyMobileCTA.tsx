import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BOOKING_FORM_URL } from '../config';

interface StickyMobileCTAProps {
  onBookCall?: () => void;
  formUrl?: string;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({
  onBookCall,
  formUrl = BOOKING_FORM_URL,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show once user has scrolled past hero (300px)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (onBookCall) {
      onBookCall();
    } else if (formUrl) {
      window.open(formUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isVisible) return null;

  return (
    <aside aria-label="Mobile Call to Action" className="fixed bottom-0 inset-x-0 z-50 p-2.5 sm:p-3 bg-white/95 backdrop-blur-md border-t border-[#0e2a6e]/15 shadow-lg md:hidden transition-transform duration-300">
      <div className="max-w-md mx-auto flex items-center gap-2">
        <button
          onClick={handleClick}
          id="sticky-mobile-cta-btn"
          className="w-full flex items-center justify-center gap-2 bg-[#ffde59] active:bg-[#ffde59]/90 text-black font-black text-xs sm:text-sm py-3 px-3 rounded-xl shadow-md uppercase tracking-wider transition-all cursor-pointer border border-black/15"
        >
          <span>BOOK YOUR MARRIAGE PROPOSAL STRATEGY CALL</span>
          <ArrowRight className="w-4 h-4 shrink-0 stroke-[2.5]" />
        </button>
      </div>
    </aside>
  );
};
