import React from 'react';
import { Check, X, ArrowRight, AlertCircle } from 'lucide-react';
import { BOOKING_FORM_URL } from '../config';

interface WhoIsThisForSectionProps {
  onBookCall?: () => void;
  formUrl?: string;
}

export const WhoIsThisForSection: React.FC<WhoIsThisForSectionProps> = ({ onBookCall, formUrl = BOOKING_FORM_URL }) => {
  const handleClick = () => {
    if (onBookCall) {
      onBookCall();
    } else if (formUrl) {
      window.open(formUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const criteria = [
    {
      bold: "You have built a good career or business",
      rest: "but not getting right marriage proposals.",
    },
    {
      bold: "You’re actively looking for marriage",
      rest: "but the quality of proposals isn’t where you want it to be.",
    },
    {
      bold: "You’re getting proposals, but finding the right compatibility is difficult.",
      rest: "",
    },
    {
      bold: "You’ve tried matrimonial apps, family networks, friends, or matchmakers",
      rest: "but still feel stuck.",
    },
    {
      bold: "You want to meet more quality matches",
      rest: "without lowering your standards.",
    },
    {
      bold: "You’re confused about how to evaluate a potential partner",
      rest: "beyond attraction and first impressions.",
    },
    {
      bold: "You want a structured, personalised approach",
      rest: "instead of leaving your marriage search to luck.",
    },
    {
      bold: "You’re ready to take action",
      rest: "and want clarity on what to do next.",
    },
  ];

  const notForYouPoints = [
    "You're looking for a matrimonial agency, marriage bureau, or matchmaking service.",
    "Your finances and the basics of your life are still unsettled.",
    "You don't believe in investing in yourself.",
    "You're not ready for real, lasting change.",
    "You're not committed to fixing this area of your life.",
    "You want results without doing the work.",
  ];

  return (
    <section id="who-is-this-for-section" className="py-12 md:py-16 bg-white border-b border-[#0e2a6e]/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-black bg-[#ffde59] px-2.5 py-0.5 rounded-sm inline-block mb-2">
            Target Fit
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0e2a6e] font-display leading-[1.25] mb-3">
            Who Is This For?
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-semibold text-black/80 font-display">
            This is for working professionals who are serious about getting right marriage proposals.
          </p>
        </div>

        {/* Qualifier Sub-title */}
        <div className="max-w-5xl mx-auto mb-5 text-left">
          <p className="text-xs uppercase tracking-wider font-bold text-[#0e2a6e] flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#0e2a6e] stroke-[3]" />
            <span>This is for you if:</span>
          </p>
        </div>

        {/* 8 Criteria Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 max-w-5xl mx-auto mb-12 sm:mb-16">
          {criteria.map((item, index) => (
            <div
              key={index}
              className="bg-[#0e2a6e]/[0.03] border border-[#0e2a6e]/15 rounded-xl p-4.5 sm:p-5 flex items-start gap-3.5 hover:border-[#0e2a6e]/35 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-[#ffde59] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs border border-black/15">
                <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
              </div>
              <p className="text-sm sm:text-base text-black/75 leading-snug">
                <strong className="font-bold text-[#0e2a6e]">{item.bold}</strong>
                {item.rest ? ` ${item.rest}` : ''}
              </p>
            </div>
          ))}
        </div>

        {/* "This is not for you if..." Section */}
        <div className="max-w-5xl mx-auto bg-[#0e2a6e] text-white border border-black/20 rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm mb-10">
          <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#ffde59] flex items-center justify-center text-black">
              <AlertCircle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                This is not for you if...
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-medium">
                We protect your time and ours. Marriage Matrix works exclusively with committed individuals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {notForYouPoints.map((point, index) => (
              <div
                key={index}
                className="bg-white border border-white/20 rounded-xl p-4 sm:p-4.5 flex items-start gap-3 shadow-2xs"
              >
                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3 text-[#ffde59] stroke-[3]" />
                </div>
                <p className="text-xs sm:text-sm md:text-[15px] font-semibold text-black leading-snug">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-6 sm:mt-8">
          <button
            onClick={handleClick}
            className="inline-flex items-center justify-center gap-3 bg-[#ffde59] hover:bg-[#ffde59]/90 text-black border border-black/15 text-base sm:text-lg font-black px-8 sm:px-10 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer tracking-wide uppercase"
          >
            <span>Book Your Marriage Proposal Strategy Call</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="mt-2 text-center text-xs sm:text-sm text-black/70 font-medium">
            Your call will be with one of our expert coaches.
          </p>
        </div>
      </div>
    </section>
  );
};

