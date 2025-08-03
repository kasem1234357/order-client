import { Api } from "../Api";

export const academyEndpoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademies: builder.query({
      query: ({
        currentPage = 1,
        coach_id = "",
        limit = "",
        sortby = "create_date_desc",
        name = "",
        coach_name = "",
        court_type = "",
        date_from = "",
        date_to = "",
        gender = "",
        state = "",
        club_id = "",
      }) => ({
        url: `/academy/all?page=${currentPage}&limit=${limit}&sortby=${sortby}&name=${name}&coach_id=${coach_id}&coach_name=${coach_name}&court_type=${court_type}&date_from=${date_from}&date_to=${date_to}&gender=${gender.toLowerCase()}&state=${state}&club_id=${club_id}`,
      }),
      providesTags: ["academy"],
    }),
    getAcademyById: builder.query({
      query: (id) => ({
        url: `/academy/${id}`,
      }),
      providesTags: ["academy"],
    }),
    createAcademy: builder.mutation({
      query: (data) => ({
        url: `/academy`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academy"],
    }),
    editAcademy: builder.mutation({
      query: ({ data, id }) => ({
        url: `/academy/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["academy"],
    }),
    getAvailableCourtsForAcademy: builder.query({
      query: ({
        recurring_sessions = "",
        court_type = "",
        start_date = "",
        end_date = "",
        start_time = "",
        end_time = "",
        selected_days = "",
        coach_id = "",
        court_privacy = "",
        available_courts_ids = [],
        club_id = "",
      }: any) => ({
        url: `/academy/available/courts?available_courts=${
          available_courts_ids.length > 0 ? `[${available_courts_ids}]` : ""
        }&start_date=${start_date}&end_date=${end_date}&start_time=${start_time}&end_time=${end_time}&selected_days=${
          selected_days.length > 0 ? `[${selected_days}]` : ""
        }&court_privacy=${court_privacy}&club_id=${club_id}&recurring_sessions=${recurring_sessions}&court_type=${court_type}&coach_id=${coach_id}`,

        method: "GET",
      }),
      providesTags: ["booking", "academy"],
    }),

    editAvailableCourtsForAcademy: builder.mutation({
      query: (data) => ({
        url: `/academy/available/courts/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["booking", "academy"],
    }),
    getAcademyPlayers: builder.query({
      query: ({ id, clubId }) => ({
        url: `/academy/${id}/all/player?page=1&limit=10&academy_id=${id}`,
      }),
      providesTags: ["academy", "players"],
    }),
    addPlayerToAcademy: builder.mutation({
      query: ({ id, data }) => ({
        url: `/academy/${id}/add/player`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academy", "players"],
    }),
    cancelAcademy: builder.mutation({
      query: (id) => ({
        url: `/academy/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: ["academy"],
    }),
  }),
});
export const {
  useGetAllAcademiesQuery,
  useGetAcademyByIdQuery,
  useCreateAcademyMutation,
  useEditAcademyMutation,
  useGetAvailableCourtsForAcademyQuery,
  useEditAvailableCourtsForAcademyMutation,
  useGetAcademyPlayersQuery,
  useAddPlayerToAcademyMutation,
  useCancelAcademyMutation,
} = academyEndpoints;
