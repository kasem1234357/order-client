import { Api } from "../Api";

export const Endpoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPaymentMethods: builder.query({
      query: ({ id, enabled = "" }) =>
        `/club/${id}/payment_method?enable_only=${enabled}`,
      providesTags: ["paymentMethods"],
    }),
    createPaymentMethod: builder.mutation({
      query: ({ club_id, data }) => ({
        url: `/club/${club_id}/payment_method`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentMethods"],
    }),
    editPaymentMethod: builder.mutation({
      query: ({ edits, id }) => ({
        url: `/club/payment_method/${id}`,
        method: "PATCH",
        body: edits,
      }),
      invalidatesTags: ["paymentMethods"],
    }),
    getAllPayments: builder.query({
      query: ({ club_id, currentPage = "", limit = "" }) =>
        `/club/${club_id}/payments?page=${currentPage}&limit=${limit}`,
    }),
  }),
});

export const {
  useGetAllPaymentMethodsQuery,
  useCreatePaymentMethodMutation,
  useEditPaymentMethodMutation,
  useGetAllPaymentsQuery,
} = Endpoints;
