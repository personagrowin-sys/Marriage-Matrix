import React from 'react';
import { ArrowRight, Sparkles, Layers, Target, Compass } from 'lucide-react';

interface WhatWeHelpWithProps {
  onScrollToForm: () => void;
}

export const WhatWeHelpWithSection: React.FC<WhatWeHelpWithProps> = ({ onScrollToForm }) => {
  const cards = [
    {
      num: "01",
      tag: "POSITION YOURSELF",
      icon: Sparkles,
      text: "Improve your personal positioning, Advanced Biodata and online presence.",
    },
    {
      num: "02",
      tag: "CREATE MORE OPPORTUNITIES",
      icon: Layers,
      text: "Learn how to make better use of matrimonial platforms, family, friends, communities, matchmakers and other proposal sources.",
    },
    {
      num: "03",
      tag: "EVALUATE COMPATIBILITY",
      icon: Target,
      text: "Look beyond attraction and consider values, lifestyle, communication, family, career and long-term vision.",
    },
    {
      num: "04",
      tag: "MAKE CLEARER DECISIONS",
      icon: Compass,
      text: "Develop a structured approach to comparing potential partners and moving forward with greater clarity.",
    },
  ];

  return (
    <section id="what-we-help-with-section" className="py-16 md:py-24 bg-white border-b border-[#0e2a6e]/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-white bg-[#ff006b] px-3 py-1 rounded-md inline-block mb-2.5">
            System &amp; Structure
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0e2a6e] font-display">
            What Can Marriage Matrix Help You With?
          </h2>
        </div>

        {/* 4 Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-[#0e2a6e]/[0.03] border border-[#0e2a6e]/15 rounded-2xl p-6 flex flex-col justify-between hover:border-[#ff006b]/45 transition-all shadow-2xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black tracking-widest text-[#ff006b] font-mono tabular-nums">
                      {card.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#ff006b] flex items-center justify-center text-white shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-extrabold text-[#0e2a6e] tracking-wider uppercase mb-2.5 font-display">
                    {card.tag}
                  </h3>

                  <p className="text-sm text-black/75 leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Statement & CTA */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base sm:text-lg text-black/80 font-medium leading-relaxed mb-8 px-4">
            The goal isn&apos;t simply to find more profiles. It&apos;s to create better opportunities and develop greater clarity about who is right for you.
          </p>

          <button
            onClick={onScrollToForm}
            id="what-we-help-cta"
            className="inline-flex items-center justify-center gap-2.5 bg-[#ff006b] hover:bg-[#ff006b]/90 text-white border border-black/10 text-sm sm:text-base font-black px-7 py-3.5 rounded-xl shadow-lg shadow-[#ff006b]/25 hover:shadow-xl transition-all active:scale-95 cursor-pointer uppercase tracking-wide"
          >
            <span>BOOK YOUR MARRIAGE PROPOSAL STRATEGY CALL</span>
            <ArrowRight className="w-4 h-4 text-[#ffde59] stroke-[2.75]" />
          </button>
        </div>
      </div>
    </section>
  );
};
