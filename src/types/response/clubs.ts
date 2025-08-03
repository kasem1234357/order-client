// All clubs
export interface Club {
  id: number;
  name: string;
  phone_number: string | boolean; // Since phone_number can be a string or false
  active: boolean;
  address: string;
  create_date: string;
  plan: string;
}

export interface ClubsQuery {
  search: string;
  date_added_from?: string;
  date_added_to?: string;
  status?: string;
  limit?: number;
  currentPage?: number;
}

export interface ClubsResponse {
  data: Club[];
  total: number;
  total_pages: number;
  message: string;
}

// Club by id
interface Service {
  id: number;
  name: string;
  price: number;
  vat: number;
  description: string;
  image_url: string;
}
interface Court {
  id: number;
  name: string;
  court_type: string;
  privacy_options: string | boolean; // Can be a string or boolean
  photos: Photo[];
}

interface Photo {
  id: number;
  image: string;
}

interface WorkingHour {
  days: string;
  hour_from: string;
  hour_to: string;
}

interface CourtWorkingHours {
  court_name: string;
  working_hours: {
    dayofweek: string;
    hour_from: string;
    hour_to: string;
  }[];
}

export interface ClubDetails {
  id: number;
  name: string;
  country: {
    id: number;
    name: string;
  };
  mobile_code: number;
  phone_number: string;
  mobile_number: string;
  status: string;
  active: boolean;
  lon: number;
  lat: number;
  address: string;
  account_holder_name: string;
  bank_name: string;
  account_number: string;
  iban: string;
  swift_code: string;
  geo_location: string;
  favourite: boolean;
  about_club: string;
  organization_id: {
    id: number;
    name: string;
  };
  phone_country: boolean;
  country_name: string;
  services: Service[];
  working_hours: WorkingHour[];
  courts: Court[];
  coaches: any[]; // Adjust this if the structure is known
  logo_url: string;
  cover_url: string;
  book_ahead_limit_days: number;
  cancellation_policy_hours: number;
  maximum_bookings_day: number;
  number_of_active_bookings: number;
  photos: Photo[];
  court_working_hours: CourtWorkingHours[];
  static_services: { id: number; name: string; status: string }[];
}

export interface ClubDetailsResponse {
  data: ClubDetails;
  message: string;
}
