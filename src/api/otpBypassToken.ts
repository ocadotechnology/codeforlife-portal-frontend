import { type ListArg, type ListResult, listTag } from "codeforlife/utils/api"
import { type OtpBypassToken, urls } from "codeforlife/api"

import api from "."

export type ListOtpBypassTokensResult = ListResult<
  OtpBypassToken,
  never,
  { decrypted_token: string }
>
export type ListOtpBypassTokensArg = ListArg

export type GenerateOtpBypassTokensResult = ListOtpBypassTokensResult["data"]
export type GenerateOtpBypassTokensArg = null

const otpBypassTokenApi = api.injectEndpoints({
  endpoints: build => ({
    listOtpBypassTokens: build.query<
      ListOtpBypassTokensResult,
      ListOtpBypassTokensArg
    >({
      query: () => ({
        url: urls.otpBypassToken.list,
        method: "GET",
      }),
      providesTags: [listTag("OtpBypassToken")],
    }),
    generateOtpBypassTokens: build.mutation<
      GenerateOtpBypassTokensResult,
      GenerateOtpBypassTokensArg
    >({
      query: () => ({
        url: urls.otpBypassToken.list + "generate/",
        method: "POST",
      }),
      invalidatesTags: [listTag("OtpBypassToken")],
    }),
  }),
})

export default otpBypassTokenApi
export const {
  useLazyListOtpBypassTokensQuery,
  useListOtpBypassTokensQuery,
  useGenerateOtpBypassTokensMutation,
} = otpBypassTokenApi
