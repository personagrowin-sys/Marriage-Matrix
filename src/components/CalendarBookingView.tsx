import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle, Video, Globe, ArrowLeft, Download, ShieldCheck } from 'lucide-react';
import { BookingFormData, SelectedSlot } from '../types';

interface CalendarBookingViewProps {
  formData: BookingFormData;
  onBackToForm: () => void;
  onBookingCompleted: (slot: SelectedSlot) => void;
}

export const CalendarBookingView: React.FC<CalendarBookingViewProps> = ({
  formData,
  onBackToForm,
  onBookingCompleted,
}) => {
  // Generate next 14 available days
  const today = new Date();
  const availableDays = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1); // Starting tomorrow for qualified clarity call
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
      dayNumber: d.getDate(),
      formatted: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
    };
  });

  const [selectedDay, setSelectedDay] = useState(availableDays[0]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('IST (India Standard Time - GMT+5:30)');
  const [isConfirming, setIsConfirming] = useState(false);

  const timeSlots = {
    Morning: ['10:00 AM', '11:00 AM', '11:30 AM'],
    Afternoon: ['02:00 PM', '03:00 PM', '04:30 PM', '05:30 PM'],
    Evening: ['06:30 PM', '07:30 PM', '08:30 PM', '09:00 PM'],
  };

  const timezones = [
    'IST (India Standard Time - GMT+5:30)',
    'GST (Gulf Standard Time - Dubai - GMT+4)',
    'SGT (Singapore Standard Time - GMT+8)',
    'BST (British Summer Time - London - GMT+1)',
    'EST (Eastern Standard Time - New York - GMT-4)',
  ];

  const handleSelectSlot = (time: string) => {
    setSelectedTime(time);
  };

  const handleFinalConfirm = () => {
    if (!selectedTime) return;
    setIsConfirming(true);
    setTimeout(() => {
      onBookingCompleted({
        date: selectedDay.iso,
        formattedDate: selectedDay.formatted,
        time: selectedTime,
        timezone: selectedTimezone,
      });
    }, 400);
  };

  return (
    <div id="calendar-booking-view" className="py-12 md:py-20 bg-[#0e2a6e]/[0.04] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Top Back Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBackToForm}
            className="inline-flex items-center gap-2 text-sm font-semibold text-black/70 hover:text-[#0e2a6e] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Edit Information</span>
          </button>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0e2a6e] bg-[#ffde59] px-3 py-1.5 rounded-full border border-black/15">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Qualification Verified</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-[#0e2a6e]/15 rounded-2xl shadow-sm overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#0e2a6e] p-6 sm:p-8 text-white">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-[#ffde59] font-bold block mb-2">
                Step 2 of 2: Select Date &amp; Time
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-display text-white mb-2">
                Choose Your Preferred Slot for the Marriage Proposal Strategy Call
              </h1>
              <p className="text-sm text-white/80">
                Hi <strong className="text-white">{formData.fullName || 'there'}</strong>, our mentor will connect with you for a private 60 minute structured conversation.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Timezone Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-[#0e2a6e]/15">
              <div className="flex items-center gap-2 text-sm text-black/75 font-medium">
                <Globe className="w-4 h-4 text-[#0e2a6e]" />
                <span>Timezone:</span>
              </div>
              <select
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="px-3 py-1.5 bg-[#0e2a6e]/[0.03] border border-[#0e2a6e]/25 rounded-lg text-xs sm:text-sm text-black font-medium focus:outline-none focus:ring-2 focus:ring-[#ffde59]"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection Bar */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-[#0e2a6e] mb-3 font-display flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#0e2a6e]" />
                <span>1. Select Date</span>
              </label>

              <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-thin">
                {availableDays.map((day) => {
                  const isSelected = selectedDay.iso === day.iso;
                  return (
                    <button
                      key={day.iso}
                      type="button"
                      onClick={() => {
                        setSelectedDay(day);
                        setSelectedTime(''); // reset time on day change
                      }}
                      className={`shrink-0 flex flex-col items-center justify-center w-18 sm:w-20 py-3 px-2 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0e2a6e] text-white border-[#0e2a6e] shadow-md scale-105'
                          : 'bg-white text-black border-[#0e2a6e]/15 hover:border-[#0e2a6e]/35 hover:bg-[#0e2a6e]/[0.03]'
                      }`}
                    >
                      <span className={`text-xs font-semibold ${isSelected ? 'text-white/75' : 'text-black/60'}`}>
                        {day.dayName}
                      </span>
                      <span className="text-xl font-extrabold font-display my-0.5">
                        {day.dayNumber}
                      </span>
                      <span className={`text-[11px] font-medium ${isSelected ? 'text-[#ffde59]' : 'text-black/60'}`}>
                        {day.monthName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-[#0e2a6e] mb-3 font-display flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0e2a6e]" />
                <span>2. Select Time ({selectedDay.formatted})</span>
              </label>

              <div className="space-y-4">
                {Object.entries(timeSlots).map(([category, slots]) => (
                  <div key={category} className="bg-[#0e2a6e]/[0.03] border border-[#0e2a6e]/15 rounded-xl p-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-black/60 block mb-2.5">
                      {category} Slots
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {slots.map((slot) => {
                        const isChosen = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => handleSelectSlot(slot)}
                            className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold border transition-all cursor-pointer text-center ${
                              isChosen
                                ? 'bg-[#ffde59] text-black border-black/20 shadow-sm'
                                : 'bg-white text-black border-[#0e2a6e]/15 hover:border-[#0e2a6e]/35 hover:bg-[#0e2a6e]/[0.04]'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selection Summary & Confirm Action */}
            <div className="p-5 bg-[#0e2a6e] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-white/70 font-semibold block">
                  Chosen Consultation
                </span>
                <div className="text-base sm:text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                  <span>{selectedDay.formatted}</span>
                  {selectedTime ? (
                    <span className="text-[#ffde59]">• {selectedTime}</span>
                  ) : (
                    <span className="text-[#ffde59] text-sm font-normal">(Please pick a time above)</span>
                  )}
                </div>
                <span className="text-xs text-white/70 block mt-0.5">
                  Location: Private Google Meet / Audio Call
                </span>
              </div>

              <button
                type="button"
                onClick={handleFinalConfirm}
                disabled={!selectedTime || isConfirming}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#ffde59] hover:bg-[#ffde59]/90 text-black border border-black/15 font-black text-sm uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
              >
                {isConfirming ? 'Securing Slot...' : 'CONFIRM CALL APPOINTMENT →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
