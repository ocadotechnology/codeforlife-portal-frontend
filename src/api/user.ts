import {
  type Arg,
  type CreateArg,
  type CreateResult,
  type DestroyArg,
  type DestroyResult,
  type UpdateArg,
  type UpdateResult,
  buildUrl,
  tagData,
} from "codeforlife/utils/api"
import { type User, urls } from "codeforlife/api"
import getReadUserEndpoints, {
  type ListUsersArg,
  type ListUsersResult,
  type RetrieveUserArg,
  type RetrieveUserResult,
  USER_TAG,
} from "codeforlife/api/endpoints/user"

import api from "."

export type {
  RetrieveUserArg,
  RetrieveUserResult,
  ListUsersArg,
  ListUsersResult,
}

export type HandleJoinClassRequestResult = UpdateResult<User>
export type HandleJoinClassRequestArg = UpdateArg<User, never, "first_name"> & {
  accept: boolean
}

export type RequestPasswordResetResult = null
export type RequestPasswordResetArg = Arg<User, "email">

export type ResetPasswordResult = UpdateResult<User>
export type ResetPasswordArg = UpdateArg<User, "password", never> & {
  token: string
}

export type VerifyEmailAddressResult = UpdateResult<User>
export type VerifyEmailAddressArg = {
  id: User["id"]
  token: string
}

export type UpdateUserResult = UpdateResult<User>
export type UpdateUserArg = UpdateArg<
  User,
  never,
  "first_name" | "last_name" | "email" | "requesting_to_join_class" | "password"
> & { current_password?: string }

export type DestroyIndependentUserResult = DestroyResult
export type DestroyIndependentUserArg = DestroyArg<User>

export type CreateIndependentUserResult = CreateResult<User>
export type CreateIndependentUserArg = CreateArg<
  User,
  "first_name" | "last_name" | "email" | "password"
> & {
  date_of_birth: string
  add_to_newsletter: boolean
}

const userApi = api.injectEndpoints({
  endpoints: build => ({
    ...getReadUserEndpoints(build),
    handleJoinClassRequest: build.mutation<
      HandleJoinClassRequestResult,
      HandleJoinClassRequestArg
    >({
      query: ({ id, ...body }) => ({
        url: buildUrl(urls.user.detail + "handle-join-class-request/", {
          url: { id },
        }),
        method: "PUT",
        body,
      }),
      invalidatesTags: tagData(USER_TAG),
    }),
    requestPasswordReset: build.query<
      RequestPasswordResetResult,
      RequestPasswordResetArg
    >({
      query: body => ({
        url: urls.user.list + "request-password-reset/",
        method: "POST",
        body,
      }),
    }),
    resetPassword: build.mutation<ResetPasswordResult, ResetPasswordArg>({
      query: ({ id, ...body }) => ({
        url: buildUrl(urls.user.detail + "reset-password/", { url: { id } }),
        method: "PUT",
        body,
      }),
    }),
    verifyEmailAddress: build.mutation<
      VerifyEmailAddressResult,
      VerifyEmailAddressArg
    >({
      query: ({ id, ...body }) => ({
        url: buildUrl(urls.user.detail + "verify-email-address/", {
          url: { id },
        }),
        method: "PUT",
        body,
      }),
    }),
    updateUser: build.mutation<UpdateUserResult, UpdateUserArg>({
      query: ({ id, ...body }) => ({
        url: buildUrl(urls.user.detail, { url: { id } }),
        method: "PATCH",
        body,
      }),
      invalidatesTags: tagData(USER_TAG),
    }),
    destroyIndependentUser: build.mutation<
      DestroyIndependentUserResult,
      DestroyIndependentUserArg
    >({
      query: id => ({
        url: buildUrl(urls.user.detail, { url: { id } }),
        method: "DELETE",
      }),
      invalidatesTags: tagData(USER_TAG),
    }),
    createIndependentUser: build.mutation<
      CreateIndependentUserResult,
      CreateIndependentUserArg
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
