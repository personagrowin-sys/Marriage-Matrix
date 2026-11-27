import React from 'react';
import { Award, UserCheck, ShieldCheck, FileCheck } from 'lucide-react';

export const WhoWeAreSection: React.FC = () => {
  const highlights = [
    {
      icon: Award,
      title: "6-Week 1:1 Mentorship",
      desc: "Deeply focused personal engagement tailored to your career, family background, and partner preferences.",
    },
    {
      icon: UserCheck,
      title: "Personal Coaching & Consultation",
      desc: "One-on-one direct guidance with experienced mentors who understand modern Indian matchmaking nuances.",
    },
    {
      icon: ShieldCheck,
      title: "Private & Confidential",
      desc: "Your search, identity, and personal matters are held in strict confidence with zero public exposure.",
    },
    {
      icon: FileCheck,
      title: "NDA-Based Engagement",
      desc: "Structured, high-discretion framework specifically built for senior professionals and business founders.",
    },
  ];

  return (
    <section id="who-we-are-section" className="py-16 md:py-24 bg-[#0e2a6e] text-white border-b border-black/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-black bg-[#ffde59] px-2.5 py-0.5 rounded-sm inline-block mb-3">
            About The Mentorship
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-display mb-6">
            Who Is Marriage Matrix?
          </h2>
          <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto mb-4">
            Marriage Matrix is a personal mentoring system focused on helping people approach their search for the right life partner with greater clarity and structure.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#ffde59]"></span>
            <span>We&apos;ve helped 300+ people over the last 2 years through mindset and personal-branding based mentoring.</span>
          </div>
        </div>

        {/* Credibility / Featured In */}
        <div className="mb-14 p-6 rounded-2xl bg-white/10 border border-white/15 text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-4">
            Featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white font-display font-extrabold text-base sm:text-lg tracking-wide">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ffde59]"></span>
              <span>Karo Startup</span>
            </div>
            <span className="hidden sm:inline text-white/30 text-lg">|</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ffde59]"></span>
              <span>Dainik Bhaskar</span>
            </div>
            <span className="hidden sm:inline text-white/30 text-lg">|</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ffde59]"></span>
              <span>Entrepreneur India</span>
            </div>
          </div>
        </div>

        {/* Mentorship Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white text-black border border-white/20 rounded-2xl p-5 hover:bg-white/95 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0e2a6e] flex items-center justify-center text-[#ffde59] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0e2a6e] mb-2 font-display">
                  {item.title}
                </h3>
                <p className="text-xs text-black/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
