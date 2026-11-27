import React from 'react';
import { ArrowRight, Clock, Shield, Search, AlertCircle, Compass, CheckCircle2 } from 'lucide-react';
import { BOOKING_FORM_URL } from '../config';

interface ClarityCallProps {
  onBookCall?: () => void;
  formUrl?: string;
}

export const ClarityCallSection: React.FC<ClarityCallProps> = ({ onBookCall, formUrl = BOOKING_FORM_URL }) => {
  const handleClick = () => {
    if (onBookCall) {
      onBookCall();
    } else if (formUrl) {
      window.open(formUrl, '_blank', 'noopener,noreferrer');
    }
  };
  const steps = [
    {
      num: "01",
      title: "Understand Your Situation",
      desc: "We'll learn where you currently are in your marriage search.",
      icon: Search,
    },
    {
      num: "02",
      title: "Identify What's Holding You Back",
      desc: "We'll understand the biggest challenges you're facing.",
      icon: AlertCircle,
    },
    {
      num: "03",
      title: "Look at Your Current Approach",
      desc: "We'll discuss what you've tried, what's working and where you may be getting stuck.",
      icon: Compass,
    },
    {
      num: "04",
      title: "Discuss Your Next Steps",
      desc: "If Marriage Matrix is suitable for your situation, we'll explain how we can work together.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="clarity-call-section" className="py-10 md:py-14 bg-slate-50 border-b border-slate-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-semibold mb-2.5">
            <Clock className="w-3.5 h-3.5 text-slate-600" />
            <span>60 Minute Confidential Marriage Clarity Call</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#081120] font-display leading-[1.25] mb-2.5">
            What Happens on Your Marriage Clarity Call?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            A private 60 minute conversation focused on your specific situation.
          </p>
        </div>

        {/* 4-Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 relative flex flex-col justify-between shadow-xs hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-black text-[#081120] font-display">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                      <Icon className="w-5 h-5 text-[#ffd43f]" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#081120] mb-2 font-display">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner */}
        <div className="max-w-3xl mx-auto bg-white border border-slate-200/80 rounded-2xl p-6 text-center shadow-xs mb-8">
          <p className="text-sm sm:text-base font-medium text-slate-800">
            No generic advice. No one-size-fits-all approach. Just a private conversation about your specific situation.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={handleClick}
            id="clarity-call-cta"
            className="inline-flex items-center justify-center gap-2.5 bg-[#ffd43f] hover:bg-[#f5c721] text-[#081120] border border-amber-300 text-sm sm:text-base font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer uppercase tracking-wide"
          >
            <span>BOOK YOUR MARRIAGE CLARITY CALL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="mt-2 text-center text-xs sm:text-sm text-slate-600 font-medium">
            Your call will be with one of our expert coaches.
          </p>
        </div>
      </div>
    </section>
  );
};
