import React from 'react';
import { UserX, Compass, MessageSquareOff } from 'lucide-react';

export const ProblemsSection: React.FC = () => {
  const problems = [
    {
      icon: UserX,
      title: "1. Your Profile Doesn't Stand Out",
      bullets: [
        "Weak or outdated photos",
        "Biodata that lists facts but tells no story",
        "Missing details on career, family and expectations",
        "Nothing that sets you apart from hundreds of others",
      ],
    },
    {
      icon: Compass,
      title: "2. You're Not Where the Right Proposals Are",
      bullets: [
        "Rely on only family or Listed on just one or two platforms",
        "Platforms that don't match your community, city or profession",
        "Bureaus, community networks and WhatsApp groups left untapped",
        "Profile set up once and never optimised",
      ],
    },
    {
      icon: MessageSquareOff,
      title: "3. Your Personality Isn't Backing You Up",
      bullets: [
        "Grooming and image that don't match your photos",
        "Weak communication in calls and first meetings",
        "Low confidence that shows in conversations",
        "Unclear on what you want in a partner",
      ],
    },
  ];

  return (
    <section id="problems-section" className="py-10 md:py-14 bg-white border-b border-[#0e2a6e]/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-black bg-[#ffde59] px-2.5 py-0.5 rounded-sm inline-block mb-2">
            The Reality
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0e2a6e] font-display leading-[1.26]">
            You&apos;ve Built a Successful Life. So Why Aren&apos;t You Getting the Right Marriage Proposals?
          </h2>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#0e2a6e]/[0.03] border border-[#0e2a6e]/15 rounded-2xl p-6 hover:border-[#0e2a6e]/35 transition-all duration-200 flex flex-col justify-start"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0e2a6e] flex items-center justify-center text-[#ffde59] mb-4 shadow-2xs">
                  <Icon className="w-5 h-5 text-[#ffde59]" />
                </div>
                <h3 className="text-lg font-bold text-[#0e2a6e] mb-3 font-display leading-snug">
                  {item.title}
                </h3>
                <ul className="space-y-2.5">
                  {item.bullets.map((bullet, bIndex) => (
                    <li
                      key={bIndex}
                      className="flex items-start gap-2.5 text-sm text-black/75 leading-relaxed"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#ffde59] border border-black/25 mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
