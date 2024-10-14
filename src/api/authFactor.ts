import { type AuthFactor, urls } from "codeforlife/api"
import {
  type CreateArg,
  type CreateResult,
  type DestroyArg,
  type DestroyResult,
  buildUrl,
  tagData,
} from "codeforlife/utils/api"
import getReadAuthFactorEndpoints, {
  AUTH_FACTOR_TAG,
  type ListAuthFactorsArg,
  type ListAuthFactorsResult,
} from "codeforlife/api/endpoints/authFactor"

import api from "."

export type { ListAuthFactorsArg, ListAuthFactorsResult }

export type CreateAuthFactorResult = CreateResult<AuthFactor>
export type CreateAuthFactorArg = CreateArg<AuthFactor, "type">

export type DestroyAuthFactorResult = DestroyResult
export type DestroyAuthFactorArg = DestroyArg<AuthFactor>

const authFactorApi = api.injectEndpoints({
  endpoints: build => ({
    ...getReadAuthFactorEndpoints(build),
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
  }),
})

export default authFactorApi
export const {
  useCreateAuthFactorMutation,
  useDestroyAuthFactorMutation,
  useListAuthFactorsQuery,
  useLazyListAuthFactorsQuery,
} = authFactorApi
