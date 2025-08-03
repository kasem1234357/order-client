export type PackageRequest = {
  name: string;
  validity_from: string;
  validity_to: string;
  court_type: "Indoor" | "Outdoor";
  sessions: number | string;
  price: number | string;
  vat: number | string;
  status?: any;
};

export type CoachRequest = {
  name: string;
  email: string;
  birth_date: string;
  coach_gender: "Male" | "Female";
  player_gender: "Male" | "Female" | "Both";
  court_ids: number[];
  price_per_hour: number;
  bio: string;
  experience: number;
  nationality: string;
  is_active: string;
  working_type: "full" | "freelancer";
  working_hours: {
    days: number[];
    hour_from: string;
    hour_to: string;
  }[];
  packages: PackageRequest[];
  photo: string;
};

export type EditCoachRequest = {
  name: string;
  email: string;
  birth_date: string;
  player_gender: string;
  experience: number;
  assigned_courts: any;
  assigned_court: any;
  bio: string;
  nationality: string;
  photo: string;
};
