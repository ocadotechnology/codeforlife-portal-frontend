import { urls } from "codeforlife/api"

import api from "."

export type GenerateOtpBypassTokensResult = string[]
export type GenerateOtpBypassTokensArg = null

const otpBypassTokenApi = api.injectEndpoints({
  endpoints: build => ({
    generateOtpBypassTokens: build.mutation<
      GenerateOtpBypassTokensResult,
      GenerateOtpBypassTokensArg
    >({
      query: () => ({
        url: urls.otpBypassToken.list,
        method: "POST",
      }),
    }),
  }),
})

export default otpBypassTokenApi
export const { useGenerateOtpBypassTokensMutation } = otpBypassTokenApi
