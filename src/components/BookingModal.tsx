import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Lock,
  ArrowRight,
  ExternalLink,
  AlertTriangle,
  Check,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase
} from 'lucide-react';
import { BookingFormData } from '../types';
import { CALENDAR_BOOKING_URL, GOOGLE_SHEETS_WEBHOOK_URL, NOTIFICATION_EMAIL } from '../config';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    age: '',
    profession: '',
    biggestChallenge: '',
    lookingDuration: '',
    alreadyTried: [],
    readyToAct: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll when modal is open and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const challengeOptions = [
    'Getting rejections',
    'Not Getting Enough Quality Proposals',
    'Feeling stuck or Confused About Whom to Choose',
  ];

  const durationOptions = [
    'less than 1 year',
    '1-2 year',
    '2+ years',
  ];

  const triedOptions = [
    'Matrimonial apps',
    'Family/relatives',
    'Friends/network',
    'Matchmakers/marriage bureaus',
    'Other',
  ];

  const actionOptions = [
    "Yes, I'm ready",
    'I’m interested but need to understand more',
    'I’m just exploring (Don\'t book the call)',
  ];

  const toggleTriedOption = (option: string) => {
    const current = formData.alreadyTried;
    const next = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];
    setFormData({
      ...formData,
      alreadyTried: next,
    });
    if (errors.alreadyTried && next.length > 0) {
      setErrors((prev) => ({ ...prev, alreadyTried: '' }));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      errs.phone = 'Please provide your WhatsApp / phone number';
    }
    if (!formData.location.trim()) errs.location = 'Please enter your city';
    if (!formData.age.trim()) errs.age = 'Please enter your age';
    if (!formData.profession.trim()) errs.profession = 'Please enter your profession / business';
    if (!formData.biggestChallenge) errs.biggestChallenge = 'Please select your biggest challenge';
    if (!formData.lookingDuration) errs.lookingDuration = 'Please select how long you have been looking';
    if (formData.alreadyTried.length === 0) errs.alreadyTried = 'Please select at least one option';
    if (!formData.readyToAct) errs.readyToAct = 'Please select your readiness to take action';

    if (formData.readyToAct === "I’m just exploring (Don't book the call)") {
      errs.readyToAct = "Our Marriage Clarity Calls are reserved for serious individuals ready to take action. Please select 'Yes, I\'m ready' or 'I’m interested but need to understand more' to book your call.";
    }

    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const leadPayload = {
      submittedAt: new Date().toLocaleString(),
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      city: formData.location,
      age: formData.age,
      profession: formData.profession,
      biggestChallenge: formData.biggestChallenge,
      lookingDuration: formData.lookingDuration || '',
      alreadyTried: formData.alreadyTried.join(', '),
      readyToAct: formData.readyToAct || '',
    };

    // 1. Always store a local backup copy in browser localStorage (viewable in Admin Dashboard)
    try {
      const existingLeads = JSON.parse(localStorage.getItem('pg_leads') || '[]');
      existingLeads.unshift(leadPayload);
      localStorage.setItem('pg_leads', JSON.stringify(existingLeads.slice(0, 500)));
    } catch {
      // ignore storage errors
    }

    // 2. Send instant email notification to personagrow.in@gmail.com
    try {
      const emailEndpoint = `https://formsubmit.co/ajax/${encodeURIComponent(NOTIFICATION_EMAIL || 'personagrow.in@gmail.com')}`;
      fetch(emailEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Lead: ${leadPayload.fullName} (${leadPayload.city || 'India'})`,
          _replyto: leadPayload.email,
          _cc: "AjayKadam477@gmail.com",
          "Full Name": leadPayload.fullName,
          "Phone / WhatsApp": leadPayload.phone,
          "Email": leadPayload.email,
          "City": leadPayload.city,
          "Age": leadPayload.age,
          "Profession": leadPayload.profession,
          "Biggest Challenge": leadPayload.biggestChallenge,
          "Looking Duration": leadPayload.lookingDuration,
          "Already Tried": leadPayload.alreadyTried,
          "Ready to Take Action": leadPayload.readyToAct,
          "Submitted At": leadPayload.submittedAt,
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // ignore email transmission hiccups
    }

    // 3. If Google Sheets Webhook URL is configured, also post to Google Sheets
    if (GOOGLE_SHEETS_WEBHOOK_URL && GOOGLE_SHEETS_WEBHOOK_URL.trim().length > 0) {
      const targetWebhook = GOOGLE_SHEETS_WEBHOOK_URL.trim();
      const payloadString = JSON.stringify(leadPayload);

      try {
        fetch(targetWebhook, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: payloadString,
          keepalive: true,
        }).catch((err) => {
          console.warn('Google Sheets transmission error:', err);
        });
      } catch (err) {
        console.warn('Google Sheets network call failed:', err);
      }
    }

    const targetUrl = CALENDAR_BOOKING_URL || 'https://cal.com/persona-grow/mcc';

    // Open booking page in new tab immediately to prevent popup blocking on user gesture
    try {
      const opened = window.open(targetUrl, '_blank', 'noopener,noreferrer');
      if (!opened) {
        // In case popup was blocked by browser
        window.location.href = targetUrl;
      }
    } catch {
      window.location.href = targetUrl;
    }

    // Show confirmation & fallback state
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const targetCalendarUrl = CALENDAR_BOOKING_URL || 'https://cal.com/persona-grow/mcc';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffd43f] animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-wide uppercase text-slate-200">
              Book Your Marriage Clarity Call
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8">
          {submitted ? (
            /* Post-Submit Redirect Fallback Screen */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-300">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#ffd43f] block mb-1">
                Details Submitted Successfully
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#081120] font-display mb-2">
                Redirecting to Booking Calendar
              </h3>
              <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-6">
                Thank you, <strong>{formData.fullName}</strong>. Your details are saved. We are redirecting you to select your preferred meeting date and time.
              </p>

              <div className="max-w-md mx-auto space-y-3">
                <a
                  href={targetCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#ffd43f] hover:bg-[#f5c721] text-[#081120] border-amber-300 font-extrabold text-base py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-[0.99] cursor-pointer border "
                >
                  <Calendar className="w-5 h-5" />
                  <span>CLICK HERE TO OPEN BOOKING CALENDAR</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer font-semibold"
                >
                  Done • Close this window
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Form Intro Header */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-[#ffd43f] border border-amber-200 text-xs font-bold tracking-wider uppercase mb-2">
                  100% Free • Private &amp; Confidential
                </span>
                <h2 id="booking-modal-title" className="text-2xl sm:text-3xl font-extrabold text-[#081120] font-display leading-tight">
                  Marriage Clarity Call
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Please share a few details about your journey. Once submitted, you will be redirected to choose your date &amp; time.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Full name */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#ffd43f]" />
                    <span>Full name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ffd43f] focus:border-amber-400 transition-all ${
                      errors.fullName ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                    }`}
                  />
                  {errors.fullName && <p className="text-xs text-red-600 mt-1 font-medium">{errors.fullName}</p>}
                </div>

                {/* 2 & 3. Email Address & WhatsApp/phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#ffd43f]" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ffd43f] focus:border-amber-400 transition-all ${
                        errors.email ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1 font-medium">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#ffd43f]" />
                      <span>WhatsApp / Phone *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ffd43f] focus:border-amber-400 transition-all ${
                        errors.phone ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-red-600 mt-1 font-medium">{errors.phone}</p>}
                  </div>
                </div>

                {/* 4 & 5. City & Age */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#ffd43f]" />
                      <span>City *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Mumbai, Pune, Bengaluru"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ffd43f] focus:border-amber-400 transition-all ${
                        errors.location ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                      }`}
                    />
                    {errors.location && <p className="text-xs text-red-600 mt-1 font-medium">{errors.location}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                      Age *
                    </label>
                    <input
                      type="number"
                      required
                      min="21"
                      max="70"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="e.g. 31"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ffd43f] focus:border-amber-400 transition-all ${
                        errors.age ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                      }`}
                    />
                    {errors.age && <p className="text-xs text-red-600 mt-1 font-medium">{errors.age}</p>}
                  </div>
                </div>

                {/* 6. Profession/Business */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#ffd43f]" />
                    <span>Profession / Business *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    placeholder="e.g. Product Manager, Tech Lead, Doctor, Business Owner"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ffd43f] focus:border-amber-400 transition-all ${
                      errors.profession ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                    }`}
                  />
                  {errors.profession && <p className="text-xs text-red-600 mt-1 font-medium">{errors.profession}</p>}
                </div>

                {/* 7. What is your biggest challenge right now? */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                    What is your biggest challenge right now? *
                  </label>
                  <div className="space-y-2">
                    {challengeOptions.map((challenge) => {
                      const isSelected = formData.biggestChallenge === challenge;
                      return (
                        <label
                          key={challenge}
                          onClick={() => {
                            setFormData({ ...formData, biggestChallenge: challenge });
                            if (errors.biggestChallenge) setErrors((prev) => ({ ...prev, biggestChallenge: '' }));
                          }}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-amber-50/70 border-[#ffd43f] text-slate-900 font-semibold shadow-2xs'
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-[#ffd43f] bg-[#ffd43f]' : 'border-slate-400 bg-white'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                          <span className="text-xs sm:text-sm">{challenge}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.biggestChallenge && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{errors.biggestChallenge}</p>
                  )}
                </div>

                {/* 8. How long have you been looking for a life partner? */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                    How long have you been looking for a life partner? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {durationOptions.map((duration) => {
                      const isSelected = formData.lookingDuration === duration;
                      return (
                        <button
                          key={duration}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, lookingDuration: duration });
                            if (errors.lookingDuration) setErrors((prev) => ({ ...prev, lookingDuration: '' }));
                          }}
                          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm border transition-all text-center cursor-pointer ${
                            isSelected
                              ? 'bg-[#081120] text-white border-[#081120] font-bold shadow-2xs'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {duration}
                        </button>
                      );
                    })}
                  </div>
                  {errors.lookingDuration && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{errors.lookingDuration}</p>
                  )}
                </div>

                {/* 9. What have you tried so far? (multiselect) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs sm:text-sm font-bold text-slate-800">
                      What have you tried so far? *
                    </label>
                    <span className="text-[11px] text-slate-500 font-medium">Select all that apply</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {triedOptions.map((option) => {
                      const isChecked = formData.alreadyTried.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleTriedOption(option)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs sm:text-sm text-left transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-amber-50/70 border-[#ffd43f] text-slate-900 font-semibold'
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                              isChecked ? 'border-[#ffd43f] bg-[#ffd43f] text-white' : 'border-slate-400 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.alreadyTried && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{errors.alreadyTried}</p>
                  )}
                </div>

                {/* 10. If we identify a clear path forward, are you ready to take action? */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                    If we identify a clear path forward, are you ready to take action? *
                  </label>
                  <div className="space-y-2">
                    {actionOptions.map((action) => {
                      const isSelected = formData.readyToAct === action;
                      const isExploring = action.includes('exploring');
                      return (
                        <label
                          key={action}
                          onClick={() => {
                            setFormData({ ...formData, readyToAct: action });
                            if (errors.readyToAct) setErrors((prev) => ({ ...prev, readyToAct: '' }));
                          }}
                          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? isExploring
                                ? 'bg-amber-50 border-amber-400 text-amber-900 font-semibold'
                                : 'bg-amber-50/70 border-[#ffd43f] text-slate-900 font-semibold shadow-2xs'
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected
                                ? isExploring
                                  ? 'border-amber-600 bg-amber-500 text-white'
                                  : 'border-[#ffd43f] bg-[#ffd43f] text-white'
                                : 'border-slate-400 bg-white'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                          <span className="text-xs sm:text-sm leading-snug">{action}</span>
                        </label>
                      );
                    })}
                  </div>

                  {formData.readyToAct === "I’m just exploring (Don't book the call)" && (
                    <div className="mt-2.5 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Note:</strong> Our 1-on-1 Marriage Clarity Calls are held with high personal commitment and reserved for those actively ready to make progress. If you are just exploring, please consider our free resources.
                      </span>
                    </div>
                  )}

                  {errors.readyToAct && (
                    <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.readyToAct}</p>
                  )}
                </div>

                {/* Submit Button (CTA - Submit) */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 bg-[#ffd43f] hover:bg-[#f5c721] text-[#081120] border-amber-300 font-extrabold text-base py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer tracking-wider uppercase disabled:opacity-60 border "
                  >
                    {isSubmitting ? (
                      <span>Redirecting to Calendar...</span>
                    ) : (
                      <>
                        <span>Submit</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="mt-2 text-center text-xs sm:text-[13px] text-slate-600 font-medium">
                    Your call will be with one of our expert coaches.
                  </p>

                  <div className="mt-2.5 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                    <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Your details are 100% private and confidential</span>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
