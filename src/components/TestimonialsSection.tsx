import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialImages } from './testimonialImages';
import card1Image from '../assets/images/regenerated_image_1791282469747.png';
import card2Image from '../assets/images/regenerated_image_1791282683106.png';
import card3Image from '../assets/images/regenerated_image_1791282687598.png';
import card4Image from '../assets/images/regenerated_image_1791282998313.png';
import card5Image from '../assets/images/regenerated_image_1791283002093.png';
import card6Image from '../assets/images/regenerated_image_1791283006830.png';
import card7Image from '../assets/images/regenerated_image_1791283698014.png';
import card8Image from '../assets/images/regenerated_image_1791283701157.png';
import card9Image from '../assets/images/regenerated_image_1791283704093.png';
import card10Image from '../assets/images/regenerated_image_1791283906224.png';

export interface ClientResultCard {
  id: number;
  title: string;       // Format: Age | Name (e.g. "30 | Rahul")
  subtitle: string;    // Problem or Challenge title
  quote: string;
}

export const CLIENT_RESULTS: ClientResultCard[] = [
  {
    id: 1,
    title: "30 | Rahul",
    subtitle: "Not Getting Enough Quality Proposals",
    quote: "“I had a good career and family background, but somehow I wasn’t getting the right proposals. I was starting to wonder what I was missing. Marriage Matrix helped me understand what kind of partner would genuinely be compatible with me and how to approach the search better. It completely changed my experience.”",
  },
  {
    id: 2,
    title: "29 | Aarav",
    subtitle: "Confused About What I Wanted",
    quote: "“I was meeting people but never felt sure if they were right for me. I kept second-guessing every connection. Marriage Matrix helped me understand what I actually needed in a life partner. Today, I’m happily with someone who truly matches my values.”",
  },
  {
    id: 3,
    title: "31 | Ramesh",
    subtitle: "Too Many Rejections",
    quote: "“After several failed relationships, I started believing something was wrong with me. Marriage Matrix helped me understand my patterns and what I was looking for in a partner. I finally stopped chasing the wrong connections and found someone who feels right.”",
  },
  {
    id: 4,
    title: "30 | Karan",
    subtitle: "Family Expectations",
    quote: "“My biggest problem was balancing my family’s expectations with what I wanted in a partner. Marriage Matrix helped me get clarity about my priorities and communicate them confidently. It made my search much more intentional.”",
  },
  {
    id: 6,
    title: "32 | Rahul",
    subtitle: "Choosing Based on Attraction",
    quote: "“I used to focus mostly on attraction and chemistry, only to realize later that we were completely different people. Marriage Matrix helped me look beyond attraction and understand compatibility. That changed the way I approached my search.”",
  },
  {
    id: 7,
    title: "30 | Navin",
    subtitle: "Afraid of Making the Wrong Choice",
    quote: "“I was scared of committing to the wrong person. Every potential match came with doubts. Marriage Matrix gave me a clearer way to evaluate compatibility instead of letting fear make the decision for me.”",
  },
  {
    id: 8,
    title: "33 | Aditya",
    subtitle: "Coming Out of a Bad Relationship",
    quote: "“After a difficult relationship, I didn’t know what a healthy partnership should look like anymore. Marriage Matrix helped me recognize what I should look for—and what I should never compromise on. It gave me confidence to start again.”",
  },
  {
    id: 9,
    title: "31 | Vivek",
    subtitle: "Parents Were Choosing for Me",
    quote: "“My parents were actively searching for matches, but I felt like I had no voice in the process. Marriage Matrix helped me identify my own priorities and have an honest conversation with my family. I’m now with someone I chose with confidence.”",
  },
];

interface TestimonialsSectionProps {
  onBookCall?: () => void;
  formUrl?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 640;
      const cardWidth = scrollContainerRef.current.clientWidth / (isMobile ? 2 : 4);
      const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials-section" className="py-10 sm:py-16 md:py-20 bg-[#0e2a6e]/[0.03] border-b border-[#0e2a6e]/15">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0e2a6e] font-display tracking-tight">
            Client Results
          </h2>
        </div>

        {/* Slider Controls Bar */}
        <div className="flex justify-end items-center gap-2 mb-3 sm:mb-4 pr-1">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous results"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#0e2a6e]/25 bg-white hover:bg-[#ffde59] text-[#0e2a6e] hover:text-black flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next results"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#0e2a6e]/25 bg-white hover:bg-[#ffde59] text-[#0e2a6e] hover:text-black flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm active:scale-95"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Horizontal Slider Track: 2 in mobile view, 4 on desktop view */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-2.5 sm:gap-4 md:gap-5 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CLIENT_RESULTS.map((item) => (
            <div
              key={item.id}
              className="snap-start shrink-0 w-[calc(50%-5px)] sm:w-[calc(50%-8px)] md:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] bg-white rounded-xl sm:rounded-2xl border border-[#0e2a6e]/15 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden"
            >
              {/* Photo with clean curved top borders */}
              <div className="relative w-full h-44 sm:h-56 md:h-64 bg-black/5 overflow-hidden">
                <img
                  src={
                    item.id === 1
                      ? card1Image
                      : item.id === 2
                      ? card2Image
                      : item.id === 3
                      ? card3Image
                      : item.id === 4
                      ? card4Image
                      : item.id === 5
                      ? card5Image
                      : item.id === 6
                      ? card6Image
                      : item.id === 7
                      ? card7Image
                      : item.id === 8
                      ? card8Image
                      : item.id === 9
                      ? card9Image
                      : item.id === 10
                      ? card10Image
                      : testimonialImages[item.id]
                  }
                  alt={`${item.title} result`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Card Body */}
              <div className="p-2.5 sm:p-4 md:p-5 flex-1 flex flex-col">
                <h3 className="text-center font-bold text-xs sm:text-base md:text-lg text-[#0e2a6e] tracking-tight">
                  {item.title}
                </h3>

                {/* Subtitle / Challenge */}
                <p className="text-center text-[10px] sm:text-xs md:text-sm font-semibold text-black/60 mt-0.5 leading-tight">
                  {item.subtitle}
                </p>

                {/* Divider line */}
                <div className="w-full h-px bg-[#0e2a6e]/15 my-2 sm:my-3.5" />

                {/* Testimonial Quote text */}
                <p className="text-[11px] sm:text-xs md:text-[13px] text-black/80 leading-snug sm:leading-relaxed font-normal text-left flex-1">
                  {item.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
