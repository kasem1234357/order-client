export interface Coach {
  id: number;
  name: string;
  image_url: string;
  date_added: string;
  coach_gender: string;
  assigned_courts: string[];
  price_per_hour: number;
  availability: string[];
  status: string;
  is_active: boolean;
}

export interface CoachesQuery {
  club_id?: number;
  dateFrom?: string;
  dateTo?: string;
  coachGender?: string;
  status?: string;
  search?: string;
  assignedCorts?: string[];
  currentPage?: string;
  limit?: string | number;
  court_id?: string;
  is_active?: string;
}

export interface CoachesResponse {
  data: Coach[];
  total: number;
  total_pages: number;
  message: string;
}
