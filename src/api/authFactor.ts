import { type Model } from "codeforlife/lib/esm/helpers/rtkQuery"

import api from "."

export type AuthFactor = Model<
  number,
  {
    user: number
    type: "otp"
  }
>

const authFactorApi = api.injectEndpoints({
  endpoints: build => ({}),
})

export default authFactorApi
export const {} = authFactorApi
