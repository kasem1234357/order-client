import { Api } from "../Api";

export const pricingEndpoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPriceLists: builder.query({
      query: (query) =>
        `/club/pricelists/${query?.clubId || 29}?page=${
          query?.currentPage || 1
        }&limit=${query?.limit || 10}&name=${query?.name || ""}&from-to=${
          query?.from || ""
        }${query?.to ? " - " + query.to : ""}&status=${query?.status || ""}`,
      providesTags: ["pricing"],
    }),
    getPriceListById: builder.query({
      query: (id) => `/club/pricelist/${id}`,
      providesTags: ["pricing"],
    }),
    getWeeklyPriceView: builder.query({
      query: ({id,dateFrom,DateTo}) => `/club/pricelists_weekly_view/${id}?date=${dateFrom}`,
      providesTags: ["pricing"],
    }),
    createPriceList: builder.mutation({
      query: ({ data, id }) => ({
        url: `/club/pricelist/${id}`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["pricing", "profile"],
    }),
    activatePriceList: builder.mutation({
      query: ({ status, id }) => ({
        url: `/club/pricelist/activation/${id}`,
        method: "POST",
        body: { status },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["pricing"],
    }),
    deletePriceList: builder.mutation({
      query: ({ id }) => ({
        url: `/club/pricelist/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["pricing"],
    }),
    updatePriceList: builder.mutation({
      query: ({ data, id }) => ({
        url: `/club/pricelist/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["pricing"],
    }),
  }),
});
export const {
  useGetAllPriceListsQuery,
  useGetPriceListByIdQuery,
  useGetWeeklyPriceViewQuery,
  useCreatePriceListMutation,
  useActivatePriceListMutation,
  useDeletePriceListMutation,
  useUpdatePriceListMutation,
} = pricingEndpoints;
