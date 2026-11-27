import React, { useState } from 'react';
import { Lock, ArrowRight, Check, AlertCircle, Sparkles } from 'lucide-react';
import { BookingFormData } from '../types';

interface BookingFormSectionProps {
  onSubmitSuccess: (data: BookingFormData) => void;
}

export const BookingFormSection: React.FC<BookingFormSectionProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    age: '',
    location: '',
    profession: '',
    currentSituation: '',
    biggestChallenge: '',
    alreadyTried: [],
    idealTimeline: '',
    notes: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ageOptions = ['28–30', '31–33', '34–36', '37–40', '40+'];

  const situationOptions = [
    'Never married — actively looking for marriage',
    'Never married — planning to start looking soon',
    'Other',
  ];

  const challengeOptions = [
    "I'm not getting enough quality proposals",
    "I'm getting proposals but not finding the right fit",
    "I'm struggling to attract quality matches",
    "I'm unsure how to evaluate compatibility",
    "I'm confused about whom to choose",
    "I've tried multiple approaches without success",
    "Other",
  ];

  const triedOptions = [
    'Matrimonial apps/websites',
    'Family/relatives',
    'Friends',
    'Matchmakers',
    'Marriage bureaus',
    'Social media',
    'Other',
  ];

  const timelineOptions = [
    'Within 3–6 months',
    'Within 6–12 months',
    'Within 1–2 years',
    'Not sure yet',
  ];

  const toggleTriedOption = (option: string) => {
    setFormData((prev) => {
      const exists = prev.alreadyTried.includes(option);
      if (exists) {
        return { ...prev, alreadyTried: prev.alreadyTried.filter((item) => item !== option) };
      } else {
        return { ...prev, alreadyTried: [...prev.alreadyTried, option] };
      }
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.location.trim()) errs.location = 'Please enter your city and country';
    if (!formData.profession.trim()) errs.profession = 'Please state your profession or business';
    if (!formData.email?.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email to receive call details';
    }
    if (!formData.phone?.trim()) {
      errs.phone = 'Please provide your contact / WhatsApp number for calendar confirmation';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to the first error
      const firstError = Object.keys(validationErrors)[0];
      const el = document.getElementById(`field-${firstError}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Smooth transition to calendar booking
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(formData);
    }, 450);
  };

  return (
    <section id="booking-form" className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Form Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Step 1 of 2: Confidential Qualification</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#081120] font-display mb-3">
            Ready to Get Clarity on Your Partner Search?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Answer a few quick questions and choose a convenient time for your Marriage Clarity Call.
          </p>
        </div>

        {/* The Card Container */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-9 shadow-sm">
          <form onSubmit={handleSubmit} noValidate className="space-y-7">
            {/* QUESTION 1: Full Name */}
            <div id="field-fullName">
              <label className="block text-sm font-bold text-[#081120] mb-1.5 font-display">
                QUESTION 1: What is your full name? <span className="text-[#ffd43f]">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                placeholder="e.g. Rahul Sharma"
                className={`w-full px-4 py-3 bg-white rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd43f]/30 transition-all ${
                  errors.fullName ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* QUESTION 2: Age */}
            <div>
              <label className="block text-sm font-bold text-[#081120] mb-1.5 font-display">
                QUESTION 2: What is your age? <span className="text-[#ffd43f]">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ffd43f]/30 transition-all appearance-none cursor-pointer"
                >
                  {ageOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt} years
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* QUESTION 3: Location */}
            <div id="field-location">
              <label className="block text-sm font-bold text-[#081120] mb-1.5 font-display">
                QUESTION 3: Where are you currently based? <span className="text-[#ffd43f]">*</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                  if (errors.location) setErrors({ ...errors, location: '' });
                }}
                placeholder="City / Country (e.g. Mumbai, India or Dubai, UAE)"
                className={`w-full px-4 py-3 bg-white rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd43f]/30 transition-all ${
                  errors.location ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.location && (
                <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.location}
                </p>
              )}
            </div>

            {/* QUESTION 4: Profession */}
            <div id="field-profession">
              <label className="block text-sm font-bold text-[#081120] mb-1.5 font-display">
                QUESTION 4: What do you do professionally? <span className="text-[#ffd43f]">*</span>
              </label>
              <input
                type="text"
                value={formData.profession}
                onChange={(e) => {
                  setFormData({ ...formData, profession: e.target.value });
                  if (errors.profession) setErrors({ ...errors, profession: '' });
                }}
                placeholder="Profession / Business"
                className={`w-full px-4 py-3 bg-white rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd43f]/30 transition-all ${
                  errors.profession ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.profession && (
                <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.profession}
                </p>
              )}
            </div>

            {/* Contact Details for Call Confirmation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div id="field-email">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address (for calendar invitation) <span className="text-[#ffd43f]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="rahul@example.com"
                  className={`w-full px-4 py-2.5 bg-white rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd43f]/30 ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
                )}
              </div>

              <div id="field-phone">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  WhatsApp / Phone (for reminder) <span className="text-[#ffd43f]">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="+91 98765 43210"
                  className={`w-full px-4 py-2.5 bg-white rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd43f]/30 ${
                    errors.phone ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* QUESTION 5: Current Situation (Qualification) */}
            <div>
              <label className="block text-sm font-bold text-[#081120] mb-2 font-display">
                QUESTION 5: What best describes your current situation? <span className="text-[#ffd43f]">*</span>
              </label>
              <div className="space-y-2.5">
                {situationOptions.map((sit) => {
                  const isChecked = formData.currentSituation === sit;
                  return (
                    <label
                      key={sit}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-white border-[#ffd43f] ring-1 ring-[#ffd43f] shadow-2xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="situation"
                        checked={isChecked}
                        onChange={() => setFormData({ ...formData, currentSituation: sit })}
                        className="w-4 h-4 text-[#ffd43f] focus:ring-[#ffd43f] accent-[#ffd43f]"
                      />
                      <span className="text-sm font-medium text-slate-800">{sit}</span>
                    </label>
                  );
                })}
              </div>
              {formData.currentSituation === 'Other' && (
                <div className="mt-2.5 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                  <strong>Audience Note:</strong> Marriage Matrix is dedicated specifically to never-married men. Our team will review your application to determine if our mentorship structure is suitable for your specific background.
                </div>
              )}
            </div>

            {/* QUESTION 6: Biggest Challenge */}
            <div>
              <label className="block text-sm font-bold text-[#081120] mb-2 font-display">
                QUESTION 6: What is your biggest challenge right now? <span className="text-[#ffd43f]">*</span>
              </label>
              <div className="space-y-2">
                {challengeOptions.map((ch) => {
                  const isChecked = formData.biggestChallenge === ch;
                  return (
                    <label
                      key={ch}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-white border-[#ffd43f] ring-1 ring-[#ffd43f] shadow-2xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="biggestChallenge"
                        checked={isChecked}
                        onChange={() => setFormData({ ...formData, biggestChallenge: ch })}
                        className="w-4 h-4 text-[#ffd43f] focus:ring-[#ffd43f] accent-[#ffd43f]"
                      />
                      <span className="text-sm font-medium text-slate-800">{ch}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* QUESTION 7: What have you already tried? (Multiple selection) */}
            <div>
              <label className="block text-sm font-bold text-[#081120] mb-1.5 font-display">
                QUESTION 7: What have you already tried? <span className="text-xs text-slate-500 font-normal">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {triedOptions.map((opt) => {
                  const isChecked = formData.alreadyTried.includes(opt);
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => toggleTriedOption(opt)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-sm transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-white border-[#ffd43f] text-[#081120] font-semibold ring-1 ring-[#ffd43f]'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? 'bg-[#ffd43f] border-amber-400 text-[#081120]' : 'border-slate-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs sm:text-sm">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* QUESTION 8: How soon would you ideally like to get married? */}
            <div>
              <label className="block text-sm font-bold text-[#081120] mb-2 font-display">
                QUESTION 8: How soon would you ideally like to get married? <span className="text-[#ffd43f]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {timelineOptions.map((tl) => {
                  const isChecked = formData.idealTimeline === tl;
                  return (
                    <label
                      key={tl}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-white border-[#ffd43f] ring-1 ring-[#ffd43f] shadow-2xs font-semibold'
                          : 'bg-white border-slate-200 hover:border-slate-300 font-medium'
                      }`}
                    >
                      <input
                        type="radio"
                        name="timeline"
                        checked={isChecked}
                        onChange={() => setFormData({ ...formData, idealTimeline: tl })}
                        className="w-4 h-4 text-[#ffd43f] focus:ring-[#ffd43f] accent-[#ffd43f]"
                      />
                      <span className="text-sm text-slate-800">{tl}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* QUESTION 9: Optional notes */}
            <div>
              <label className="block text-sm font-bold text-[#081120] mb-1.5 font-display">
                QUESTION 9: Is there anything you&apos;d like us to know before the call? <span className="text-xs text-slate-500 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Share any specific context about your partner search, past experiences, or preferences..."
                className="w-full px-4 py-3 bg-white rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd43f]/30 transition-all resize-none"
              />
            </div>

            {/* FINAL CTA */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                id="booking-form-submit-btn"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-3 bg-[#ffd43f] hover:bg-[#f5c721] text-[#081120] border border-amber-300 text-base sm:text-lg font-black px-8 py-4 sm:py-4.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer uppercase tracking-wide disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Loading Available Slots...</span>
                ) : (
                  <>
                    <span>BOOK YOUR MARRIAGE CLARITY CALL</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="mt-2 text-center text-xs sm:text-sm text-slate-600 font-medium">
                Your call will be with one of our expert coaches.
              </p>

              {/* Small text */}
              <p className="mt-2 text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Your information is private and confidential.</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
