import React, { useState } from 'react';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import { BOOKING_FORM_URL } from '../config';

interface FAQSectionProps {
  onBookCall?: () => void;
  formUrl?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onBookCall, formUrl = BOOKING_FORM_URL }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = () => {
    if (onBookCall) {
      onBookCall();
    } else if (formUrl) {
      window.open(formUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const faqs = [
    {
      q: "Is the Marriage Proposal Strategy Call truly free?",
      a: "Yes, completely free. There are no hidden fees, credit card requirements, or surprise charges. The 60-minute session is designed to diagnose where your partner search is stalling and give you actionable next steps.",
    },
    {
      q: "How is this different from a matrimonial app or traditional matchmaker?",
      a: "Matrimonial apps just dump endless unqualified profiles on you, leaving you to guess. Traditional matchmakers push biodatas without addressing compatibility. Marriage Matrix is a structured 1-on-1 personal mentorship that identifies your specific roadblocks, refines your positioning, and gives you a proven system to get consistent quality marriage proposals.",
    },
    {
      q: "Will my identity, family, or professional circle know about this?",
      a: "No. Your Marriage Proposal Strategy Call is 100% private, confidential, and held under strict professional discretion. We never share your details, biodata, or contact information with third parties.",
    },
    {
      q: "What happens after the 60-minute call?",
      a: "You will leave with a clear, personalised roadmap identifying your blind spots and what to fix to get marriage proposals. If you feel Marriage Matrix is the right fit to mentor you through the process, we'll explain how our mentorship works. There is never any pressure to enroll.",
    },
  ];

  return (
    <section id="faq-section" className="py-10 md:py-14 bg-white border-b border-[#0e2a6e]/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-md bg-[#ff006b] text-white text-xs font-bold uppercase tracking-wider mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#ffde59]" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0e2a6e] font-display leading-[1.25] mb-2.5">
            Frequently Asked <span className="text-[#ff006b]">Questions</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-black/70">
            Everything you need to know before booking your Marriage Proposal Strategy Call.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 mb-8 sm:mb-10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-xl overflow-hidden bg-[#0e2a6e]/[0.03] transition-colors ${
                  isOpen ? 'border-[#ff006b]/45' : 'border-[#0e2a6e]/15'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-5 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#0e2a6e]/[0.06] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-[#0e2a6e] font-display">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#ff006b]' : 'text-black/50'
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-3 text-sm sm:text-base text-black/80 leading-relaxed border-t border-[#ff006b]/20 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final Reassuring CTA */}
        <div className="text-center">
          <button
            onClick={handleClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#ff006b] hover:bg-[#ff006b]/90 text-white border border-black/10 text-sm sm:text-base font-black px-8 py-4 rounded-xl shadow-lg shadow-[#ff006b]/25 hover:shadow-xl transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
          >
            <span>Book Your Marriage Proposal Strategy Call</span>
            <ArrowRight className="w-4 h-4 text-[#ffde59] stroke-[2.75]" />
          </button>
          <p className="mt-2 text-center text-xs sm:text-sm text-black/70 font-medium">
            Your call will be with one of our expert coaches.
          </p>
          <p className="mt-1 text-xs sm:text-sm text-black/60 font-medium">
            Takes less than 60 seconds to book • <span className="text-[#ff006b] font-bold">100% Free &amp; Confidential</span>
          </p>
        </div>
      </div>
    </section>
  );
};
