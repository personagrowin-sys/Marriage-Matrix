import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#081120] text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-base font-extrabold tracking-tight text-white font-display">
            MARRIAGE <span className="text-[#ffd43f]">MATRIX</span>
          </span>
        </div>

        {/* Core Tagline */}
        <p className="text-sm font-semibold text-slate-300 mb-4 tracking-wide">
          Your Easiest &amp; Fastest Way To An Ideal Life Partner
        </p>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 text-slate-400 mb-6 font-medium">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Private &amp; Confidential</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>NDA-Based Engagement</span>
          </span>
          <span>•</span>
          <span>Personalised 1:1</span>
        </div>

        <p className="text-slate-500 max-w-lg mx-auto leading-relaxed mb-6">
          A personal mentoring system focused on helping successful men approach their search for the right life partner with greater clarity and structure.
        </p>

        <div className="pt-6 border-t border-slate-800/80 text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <span>© {new Date().getFullYear()} Marriage Matrix. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 transition-colors">Confidentiality Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors">Terms of Mentorship</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
