import { OrganizationResponse } from "../../../../types/response/organization";
import { Api } from "../Api";

export const Endpoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    //==============Leagues===============//
    getAllLeagues: builder.query({
      query: ({
        currentPage = "",
        limit = "",
        search = "",
        players_gender = "",
        state = "",
        enrollment_end = "",
        date_from = "",
        date_to = "",
      }) =>
        `/event/league?sortby=create_date_desc&page=${currentPage}&limit=${limit}&name=${search}&players_gender=${players_gender}&state=${state}&enrollment_end=${enrollment_end}&date_from=${date_from}&date_to=${date_to}`,
      providesTags: ["leagues"],
    }),
    createLeague: builder.mutation({
      query: (data) => ({
        url: `/league`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leagues"],
    }),

    deleteLeague: builder.mutation({
      query: (id) => ({
        url: `/league/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: ["leagues"],
    }),

    getAllLeaguePlayers: builder.query({
      query: ({
        search = "",
        currentPage = "",
        limit = "",
        id = "",
        join_type = "",
        joining_date = "",
        teammate_name = "",
      }) =>
        `/league/players?player_name=${search}&page=${currentPage}&limit=${limit}&league_id=${id}&join_type=${join_type}&joining_date=${joining_date}&teammate_name=${teammate_name}`,
      providesTags: ["leagues", "players"],
    }),

    getAllLeagueWaitingPlayers: builder.query({
      query: ({ search = "", currentPage = "", limit = "", id = "" }) =>
        `/league/players/waiting?player_name=${search}&page=${currentPage}&limit=${limit}&league_id=${id}`,

      providesTags: ["leagues", "players"],
    }),

    getLeagueTeams: builder.query({
      query: (id) => `/league/teams?league_id=${id}`,
      providesTags: ["leagues", "players"],
    }),

    getLeaguePlayer: builder.query({
      query: (id) => `/league/players/${id}`,
      providesTags: ["leagues", "players"],
    }),

    addLeaguePlayer: builder.mutation({
      query: (data) => ({
        url: `/league/add/player`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["players"],
    }),

    deleteLeaguePlayer: builder.mutation({
      query: ({ id, player_id }) => ({
        url: `/league/${id}/remove/player/${player_id}`,
        method: "Delete",
      }),
      invalidatesTags: ["players"],
    }),

    createLeagueTeamUp: builder.mutation({
      query: ({ id, data }) => ({
        url: `/league/${id}/teamup/player`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["players"],
    }),

    getLeagueGroubMatches: builder.query({
      query: ({ id, stage = "rounds" }) =>
        `/league/match/group?league_id=${id}&stage=${stage}`,
      providesTags: ["league-groups"],
    }),

    addScoreToLeagueMatch: builder.mutation({
      query: (data) => ({
        url: `/league/match/score`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["league-groups"],
    }),
    getLeagueById: builder.query({
      query: (id) => ({ url: `/league/${id}`, method: "GET" }),
      providesTags: ["leagues"],
    }),
    editLeague: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/league/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["leagues"],
    }),
    getAllTeamsByLevelInLeague: builder.query({
      query: ({ league_id }) => ({
        url: `/league/teams?league_id=${league_id}`,
        method: "GET",
      }),
      providesTags: ["leagues", "players"],
    }),
    generateGroup: builder.mutation({
      query: (data) => ({
        url: `/league/group`,
        method: "POST",
        body: data,
      }),
    }),
    getGroups: builder.query({
      query: ({ league_id }) => ({
        url: `/league/group?league_id=${league_id}&page=1&limit=10`,
        method: "GET",
      }),
      providesTags: ["leagues", "players"],
    }),

    generateGroupMatches: builder.mutation({
      query: (data) => ({
        url: `/league/matches`,
        method: "POST",
        body: data,
      }),
    }),
    getAllSponsorForLeague: builder.query({
      query: ({ league_id }) => ({
        url: `/league/sponsor?league_id=[${league_id}]&page=1&limit=10`,
        method: "GET",
      }),
      providesTags: ["sponsors"],
    }),
    getAllPrizesForLeague: builder.query({
      query: ({ league_id }) => ({
        url: `/league/prize?league_id=[${league_id}]&page=1&limit=10`,
        method: "GET",
      }),
      providesTags: ["prizes"],
    }),
    getAvailableCourtsForLeague: builder.query({
      query: ({
        league_id = "",
        start_date = "",
        end_date = "",
        start_time = "",
        end_time = "",
        selected_days = "",
        max_number_of_players = "",
        court_ids = [],
        match_duration = "",
        available_courts = [],
        tournament_type = "League",
        club_id = "",
        pause_time = "",
        event_id = "",
        excluded_days = "",
        match_per_day = false,
      }: any) => ({
        url: `/league/available/courts?event_id=${event_id}&tournament_type=${tournament_type}&match_per_day=${match_per_day}&max_number_of_players=${max_number_of_players}&available_courts=${
          available_courts.length > 0 ? `[${available_courts}]` : ""
        }&start_date=${start_date}&end_date=${end_date}&start_time=${start_time}&end_time=${end_time}&selected_days=${
          selected_days.length > 0 ? `[${selected_days}]` : ""
        }&match_duration=${match_duration}&court_ids=${
          court_ids.length > 0 ? `[${court_ids}]` : ""
        }&club_id=${club_id}&excluded_days=${
          excluded_days.length > 0 ? `[${excluded_days}]` : ""
        }`,
        //&pause_time=${pause_time}
        method: "GET",
      }),
      providesTags: ["booking", "leagues"],
    }),
    editAvailableCourtsForLeague: builder.mutation({
      query: (data) => ({
        url: `/league/available/courts/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["booking", "leagues"],
    }),
    changeLeagueStage: builder.mutation({
      query: (data) => ({
        url: "/league/stage",
        method: "PATCH",
        body: data,
      }),
    }),
    //==============Tournaments===============//
    createTournament: builder.mutation({
      query: (data) => ({
        url: `/tournament`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tournaments"],
    }),

    getTournamentById: builder.query({
      query: (id) => `/tournament/${id}`,
      providesTags: ["tournaments"],
    }),
    editTournament: builder.mutation({
      query: ({ data, id }) => ({
        url: `/tournament/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["tournaments"],
    }),

    getAllTournaments: builder.query({
      query: ({
        currentPage = "",
        limit = "",
        search = "",
        players_gender = "",
        state = "",
        enrollment_end = "",
        tournament_type = "",
        date_from = "",
        date_to = "",
      }) =>
        `/event/tournament?page=${currentPage}&limit=${limit}&sortby=create_date_desc&name=${search}&players_gender=${players_gender}&state=${state}&enrollment_end=${enrollment_end}&tournament_type=${tournament_type}&date_from=${date_from}&date_to=${date_to}`,
      providesTags: ["tournaments"],
    }),

    deleteTournament: builder.mutation({
      query: (id) => ({
        url: `/tournament/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: ["tournaments"],
    }),

    getAllTournamentPlayers: builder.query({
      query: ({
        search = "",
        currentPage = "",
        limit = "",
        id = "",
        join_type = "",
        joining_date = "",
        teammate_name = "",
      }) =>
        `/tournament/players?player_name=${search}&page=${currentPage}&limit=${limit}&sortby=player_name desc&tournament_id=${id}&join_type=${join_type}&joining_date=${joining_date}&teammate_name=${teammate_name}`,
      providesTags: ["tournaments", "players"],
    }),

    getAllTournamentWaitingPlayers: builder.query({
      query: ({
        search = "",
        currentPage = "",
        limit = "",
        id = "",
        club_id = "",
      }) =>
        `/tournament/players/waiting?player_name=${search}&page=${currentPage}&limit=${limit}&tournament_id=${id}&club_id=${club_id}`,

      providesTags: ["tournaments", "players"],
    }),

    getTournamentPlayer: builder.query({
      query: (id) => `/tournament/players/${id}`,
      providesTags: ["tournaments", "players"],
    }),

    getTournamentTeams: builder.query({
      query: (id) => ({
        url: `/tournament/teams`,
        method: "GET",
        body: {
          tournament_id: id,
        },
      }),
      providesTags: ["tournaments", "players"],
    }),
    getTournamentGroups: builder.query({
      query: ({ league_id }) => ({
        url: `/league/group?league_id=${league_id}&page=1&limit=10`,
        method: "GET",
      }),
      providesTags: ["leagues", "players"],
    }),
    addTournamentPlayer: builder.mutation({
      query: (data) => ({
        url: `/tournament/add/player`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["players"],
    }),

    deleteTournamentPlayer: builder.mutation({
      query: ({ id, player_id }) => ({
        url: `/tournament/${id}/remove/player/${player_id}`,
        method: "Delete",
      }),
      invalidatesTags: ["players"],
    }),

    createTournamentTeamUp: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tournament/${id}/teamup/player`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["players"],
    }),

    getTournamentGroubMatches: builder.query({
      query: ({ id, stage = "rounds" }) =>
        `/tournament/match/group?tournament_id=${id}&stage=${stage}`,
      providesTags: ["tournaments", "players", "tournament-groups"],
    }),

    addScoreToTournamentMatch: builder.mutation({
      query: (data) => ({
        url: `/tournament/match/score`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tournament-groups"],
    }),
    getAllSponsorForTournament: builder.query({
      query: ({ tournament_id }) => ({
        url: `/tournament/sponsor?tournament_id=[${tournament_id}]&page=1&limit=10`,
        method: "GET",
      }),
      providesTags: ["sponsors"],
    }),
    getAllPrizesForTournament: builder.query({
      query: ({ tournament_id }) => ({
        url: `/tournament/prize?tournament_id=[${tournament_id}]&page=1&limit=10`,
        method: "GET",
      }),
      providesTags: ["prizes"],
    }),
    getAvailableCourtsForTournament: builder.query({
      query: ({
        league_id = "",
        start_date = "",
        end_date = "",
        start_time = "",
        end_time = "",
        selected_days = "",
        court_ids = [],
        match_duration = "",
        available_courts_ids = [],
        tournament_type = "",
        club_id = "",
        pause_time = "",
        excluded_days = "",
        event_id = "",
        court_type = "",
        max_number_of_players = "",
      }: any) => ({
        url: `/tournament/available/courts?court_type=${court_type}&event_id=${event_id}&max_number_of_players=${max_number_of_players}&available_courts=${
          available_courts_ids.length > 0 ? `` : ""
        }&start_date=${start_date}&end_date=${end_date}&start_time=${start_time}&end_time=${end_time}&selected_days=${
          selected_days.length > 0 ? `[${selected_days}]` : ""
        }&match_duration=${match_duration}&court_ids=${
          court_ids.length > 0 ? `[${court_ids}]` : "[]"
        }&club_id=${club_id}&pause_time=${pause_time}&excluded_days=${
          excluded_days.length > 0 ? `[${excluded_days}]` : ""
        }&tournament_type=${tournament_type}`,

        method: "GET",
      }),
      providesTags: ["booking", "tournaments"],
    }),

    editAvailableCourtsForTournament: builder.mutation({
      query: (data) => ({
        url: `/tournament/available/courts/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["booking", "tournaments"],
    }),

    generateGroupsForTournament: builder.mutation({
      query: (data) => ({
        url: `/tournament/group/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tournaments"],
    }),
    generateGroupMatchesForTournament: builder.mutation({
      query: (data) => ({
        url: `/tournament/matches`,
        method: "POST",
        body: data,
      }),
    }),
    swapTeams: builder.mutation({
      query: (data) => ({
        url: `/event/group/swap_teams`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "tournaments",
        "league-groups",
        "leagues",
        "tournament-groups",
      ],
    }),
    switchTeams: builder.mutation({
      query: (data) => ({
        url: `/event/group/swap_teams`,
        method: "POST",
        body: data,
      }),
    }),

    addPlayerPaymentMethod: builder.mutation({
      query: (data) => ({
        url: `/event/player/payment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["players"],
    }),

    getLeagueLeaderBoardTeams: builder.query({
      query: (id) => ({
        url: `/league/leaderboard_teams?league_id=${id}`,
        method: "GET",
      }),
    }),

    getTournamentLeaderBoardTeams: builder.query({
      query: (id) => ({
        url: `/tournament/leaderboard_teams?league_id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAvailableCourtsForLeagueQuery,
  useGetAvailableCourtsForTournamentQuery,
  useSwapTeamsMutation,
  useSwitchTeamsMutation,
  useGetLeagueLeaderBoardTeamsQuery,
  useGetTournamentLeaderBoardTeamsQuery,
  useGetGroupsQuery,
  useAddPlayerPaymentMethodMutation,
} = Endpoints;
