import {
  type AuthFactor,
  getReadAuthFactorEndpoints,
  urls,
} from "codeforlife/api"
import {
  type CreateArg,
  type CreateResult,
  type DestroyArg,
  type DestroyResult,
  buildUrl,
  tagData,
} from "codeforlife/utils/api"

import api from "."

const authFactorApi = api.injectEndpoints({
  endpoints: build => ({
    ...getReadAuthFactorEndpoints(build),
    createAuthFactor: build.mutation<
      CreateResult<AuthFactor>,
      CreateArg<AuthFactor, "type">
    >({
      query: body => ({
        url: urls.authFactor.list,
        method: "POST",
        body,
      }),
    }),
    destroyAuthFactor: build.mutation<DestroyResult, DestroyArg<AuthFactor>>({
      query: id => ({
        url: buildUrl(urls.authFactor.detail, { url: { id } }),
        method: "DELETE",
      }),
      invalidatesTags: tagData("AuthFactor"),
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
