import { type Model } from "codeforlife/lib/esm/helpers/rtkQuery"

import api from "."

export type Teacher = Model<
  number,
  {
    school?: number
    is_admin: boolean
  }
>

const teacherApi = api.injectEndpoints({
  endpoints: build => ({}),
})

export default teacherApi
export const {} = teacherApi
