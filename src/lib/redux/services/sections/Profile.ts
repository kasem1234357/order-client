import { Api } from "../Api";

/*

    */
export const Endpoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => `/api/user/myprofile`,
      providesTags: ["profile", "Courts", "organization", "clubs", "pricing"],
    }),

    editMyProfile: builder.mutation({
      query: (data) => ({
        url: `/club/myprofile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useGetMyProfileQuery, useEditMyProfileMutation } = Endpoints;
