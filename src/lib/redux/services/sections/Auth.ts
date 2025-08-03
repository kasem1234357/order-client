import { Api } from "../Api";


/*
   
*/
export const Endpoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/user/login",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    //!!!!!!!!!!!!!!limit for the request!!!!!!!!!!!!
    register: builder.mutation({
      query: (data) => ({
        url: "/api/user/register",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        timeout: 180000,
      }),
    }),

    verification: builder.mutation({
      query: (data) => ({
        url: "/auth/verification",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    resendCode: builder.mutation({
      query: (data) => ({
        url: "/auth/verification/resend",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    getTermsAndConditions: builder.query({
      query: () => `/auth/terms_and_conditions`,
    }),

    registerWithGoogle: builder.mutation({
      query: (data) => ({
        url: "/player/auth/sso/google?web=true",
        method: "POST",
        body: data,
      }),
    }),

    completeRegisterWithGoogle: builder.mutation({
      query: (data) => ({
        url: "/player/auth/sso/google/data",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useLoginMutation,
  useRegisterMutation,
  useVerificationMutation,
  useResendCodeMutation,
  useRegisterWithGoogleMutation,
  useCompleteRegisterWithGoogleMutation,
  
} = Endpoints;
