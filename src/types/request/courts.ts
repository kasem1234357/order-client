export type CourtRequest = {
  name: string;
  privacy_options: "private" | "public";
  court_type: "Indoor" | "Outdoor";
  court_size: "Normal" | "Double";
  description: string;
  status: "available" | "not_available";
  working_type: "full" | "custom";
  images: string[];
  working_hours: {
    days: number[];
    hour_from: string;
    hour_to: string;
  }[];
};

export type EditCourtRequest = {
  name: string;
  privacy_options: "private" | "public";
  court_type: "Indoor" | "Outdoor";
  court_size: "Normal" | "Double";
  bio: string;
  // status: "available" | "not_available";
  working_type: "full" | "custom";
  images: string[];
};
