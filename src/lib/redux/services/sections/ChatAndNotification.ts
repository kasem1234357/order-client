import { Api } from "../Api";
const chatAndNotificationEndpoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllChats: builder.query({
      query: () => ({
        url: `/mocion/chats/all`,
      }),
      providesTags: ["chats"],
    }),
    sendMessage: builder.mutation({
      query: (data: any) => ({
        url: `/mocion/chats/message`,
        method: "POST",
        body: data,
      }),
    }),
    uploadFile: builder.mutation({
      query: (data: any) => ({
        url: `/mocion/chats/upload`,
        method: "POST",
        body: data,
      }),
    }),
    getMessagesForChat: builder.query({
      query: ({ id, page }) => ({ url: `/mocion/chats/id/${id}?page=${page}` }),
      providesTags: ["chats"],
    }),

    getNotifications: builder.query({
      query: (id: number | string) => ({
        url: `/mocion/notification/all`,
        headers: {
          platform: "web",
        },
      }),
      providesTags: ["notifications"],
    }),
    createChat: builder.mutation({
      query: (id: number) => ({
        url: `/mocion/chats/create`,
        method: "POST",
        body: {
          user_id: id,
        },
      }),
      invalidatesTags: ["chats"],
    }),
  }),
});
export const {
  useGetAllChatsQuery,
  useSendMessageMutation,
  useUploadFileMutation,
  useGetMessagesForChatQuery,
  useGetNotificationsQuery,
  useCreateChatMutation,
} = chatAndNotificationEndpoints;
