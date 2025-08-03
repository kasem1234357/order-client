import { Api } from "../Api";

export const Endpoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    getBooking: builder.query({
      query: ({
        club_id,
        name,
        limit = 10,
        currentPage = 1,
        booking_type = "",
        court_name = "",
        court_type = "",
        coach_name = "",
        player_name = "",
        date_from = "",
        date_to = "",
      }) => ({
        url: `/club/booking/${club_id}?page=${currentPage}&limit=${limit}&name=${name}&booking_type=${booking_type.toLowerCase()}&court_name=${court_name}&court_type=${court_type.toLowerCase()}&coach_name=${coach_name}&player_name=${player_name}&date_from=${date_from}&date_to=${date_to}`,
      }),
      providesTags: ["booking", "booking-all"],
    }),
    deleteBooking: builder.mutation({
      query: ({ bookingId = 0, cancel = "", series_id = "" }) => ({
        url: `/booking/cancel/${bookingId}?cancel=${cancel}&series_id=${series_id}`,
        method: "POST",
      }),
      invalidatesTags: ["booking-all"],
    }),
    getPlayersForBooking: builder.query({
      query: ({
        club_id,
        name = "",
        court_id = "",
        booking_date = "",
        start_time = "",
        payment_type = "",
        end_time = "",
        coach_id = "",
        number_of_players = "",
        slot = "",
      }) => ({
        url: `/club/booking/players/${club_id}?name=${name}&date=${booking_date}&start_time=${start_time}&end_time=${end_time}&court_id=${court_id}&booking_date=${booking_date}&payment_type=${payment_type}&coach_id=${coach_id}&number_of_players=${number_of_players}&slot=${slot}`,
      }),
      providesTags: ["booking-all", "players"],
    }),
    getPlayersForAcademyBooking: builder.query({
      query: ({
        club_id,
        name = "",
        court_id = "",
        booking_date = "",
        start_time = "",
        payment_type = "",
        end_time = "",
        coach_id = "",
        number_of_players = "",
        academyId = "",
        slot = "",
      }) => ({
        url: `/club/academy/players/${club_id}?name=${name}&date=${booking_date}&start_time=${start_time}&end_time=${end_time}&court_id=${court_id}&booking_date=${booking_date}&payment_type=${payment_type}&coach_id=${coach_id}&number_of_players=${number_of_players}&slot=${slot}&club_id=${club_id}&academy_id=${academyId}`,
      }),
      providesTags: ["booking-all", "players"],
    }),
    createBooking: builder.mutation({
      query: ({ data }) => ({
        url: `/club/booking`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["booking-all"],
    }),
    createPrivateBooking: builder.mutation({
      query: ({ data }) => ({
        url: `/club/booking/private`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["booking-all"],
    }),
    getBookingById: builder.query({
      query: ({ bookingId }) => ({
        url: `/booking/${bookingId}`,
        method: "GET",
      }),
      providesTags: ["booking-all", "single-booking"],
    }),
    editBooking: builder.mutation({
      query: ({ bookingId, data }) => ({
        url: `/booking/${bookingId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        // Only invalidate tags if the status code indicates success
        if (result?.status >= 200 && result?.status < 300) {
          return [
            "booking",
            "booking-all",
            "tournament-groups",
            "league-groups",
            "Coach",
            "homeView",
          ];
        }
        return [];
      },
    }),
    editBookingFromBookingPage: builder.mutation({
      query: ({ bookingId, data }) => ({
        url: `/booking/${bookingId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["booking-all"],
    }),
    editPrivateBooking: builder.mutation({
      query: ({ bookingId, data,series_id }) => ({
        url: `/private/booking/${bookingId}?series_id=${series_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["booking-all"],
    }),
    refreshPaymentLink: builder.mutation({
      query: (data) => ({
        url: `/payment/refresh_link`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["single-booking"],
    }),
  }),
});
export const {
  useGetBookingQuery,
  useDeleteBookingMutation,
  useGetPlayersForBookingQuery,
  useCreateBookingMutation,
  useCreatePrivateBookingMutation,
  useGetBookingByIdQuery,
  useEditBookingMutation,
  useRefreshPaymentLinkMutation,
  useEditBookingFromBookingPageMutation,
  useGetPlayersForAcademyBookingQuery,
  useEditPrivateBookingMutation
} = Endpoints;
