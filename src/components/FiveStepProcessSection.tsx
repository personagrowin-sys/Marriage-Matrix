import React from 'react';
import { UserCheck, Layers, ClipboardCheck, TrendingUp, PhoneCall, CheckCircle2 } from 'lucide-react';

export const FiveStepProcessSection: React.FC = () => {
  const steps = [
    {
      step: 'Step 1',
      title: 'Build Your Identity',
      description:
        'We build your winner introduction, photo strategy, advanced biodata and profile content, so you stand out in every marriage proposal pile.',
      icon: UserCheck,
      colSpan: 'lg:col-span-2',
    },
    {
      step: 'Step 2',
      title: 'Get 100 Proposals',
      description:
        'We Identify 25+ marriage proposal sources according to your expectations and background and set up your profile on each platform. You only send and respond to matches & proposals.',
      icon: Layers,
      colSpan: 'lg:col-span-2',
    },
    {
      step: 'Step 3',
      title: 'Check Compatibility',
      description:
        'Got a proposal? We check if they truly fit your life and send you a detailed report.',
      icon: ClipboardCheck,
      colSpan: 'lg:col-span-2',
    },
    {
      step: 'Step 4',
      title: 'Grow Every Week',
      description:
        'Weekly group coaching on personal branding, communication, grooming, emotional stability and mindset, plus 1-1 Q&A.',
      icon: TrendingUp,
      colSpan: 'lg:col-span-3',
    },
    {
      step: 'Step 5',
      title: 'Get Personal Mentorship',
      description:
        'A weekly 1-1 call with your mentor for any marriage problem, big or small.',
      icon: PhoneCall,
      colSpan: 'md:col-span-2 lg:col-span-3',
    },
  ];

  return (
    <section
      id="five-step-process-section"
      className="py-10 md:py-14 bg-slate-50 border-b border-slate-200/70"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#081120] bg-[#ffd43f] px-2.5 py-0.5 rounded-sm inline-block mb-2">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#081120] font-display leading-[1.25]">
            5 Step Process to 100 Marriage Proposal System
          </h2>
        </div>

        {/* 5-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 mb-8 sm:mb-10">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-start ${item.colSpan}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-md bg-amber-50 border border-amber-300/80 text-xs font-extrabold uppercase tracking-wider text-[#081120]">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#081120]">
                    <Icon className="w-5 h-5 text-slate-700" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#081120] mb-2 font-display leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing Promise Banner */}
        <div className="max-w-4xl mx-auto bg-[#081120] text-white rounded-2xl p-5 sm:p-6 text-center shadow-md border border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#ffd43f] shrink-0" />
          <p className="text-sm sm:text-base font-bold tracking-wide">
            We build it. We run it. You just say yes.{' '}
            <span className="text-[#ffd43f]">Support continues until you get married.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
