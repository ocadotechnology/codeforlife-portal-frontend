import { type Model } from "codeforlife/lib/esm/helpers/rtkQuery"

import api from "."

export type Student = Model<
  number,
  {
    school: number
    klass: number
  }
>

const studentApi = api.injectEndpoints({
  endpoints: build => ({}),
})

export default studentApi
export const {} = studentApi
