import React from 'react';
import { CheckCircle, Calendar, Clock, Video, Download, ArrowRight, ShieldCheck, Mail, Phone } from 'lucide-react';
import { BookingFormData, SelectedSlot } from '../types';

interface BookingConfirmationViewProps {
  formData: BookingFormData;
  slot: SelectedSlot;
  onReset: () => void;
}

export const BookingConfirmationView: React.FC<BookingConfirmationViewProps> = ({
  formData,
  slot,
  onReset,
}) => {
  const referenceId = `MM-${Math.floor(100000 + Math.random() * 900000)}`;

  // Generate Google Calendar Link
  const gcalTitle = encodeURIComponent('Marriage Clarity Call | Marriage Matrix');
  const gcalDetails = encodeURIComponent(
    `Private 60 minute Marriage Clarity Call with Marriage Matrix mentor.\n\nParticipant: ${formData.fullName}\nAge bracket: ${formData.age}\nLocation: ${formData.location}\nObjective: More Quality Opportunities. Better Compatibility. Greater Clarity.\n\nPrivate • Confidential • Personalised`
  );
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gcalTitle}&details=${gcalDetails}`;

  // Generate iCal ICS download
  const downloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Marriage Matrix//Marriage Clarity Call//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Marriage Clarity Call - Marriage Matrix`,
      `DESCRIPTION:Private 1:1 Marriage Clarity Call for ${formData.fullName}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'marriage-matrix-clarity-call.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="booking-confirmation-view" className="py-12 md:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm text-center">
          {/* Check Icon */}
          <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-9 h-9 stroke-[2.5]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
            Booking Confirmed • Reference #{referenceId}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#081120] font-display mb-3">
            Your Marriage Clarity Call Is Scheduled
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-8">
            Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. We have reserved your private 60 minute consultation.
          </p>

          {/* Reserved Details Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 text-left max-w-lg mx-auto">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#ffd43f] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase font-bold text-slate-500 block">Date</span>
                  <span className="text-sm font-bold text-slate-900">{slot.formattedDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#ffd43f] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase font-bold text-slate-500 block">Time &amp; Timezone</span>
                  <span className="text-sm font-bold text-slate-900">{slot.time} • {slot.timezone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Video className="w-5 h-5 text-[#ffd43f] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase font-bold text-slate-500 block">Format</span>
                  <span className="text-sm font-bold text-slate-900">Private 1:1 Video/Audio Call (Link sent via Email)</span>
                </div>
              </div>

              {formData.email && (
                <div className="flex items-start gap-3 pt-2 border-t border-slate-200/80">
                  <Mail className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-600">Confirmation invite sent to: <strong>{formData.email}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Calendar Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href={gcalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#ffd43f]" />
              <span>Add to Google Calendar</span>
            </a>

            <button
              onClick={downloadICS}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Download iCal (.ics)</span>
            </button>
          </div>

          {/* Preparation Checklist */}
          <div className="border-t border-slate-200 pt-8 text-left max-w-xl mx-auto mb-8">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#081120] mb-3 font-display">
              How to Prepare for the Call:
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd43f] shrink-0 mt-2"></span>
                <span>Ensure you are in a quiet, private space with strong internet connection.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd43f] shrink-0 mt-2"></span>
                <span>Keep handy any current matrimonial biodata or profile links you have been using.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd43f] shrink-0 mt-2"></span>
                <span>Be open about what has and hasn&apos;t worked—this conversation is completely confidential.</span>
              </li>
            </ul>
          </div>

          {/* Return button */}
          <button
            onClick={onReset}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline transition-colors cursor-pointer"
          >
            Return to Landing Page
          </button>
        </div>
      </div>
    </div>
  );
};
