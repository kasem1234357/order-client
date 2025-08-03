import {
  ClubDetailsResponse,
  ClubsQuery,
  ClubsResponse,
} from "../../../../types/response/clubs";
import { Api } from "../Api";

/*

    */
export const Endpoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllClubs: builder.query<ClubsResponse, ClubsQuery>({
      query: ({
        search = "",
        date_added_from = "",
        date_added_to = "",
        status = "",
        limit = 10,
        currentPage = 1,
      }) => `/club?name=${search}&limit=${limit}&page=${currentPage}`,
      providesTags: ["Club", "clubs"],
    }),

    getClubById: builder.query<ClubDetailsResponse, any>({
      query: (id) => `/club/${id}`,
      providesTags: ["Club"],
    }),

    createClub: builder.mutation({
      query: (data) => ({
        url: "/club",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Club", "clubs", "profile"],
    }),

    editClub: builder.mutation({
      query: ({ edits, id }) => ({
        url: `/club_edit/${id}`,
        method: "PATCH",
        body: edits,
      }),
      invalidatesTags: ["Club"],
    }),

    activateClub: builder.mutation({
      query: ({ data, id }) => ({
        url: `/club/activate/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Club"],
    }),

    dublicateClub: builder.mutation({
      query: (id) => ({
        url: `/club/duplicate/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Club", "clubs"],
    }),

    addClubImage: builder.mutation({
      query: ({ data, id }) => ({
        url: `/club/image/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Club"],
    }),

    deleteClubImage: builder.mutation({
      query: ({ data, id }) => ({
        url: `/club/image/${id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Club"],
    }),

    getAllClubsByName: builder.query({
      query: ({name = ""}) => `/club/names?name=${name}`,
      providesTags: ["clubs"],
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
  }),
});

export const {
  useGetAllClubsQuery,
  useGetAllClubsByNameQuery,
  useGetClubByIdQuery,
  useCreateClubMutation,
  useEditClubMutation,
  useActivateClubMutation,
  useDublicateClubMutation,
  useAddClubImageMutation,
  useDeleteClubImageMutation,
} = Endpoints;
