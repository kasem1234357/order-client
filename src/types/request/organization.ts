export type OrganizationRequest = {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  role: string;
  name: string;
  telephone_number: string;
  vat_registration: number;
  trn_number: number;
  country: string;
  org_country: string;
  mobile_country: string;
  geo_location: string;
  lon: number;
  lat: number;
  address: string;
  website: string;
  commercial_license_url: string;
  trn_image_url: string;
  license_expiry_date: string;
};

export type CreateClubRequest = {
  name: string;
  phone_number: string;
  mobile_number: string;
  address: string;
  geo_location: string;
  lon: number;
  lat: number;
  logo: string;
  country_name: string;
  phone_country: string;
  about_club: string;
  working_hours?: {
    days: number[];
    hour_from: string;
    hour_to: string;
  }[];
  service_ids: string[];
  static_service_ids: string[];
  images: string;
};

export type EditClubRequest = {
  name: string;
  phone_number: string;
  mobile_number: string;
  address: string;
  geoLocation: string;
  active: boolean;
  lon: number;
  lat: number;
  logo_url: string;
  country_name: string;
  phone_country: string;
  about_club: string;
  working_hours?: {
    days: number[];
    hour_from: string;
    hour_to: string;
  }[];
  status: string;
  images: string;
  cancellation_policy_hours: number;
  book_ahead_limit_days: number;
  maximum_bookings_day: number;
  number_of_active_bookings: number;
  services: string[];
  static_services: string[];
};
