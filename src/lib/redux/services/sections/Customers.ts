import { url } from "node:inspector";
import { Api } from "../Api";

/*

    */
export const Endpoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlayers: builder.query({
      query: ({
        club_id,
        currentPage = "",
        limit = "",
        name = "",
        date_added_from = "",
        date_added_to = "",
        gender = "",
        mobile_number = "",
        email = "",
        role = "",
        status = "",
      }) =>
        `/club/player/${club_id}?page=${currentPage}&limit=${limit}&name=${name}&gender=${gender}&email=${email}&status=${status}&role=${role}&date_added_from=${date_added_from}&date_added_to=${date_added_to}`,
      providesTags: ["players"],
    }),

    editPlayer: builder.mutation({
      query: ({ data, id }) => ({
        url: `/club/player/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          //"Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["players"],
    }),

    getPlayerById: builder.query({
      query: (id) => `/player/${id}`,
      providesTags: ["players"],
    }),

    createPlayer: builder.mutation({
      query: ({ data, id }) => ({
        url: `/club/${id}/player`,
        method: "POST",
        body: data,
        headers: {
          //"Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["players"],
    }),
    deletePlayer: builder.mutation({
      query: ({ id, club_id }) => ({
        url: `/player/${id}?club_id=${club_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["players"],
    }),
    // packeges //
    getAllPackeges:builder.query({
      query: ({
        club_id,
        currentPage = "",
        limit = "",
        name = "",
        date_added_from = "",
        date_added_to = "",
        gender = "",
        mobile_number = "",
        email = "",
        role = "",
        status = "",
      }) =>
        `/club/packeges/${club_id}?page=${currentPage}&limit=${limit}&name=${name}&gender=${gender}&email=${email}&status=${status}&role=${role}&date_added_from=${date_added_from}&date_added_to=${date_added_to}`,
      providesTags: ["players"],
    }),
    getAllMemberships: builder.query({
      query: ({
        clubId,
        currentPage = 1,
        limit = 10,
        name = "",
        status = "",
        player_id = "",
        created_by = "",
        date_added_from = "",
        membership_status = "",
        date_added_to = "",
      }) =>
        `/club/${clubId}/membership?page=${currentPage}&limit=${limit}&name=${name}&status=${status}&created_by=${created_by}&date_added_from=${date_added_from}&date_added_to=${date_added_to}&player_id=${player_id}&membership_status=${membership_status}`,
      providesTags: ["memberships"],
    }),
    getAllUsersForMembership:builder.query({
       query:({membershipId=0,name='',status=''})=>`/club/membership/users/${membershipId}?name=${name}&status=${status}`,
        providesTags: ["memberships"]
    }),
    checkPlayerEmail:builder.mutation({
        query:(data)=>({
            url:`/check/player/by_email`,
            method: "POST",
            body:data
        }),
        invalidatesTags: ["memberships"],
    }),
    deactivateMembershipForUser:builder.mutation({
        query:({player_membership_id=0,date=''})=>({
            url:`club/membership/cancel?player_membership_id=${player_membership_id}&cancellation_date=${date}`,
            method: "POST",
        }),
        invalidatesTags: ["memberships"],
    }),
    pauseMembershipForUser:builder.mutation({
        query:({player_membership_id=0,start_date='',end_date=''})=>({
            url:`club/membership/user/pause/${player_membership_id}?player_membership_id=${player_membership_id}&start_date=${start_date}&end_date=${end_date}`,
            method: "POST",
        }),
        invalidatesTags: ["memberships"],
    }),
    editMembership: builder.mutation({
      query: ({ data, id }) => ({
        url: `/club/membership/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          //"Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["memberships"],
    }),

    getMembershipById: builder.query({
      query: (id) => `/club/membership/${id}`,
      providesTags: ["memberships"],
    }),
    buyMembership: builder.mutation({
      query: ({ data }) => ({
        url: `/club/player/membership/buy?club_id=${data.club_id}`,
        method: "POST",
        body: data,
        headers: {
          //"Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: [],
    }),
    createMembership: builder.mutation({
      query: ({ data,owner_club_id }) => ({
        url: `/club/membership?club_id=${owner_club_id}`,
        method: "POST",
        body: data,
        headers: {
          //"Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["memberships"],
    }),
    activationMembership: builder.mutation({
      query: (query) => ({
        url: `/club/membership/status/${query.id}`,
        method: "POST",
        body: { "disabled-enabled": query.status },
        headers: {
          //"Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["memberships"],
    }),
    getAllClubPaidPackages:builder.query({
      query: ({club_id}) =>
        `/club/${club_id}/packages`,
      providesTags: ["players"],
    }),
    getPackageById:builder.query({
      query: ({package_id}) =>
        `/club/customer_package/${package_id}`,
      providesTags: ["players"],
    }),
    CancelPackage:builder.mutation({
      query: (query) => ({
        url: `/club/inactive_customer_package/${query.packegeId}?with_refund=${query.with_refund}`,
        method: "PATCH",
        body:{},
        headers: {
          //"Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["memberships"],
    })
  }),
});

export const {
  useGetAllPlayersQuery,
  useGetPackageByIdQuery,

  useGetAllClubPaidPackagesQuery,
  useCancelPackageMutation,
  useEditPlayerMutation,
  useGetPlayerByIdQuery,
  useCreatePlayerMutation,
  useGetAllMembershipsQuery,
  useDeletePlayerMutation,
  useActivationMembershipMutation,
  useCreateMembershipMutation,
  useEditMembershipMutation,
  useGetMembershipByIdQuery,
  useBuyMembershipMutation,
  useGetAllUsersForMembershipQuery,
  useDeactivateMembershipForUserMutation,
  usePauseMembershipForUserMutation,
  useCheckPlayerEmailMutation,
} = Endpoints;
