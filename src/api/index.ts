import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  // NOTE: Don't use the "Teacher" and "Student" tags. Use "User" instead.
  tagTypes: ["User", "School", "Class"],
  endpoints: () => ({}),
})

export default api
