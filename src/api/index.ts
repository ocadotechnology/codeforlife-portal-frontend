import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { tagTypes } from "codeforlife/lib/esm/api"

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  tagTypes,
  endpoints: () => ({}),
})

export default api
