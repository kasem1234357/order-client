import { CourtsQuery, CourtsResponse } from "../../../../types/response/courts";
import { Api } from "../Api";
export const courtsEndPoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    getCourtsNames: builder.query({
      query: () => `/club/court_names?name=&club_id=29`,
    }),
    createCourt: builder.mutation({
      query: ({ data, id }) => ({
        url: `/club/court/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Courts", "profile"],
    }),
    getAllCourtsByName: builder.query({
      query: ({ name = "", club_id = "", club_ids = [] }) =>
        `/club/court_names?name=${name}&club_id=${club_id}&club_ids=${
          club_ids.length > 0 ? `[${club_ids}]` : ""
        }`,
    }),

    getAllCourts: builder.query<CourtsResponse, CourtsQuery>({
      query: ({
        club_id,
        dateFrom = "",
        dateTo = "",
        courtType = "",
        privacyOption = "",
        description = "",
        status = "",
        search = "",
        currentPage = "",
        limit = "",
      }: any) =>
        `/club/${club_id}/court?name=${search}&date_added_from=${dateFrom}&date_added_to=${dateTo}&court_type=${courtType}&privacy_options=${privacyOption}&status=${status}&description=${description}&page=${currentPage}&limit=${limit}`,
      providesTags: ["Courts"],
    }),

    editCourt: builder.mutation({
      query: ({ edits, id }) => ({
        url: `/club/court/${id}`,
        method: "PATCH",
        body: edits,
      }),
      invalidatesTags: ["Courts"],
    }),

    activateCourt: builder.mutation({
      query: ({ data, id }) => ({
        url: `/court/activate/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Courts"],
    }),

    dublicateCourt: builder.mutation({
      query: (id) => ({
        url: `/court/duplicate/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Courts"],
    }),

    unlinkCourt: builder.mutation({
      query: (id) => ({
        url: `/club/court/${id}`,
        method: "Delete",
      }),
      invalidatesTags: ["Courts"],
    }),

    getCourtById: builder.query({
      query: (id) => `/club/court/${id}`,
      providesTags: ["Courts"],
    }),

    addCourtImage: builder.mutation({
      query: ({ data, id }) => ({
        url: `/court/image/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Courts"],
    }),

    deleteCourtImage: builder.mutation({
      query: ({ data, id }) => ({
        url: `/court/image/${id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Courts"],
    }),
  }),
});
export const {
  useGetCourtsNamesQuery,
  useCreateCourtMutation,
  useGetAllCourtsByNameQuery,
  useGetAllCourtsQuery,
  useEditCourtMutation,
  useActivateCourtMutation,
  useDublicateCourtMutation,
  useUnlinkCourtMutation,
  useGetCourtByIdQuery,
  useAddCourtImageMutation,
  useDeleteCourtImageMutation,
} = courtsEndPoints;
