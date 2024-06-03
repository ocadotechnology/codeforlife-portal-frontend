import { type AuthFactor } from "codeforlife/lib/esm/api/models"
import {
  buildUrl,
  tagData,
  type CreateArg,
  type CreateResult,
  type DestroyArg,
  type DestroyResult,
  type ListArg,
  type ListResult,
} from "codeforlife/lib/esm/helpers/rtkQuery"

import api from "."

const listUrl = "auth-factors/"
const detailUrl = listUrl + "<id>/"

const authFactorApi = api.injectEndpoints({
  endpoints: build => ({
    createAuthFactor: build.mutation<
      CreateResult<AuthFactor>,
      CreateArg<AuthFactor, "type">
    >({
      query: body => ({
        url: listUrl,
        method: "POST",
        body,
      }),
    }),
    destroyAuthFactor: build.mutation<DestroyResult, DestroyArg<AuthFactor>>({
      query: id => ({
        url: buildUrl(detailUrl, { url: { id } }),
        method: "DELETE",
      }),
      invalidatesTags: tagData("AuthFactor"),
    }),
    listAuthFactors: build.query<ListResult<AuthFactor, "type">, ListArg>({
      query: search => ({
        url: buildUrl(listUrl, { search }),
        method: "GET",
      }),
      providesTags: tagData("AuthFactor"),
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
