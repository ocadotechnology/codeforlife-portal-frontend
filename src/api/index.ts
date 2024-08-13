import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getCsrfCookie, logout } from "codeforlife/utils/auth"
import { tagTypes } from "codeforlife/api"

const fetch = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { type }) => {
    if (type === "mutation") {
      let csrfToken = getCsrfCookie()
      if (csrfToken) headers.set("x-csrftoken", csrfToken)
    }

    return headers
  },
})

const api = createApi({
  baseQuery: async (args, api, extraOptions) => {
    if (api.type === "mutation" && getCsrfCookie() === undefined) {
      // Get the CSRF token.
      const { error } = await fetch(
        { url: "/csrf/cookie", method: "GET" },
        api,
        {},
      )

      // Validate we got the CSRF token.
      if (error !== undefined) {
        console.error(error)
        // TODO
        // window.location.href = `${PORTAL_BASE_URL}/error/500`
      }
      if (getCsrfCookie() === undefined) {
        // TODO
        // window.location.href = `${PORTAL_BASE_URL}/error/500`
      }
    }

    // Send the HTTP request and fetch the response.
    return await fetch(args, api, extraOptions)
  },
  tagTypes: [...tagTypes, "SchoolTeacherInvitation"],
  endpoints: build => ({
    logout: build.mutation<null, null>({
      query: () => ({
        url: "session/logout/",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error("Failed to log out...", error)
        } finally {
          logout()
          dispatch(api.util.resetApiState())
        }
      },
    }),
  }),
})

export default api
export const { useLogoutMutation } = api
