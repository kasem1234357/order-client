// @ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { subscribe } from "diagnostics_channel";
import { get } from "http";
import { Edit } from "lucide-react";
import { log } from "util";
import { academyEndPoints } from "./sections/Academy";
import { chatAndNotificationEndPoints } from "./sections/ChatAndNotification";
import { OrganizationResponse } from "../../../types/response/organization";
import { CountriesResponse } from "../../../types/response/countries";
import { baseURL } from "../../../Api/apis";

export const Api = createApi({
  reducerPath: "Api",
  refetchOnMountOrArgChange: true,

  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization",token );
      }

      return headers;
    },

   credentials: "include",
  }),

  //
  tagTypes: [
    "Courts",
    "homeView",
    "pricing",
    "organization",
    "clubs",
    "Club",
    "Coach",
    "booking-all",
    "services",
    "players",
    "memberships",
    "paymentMethods",
    "profile",
    "booking",
    "category",
    "prizes",
    "leagues",
    "sponsors",
    "tournaments",
    "league-groups",
    "tournament-groups",
    "events",
    "event-groups",
    "academy",
    "chats",
    "notifications",
    "report",
    "single-booking",
    "orders",
    "material"
  ],
  endpoints: (builder) => ({
    createOrder:builder.mutation({
       query: ({data,materialId}) => ({
        url: `/api/orders?materialId=${materialId}`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags:['orders']
    }),
    editOrder:builder.mutation({
       query: ({id,data}) => ({
        url: `/api/orders/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags:['orders']
    }),
    getAllStorage:builder.query({
      query: () =>
        `/api/storage`,
      providesTags:['storage']
      
    }),
    addStorage:builder.mutation({
       query: ({data}) => ({
        url: `/api/storage`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags:['storage']
    }),
     addMaterial:builder.mutation({
       query: ({data}) => ({
        url: `/api/material`,
        method: "POST",
        body: {data},
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags:['material']
    }),
    getAllMaterial:builder.query({
      query: ({width='',length='',gramage='',materialResourceType='', materialType='',storage='' }) =>
        `/api/material?width=${''}&length=${''}&gramage=${''}&materialResourceType=${materialResourceType}&materialType=${materialType}&storage=${storage}`,
      providesTags:['material']
      
    }),
     getAllMaterialSize:builder.query({
      query: ({material='gramage',width='',length='',gramage=''}) =>
        `/api/material/materialType?material=${material}&width=${width}&length=${length}&gramage=${gramage}`,
      providesTags:['material']
      
    }),
    getAllClient:builder.query({
      query: () =>
        `/api/client`,
      providesTags:['client']
      
    }),
    addClient:builder.mutation({
       query: ({data}) => ({
        url: `/api/client`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags:['client']
    }),
    updateOrderStage:builder.mutation({
       query: ({id,stage,weight,date,finalWeight,numberOfBoxes,returnedWeight}) => ({
        url: `/api/orders/stage/change/${id}`,
        method: "PUT",
        body: {stageName:stage,weight,date,finalWeight,numberOfBoxes,returnedWeight},
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags:['orders']
    }),
    approveOrderStage:builder.mutation({
       query: ({id,stage,weight,date,finalWeight,numberOfBoxes}) => ({
        url: `/api/orders/stage/${id}`,
        method: "PUT",
        body: {stageName:stage,weight,date,finalWeight,numberOfBoxes},
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags:['orders']
    }),
    cancelOrder:builder.mutation({
       query: ({id,stage}) => ({
        url: `/api/orders/${id}`,
        method: "DELETE",
        body: {},
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags:['orders']
    }),
    getOrderById: builder.query({
      query: ({id}) =>
        `/api/orders/${id}`,
      providesTags:['orders']
      
    }), 
    getAllOrders: builder.query({
      query: ({currentPage,limit,stage='',price='',createdAt='',invoiceDate='',deliveryDate='',clientName='',createdBy='',orderNumber=''}) =>
        `/api/orders?limit=${limit}&page=${currentPage}&stage.name=${stage}&price=${price}&createdAt=${createdAt}&invoiceDate=${invoiceDate}&deliveryDate=${deliveryDate}&clientName=${clientName}&createdBy=${createdBy}&orderNumber=${orderNumber}`,
      providesTags:['orders']

      
    }),
    getOrderHistory: builder.query({
      query: ({id}) =>
        `/api/orders/history/${id}`,
      providesTags:['orders']
      
    }), 
     getAllUsers: builder.query({
      query: ({currentPage,limit,stage='',price='',createdAt='',invoiceDate='',deliveryDate='',clientName='',createdBy='',orderNumber=''}) =>
        `/api/user/AllUsers`,
      
    }),
    getHomeScreenBookingsWeekly: builder.query({
      query: (query) =>
        `/home/booking?club_id=${query.clubId}&view_type=${query.view}_view&date=${query.date}&court_id=${query.courtId}`,
      providesTags: ["booking"],
    }),

    allUsersInClub: builder.query({
      query: ({
        clubId,
        name = "",
        date_added_from = "",
        date_added_to = "",
        gender = "",
        email = "",
        limit = 10,
        currentPage = 1,
        role = "",
        status = "",
      }) =>
        `club/${clubId}/users?page=${currentPage}&limit=${limit}&name=${name}&date_added_from=${date_added_from}&date_added_to=${date_added_to}&gender=${gender}&email=${email}&role=${role}&status=${status}`,

      providesTags: ["Club"],
    }),
    activateUser: builder.mutation({
      query: ({ status, id }) => ({
        url: `/club/status/user/${id}`,
        method: "POST",
        body: { status },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Club"],
    }),
    editUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `/club/user/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Club"],
    }),
    getRolesForClub: builder.query({
      query: ({ club_id }) => `/club/roles/names?name&club_id=${club_id}`,
      providesTags: ["Club"],
    }),
    createInviteCode:builder.mutation({
       query: ({ roleId,code }) => ({
        url: `/api/roles/code`,
        method: "POST",
        body: {
          roleId,
          code
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Club"],
    }),
    getAllClubRoles: builder.query({
      query: ({
        clubId,
        name = "",
        date_added_from = "",
        date_added_to = "",
        status = "",
        limit = 20,
        currentPage = 1,
      }) =>
        `/api/roles`,
      providesTags: ["Club"],
    }),
     getAllRolesNames: builder.query({
      query: ({
        
        limit = 20,
        currentPage = 1,
      }) =>
        `/api/roles/names`,
      providesTags: ["Club"],
    }),
    getRoleById: builder.query({
      query: ({id}) => `/api/roles/${id}`,
      providesTags: ["Club"],
    }),
    createRole: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/roles`,
        method: "POST",
        body: data,
        headers: {
          //"Content-type": "application/json; charset=UTF-8,
        },
      }),
      invalidatesTags: ["Club"],
    }),
    editRole: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/roles/${id}`,
        method: "Put",
        body: data,
        headers: {
          //"Content-type": "application/json; charset=UTF-8,
        },
      }),
      invalidatesTags: ["Club"],
    }),
    activationRole: builder.mutation({
      query: ({ status, id }) => ({
        url: `/club/status/role/${id}`,
        method: "POST",
        body: { status },
        headers: {
          //"Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Club"],
    }),
    createUserForClub: builder.mutation({
      query: ({ data, id }) => ({
        url: `/club/${id}/user`,
        method: "POST",
        body: data,
        headers: {
          //"Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Club"],
    }),

    getUserById: builder.query({
      query: (id) => `/club/user/${id}`,
    }),

    getAllCountries: builder.query<CountriesResponse, string>({
      query: (club_id) => "/countries",
    }),

    //==============SERVICES===============//

    //==============Leagues===============//
    getAllLeagues: builder.query({
      query: ({
        currentPage = 1,
        limit = "",
        search = "",
        players_gender = "",
        club_id = "",
        state = "",
        enrollment_end = "",
        date_from = "",
        date_to = "",
      }) =>
        `/event/league?sortby=create_date_desc&page=${currentPage}&limit=${limit}&name=${search}&players_gender=${players_gender}&state=${state}&enrollment_end=${enrollment_end}&club_id=${club_id}&date_from=${date_from}&date_to=${date_to}`,
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
        club_id = "",
        teammate_name = "",
      }) =>
        `/league/players?player_name=${search}&page=${currentPage}&limit=${limit}&league_id=${id}&join_type=${join_type}&joining_date=${joining_date}&teammate_name=${teammate_name}&club_id=${club_id}`,
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
      providesTags: ["League"],
    }),
    editLeague: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/league/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["League"],
    }),
    getAllTeamsByLevelInLeague: builder.query({
      query: ({ league_id }) => ({
        url: `/league/teams?league_id=${league_id}`,
        method: "GET",
      }),
      providesTags: ["League", "players"],
    }),
    generateGroup: builder.mutation({
      query: (data) => ({
        url: `/league/group`,
        method: "POST",
        body: data,
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
    // getAvailableCourtsForLeague: builder.query({
    //   query: ({
    //     league_id = "",
    //     start_date = "",
    //     end_date = "",
    //     start_time = "",
    //     end_time = "",
    //     selected_days = "",
    //     court_ids = [],
    //     match_duration = "",
    //     available_courts = [],
    //     club_id = "",
    //     pause_time = "",
    //     excluded_days = "",
    //   }: any) => ({
    //     url: `/league/available/courts?available_courts=${
    //       available_courts.length > 0 ? `[${available_courts}]` : ""
    //     }&start_date=${start_date}&end_date=${end_date}&start_time=${start_time}&end_time=${end_time}&selected_days=${
    //       selected_days.length > 0 ? `[${selected_days}]` : ""
    //     }&match_duration=${match_duration}&court_ids=${
    //       court_ids.length > 0 ? `[${court_ids}]` : ""
    //     }&club_id=${club_id}&pause_time=${pause_time}&excluded_days=${
    //       excluded_days.length > 0 ? `[${excluded_days}]` : ""
    //     }`,
    //     method: "GET",
    //   }),
    //   providesTags: ["booking", "leagues"],
    // }),
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
        currentPage = 1,
        limit = "",
        search = "",
        players_gender = "",
        club_id = "",
        state = "",
        enrollment_end = "",
        tournament_type = "",
        date_from = "",
        date_to = "",
      }) =>
        `/event/tournament?page=${currentPage}&limit=${limit}&sortby=create_date_desc&name=${search}&players_gender=${players_gender}&state=${state}&enrollment_end=${enrollment_end}&tournament_type=${tournament_type}&club_id=${club_id}&date_from=${date_from}&date_to=${date_to}`,
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
        club_id = "",
        teammate_name = "",
      }) =>
        `/tournament/players?player_name=${search}&page=${currentPage}&limit=${limit}&sortby=player_name desc&tournament_id=${id}&join_type=${join_type}&joining_date=${joining_date}&teammate_name=${teammate_name}&club_id=${club_id}`,
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
    // getAvailableCourtsForTournament: builder.query({
    //   query: ({
    //     league_id = "",
    //     start_date = "",
    //     end_date = "",
    //     start_time = "",
    //     end_time = "",
    //     selected_days = "",
    //     court_ids = [],
    //     match_duration = "",
    //     available_courts_ids = [],
    //     tournament_type = "",
    //     club_id = "",
    //     pause_time = "",
    //     excluded_days = "",
    //   }: any) => ({
    //     url: `/tournament/available/courts?available_courts=${
    //       available_courts_ids.length > 0 ? `[${available_courts_ids}]` : ""
    //     }&start_date=${start_date}&end_date=${end_date}&start_time=${start_time}&end_time=${end_time}&selected_days=${
    //       selected_days.length > 0 ? `[${selected_days}]` : ""
    //     }&match_duration=${match_duration}&court_ids=${
    //       court_ids.length > 0 ? `[${court_ids}]` : "[]"
    //     }&club_id=${club_id}&pause_time=${pause_time}&excluded_days=${
    //       excluded_days.length > 0 ? `[${excluded_days}]` : ""
    //     }&tournament_type=${tournament_type}`,

    //     method: "GET",
    //   }),
    //   providesTags: ["booking", "tournaments"],
    // }),

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

    //==============EVENTS==================
    getAllEvents: builder.query({
      query: ({
        currentPage = 1,
        limit = "",
        club_id = "",
        search = "",
        players_gender = "",
        state = "",
        enrollment_end = "",
        tournament_type = `["Americano", "Mexicano", "King of the Courts"]`,
        event_type = "",
        date_from = "",
        date_to = "",
      }) =>
        `/event/tournament?page=${currentPage}&limit=${limit}&club_id=${club_id}&name=${search}&players_gender=${players_gender}&state=${state}&enrollment_end=${enrollment_end}&event_type=${event_type}&tournament_type=${tournament_type}&&date_from=${date_from}&date_to=${date_to}&sortby=create_date_desc`,
      providesTags: ["events"],
    }),

    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/tournament/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: ["events"],
    }),

    getAllEventPlayers: builder.query({
      query: ({
        search = "",
        currentPage = "",
        limit = "",
        id = "",
        join_type = "",
        joining_date = "",
        teammate_name = "",
        club_id = "",
      }) =>
        `/tournament/players?player_name=${search}&page=${currentPage}&limit=${limit}&sortby=player_name desc&tournament_id=${id}&join_type=${join_type}&joining_date=${joining_date}&teammate_name=${teammate_name}&club_id=${club_id}`,
      providesTags: ["events", "players"],
    }),

    getAllEventWaitingPlayers: builder.query({
      query: ({
        search = "",
        currentPage = "",
        limit = "",
        id = "",
        club_id = "",
      }) =>
        `/tournament/players/waiting?player_name=${search}&page=${currentPage}&limit=${limit}&tournament_id=${id}&club_id=${club_id}`,

      providesTags: ["events", "players"],
    }),

    getEventTeams: builder.query({
      query: (id) => ({
        url: `/tournament/teams`,
        method: "GET",
        body: {
          tournament_id: id,
        },
      }),
      providesTags: ["events", "players"],
    }),

    createEventTeamUp: builder.mutation({
      query: ({ id, data }) => ({
        url: `/league/${id}/teamup/player`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["players"],
    }),

    deleteEventPlayer: builder.mutation({
      query: ({ id, player_id }) => ({
        url: `/league/${id}/remove/player/${player_id}`,
        method: "Delete",
      }),
      invalidatesTags: ["players"],
    }),

    getEventPlayer: builder.query({
      query: (id) => `/tournament/players/${id}`,
      providesTags: ["events", "players"],
    }),

    addEventPlayer: builder.mutation({
      query: (data) => ({
        url: `/league/add/player`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["players"],
    }),

    addScoreToEventMatch: builder.mutation({
      query: (data) => ({
        url: `/league/match/score`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["event-groups"],
    }),
    createEvent: builder.mutation({
      query: (data) => ({
        url: `/tournament`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["events"],
    }),
    getEventById: builder.query({
      query: (id) => `/tournament/${id}`,
      providesTags: ["events"],
    }),
    editEvent: builder.mutation({
      query: ({ data, id }) => ({
        url: `/tournament/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["events"],
    }),

    getEventGroupMatches: builder.query({
      query: ({ id, stage = "rounds" }) =>
        `/league/match/group?league_id=${id}&stage=${stage}`,
      providesTags: ["event-groups"],
    }),

    getAllPlayersScore: builder.query({
      query: (id) => `/league/teams?league_id=${id}`,
      providesTags: ["event-groups"],
    }),

    getEventLeaderBoardTeams: builder.query({
      query: (id) => ({
        url: `/events/leaderboard_teams?league_id=${id}`,
        method: "GET",
      }),
    }),

    getEventLeaderBoard: builder.query({
      query: (id) => ({
        url: `/league/leaderboard_teams?league_id=${id}`,
        method: "GET",
      }),
    }),

    generateEventMatches: builder.mutation({
      query: (data) => ({
        url: `/league/matches`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["events"],
    }),

    splitTeam: builder.mutation({
      query: (data) => ({
        url: `/league/split/player`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["players"],
    }),

    DownSize: builder.mutation({
      query: (data) => ({
        url: `/league/action_needed`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leagues", "tournaments", "events"],
    }),

    InrollPlayer: builder.mutation({
      query: (data) => ({
        url: `/league/add/waiting/player`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["players"],
    }),

    confirmMatches: builder.mutation({
      query: (data) => ({
        url: `/league/match/winners/confirm`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["event-groups", "league-groups", "tournament-groups"],
    }),

    Translations: builder.query({
      query: (lang) => `/translations?lang=${lang}&group=Dashboard`,
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/reset_passwrd/new_password`,
        method: "POST",
        body: data,
      }),
    }),

    resetPasswordEmailConfirm: builder.mutation({
      query: (data) => ({
        url: `/auth/reset_password`,
        method: "POST",
        body: data,
      }),
    }),

    resetPasswordProfile: builder.mutation({
      query: (data) => ({
        url: `/auth/reset_password_profile`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetHomeScreenBookingsWeeklyQuery,

  useAllUsersInClubQuery,
  useActivateUserMutation,
  useGetRolesForClubQuery,
  useCreateUserForClubMutation,
  useGetAllClubRolesQuery,
  useCreateRoleMutation,
  useGetRoleByIdQuery,
  useGetUserByIdQuery,

  useActivationRoleMutation,
  useEditUserMutation,

  useEditRoleMutation,
  useGetAllCountriesQuery,

  useGetAllLeaguesQuery,
  useDeleteLeagueMutation,
  useAddLeaguePlayerMutation,
  useGetAllTournamentsQuery,
  useDeleteTournamentMutation,
  useAddTournamentPlayerMutation,
  useGetAllSponsorForLeagueQuery,
  useGetAllPrizesForLeagueQuery,
  useCreateLeagueMutation,
  useGetAllLeaguePlayersQuery,
  useDeleteLeaguePlayerMutation,
  useDeleteTournamentPlayerMutation,
  useGetAllLeagueWaitingPlayersQuery,
  useGetLeaguePlayerQuery,
  useGetAllTournamentPlayersQuery,
  useGetAllTournamentWaitingPlayersQuery,
  useGetTournamentPlayerQuery,
  useCreateLeagueTeamUpMutation,
  useCreateTournamentTeamUpMutation,
  useGetLeagueGroubMatchesQuery,
  useGetTournamentGroubMatchesQuery,
  useAddScoreToLeagueMatchMutation,
  useAddScoreToTournamentMatchMutation,
  useGetLeagueByIdQuery,
  useEditLeagueMutation,
  useGetAllTeamsByLevelInLeagueQuery,
  useGenerateGroupMutation,
  useGenerateGroupMatchesMutation,
  useEditAvailableCourtsForLeagueMutation,
  useCreateTournamentMutation,
  useEditTournamentMutation,
  useGetAllSponsorForTournamentQuery,
  useGetAllPrizesForTournamentQuery,
  useEditAvailableCourtsForTournamentMutation,

  useGetTournamentByIdQuery,
  useChangeLeagueStageMutation,
  useGenerateGroupsForTournamentMutation,
  useGenerateGroupMatchesForTournamentMutation,
  useCreateEventMutation,
  useEditEventMutation,
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useDeleteEventMutation,
  useGetAllEventPlayersQuery,
  useGetAllEventWaitingPlayersQuery,
  useCreateEventTeamUpMutation,
  useDeleteEventPlayerMutation,
  useGetEventPlayerQuery,
  useAddEventPlayerMutation,
  useAddScoreToEventMatchMutation,
  useGetEventGroupMatchesQuery,
  useGetAllPlayersScoreQuery,
  useGenerateEventMatchesMutation,
  useGetEventLeaderBoardTeamsQuery,
  useGetEventLeaderBoardQuery,
  useSplitTeamMutation,
  useGetLeagueTeamsQuery,
  useGetTournamentTeamsQuery,
  useGetEventTeamsQuery,
  useDownSizeMutation,
  useConfirmMatchesMutation,
  useInrollPlayerMutation,
  useTranslationsQuery,
  useResetPasswordMutation,
  useResetPasswordEmailConfirmMutation,
  useResetPasswordProfileMutation,
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useEditOrderMutation,
  useUpdateOrderStageMutation,
  useCancelOrderMutation,
  useCreateInviteCodeMutation,
  useGetAllUsersQuery,
  useGetOrderHistoryQuery,
  useGetAllStorageQuery,
  useAddStorageMutation,
  useAddClientMutation,
  useGetAllClientQuery,
  useAddMaterialMutation,
  useGetAllMaterialQuery,
  useGetAllMaterialSizeQuery,
  useGetAllRolesNamesQuery,
  useApproveOrderStageMutation
} = Api;
