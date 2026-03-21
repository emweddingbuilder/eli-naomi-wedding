export interface Party {
  id: string;
  name: string;
  max_guests: number;
  invited_events: string[];
}

export interface Guest {
  id: string;
  party_id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  invited_at: string | null;
}

export interface GuestWithParty extends Guest {
  party: Party;
}

export interface RSVP {
  id: string;
  guest_id: string;
  attending: boolean;
  dietary_restrictions: string | null;
  song_request: string | null;
  message: string | null;
  submitted_at: string;
}

export interface RSVPSubmission {
  guestId: string;
  event: string;
  attending: boolean;
  dietaryRestrictions?: string;
  songRequest?: string;
  message?: string;
}
