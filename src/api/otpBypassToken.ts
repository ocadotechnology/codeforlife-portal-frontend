import api from "."

const listUrl = "otp-bypass-tokens/"
// const detailUrl = listUrl + "<id>/"

const otpBypassTokenApi = api.injectEndpoints({
  endpoints: build => ({
    generateOtpBypassTokens: build.mutation<string[], null>({
      query: () => ({
        url: listUrl,
        method: "POST",
      }),
    }),
  }),
})

export default otpBypassTokenApi
export const { useGenerateOtpBypassTokensMutation } = otpBypassTokenApi
