import { getReadUserEndpoints, urls, type User } from "codeforlife/api"
import {
  buildUrl,
  tagData,
  type Arg,
  type CreateArg,
  type CreateResult,
  type DestroyArg,
  type DestroyResult,
  type UpdateArg,
  type UpdateResult,
} from "codeforlife/utils/api"

import api from "."

const userApi = api.injectEndpoints({
  endpoints: build => ({
    ...getReadUserEndpoints(build),
    handleJoinClassRequest: build.mutation<
      UpdateResult<User>,
      UpdateArg<User, never, "first_name", { accept: boolean }>
    >({
      query: ([id, body]) => ({
        url: buildUrl(urls.user.detail + "handle-join-class-request/", {
          url: { id },
        }),
        method: "PUT",
        body,
      }),
      invalidatesTags: tagData("User"),
    }),
    requestPasswordReset: build.query<null, Arg<User, "email">>({
      query: body => ({
        url: urls.user.list + "request-password-reset/",
        method: "POST",
        body,
      }),
    }),
    resetPassword: build.mutation<
      UpdateResult<User>,
      UpdateArg<User, "password", never, { token: string }>
    >({
      query: ([id, body]) => ({
        url: buildUrl(urls.user.detail + "reset-password/", { url: { id } }),
        method: "PUT",
        body,
      }),
    }),
    verifyEmailAddress: build.mutation<
      UpdateResult<User>,
      UpdateArg<User, never, never, { token: string }>
    >({
      query: ([id, body]) => ({
        url: buildUrl(urls.user.detail + "verify-email-address/", {
          url: { id },
        }),
        method: "PUT",
        body,
      }),
    }),
    updateUser: build.mutation<
      UpdateResult<User>,
      UpdateArg<
        User,
        never,
        | "first_name"
        | "last_name"
        | "email"
        | "requesting_to_join_class"
        | "password",
        { current_password?: string }
      >
    >({
      query: ([id, body]) => ({
        url: buildUrl(urls.user.detail, { url: { id } }),
        method: "PATCH",
        body,
      }),
      invalidatesTags: tagData("User"),
    }),
    destroyIndependentUser: build.mutation<DestroyResult, DestroyArg<User>>({
      query: id => ({
        url: buildUrl(urls.user.detail, { url: { id } }),
        method: "DELETE",
      }),
      invalidatesTags: tagData("User"),
    }),
    createIndependentUser: build.mutation<
      CreateResult<User>,
      CreateArg<User, "first_name" | "last_name" | "email" | "password"> & {
        date_of_birth: Date
        add_to_newsletter: boolean
      }
    >({
      query: body => ({
        url: urls.user.list,
        method: "POST",
        body,
      }),
    }),
  }),
})

export default userApi
export const {
  useHandleJoinClassRequestMutation,
  useRequestPasswordResetQuery,
  useLazyRequestPasswordResetQuery,
  useResetPasswordMutation,
  useVerifyEmailAddressMutation,
  useUpdateUserMutation,
  useDestroyIndependentUserMutation,
  useCreateIndependentUserMutation,
  useRetrieveUserQuery,
  useLazyRetrieveUserQuery,
  useListUsersQuery,
  useLazyListUsersQuery,
} = userApi
