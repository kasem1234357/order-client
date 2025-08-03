import { OrganizationResponse } from "../../../../types/response/organization";
import { Api } from "../Api";

export const Endpoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    getOrganization: builder.query<OrganizationResponse, string>({
      query: () => `/organization`,
      providesTags: ["organization"],
    }),

    editOrganization: builder.mutation({
      query: (data) => ({
        url: `/organization`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["organization", "profile"],
    }),
  }),
});

export const { useGetOrganizationQuery, useEditOrganizationMutation } =
  Endpoints;
