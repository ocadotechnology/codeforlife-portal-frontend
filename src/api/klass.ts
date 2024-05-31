import { type Model } from "codeforlife/lib/esm/helpers/rtkQuery"

import api from "."

export type Class = Model<
  string,
  {
    name: string
    teacher: number
    school: number
    read_classmates_data: boolean
    receive_requests_until?: Date
  }
>

const classApi = api.injectEndpoints({
  endpoints: build => ({}),
})

export default classApi
export const {} = classApi
