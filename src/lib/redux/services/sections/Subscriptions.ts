import { Api } from "../Api";

export const Endpoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscreptions: builder.query({
      query: () => `/club/subscriptions`,
    }),

    getPaymentUrl: builder.query({
      query: ({ club_id, subscription_id = "", period = "" }) =>
        `/club/subscription/buy?subscription_id=${subscription_id}&period=${period}&club_id=${club_id}`,
    }),
  }),
});

export const { useGetAllSubscreptionsQuery, useGetPaymentUrlQuery } = Endpoints;
