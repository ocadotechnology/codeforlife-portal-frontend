import {
  type Arg,
  type CreateArg,
  type CreateResult,
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
  ListUsersArg,
  ListUsersResult,
  RetrieveUserArg,
  RetrieveUserResult,
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
export type VerifyEmailAddressArg = Pick<User, "id"> & { token: string }

export type UpdateUserResult = UpdateResult<User>
export type UpdateUserArg = UpdateArg<
  User,
  never,
  "first_name" | "last_name" | "email" | "requesting_to_join_class" | "password"
> & { current_password?: string }

export type DestroyIndependentUserResult = DestroyResult
export type DestroyIndependentUserArg = Pick<User, "id" | "password"> & {
  remove_from_newsletter: boolean
}

export type CreateIndependentUserResult = CreateResult<User>
export type CreateIndependentUserArg = CreateArg<
  User,
  "first_name" | "last_name" | "email" | "password"
> & {
  date_of_birth: string
  add_to_newsletter: boolean
}

export type ValidatePasswordResult = null
export type ValidatePasswordArg = Pick<User, "id" | "password">

export type RegisterToNewsletterResult = null
export type RegisterToNewsletterArg = { email: string }

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
      query: ({ id, ...body }) => ({
        url: buildUrl(urls.user.detail, { url: { id } }),
        method: "DELETE",
        body,
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
    // TODO: create action on the backend.
    validatePassword: build.query<ValidatePasswordResult, ValidatePasswordArg>({
      query: ({ id, ...body }) => ({
        url: buildUrl(urls.user.detail, { url: { id } }),
        method: "POST",
        body,
      }),
    }),
    registerToNewsletter: build.mutation<
      RegisterToNewsletterResult,
      RegisterToNewsletterArg
    >({
      query: body => ({
        url: urls.user.list + "register-to-newsletter/",
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
  useValidatePasswordQuery,
  useLazyValidatePasswordQuery,
  useRegisterToNewsletterMutation,
} = userApi
