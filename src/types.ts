export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string; // City
  age: string;
  profession: string;
  biggestChallenge: string;
  lookingDuration?: string;
  alreadyTried: string[];
  readyToAct?: string;
  gender?: string;
  notes?: string;
  currentSituation?: string;
  idealTimeline?: string;
  preferredTimeSlot?: string;
}

export interface SelectedSlot {
  date: string;
  formattedDate: string;
  time: string;
  timezone: string;
}


