import { urls } from "codeforlife/api"

import api from "."

const otpBypassTokenApi = api.injectEndpoints({
  endpoints: build => ({
    generateOtpBypassTokens: build.mutation<string[], null>({
      query: () => ({
        url: urls.otpBypassToken.list,
        method: "POST",
      }),
    }),
  }),
})

export default otpBypassTokenApi
export const { useGenerateOtpBypassTokensMutation } = otpBypassTokenApi
