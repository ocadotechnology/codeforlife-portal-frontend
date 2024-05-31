import {
  type CreateArg,
  type CreateResult,
  type Model,
} from "codeforlife/lib/esm/helpers/rtkQuery"

import api from "."
import { type Student } from "./student"
import { type Teacher } from "./teacher"

export type User = Model<
  number,
  {
    password: string
    last_login?: Date
    first_name: string
    last_name?: string
    email?: string
    is_staff: boolean
    is_active: boolean
    date_joined: Date
    requesting_to_join_class?: string
    teacher?: Teacher
    student?: Student
  }
>

const userApi = api.injectEndpoints({
  endpoints: build => ({
    createIndependentUser: build.mutation<
      CreateResult<User, "first_name" | "last_name" | "email">,
      CreateArg<User, "first_name" | "last_name" | "email">
    >({
      query: body => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: () => ["User"],
    }),
  }),
})

export default userApi
export const { useCreateIndependentUserMutation } = userApi
