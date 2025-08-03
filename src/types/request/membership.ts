export interface MembershipRequest {
  name?: string;
  max_number_of_members?: number;
  membership_fee?: number;
  description?: string;
  start_date?: string;
  end_date?: string;
  state: boolean;
  trial: boolean;
  trial_duration?: number;
  auto_renew: boolean;
  booking_days_in_advance?: number;
  max_number_of_bookings_days?: number;
  max_number_of_bookings_month?: number;
  max_duration_of_bookings_minutes_month?: number;
  max_number_of_active_bookings?: number;
  Welcome_pack: boolean;
  Welcome_pack_desc?: string;
  number_of_duration?: number;
  number_of_duration_unit?: string;
  joining_fee?: number;
  billing_cycle?: number;
  billing_cycle_per?: string;
  availability_recurring: boolean;
  pausable: boolean;
  "disabled-enabled": string;
  max_number_of_pausable_days?: number;
  club_ids?: string[];
  court_ids?: string[];
  service_ids?: string[];
  application?: string;
  discount_type?: "percentage" | "value";
  discount?: number;
  terms?: string;
}

export interface CustomerRequest {
  first_name: string;
  last_name: string;
  email_address: string;
  mobile_number: string;
  country_name: string;
  nationality: string;
  birth_date: string;
  id:number,
  gender: string;
  photo?: string;
  password: string;
}
