import { type User } from "codeforlife/lib/esm/api/models"
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
} from "codeforlife/lib/esm/helpers/rtkQuery"

import api from "."

const listUrl = "users/"
const detailUrl = listUrl + "<id>/"

const userApi = api.injectEndpoints({
  endpoints: build => ({
    handleJoinClassRequest: build.mutation<
      UpdateResult<User>,
      UpdateArg<User, never, "first_name", { accept: boolean }>
    >({
      query: ([id, body]) => ({
        url: buildUrl(detailUrl + "handle-join-class-request/", {
          url: { id },
        }),
        method: "PUT",
        body,
      }),
      invalidatesTags: tagData("User"),
    }),
    requestPasswordReset: build.query<null, Arg<User, "email">>({
      query: body => ({
        url: listUrl + "request-password-reset/",
        method: "POST",
        body,
      }),
    }),
    resetPassword: build.mutation<
      UpdateResult<User>,
      UpdateArg<User, "password", never, { token: string }>
    >({
      query: ([id, body]) => ({
        url: buildUrl(detailUrl + "reset-password/", { url: { id } }),
        method: "PUT",
        body,
      }),
    }),
    verifyEmailAddress: build.mutation<
      UpdateResult<User>,
      UpdateArg<User, never, never, { token: string }>
    >({
      query: ([id, body]) => ({
        url: buildUrl(detailUrl + "verify-email-address/", { url: { id } }),
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
        url: buildUrl(detailUrl, { url: { id } }),
        method: "PATCH",
        body,
      }),
      invalidatesTags: tagData("User"),
    }),
    destroyIndependentUser: build.mutation<DestroyResult, DestroyArg<User>>({
      query: id => ({
        url: buildUrl(detailUrl, { url: { id } }),
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
        url: listUrl,
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
} = userApi
