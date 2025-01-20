import { type AuthFactor, type User, urls } from "codeforlife/api"
import {
  type CreateArg,
  type CreateResult,
  type DestroyArg,
  type DestroyResult,
  type ListArg,
  type ListResult,
  buildUrl,
  tagData,
} from "codeforlife/utils/api"
import getReadAuthFactorEndpoints, {
  AUTH_FACTOR_TAG,
} from "codeforlife/api/endpoints/authFactor"

import api from "."

export type ListAuthFactorsResult = ListResult<AuthFactor, "type">
export type ListAuthFactorsArg = ListArg<{ user: User["id"] }>

export type CreateAuthFactorResult = CreateResult<AuthFactor>
export type CreateAuthFactorArg = CreateArg<AuthFactor, "type"> & {
  otp?: string
}

export type DestroyAuthFactorResult = DestroyResult
export type DestroyAuthFactorArg = DestroyArg<AuthFactor>

export type GenerateOtpProvisioningUriResult = string
export type GenerateOtpProvisioningUriArg = null

const authFactorApi = api.injectEndpoints({
  endpoints: build => ({
    ...getReadAuthFactorEndpoints<ListAuthFactorsResult, ListAuthFactorsArg>(
      build,
    ),
    createAuthFactor: build.mutation<
      CreateAuthFactorResult,
      CreateAuthFactorArg
    >({
      query: body => ({
        url: urls.authFactor.list,
        method: "POST",
        body,
      }),
      invalidatesTags: tagData(AUTH_FACTOR_TAG, { includeListTag: true }),
    }),
    destroyAuthFactor: build.mutation<
      DestroyAuthFactorResult,
      DestroyAuthFactorArg
    >({
      query: id => ({
        url: buildUrl(urls.authFactor.detail, { url: { id } }),
        method: "DELETE",
      }),
      invalidatesTags: tagData(AUTH_FACTOR_TAG, { includeListTag: true }),
    }),
    generateOtpProvisioningUri: build.query<
      GenerateOtpProvisioningUriResult,
      GenerateOtpProvisioningUriArg
    >({
      query: () => ({
        url: urls.authFactor.list + "generate-otp-provisioning-uri/",
        method: "GET",
      }),
    }),
  }),
})

export default authFactorApi
export const {
  useCreateAuthFactorMutation,
  useDestroyAuthFactorMutation,
  useListAuthFactorsQuery,
  useLazyListAuthFactorsQuery,
  useGenerateOtpProvisioningUriQuery,
} = authFactorApi
