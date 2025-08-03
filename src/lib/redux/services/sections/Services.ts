 import { Api } from "../Api";
  /*

    */
   export const Endpoints =Api.injectEndpoints({
     endpoints: (builder) => ({
        getAllServices: builder.query({
            query: ({
              club_id,
              status = "",
              search = "",
              currentPage = "",
              limit = "",
              category = "",
              is_static = false,
            }) =>
              `/club/${club_id}/service?page=${currentPage}&limit=${limit}&name=${search}&category=${category}&is_static=${is_static}&date_added_from&date_added_to&status`,
            providesTags: ["services"],
          }),
      
          getAllCategories: builder.query({
            query: ({ club_id, currentPage = "", limit = "" }) =>
              `/club/${club_id}/category?page=${currentPage}&limit=${limit}`,
            providesTags: ["category"],
          }),
      
          createCategory: builder.mutation({
            query: ({ data, id }) => ({
              url: `/club/pos/${id}/category`,
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["category"],
          }),
      
          getOrderNumber: builder.query({
            query: (id) => `/club/pos/${id}/order`,
          }),
      
          sendOrderAsEmail: builder.mutation({
            query: ({ order_id, data }) => ({
              url: `/club/pos/order/${order_id}/send_email`,
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["services"],
          }),
      
          createOrder: builder.mutation({
            query: ({ order_id, data }) => ({
              url: `/club/pos/order/${order_id}`,
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["services"],
          }),
      
          getAllPosPayments: builder.query({
            query: ({
              club_id,
              currentPage = "",
              limit = "",
              date_added_from = "",
              date_added_to = "",
            }) =>
              `/club/${club_id}/pos_orders?page=${currentPage}&limit=${limit}&date_added_from=${date_added_from}&date_added_to=${date_added_to}`,
          }),
      

      
          createService: builder.mutation({
            query: ({ data, id }) => ({
              url: `/club/${id}/service`,
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["services"],
          }),
          editServices: builder.mutation({
            query: ({ data, clubId, id }) => ({
              url: `/club/${clubId}/service/${id}`,
              method: "PATCH",
              body: data,
              headers: {
                //"Content-type": "application/json; charset=UTF-8",
              },
            }),
            invalidatesTags: ["services"],
          }),
          unLinkService: builder.mutation({
            query: ({ clubId, id }) => ({
              url: `/club/${clubId}/service/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: ["services"],
          }),
          getServices: builder.query({
            query: ({
              clubId,
              name = "",
              date_added_from = "",
              date_added_to = "",
              status = "",
              limit = 10,
              currentPage = 1,
            }) =>
              `/club/${clubId}/service?page=${currentPage}&limit=${limit}&name=${name}&date_added_from=${date_added_from}&date_added_to=${date_added_to}&status=${status}`,
            providesTags: ["services"],
          }),
          getServicesByName: builder.query({
            query: ({ name, club_ids }) =>
              `/club/service_names?name=${name}&club_ids=[${club_ids}]`,
            providesTags: ["services"],
          }),

     })
    })
    export const {
        useCreateServiceMutation,
        useEditServicesMutation,
        useGetServicesByNameQuery,
        useGetServicesQuery,
        useUnLinkServiceMutation,    
        useGetAllServicesQuery,
        useGetOrderNumberQuery,
        useGetAllCategoriesQuery,
        useCreateOrderMutation,
        useCreateCategoryMutation,
        useSendOrderAsEmailMutation,
        useGetAllPosPaymentsQuery,
    } = Endpoints