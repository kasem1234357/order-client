export type CreateLeagueRequest = {
  name: string;
  tournament_type?: "Knockouts" | "Round Robin";
  available_courts: number[];
  state: "Pending"; // should be in the system
  organizer_name: string; // char
  club_id: number; // should be in the system
  resource_calendar_id: 2; // should be in the system
  description: string;
  poster: string;
  sponsor_ids: [
    {
      name: string;
      logo: string;
    }
  ];
  prize_ids: [
    {
      name: string;
      //  "logo": string
    }
  ];
  min_number_of_players: number; // integer
  max_number_of_players: number; // integer
  min_players_level: number; // integer
  max_players_level: number; // integer
  price_per_player: number; // float
  players_gender: "Mixed" | "Male" | "Female"; // should be in the system
  join_type: "Both" | "Single" | "Double"; // should be in the system
  terms_and_conditions: string;
  waiting_list: true; // if Typed True or true or 1 means true anything else means false
  start_date: string;
  end_date: string;
  game_type: "competitive" | "friendly";
  registration_deadline_date: Date;
  excluded_days: Date[]; // should be list of dates exactly like this
  set_per_match: "1" | "3";
  court_ids: number[]; // should exists in the system  // should be added if tournament type is not King of courts other wise send court_ids
  court_type: "indoor" | "outdoor"; // for public events, options: (indoor, outdoor)
  // "courts_priority_ids": [ // should be added if tournament type is King of courts other wise send court_ids
  //     {
  //         "court_id": 4,
  //         "priority": 1
  //     },
  //     {
  //         "court_id": 17,
  //         "priority": 2
  //     }
  // ],
  selects_days: string[];
  start_time: string;
  end_time: string;
  available_courts_ids: number[];
  unwanted_courts: number[];
  match_duration: number; // float
};

export type AddPlayerRequest = {
  player_id: number;
  teammate_id?: number;
  email: string;
  phone: string;
  join_type: string;
  payment_method_id: number;
};
