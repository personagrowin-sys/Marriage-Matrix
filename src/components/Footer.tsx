import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0e2a6e] text-white/80 py-12 border-t-4 border-[#ff006b] text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-base font-extrabold tracking-tight text-white font-display">
            MARRIAGE <span className="text-[#ffde59]">MATRIX</span>
          </span>
        </div>

        {/* Core Tagline */}
        <p className="text-sm font-semibold text-white mb-4 tracking-wide">
          Your Easiest &amp; Fastest Way To Get 100 Quality Marriage Proposals
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-white/85 mb-6 font-medium">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#ffde59]" />
            <span>Private &amp; Confidential</span>
          </span>
          <span className="text-white/40">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ffde59]" />
            <span>NDA-Based Engagement</span>
          </span>
          <span className="text-white/40">•</span>
          <span>Personalised 1:1</span>
        </div>

        <p className="text-white/70 max-w-lg mx-auto leading-relaxed mb-6">
          A personal mentoring system focused on helping successful men get consistent quality matching marriage proposals according to their expectations and background.
        </p>

        <div className="pt-6 border-t border-white/15 text-white/65 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <span>© {new Date().getFullYear()} Marriage Matrix. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors">Confidentiality Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors">Terms of Mentorship</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
