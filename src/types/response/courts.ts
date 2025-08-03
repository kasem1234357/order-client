export interface Court {
  id: number;
  name: string;
  date_added: string;
  court_type: string;
  privacy_options: string;
  working_type: string;
  court_size: string;
  is_active: string;
  description: string;
}
export interface CourtsQuery {
  club_id?: number;
  dateFrom?: string;
  dateTo?: string;
  courtType?: string;
  privacyOption?: string;
  description?: string;
  status?: string;
  search?: string;
  currentPage?: number;
  limit?: number;
}
export interface CourtsResponse {
  data: Court[];
  total: number;
  total_pages: number;
  message: string;
}

export interface CourtDetails {
  id: number;
  name: string;
  court_type: string;
  privacy_options: string;
  working_type: string;
  court_size: string;
  state: string;
  bio: string;
  working_hours: any[]; // You can replace `any` with a more specific type if needed
  attendance_ids: any[]; // You can replace `any` with a more specific type if needed
  photos: {
    id: number;
    image: string;
  }[];
}

export interface CourtDetailsResponse {
  data: CourtDetails;
  message: string;
}
