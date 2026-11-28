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
      title: 'Get 100 Marriage Proposals',
      description:
        'We Identify 20+ marriage proposal sources according to your expectations and background and set up your profile on each platform. You only send and respond to matches & proposals.',
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
      className="py-10 md:py-14 bg-[#0e2a6e]/[0.03] border-b border-[#0e2a6e]/15"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-white bg-[#ff006b] px-3 py-1 rounded-md inline-block mb-2.5">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0e2a6e] font-display leading-[1.25]">
            <span className="text-[#ff006b]">100 Marriage Proposals</span> System
          </h2>
        </div>

        {/* 5-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 mb-8 sm:mb-10">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`bg-white border border-[#0e2a6e]/15 rounded-2xl p-6 sm:p-7 shadow-xs hover:border-[#ff006b]/45 transition-colors flex flex-col justify-start ${item.colSpan}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#ffde59] text-xs font-extrabold uppercase tracking-wider text-black">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#ff006b] flex items-center justify-center text-white shadow-xs">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#0e2a6e] mb-2 font-display leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-black/75 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing Promise Banner */}
        <div className="max-w-4xl mx-auto bg-[#0e2a6e] text-white rounded-2xl p-5 sm:p-6 text-center shadow-md border-t-4 border-t-[#ff006b] border border-black/15 flex flex-col sm:flex-row items-center justify-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#ffde59] shrink-0" />
          <p className="text-sm sm:text-base font-bold tracking-wide">
            We build it. We run it. You just say yes.{' '}
            <span className="text-[#ffde59]">Support continues until you get married.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
