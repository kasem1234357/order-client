import {
  CoachesQuery,
  CoachesResponse,
} from "../../../../types/response/coaches";
import { Api } from "../Api";

/*
 
     */
export const Endpoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    createCoach: builder.mutation({
      query: ({ data, id }) => ({
        url: `/club/${id}/coach`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coach"],
    }),
    getCoachById: builder.query({
      query: ({ coach_id, club_id }) => `/club/${club_id}/coach/${coach_id}`,
      providesTags: ["Coach"],
    }),

    getAllCoaches: builder.query<CoachesResponse, CoachesQuery>({
      query: ({
        club_id,
        dateFrom = "",
        dateTo = "",
        coachGender = "",
        status = "",
        search = "",
        assignedCorts = "",
        currentPage = "",
        limit = 10,
        court_id = "",
        is_active = "",
      }) =>
        `/club/${club_id}/coach?page=${currentPage}&limit=${limit}&name=${search}&date_added_from=${dateFrom}&date_added_to=${dateTo}&coach_gender=${coachGender}&assigned_courts=${assignedCorts}&status=${status}&court_id=${court_id}&is_active=${is_active}`,
      providesTags: ["Coach"],
    }),

    activateCoache: builder.mutation({
      query: ({ data, id }) => ({
        url: `/coach/activate/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coach"],
    }),

    editCoach: builder.mutation({
      query: ({ data, club_id, coach_id }) => ({
        url: `/club/${club_id}/coach/${coach_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Coach"],
    }),

    deleteCoachPackage: builder.mutation({
      query: (id) => ({
        url: `/club/package/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coach"],
    }),

    createCoachPackage: builder.mutation({
      query: ({ data, club_id, coach_id }) => ({
        url: `/club/${club_id}/coach/${coach_id}/package`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coach"],
    }),

    editCoachPackage: builder.mutation({
      query: ({ data, id }) => ({
        url: `/club/package/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Coach"],
    }),
    getAllCoachGames: builder.query({
      query: ({
        club_id,
        name = "",
        limit = 10,
        currentPage = 1,
        date_from = "",
        date_to = "",
      }) => ({
        url: `/game/with/coaching/all?club_id=${club_id}&sortby=create_date_desc&page=${currentPage}&limit=${limit}&name=${name}&player_name=&owner_price=&coach_name=&court_name=&court_type=&date_from=${date_from}&date_to=${date_to}&players_gender&level=`,
      }),
      providesTags: ["booking-all"],
    }),
    createGameWithCoach: builder.mutation({
      query: ({ data }) => ({
        url: `/club/booking/game/with/coach`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["booking-all"],
    }),
    createPrivateCoach: builder.mutation({
      query: ({ data, club_id }) => ({
        url: `/club/booking/private/coach`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["booking-all"],
    }),
    createPublicCoach: builder.mutation({
      query: ({ data, club_id }) => ({
        url: `/club/booking/public/coach`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["booking-all"],
    }),
    getAllPrivateCoaches: builder.query({
      query: ({
        club_id,
        sortBy = "create_date_desc",
        name = "",
        limit = 10,
        currentPage = 1,
        player_name = "",
        owner_price = "",
        court_name = "",
        coach_name = "",
        court_type = "",
        date_from = "",
        date_to = "",
        status = "",
      }) => ({
        url: `/private/coaching/all?club_id=${club_id}&sortby=${sortBy}&page=${currentPage}&limit=${limit}&name=${name}&player_name=${player_name}&owner_price=${owner_price}&coach_name=${coach_name}&court_name=${court_name}&court_type=${court_type.toLowerCase()}&date_from=${date_from}&date_to=${date_to}&status=${status}`,
      }),
      providesTags: ["booking-all"],
    }),

    getAllPublicCoaches: builder.query({
      query: ({
        club_id,
        sortBy = "create_date_desc",
        name = "",
        limit = 10,
        currentPage = 1,
        player_name = "",
        owner_price = "",
        court_name = "",
        coach_name = "",
        court_type = "",
        date_from = "",
        date_to = "",
        status = "",
        coachGender = "",
        level = "",
      }) =>
        `/public/coaching/all?club_id=${club_id}&sortby=${sortBy}&page=${currentPage}&limit=${limit}&name=${name}&player_name=${player_name}&owner_price=${owner_price}&coach_name=${coach_name}&court_name=${court_name}&court_type=${court_type.toLowerCase()}&date_from=${date_from}&date_to=${date_to}&status=${status}&players_gender=${coachGender}&level=${level}`,
      providesTags: ["booking-all"],
    }),
    getCoachesNames: builder.query({
      query: ({ club_id, name = "" }) => ({
        url: `/club/${club_id}/coach_names?page=1&limit=100&name=${name}&date_added_from&date_added_to&coach_gender=&assigned_courts=`,
      }),
      providesTags: ["booking", "Coach"],
    }),

    searchCoach: builder.query({
      query: ({ club_id, email = "" }) => ({
        url: `/club/${club_id}/search_coach?email=${email}`,
      }),
    }),
  }),
});
export const {
  useCreateCoachMutation,
  useEditCoachMutation,
  useCreateCoachPackageMutation,
  useEditCoachPackageMutation,
  useDeleteCoachPackageMutation,
  useGetCoachByIdQuery,
  useGetAllCoachesQuery,
  useActivateCoacheMutation,
  useGetAllCoachGamesQuery,
  useCreatePrivateCoachMutation,
  useCreatePublicCoachMutation,
  useGetAllPrivateCoachesQuery,
  useGetAllPublicCoachesQuery,
  useCreateGameWithCoachMutation,
  useGetCoachesNamesQuery,
  useSearchCoachQuery,
} = Endpoints;
